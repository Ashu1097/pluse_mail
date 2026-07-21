"use client";

import { useParams } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { SignalMeter } from "@/components/ui/SignalMeter";
import { useEmail } from "@/hooks/useEmails";
import {
  Paperclip,
  CheckCircle2,
  CalendarClock,
  Link2,
  Sparkles,
} from "lucide-react";
import { AskAboutEmail } from "@/components/inbox/AskAboutEmail";

export default function EmailDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: email, isLoading, isError } = useEmail(id);

  if (isLoading) {
    return (
      <>
        <TopBar title="Email" subtitle="Loading…" />
        <div className="flex-1 px-8 py-6 text-[13px] text-ink-3">
          Fetching this message from Gmail…
        </div>
      </>
    );
  }

  if (isError || !email) {
    return (
      <>
        <TopBar title="Email" subtitle="Not found" />
        <div className="flex-1 px-8 py-6 text-[13px] text-ink-3">
          Couldn&apos;t load this message. It may have been deleted, or your
          Gmail session may have expired — try signing in again.
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Email" subtitle={email.subject} />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <CategoryBadge category={email.category} />
                    {email.unread && (
                      <span className="rounded-full bg-violet-soft px-2 py-0.5 text-[11px] font-medium text-violet-dim">
                        Unread
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {email.subject}
                  </h2>
                  <p className="mt-1 text-[13px] text-ink-2">
                    {email.sender}{" "}
                    <span className="text-ink-3">
                      &lt;{email.senderEmail}&gt;
                    </span>
                  </p>
                </div>
                <span className="whitespace-nowrap font-mono text-[12px] text-ink-3">
                  {email.date} · {email.time}
                </span>
              </div>

              <p className="mt-5 whitespace-pre-line text-[14px] leading-relaxed text-ink-2">
                {email.body}
              </p>

              {email.attachments.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                  {email.attachments.map((a) => (
                    <span
                      key={a}
                      className="flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 text-[12.5px] text-ink-2"
                    >
                      <Paperclip size={12} /> {a}
                    </span>
                  ))}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={15} className="text-violet-dim" />
                <p className="text-[13px] font-semibold text-ink">
                  Summary
                </p>
              </div>
              <p className="text-[13.5px] leading-relaxed text-ink-2">
                {email.summary}
              </p>
              <p className="mt-2 text-[11.5px] text-ink-3">
                Gmail snippet shown here — full AI summarization isn&apos;t
                wired up yet.
              </p>
            </Card>

            <AskAboutEmail email={email} />
          </div>

          <div className="space-y-6">
            <Card className="p-5">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-wide text-ink-3">
                Priority signal
              </p>
              <SignalMeter value={email.priority} label="Priority" />
              <p className="mt-2 text-[11px] text-ink-3">
                Heuristic (unread + recency), not yet AI-scored.
              </p>
            </Card>

            {email.actionItems.length > 0 && (
              <Card className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-ink-3" />
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-3">
                    Action items
                  </p>
                </div>
                <ul className="space-y-2">
                  {email.actionItems.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 text-[13px] text-ink-2"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {(email.deadlines.length > 0 || email.meeting) && (
              <Card className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <CalendarClock size={14} className="text-ink-3" />
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-3">
                    Dates &amp; meetings
                  </p>
                </div>
                <div className="space-y-2">
                  {email.deadlines.map((d) => (
                    <p key={d} className="text-[13px] text-ink-2">
                      {d}
                    </p>
                  ))}
                  {email.meeting && (
                    <div className="mt-2 rounded-lg bg-violet-soft px-3 py-2">
                      <p className="text-[12.5px] font-medium text-violet-dim">
                        {email.meeting.title}
                      </p>
                      <p className="text-[12px] text-violet-dim/80">
                        {email.meeting.when} · {email.meeting.location}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {email.links.length > 0 && (
              <Card className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Link2 size={14} className="text-ink-3" />
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-3">
                    Links
                  </p>
                </div>
                <div className="space-y-1.5">
                  {email.links.map((l) => (
                    <a
                      key={l}
                      href={l}
                      className="block truncate text-[12.5px] text-violet-dim hover:underline"
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
