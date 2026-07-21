import type { Category, EmailItem } from "@/types";

const GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me";

interface GmailHeader {
  name: string;
  value: string;
}

interface GmailPart {
  mimeType: string;
  filename?: string;
  body?: { data?: string; size?: number; attachmentId?: string };
  parts?: GmailPart[];
}

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  labelIds?: string[];
  internalDate: string;
  payload: GmailPart & { headers: GmailHeader[] };
}

async function gmailFetch(path: string, accessToken: string) {
  const res = await fetch(`${GMAIL_API}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    // Gmail data changes; don't let Next cache this across users/requests.
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gmail API error ${res.status}: ${body}`);
  }

  return res.json();
}

/** Gmail caps a single messages.list call at 500 results. */
const GMAIL_LIST_PAGE_CAP = 500;

/** Lists the most recent message IDs in the inbox, paginating as needed. */
export async function listMessageIds(
  accessToken: string,
  maxResults = 25
): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined;

  while (ids.length < maxResults) {
    const remaining = maxResults - ids.length;
    const pageSize = Math.min(remaining, GMAIL_LIST_PAGE_CAP);
    const pageParam = pageToken ? `&pageToken=${pageToken}` : "";

    const data = await gmailFetch(
      `/messages?maxResults=${pageSize}&labelIds=INBOX${pageParam}`,
      accessToken
    );

    const pageIds = (data.messages ?? []).map((m: { id: string }) => m.id);
    ids.push(...pageIds);

    pageToken = data.nextPageToken;
    if (!pageToken || pageIds.length === 0) break;
  }

  return ids;
}

export async function getMessage(
  accessToken: string,
  id: string
): Promise<GmailMessage> {
  return gmailFetch(`/messages/${id}?format=full`, accessToken);
}

export async function getMessages(
  accessToken: string,
  ids: string[]
): Promise<GmailMessage[]> {
  // Gmail has no bulk-get endpoint on the v1 REST API. Fetching hundreds
  // of messages fully in parallel risks per-user rate limits, so this
  // works through them in small concurrent batches instead.
  const BATCH_SIZE = 20;
  const results: GmailMessage[] = [];

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map((id) => getMessage(accessToken, id))
    );
    results.push(...batchResults);
  }

  return results;
}

function header(headers: GmailHeader[], name: string): string {
  return headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ?? "";
}

function decodeBase64Url(data: string): string {
  const normalized = data.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return Buffer.from(normalized, "base64").toString("utf-8");
  } catch {
    return "";
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(
    html
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  ).trim();
}

/** Walks the MIME tree for a plain-text body, falling back to stripped HTML. */
function extractBody(payload: GmailPart): string {
  let plain = "";
  let html = "";

  function walk(part: GmailPart) {
    if (part.mimeType === "text/plain" && part.body?.data) {
      plain += decodeBase64Url(part.body.data);
    } else if (part.mimeType === "text/html" && part.body?.data) {
      html += decodeBase64Url(part.body.data);
    }
    part.parts?.forEach(walk);
  }

  walk(payload);
  if (plain.trim()) return decodeHtmlEntities(plain.trim());
  if (html.trim()) return stripHtml(html);
  return "";
}

function extractAttachments(payload: GmailPart): string[] {
  const names: string[] = [];
  function walk(part: GmailPart) {
    if (part.filename) names.push(part.filename);
    part.parts?.forEach(walk);
  }
  walk(payload);
  return names;
}

/**
 * Lightweight, non-AI categorizer so the UI has something to show per
 * message. This is a placeholder for the real Gemini/LLM classification
 * pipeline described in the product spec - swap this out once that
 * backend service exists.
 */
function guessCategory(subject: string, from: string, snippet: string): Category {
  const text = `${subject} ${from} ${snippet}`.toLowerCase();

  if (/security|sign-in|password|verify your/.test(text)) return "Security";

  // Job boards, alerts, and "apply now" listings - not a scheduled interview.
  if (
    /apply now|new jobs?\b|is hiring|now hiring|job alert|job opening|browse jobs|jobs? for you|recommended jobs/.test(
      text
    )
  )
    return "Jobs";

  // Only an actual interview invite/confirmation, not just the word "interview"
  // appearing somewhere in a job-board email.
  if (
    /interview (confirmed|scheduled|invitation|invite)|schedule (an|your) interview|your (upcoming )?interview|invited (you )?to interview/.test(
      text
    )
  )
    return "Interviews";

  if (/invoice|receipt|payment|bill|statement/.test(text)) return "Bills";
  if (/flight|booking|itinerary|reservation|hotel/.test(text)) return "Travel";
  if (/order|shipped|delivery|amazon|flipkart/.test(text)) return "Shopping";
  if (/unsubscribe|% off|deal|promo/.test(text)) return "Promotions";
  if (/assignment|professor|course|university|class/.test(text)) return "College";
  if (/@.*\.(com|io|dev|co)$/.test(from) && !/gmail|yahoo|outlook/.test(from))
    return "Work";
  return "Personal";
}

/** Rough priority heuristic (unread + recency) until real scoring exists. */
function guessPriority(unread: boolean, internalDate: string): number {
  const ageHours = (Date.now() - Number(internalDate)) / 36e5;
  let score = unread ? 55 : 25;
  score += Math.max(0, 25 - ageHours / 4);
  return Math.min(97, Math.round(score));
}

export function toEmailItem(message: GmailMessage): EmailItem {
  const headers = message.payload.headers ?? [];
  const fromRaw = header(headers, "From");
  const subject = decodeHtmlEntities(header(headers, "Subject") || "(no subject)");
  const dateHeader = header(headers, "Date");
  const unread = (message.labelIds ?? []).includes("UNREAD");
  const snippet = decodeHtmlEntities(message.snippet);

  const senderMatch = fromRaw.match(/^(.*?)<(.+)>$/);
  const sender = senderMatch ? senderMatch[1].trim().replace(/"/g, "") : fromRaw;
  const senderEmail = senderMatch ? senderMatch[2].trim() : fromRaw;

  const body = extractBody(message.payload) || snippet;
  const date = new Date(dateHeader || Number(message.internalDate));

  return {
    id: message.id,
    sender: sender || senderEmail,
    senderEmail,
    subject,
    preview: snippet,
    body,
    // No LLM wired up yet - using Gmail's own snippet as a stand-in summary.
    summary: snippet,
    category: guessCategory(subject, senderEmail, snippet),
    date: date.toISOString().slice(0, 10),
    time: date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
    priority: guessPriority(unread, message.internalDate),
    confidence: 0,
    unread,
    actionItems: [],
    deadlines: [],
    links: [],
    attachments: extractAttachments(message.payload),
    relatedIds: [],
  };
}
