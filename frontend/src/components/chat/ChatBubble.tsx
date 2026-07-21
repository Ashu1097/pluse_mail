import Link from "next/link";
import type { ChatMessage, EmailItem } from "@/types";
import { SignalMeter } from "@/components/ui/SignalMeter";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatBubble({
  message,
  relatedEmails = [],
}: {
  message: ChatMessage;
  relatedEmails?: EmailItem[];
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-[13.5px] text-paper">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-soft text-violet-dim">
        <Sparkles size={13} />
      </span>
      <div className="max-w-[75%] space-y-3">
        <div
          className={cn(
            "rounded-2xl rounded-tl-sm border border-line bg-surface px-4 py-3 text-[13.5px] leading-relaxed text-ink-2"
          )}
        >
          {message.text}
        </div>

        {message.confidence !== undefined && (
          <SignalMeter value={message.confidence} label="Confidence" compact />
        )}

        {relatedEmails.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {relatedEmails.map((r) => (
              <Link
                key={r.id}
                href={`/inbox/${r.id}`}
                className="flex items-center gap-1 rounded-full border border-line bg-paper px-3 py-1 text-[12px] text-ink-2 hover:border-violet hover:text-violet-dim"
              >
                {r.subject.length > 28
                  ? r.subject.slice(0, 28) + "…"
                  : r.subject}
                <ArrowUpRight size={11} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
