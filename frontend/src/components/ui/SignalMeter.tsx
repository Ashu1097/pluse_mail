import { cn } from "@/lib/utils";

export function SignalMeter({
  value,
  label = "Signal",
  className,
  compact = false,
}: {
  value: number;
  label?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-full bg-line",
          compact ? "h-1 w-12" : "h-1.5 w-20"
        )}
      >
        <div
          className="signal-bar absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${Math.max(4, value)}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-ink-3 tabular-nums">
        {!compact && `${label} `}
        {value}%
      </span>
    </div>
  );
}
