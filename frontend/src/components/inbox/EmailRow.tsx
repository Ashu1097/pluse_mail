import Link from "next/link";
import type { EmailItem } from "@/types";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { SignalMeter } from "@/components/ui/SignalMeter";
import { formatEmailTimestamp } from "@/lib/format";
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmailRow({ email }: { email: EmailItem }) {
  return (
    <Link
      href={`/inbox/${email.id}`}
      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-line px-6 py-4 transition-colors hover:bg-surface"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          {email.unread && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
          )}
          <p
            className={cn(
              "truncate text-[13.5px]",
              email.unread ? "font-semibold text-ink" : "font-medium text-ink-2"
            )}
          >
            {email.sender}
          </p>
          <CategoryBadge category={email.category} />
          {email.attachments.length > 0 && (
            <Paperclip size={12} className="shrink-0 text-ink-3" />
          )}
        </div>
        <p
          className={cn(
            "mt-1 truncate text-[13.5px]",
            email.unread ? "text-ink" : "text-ink-2"
          )}
        >
          {email.subject}
        </p>
        <p className="mt-0.5 truncate text-[12.5px] text-ink-3">
          {email.summary}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="whitespace-nowrap font-mono text-[11px] text-ink-3">
          {formatEmailTimestamp(email.date, email.time)}
        </span>
        <SignalMeter value={email.priority} compact />
      </div>
    </Link>
  );
}
