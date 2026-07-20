import { Mail, Briefcase, Newspaper, Receipt, CheckSquare, Calendar } from "lucide-react";

const stats = [
  { label: "New emails", value: "21", icon: Mail },
  { label: "Interviews", value: "2", icon: Briefcase },
  { label: "Newsletters", value: "4", icon: Newspaper },
  { label: "Invoices", value: "1", icon: Receipt },
  { label: "Tasks", value: "3", icon: CheckSquare },
  { label: "Meetings", value: "2", icon: Calendar },
];

const priorities = [
  "Reply to TechNova re: interview logistics",
  "Amazon invoice #114-2938 — due in 3 days",
  "Submit Assignment 4 before Friday, 11:59 PM",
];

export function SummaryMockup() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-eyebrow text-primary mb-1">Today&apos;s inbox</p>
          <h3 className="text-card-title text-ink">Wednesday, July 15</h3>
        </div>
        <span className="text-caption text-ink-tertiary">
          Generated at 7:00 AM
        </span>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
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

      <p className="text-eyebrow text-ink-tertiary mb-3">Top priorities</p>
      <ul className="flex flex-col gap-2.5">
        {priorities.map((p) => (
          <li
            key={p}
            className="flex items-center gap-3 rounded-md bg-surface-2 border border-hairline px-3.5 py-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <span className="text-body-sm text-ink-muted">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
