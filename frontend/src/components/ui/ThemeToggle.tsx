"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:text-ink",
        className
      )}
    >
      {mounted && (isDark ? <Sun size={14} /> : <Moon size={14} />)}
    </button>
  );
}
