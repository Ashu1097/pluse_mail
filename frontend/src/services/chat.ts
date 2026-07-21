import type { ChatMessage } from "@/types";
import { getEmails } from "./emails";

let idCounter = 100;

export async function getInitialChat(): Promise<ChatMessage[]> {
  return [
    {
      id: "c0",
      role: "assistant",
      text: "Ask me anything about your inbox — try \u201cwhat's new today\u201d or a sender's name.",
    },
  ];
}

/**
 * Keyword search over the live inbox, standing in for the real
 * embeddings + LLM chat pipeline from the product spec (no vector
 * search or Gemini call wired up yet).
 */
export async function sendMessage(text: string): Promise<ChatMessage> {
  const emails = await getEmails();
  const words = text.toLowerCase().split(" ").filter((w) => w.length > 2);

  const hit = emails.find((e) =>
    words.some(
      (w) =>
        e.subject.toLowerCase().includes(w) ||
        e.sender.toLowerCase().includes(w) ||
        e.summary.toLowerCase().includes(w)
    )
  );

  if (!hit) {
    return {
      id: `a${idCounter++}`,
      role: "assistant",
      text: "I couldn't find anything matching that in your recent inbox.",
    };
  }

  return {
    id: `a${idCounter++}`,
    role: "assistant",
    text: `Here's what I found: ${hit.summary}`,
    confidence: hit.confidence || undefined,
    relatedIds: [hit.id],
  };
}
