import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" ? "px-3.5 py-1.5 text-[13px]" : "px-5 py-2.5 text-sm",
        variant === "primary" && "bg-ink text-paper hover:bg-ink/85",
        variant === "secondary" &&
          "bg-surface border border-line text-ink hover:border-ink/30",
        variant === "ghost" && "text-ink-2 hover:text-ink hover:bg-paper-2",
        className
      )}
      {...props}
    />
  );
}
