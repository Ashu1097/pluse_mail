"use client";

import { Search, Menu, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <div className="h-14 shrink-0 border-b border-hairline bg-surface-1 flex items-center gap-3 px-4 md:px-6">
      <button
        className="md:hidden text-ink-subtle hover:text-ink"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      <div className="flex-1 max-w-[420px] flex items-center gap-2 rounded-md bg-surface-2 border border-hairline px-3 py-1.5">
        <Search size={14} className="text-ink-tertiary shrink-0" />
        <input
          placeholder="Search your inbox in plain language…"
          className="bg-transparent text-body-sm text-ink placeholder:text-ink-tertiary outline-none w-full"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <Badge dotColor="var(--color-semantic-success)" className="hidden sm:inline-flex">
          Synced 2 min ago
        </Badge>
        <button
          className="text-ink-tertiary hover:text-ink transition-colors"
          aria-label="Sync now"
        >
          <RefreshCw size={15} />
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}
