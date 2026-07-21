"use client";

import { Search, RefreshCw } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useSyncStatus } from "@/hooks/useSyncStatus";
import { formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TopBar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { isSyncing, lastSyncedAt, refresh } = useSyncStatus();

  const syncLabel = isSyncing
    ? "Syncing…"
    : lastSyncedAt
    ? `Synced ${formatRelativeTime(lastSyncedAt)}`
    : "Not synced yet";

  return (
    <header className="flex items-center justify-between border-b border-line bg-paper/80 px-8 py-5 backdrop-blur-sm">
      <div>
        <h1 className="font-display text-xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-[13px] text-ink-3">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] text-ink-3 sm:flex">
          <Search size={14} />
          <span>Search your inbox…</span>
          <kbd className="ml-6 rounded border border-line bg-paper-2 px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
            ⌘K
          </kbd>
        </div>
        <button
          onClick={refresh}
          disabled={isSyncing}
          title="Refresh from Gmail"
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors",
            isSyncing
              ? "bg-violet-soft text-violet-dim"
              : "bg-green-soft text-green hover:bg-green-soft/70"
          )}
        >
          <RefreshCw size={11} className={cn(isSyncing && "animate-spin")} />
          {syncLabel}
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
