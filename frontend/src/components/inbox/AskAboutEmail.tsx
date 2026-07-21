"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SignalMeter } from "@/components/ui/SignalMeter";
import type { EmailItem } from "@/types";
import { Sparkles, Send } from "lucide-react";

export function AskAboutEmail({ email }: { email: EmailItem }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  function handleAsk() {
    if (!question.trim()) return;
    setAnswer(
      `Based on this email from ${email.sender}: ${email.summary} You can find the full detail in the message above.`
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles size={15} className="text-violet-dim" />
        <p className="text-[13px] font-semibold text-ink">
          Ask AI about this email
        </p>
      </div>

      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="e.g. What do I need to do before Thursday?"
          className="flex-1 rounded-lg border border-line bg-paper px-3.5 py-2.5 text-[13.5px] text-ink placeholder:text-ink-3 focus:border-violet focus:outline-none"
        />
        <Button size="sm" onClick={handleAsk} className="shrink-0">
          <Send size={13} /> Ask
        </Button>
      </div>

      {answer && (
        <div className="mt-4 rounded-xl bg-violet-soft/60 p-4">
          <p className="text-[13.5px] leading-relaxed text-ink-2">{answer}</p>
          <div className="mt-2">
            <SignalMeter value={email.confidence} label="Confidence" compact />
          </div>
        </div>
      )}
    </Card>
  );
}
