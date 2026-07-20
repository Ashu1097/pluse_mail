"use client";

import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "inline-flex h-5 w-9 shrink-0 items-center rounded-pill border-0 p-0.5 outline-none transition-colors",
        checked ? "bg-primary" : "bg-hairline-strong"
      )}
    >
      <span
        className={cn(
          "h-4 w-4 rounded-full bg-white border border-hairline shadow-elevation-1 transition-transform duration-150",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}
