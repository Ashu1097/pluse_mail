"use client";

import { useState } from "react";
import { Sparkles, CornerDownLeft } from "lucide-react";

export function AskAboutEmail({ subject }: { subject: string }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  function handleAsk() {
    if (!question.trim()) return;
    setAnswer(
      `Based on “${subject}”, here's what stands out: the key date and action item above are the most time-sensitive parts of this email.`
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-primary" />
        <h2 className="text-card-title text-ink">Ask AI about this email</h2>
      </div>

      <div className="flex items-center gap-2 rounded-md bg-surface-2 border border-hairline px-3 py-2.5 mb-3 focus-within:border-primary-focus focus-within:ring-2 focus-within:ring-primary-focus/50">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="e.g. What do I need to do before Thursday?"
          className="bg-transparent text-body-sm text-ink placeholder:text-ink-tertiary outline-none flex-1"
        />
        <button
          onClick={handleAsk}
          aria-label="Ask"
          className="text-ink-tertiary hover:text-ink transition-colors"
        >
          <CornerDownLeft size={14} />
        </button>
      </div>

      {answer && (
        <div className="rounded-md bg-surface-2 border border-hairline px-3.5 py-3">
          <p className="text-body-sm text-ink-muted">{answer}</p>
        </div>
      )}
    </div>
  );
}
