"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Inbox,
  Sparkles,
  BarChart3,
  Settings,
  Mail,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/inbox", label: "Inbox", icon: Inbox },
  { href: "/chat", label: "Ask AI", icon: Sparkles },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-line bg-paper px-4 py-5">
      <Link href="/dashboard" className="flex items-center gap-2 px-2 pb-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-paper">
          <Mail size={15} />
        </span>
        <span className="font-display text-[15px] font-semibold tracking-tight">
          MailMind
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-colors",
                active
                  ? "bg-ink text-paper"
                  : "text-ink-2 hover:bg-paper-2 hover:text-ink"
              )}
            >
              <Icon size={16} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2.5 rounded-lg border border-line bg-surface px-2.5 py-2">
        {user?.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-soft font-display text-[11px] font-semibold text-violet-dim">
            {user?.avatarInitials ?? "…"}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-medium text-ink">
            {user?.name ?? "Signing in…"}
          </p>
          <p className="truncate text-[11px] text-ink-3">
            {user?.email ?? ""}
          </p>
        </div>
        <button
          onClick={logout}
          aria-label="Sign out"
          className="shrink-0 rounded-md p-1 text-ink-3 hover:bg-paper-2 hover:text-ink"
        >
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
