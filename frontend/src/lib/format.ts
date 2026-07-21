/**
 * Friendly relative date for inbox rows: "Today", "Yesterday", or a
 * short "Jul 19" style date once it's older than that.
 */
export function formatRelativeDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((today.getTime() - date.getTime()) / 86_400_000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
  });
}

/** Combines the relative date and time for a compact inbox row label. */
export function formatEmailTimestamp(dateStr: string, time: string): string {
  return `${formatRelativeDate(dateStr)} · ${time}`;
}

/** "just now" / "5m ago" / "2h ago" style label for the sync status badge. */
export function formatRelativeTime(ms: number): string {
  const diffSeconds = Math.max(0, Math.round((Date.now() - ms) / 1000));
  if (diffSeconds < 10) return "just now";
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}
