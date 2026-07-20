import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "inverse" | "utility";
type Size = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "rounded-pill bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-hover active:scale-[0.97]",
  secondary:
    "rounded-pill bg-surface-1 text-ink border border-hairline shadow-elevation-1 hover:border-hairline-strong active:scale-[0.97]",
  tertiary: "rounded-md bg-transparent text-ink hover:bg-surface-2",
  inverse:
    "rounded-pill bg-inverse-canvas text-inverse-ink hover:bg-inverse-surface-1 active:scale-[0.97]",
  utility:
    "rounded-md bg-surface-1 text-ink border border-hairline hover:border-hairline-strong",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-[14px]",
  md: "px-5 py-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "text-button inline-flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
