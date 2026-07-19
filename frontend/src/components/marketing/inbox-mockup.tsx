import { Search, Sparkles, Paperclip, CornerDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const inboxItems = [
  {
    sender: "Greenhouse — TechNova",
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
    sender: "Prof. A. Meadows",
    subject: "Assignment 4 posted — due next Friday",
    tag: "College",
    color: "var(--color-tag-college)",
    time: "Yesterday",
  },
  {
    sender: "Delta Air Lines",
    subject: "Check-in is open for flight DL 1420",
    tag: "Travel",
    color: "var(--color-tag-travel)",
    time: "Yesterday",
  },
];

export function InboxMockup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      {/* Left: inbox list */}
      <div className="border-b lg:border-b-0 lg:border-r border-hairline">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-hairline">
          <Search size={14} className="text-ink-tertiary shrink-0" />
          <span className="text-body-sm text-ink-tertiary">
            Bills due this week
          </span>
        </div>
        <ul>
          {inboxItems.map((item) => (
            <li
              key={item.subject}
              className="flex items-start gap-3 px-5 py-3.5 border-b border-hairline last:border-b-0"
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
      </div>

      {/* Right: AI chat panel */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-hairline">
          <Sparkles size={14} className="text-primary shrink-0" />
          <span className="text-body-sm text-ink">Ask your inbox</span>
        </div>

        <div className="flex-1 px-5 py-4 flex flex-col gap-4">
          <div className="self-end max-w-[85%] rounded-lg rounded-tr-sm bg-surface-2 border border-hairline-strong px-3.5 py-2.5">
            <p className="text-body-sm text-ink">When is my interview?</p>
          </div>

          <div className="self-start max-w-[90%] rounded-lg rounded-tl-sm bg-surface-1 border border-hairline px-3.5 py-3 flex flex-col gap-2.5">
            <p className="text-body-sm text-ink">
              Thursday at 2:00 PM with TechNova, for the Backend Engineer role.
              Confirmation came from Greenhouse this morning.
            </p>
            <div className="flex items-center gap-2 rounded-md bg-surface-2 border border-hairline px-2.5 py-2">
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "var(--color-tag-interviews)" }}
              />
              <span className="text-caption text-ink-muted truncate">
                Interview confirmed: Backend Engineer, Thu 2:00 PM
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-surface-3 text-ink-subtle">
                98% confidence
              </Badge>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 pt-1">
          <div className="flex items-center gap-2 rounded-md bg-surface-1 border border-hairline px-3 py-2.5">
            <Paperclip size={14} className="text-ink-tertiary shrink-0" />
            <span className="text-body-sm text-ink-tertiary flex-1">
              Ask anything about your email…
            </span>
            <CornerDownLeft size={14} className="text-ink-tertiary shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
