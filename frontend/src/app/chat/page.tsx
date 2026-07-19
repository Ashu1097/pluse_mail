"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, CornerDownLeft, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { mockEmails, categoryColor, type MockEmail } from "@/lib/mock-emails";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  related?: MockEmail[];
  confidence?: number;
}

const suggestions = [
  "When is my interview?",
  "Show me invoices from Amazon.",
  "What assignments did my professor send?",
  "What meetings are scheduled this week?",
];

function findMatches(question: string): MockEmail[] {
  const q = question.toLowerCase();
  const keywordMap: [RegExp, string[]][] = [
    [/interview/, ["1", "5"]],
    [/invoice|amazon|bill/, ["2"]],
    [/assignment|professor|college|class/, ["3"]],
    [/flight|travel|check-?in/, ["4"]],
    [/meeting/, ["1"]],
    [/newsletter|ai|deep ?learning/, ["6"]],
  ];
  for (const [pattern, ids] of keywordMap) {
    if (pattern.test(q)) {
      return ids
        .map((id) => mockEmails.find((e) => e.id === id))
        .filter((e): e is MockEmail => Boolean(e));
    }
  }
  // fallback: naive substring match across subject/sender
  return mockEmails.filter(
    (e) =>
      e.subject.toLowerCase().includes(q) ||
      e.sender.toLowerCase().includes(q)
  );
}

function composeAnswer(question: string, matches: MockEmail[]): string {
  if (matches.length === 0) {
    return "I couldn't find anything in your inbox matching that. Try asking about an interview, an invoice, an assignment, or a flight.";
  }
  if (matches.length === 1) {
    return matches[0].summary;
  }
  return `I found ${matches.length} related emails. The most relevant: ${matches[0].summary}`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Ask me anything about your inbox \u2014 an interview date, an invoice, a deadline, whatever you'd normally scroll to find.",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  function send(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;

    const matches = findMatches(trimmed);
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: composeAnswer(trimmed, matches),
      related: matches.slice(0, 3),
      confidence: matches.length > 0 ? 94 : undefined,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  return (
    <AppShell>
      <div className="flex flex-col h-full">
        <div className="border-b border-hairline px-6 py-4 flex items-center gap-2">
          <Sparkles size={15} className="text-primary" />
          <h1 className="text-card-title text-ink">Ask your inbox</h1>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 md:px-8 py-6"
        >
          <div className="max-w-[760px] mx-auto flex flex-col gap-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "self-end max-w-[85%] rounded-lg rounded-tr-sm bg-surface-2 border border-hairline-strong px-4 py-3"
                    : "self-start max-w-[92%] rounded-lg rounded-tl-sm bg-surface-1 border border-hairline px-4 py-3.5 flex flex-col gap-3"
                }
              >
                <p
                  className={
                    m.role === "user"
                      ? "text-body-sm text-ink"
                      : "text-body-sm text-ink-muted"
                  }
                >
                  {m.content}
                </p>

                {m.related && m.related.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {m.related.map((email) => (
                      <Link
                        key={email.id}
                        href={`/inbox/${email.id}`}
                        className="flex items-center gap-2.5 rounded-md bg-surface-2 border border-hairline px-3 py-2.5 hover:border-hairline-strong transition-colors"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: categoryColor[email.category],
                          }}
                        />
                        <span className="text-caption text-ink-muted truncate flex-1">
                          {email.subject}
                        </span>
                        <ExternalLink
                          size={12}
                          className="text-ink-tertiary shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                )}

                {m.confidence && (
                  <Badge className="self-start bg-surface-3 text-ink-subtle">
                    {m.confidence}% confidence
                  </Badge>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-body-sm text-ink-subtle rounded-pill border border-hairline px-3.5 py-1.5 hover:text-ink hover:border-hairline-strong transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-hairline px-5 md:px-8 py-4">
          <div className="max-w-[760px] mx-auto flex items-center gap-2 rounded-md bg-surface-1 border border-hairline px-3.5 py-2.5 focus-within:border-primary-focus focus-within:ring-2 focus-within:ring-primary-focus/50">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask anything about your email…"
              className="flex-1 bg-transparent text-body-sm text-ink placeholder:text-ink-tertiary outline-none"
            />
            <button
              onClick={() => send(input)}
              aria-label="Send"
              className="text-ink-tertiary hover:text-ink transition-colors"
            >
              <CornerDownLeft size={15} />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
