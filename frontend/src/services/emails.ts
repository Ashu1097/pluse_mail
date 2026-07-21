import type {
  DailySummary,
  EmailFilters,
  EmailItem,
  TaskItem,
} from "@/types";

import { ALL_EMAILS_FETCH_CAP } from "@/constants/config";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request to ${url} failed (${res.status})`);
  }
  return res.json();
}

/**
 * Applies category/search filtering in memory. Pulled out as its own
 * function so it can run client-side (via React Query's `select`)
 * against data that's already cached, instead of forcing a fresh
 * network round-trip to the live Gmail API every time a filter changes.
 */
export function filterEmails(
  emails: EmailItem[],
  filters?: Pick<EmailFilters, "category" | "query">
): EmailItem[] {
  let result = emails;
  if (filters?.category && filters.category !== "All") {
    result = result.filter((e) => e.category === filters.category);
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (e) =>
        e.subject.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q) ||
        e.sender.toLowerCase().includes(q)
    );
  }
  return result;
}

/**
 * Fetches the raw inbox page from the Gmail-backed API route. Only
 * `maxResults` affects the request - category/query filtering is done
 * client-side (see `filterEmails`) so that changing a filter re-uses
 * already-fetched data instead of re-hitting the live Gmail API, which
 * fetches every message's full body one call at a time.
 */
export async function getEmails(filters?: EmailFilters): Promise<EmailItem[]> {
  const maxResults = filters?.maxResults ?? 30;
  const { emails } = await fetchJson<{ emails: EmailItem[] }>(
    `/api/gmail/messages?maxResults=${Math.min(maxResults, ALL_EMAILS_FETCH_CAP)}`
  );
  return filterEmails(emails, filters);
}

export async function getEmailById(id: string): Promise<EmailItem | undefined> {
  try {
    const { email } = await fetchJson<{ email: EmailItem }>(
      `/api/gmail/messages/${id}`
    );
    return email;
  } catch {
    return undefined;
  }
}

/**
 * There's no Gemini/LLM backend wired up yet to produce a real daily
 * digest, so this derives a lightweight summary from the live inbox
 * instead of calling out to mock data. Swap this for a real
 * `/api/summary` endpoint once the AI processing pipeline exists.
 *
 * Pure/sync on purpose: it takes an already-fetched email list instead
 * of fetching its own copy, so the dashboard can reuse the same cached
 * "emails" query that the inbox/chat pages use rather than triggering a
 * second full round-trip to the live Gmail API.
 */
export function buildDailySummary(emails: EmailItem[]): DailySummary {
  const today = new Date().toISOString().slice(0, 10);
  const todays = emails.filter((e) => e.date === today);
  const pool = todays.length > 0 ? todays : emails;

  const breakdownMap = new Map<string, number>();
  for (const e of pool) {
    breakdownMap.set(e.category, (breakdownMap.get(e.category) ?? 0) + 1);
  }

  const sortedByPriority = [...pool].sort((a, b) => b.priority - a.priority);

  return {
    date: new Date().toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    newEmails: pool.length,
    breakdown: Array.from(breakdownMap.entries()).map(([label, count]) => ({
      label,
      count,
    })),
    topPriorities: sortedByPriority.slice(0, 3).map((e) => e.id),
    pendingReplies: pool
      .filter((e) => e.unread)
      .slice(0, 4)
      .map((e) => e.id),
    upcomingDeadlines: [],
  };
}

/**
 * Task extraction requires the AI pipeline (Gemini) described in the
 * product spec, which isn't wired up yet. Returns an empty list against
 * the real inbox rather than fabricating tasks.
 */
export async function getTasks(): Promise<TaskItem[]> {
  return [];
}
