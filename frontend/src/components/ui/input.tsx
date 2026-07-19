import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "text-body-sm w-full rounded-xs bg-surface-1 border border-[#dddddd] px-2.5 py-2.5 text-ink placeholder:text-ink-tertiary outline-none transition-shadow",
        "focus:border-primary focus:shadow-elevation-1",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
