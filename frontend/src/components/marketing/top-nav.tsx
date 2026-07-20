"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/marketing/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/chat", label: "AI Chat" },
  { href: "/build", label: "Changelog" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-14 bg-surface-1/90 backdrop-blur border-b border-hairline">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-body-sm font-medium text-ink">PlusEmail</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-body-sm text-ink-subtle hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="primary" size="sm">
              Connect Gmail
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-hairline bg-surface-1 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-body-sm text-ink-subtle hover:text-ink"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login">
              <Button variant="secondary" className="w-full">
                Sign in
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="primary" className="w-full">
                Connect Gmail
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
