import Link from "next/link";
import {
  Mail,
  Briefcase,
  Newspaper,
  Receipt,
  CheckSquare,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Clock,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "New emails", value: "21", icon: Mail },
  { label: "Interviews", value: "2", icon: Briefcase },
  { label: "Newsletters", value: "4", icon: Newspaper },
  { label: "Invoices", value: "1", icon: Receipt },
  { label: "Tasks", value: "3", icon: CheckSquare },
  { label: "Meetings", value: "2", icon: Calendar },
];

const importantEmails = [
  {
    sender: "Greenhouse \u2014 TechNova",
    subject: "Interview confirmed: Backend Engineer, Thu 2:00 PM",
    tag: "Interviews",
    color: "var(--color-tag-interviews)",
    time: "9:41 AM",
  },
  {
    sender: "Amazon",
    subject: "Your invoice for order #114-2938 is ready",
    tag: "Finance",
    color: "var(--color-tag-finance)",
    time: "8:15 AM",
  },
  {
    sender: "Delta Air Lines",
    subject: "Check-in is open for flight DL 1420",
    tag: "Travel",
    color: "var(--color-tag-travel)",
    time: "Yesterday",
  },
];

const pendingReplies = [
  { sender: "Prof. A. Meadows", subject: "Re: Assignment 4 extension?", waiting: "2 days" },
  { sender: "Sam \u2014 TechNova recruiting", subject: "Re: Interview logistics", waiting: "1 day" },
];

const meetings = [
  { title: "Backend Engineer interview", time: "Thu, 2:00 PM", withWhom: "TechNova" },
  { title: "Study group \u2014 Systems", time: "Fri, 5:00 PM", withWhom: "3 classmates" },
];

const tasks = [
  { label: "Submit Assignment 4", due: "Fri, 11:59 PM", done: false },
  { label: "Pay Amazon invoice #114-2938", due: "In 3 days", done: false },
  { label: "Check in for flight DL 1420", due: "Available now", done: true },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-eyebrow text-primary mb-1">Today&apos;s inbox</p>
            <h1 className="text-display-md text-ink">Good morning, Alex.</h1>
          </div>
          <Link href="/chat" className="hidden sm:block">
            <Button variant="secondary">
              <Sparkles size={14} />
              Ask AI
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Summary stats */}
            <Card level={1} radius="lg" className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-card-title text-ink">Daily summary</h2>
                <span className="text-caption text-ink-tertiary">
                  Generated 7:00 AM
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-md bg-surface-2 border border-hairline px-3 py-3 flex flex-col gap-2"
                  >
                    <s.icon size={14} className="text-ink-subtle" />
                    <div>
                      <div className="text-card-title text-ink leading-none">
                        {s.value}
                      </div>
                      <div className="text-caption text-ink-tertiary mt-1">
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Important emails */}
            <Card level={1} radius="lg" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-card-title text-ink">Important emails</h2>
                <Link
                  href="/inbox"
                  className="text-caption text-ink-subtle hover:text-ink flex items-center gap-1"
                >
                  View inbox <ArrowUpRight size={12} />
                </Link>
              </div>
              <ul className="flex flex-col">
                {importantEmails.map((item) => (
                  <li
                    key={item.subject}
                    className="flex items-start gap-3 py-3 border-b border-hairline last:border-b-0"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-body-sm text-ink truncate">
                          {item.sender}
                        </span>
                        <span className="text-caption text-ink-tertiary shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-body-sm text-ink-subtle truncate mt-0.5">
                        {item.subject}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Tasks */}
            <Card level={1} radius="lg" className="p-6">
              <h2 className="text-card-title text-ink mb-4">
                Tasks extracted from your inbox
              </h2>
              <ul className="flex flex-col gap-2.5">
                {tasks.map((t) => (
                  <li
                    key={t.label}
                    className="flex items-center gap-3 rounded-md bg-surface-2 border border-hairline px-3.5 py-3"
                  >
                    <span
                      className={
                        "h-4 w-4 rounded-sm border shrink-0 flex items-center justify-center " +
                        (t.done
                          ? "bg-primary border-primary"
                          : "border-hairline-strong")
                      }
                    >
                      {t.done && (
                        <CheckSquare size={11} className="text-on-primary" />
                      )}
                    </span>
                    <span
                      className={
                        "text-body-sm flex-1 " +
                        (t.done ? "text-ink-tertiary line-through" : "text-ink-muted")
                      }
                    >
                      {t.label}
                    </span>
                    <span className="text-caption text-ink-tertiary shrink-0">
                      {t.due}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Side column */}
          <div className="flex flex-col gap-5">
            <Card level={1} radius="lg" className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-primary" />
                <h2 className="text-card-title text-ink">Ask your inbox</h2>
              </div>
              <p className="text-body-sm text-ink-subtle mb-4">
                Skip the scrolling. Ask a direct question about anything in
                your mail.
              </p>
              <Link href="/chat">
                <Button variant="secondary" className="w-full">
                  Open AI Chat
                </Button>
              </Link>
            </Card>

            <Card level={1} radius="lg" className="p-6">
              <h2 className="text-card-title text-ink mb-4">
                Pending replies
              </h2>
              <ul className="flex flex-col gap-3">
                {pendingReplies.map((p) => (
                  <li key={p.subject}>
                    <p className="text-body-sm text-ink truncate">
                      {p.sender}
                    </p>
                    <p className="text-caption text-ink-subtle truncate">
                      {p.subject}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock size={11} className="text-ink-tertiary" />
                      <span className="text-caption text-ink-tertiary">
                        Waiting {p.waiting}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card level={1} radius="lg" className="p-6">
              <h2 className="text-card-title text-ink mb-4">
                Upcoming meetings
              </h2>
              <ul className="flex flex-col gap-3">
                {meetings.map((m) => (
                  <li
                    key={m.title}
                    className="rounded-md bg-surface-2 border border-hairline px-3.5 py-3"
                  >
                    <p className="text-body-sm text-ink">{m.title}</p>
                    <p className="text-caption text-ink-subtle mt-1">
                      {m.time} · {m.withWhom}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card level={1} radius="lg" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-card-title text-ink">This week</h2>
                <Badge>Analytics</Badge>
              </div>
              <div className="flex items-end gap-2 h-20">
                {[40, 65, 30, 80, 55, 20, 45].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-primary/70"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span
                    key={i}
                    className="text-caption text-ink-tertiary flex-1 text-center"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <Link
                href="/analytics"
                className="text-caption text-ink-subtle hover:text-ink flex items-center gap-1 mt-4"
              >
                Full analytics <ArrowUpRight size={12} />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
