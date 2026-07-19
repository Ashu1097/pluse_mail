"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  MessageSquareText,
  BarChart3,
  Settings,
  Plus,
} from "lucide-react";
import { Logo } from "@/components/marketing/logo";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/chat", label: "AI Chat", icon: MessageSquareText },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-60 shrink-0 flex-col bg-surface-1 border-r border-hairline">
      <div className="flex items-center gap-2 px-5 h-14 border-b border-hairline">
        <Logo size={20} />
        <span className="text-body-sm text-ink">PlusEmail</span>
      </div>

      <div className="px-3 pt-4">
        <button className="w-full flex items-center justify-center gap-2 rounded-pill bg-primary text-on-primary text-button px-3 py-2 hover:bg-primary-hover transition-colors">
          <Plus size={14} />
          Ask AI
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-2.5 rounded-sm pl-2.5 pr-3 py-2 text-body-sm border-l-2 transition-colors",
                active
                  ? "bg-surface-2 text-ink border-primary font-medium"
                  : "text-ink-subtle border-transparent hover:text-ink hover:bg-surface-2/60"
              )}
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <div className="flex items-center gap-2.5 rounded-md px-3 py-2.5 border border-hairline bg-surface-2">
          <div className="h-7 w-7 rounded-full bg-surface-3 border border-hairline-strong flex items-center justify-center text-caption text-ink-subtle shrink-0">
            M
          </div>
          <div className="min-w-0">
            <p className="text-body-sm text-ink truncate">Alex Rivera</p>
            <p className="text-caption text-ink-tertiary truncate">
              alex.rivera@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
