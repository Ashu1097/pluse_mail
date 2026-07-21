"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { useChat } from "@/hooks/useChat";
import { useEmails } from "@/hooks/useEmails";
import { Send } from "lucide-react";

const SUGGESTIONS = [
  "Show me invoices from Amazon",
  "What assignments did my professor send?",
  "What meetings are scheduled this week?",
  "Any emails about my flight to Delhi?",
];

export default function ChatPage() {
  const { messages, ask, isSending } = useChat();
  const { data: allEmails = [] } = useEmails();
  const [input, setInput] = useState("");

  function handleSend(text: string) {
    ask(text);
    setInput("");
  }

  return (
    <>
      <TopBar
        title="Ask AI"
        subtitle="Ask anything about your inbox — in plain language."
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-5 overflow-y-auto px-8 py-6">
          {messages.map((m) => (
            <ChatBubble
              key={m.id}
              message={m}
              relatedEmails={(m.relatedIds ?? [])
                .map((id) => allEmails.find((e) => e.id === id))
                .filter((e): e is NonNullable<typeof e> => Boolean(e))}
            />
          ))}
          {isSending && (
            <p className="pl-10 text-[12.5px] text-ink-3">MailMind is thinking…</p>
          )}
        </div>

        <div className="border-t border-line bg-paper px-8 py-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-ink-2 hover:border-violet hover:text-violet-dim"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask your inbox anything…"
              className="flex-1 rounded-full border border-line bg-surface px-4 py-3 text-[13.5px] text-ink placeholder:text-ink-3 focus:border-violet focus:outline-none"
            />
            <button
              onClick={() => handleSend(input)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-paper hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
