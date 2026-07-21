"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { SignalMeter } from "@/components/ui/SignalMeter";
import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { useDailySummary, useEmails, useTasks } from "@/hooks/useEmails";
import Link from "next/link";
import {
  Sparkles,
  Clock,
  CalendarClock,
  ArrowUpRight,
  CheckSquare,
  Square,
} from "lucide-react";

export default function DashboardPage() {
  const { data: dailySummary, isLoading: loadingSummary } = useDailySummary();
  const { data: tasks = [] } = useTasks();
  const { data: allEmails = [] } = useEmails();

  if (loadingSummary || !dailySummary) {
    return (
      <>
        <TopBar title="Dashboard" subtitle="Loading today's summary…" />
        <div className="flex-1 px-8 py-6 text-[13px] text-ink-3">
          Distilling your inbox…
        </div>
      </>
    );
  }

  const byId = (id: string) => allEmails.find((e) => e.id === id);
  const priorities = dailySummary.topPriorities.map(byId).filter(Boolean);
  const pending = dailySummary.pendingReplies.map(byId).filter(Boolean);
  const deadlines = dailySummary.upcomingDeadlines.map(byId).filter(Boolean);
  const openTasks = tasks.filter((t) => !t.done);

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Here's what MailMind pulled out of your inbox today."
      />

      <div className="flex-1 space-y-6 overflow-y-auto px-8 py-6">
        {/* Daily AI summary */}
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-soft text-violet-dim">
                <Sparkles size={16} />
              </span>
              <div>
                <p className="font-display text-[15px] font-semibold text-ink">
                  Today&apos;s inbox — {dailySummary.date}
                </p>
                <p className="text-[12.5px] text-ink-3">
                  {dailySummary.newEmails} new emails, distilled
                </p>
              </div>
            </div>
            <Link
              href="/chat"
              className="flex items-center gap-1 text-[12.5px] font-medium text-violet-dim hover:underline"
            >
              Ask about it <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-5">
            {dailySummary.breakdown.map((b) => (
              <div key={b.label} className="bg-surface px-4 py-4">
                <p className="font-display text-2xl font-semibold text-ink">
                  {b.count}
                </p>
                <p className="text-[12px] text-ink-3">{b.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top priorities */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-[13px] font-semibold text-ink">
                Top priorities
              </p>
              <Link
                href="/inbox"
                className="text-[12px] text-ink-3 hover:text-ink"
              >
                View inbox
              </Link>
            </div>
            <div>
              {priorities.map((e) => (
                <Link
                  key={e!.id}
                  href={`/inbox/${e!.id}`}
                  className="flex items-start justify-between gap-4 border-b border-line px-5 py-3.5 last:border-0 hover:bg-surface"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13px] font-medium text-ink">
                        {e!.sender}
                      </p>
                      <CategoryBadge category={e!.category} />
                    </div>
                    <p className="mt-1 truncate text-[12.5px] text-ink-2">
                      {e!.summary}
                    </p>
                  </div>
                  <SignalMeter value={e!.priority} compact className="mt-0.5 shrink-0" />
                </Link>
              ))}
            </div>
          </Card>

          {/* Pending replies */}
          <Card>
            <div className="flex items-center gap-2 border-b border-line px-5 py-4">
              <Clock size={14} className="text-ink-3" />
              <p className="text-[13px] font-semibold text-ink">
                Pending replies
              </p>
            </div>
            <div>
              {pending.map((e) => (
                <Link
                  key={e!.id}
                  href={`/inbox/${e!.id}`}
                  className="block border-b border-line px-5 py-3 last:border-0 hover:bg-surface"
                >
                  <p className="truncate text-[13px] font-medium text-ink">
                    {e!.sender}
                  </p>
                  <p className="truncate text-[12px] text-ink-3">
                    {e!.subject}
                  </p>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Upcoming deadlines */}
          <Card>
            <div className="flex items-center gap-2 border-b border-line px-5 py-4">
              <CalendarClock size={14} className="text-ink-3" />
              <p className="text-[13px] font-semibold text-ink">
                Upcoming deadlines
              </p>
            </div>
            <div>
              {deadlines.map((e) => (
                <div
                  key={e!.id}
                  className="border-b border-line px-5 py-3 last:border-0"
                >
                  <p className="truncate text-[13px] font-medium text-ink">
                    {e!.deadlines[0]}
                  </p>
                  <p className="truncate text-[12px] text-ink-3">
                    {e!.subject}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Tasks */}
          <Card className="lg:col-span-2">
            <div className="flex items-center gap-2 border-b border-line px-5 py-4">
              <CheckSquare size={14} className="text-ink-3" />
              <p className="text-[13px] font-semibold text-ink">
                Tasks extracted from emails
              </p>
              <span className="ml-auto rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[11px] text-ink-3">
                {openTasks.length} open
              </span>
            </div>
            <div>
              {tasks.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-0"
                >
                  {t.done ? (
                    <CheckSquare size={15} className="shrink-0 text-green" />
                  ) : (
                    <Square size={15} className="shrink-0 text-ink-3" />
                  )}
                  <p
                    className={
                      t.done
                        ? "flex-1 truncate text-[13px] text-ink-3 line-through"
                        : "flex-1 truncate text-[13px] text-ink"
                    }
                  >
                    {t.label}
                  </p>
                  {t.due && (
                    <span className="shrink-0 font-mono text-[11px] text-ink-3">
                      {t.due}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <p className="pb-2 text-center text-[11px] text-ink-3">
          {allEmails.length} emails synced · Showing mock data for preview
        </p>
      </div>
    </>
  );
}
