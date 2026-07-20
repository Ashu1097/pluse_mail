import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  dotColor?: string;
}

export function Badge({ className, dotColor, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-caption inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface-1 text-ink-subtle px-2 py-0.5",
        className
      )}
      {...props}
    >
      {dotColor && (
        <span
          className="h-1.5 w-1.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  );
}
