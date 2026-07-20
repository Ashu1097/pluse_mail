"use client";

import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Interviews",
  "Finance",
  "College",
  "Travel",
  "Work",
  "Promotions",
] as const;

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={cn(
            "text-button whitespace-nowrap rounded-pill px-3.5 py-1.5 transition-colors shrink-0",
            active === c
              ? "bg-surface-2 text-ink border border-hairline-strong"
              : "bg-surface-1 text-ink-subtle border border-hairline hover:text-ink"
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
