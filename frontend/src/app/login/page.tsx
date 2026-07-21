"use client";

import Link from "next/link";
import { Mail, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-paper px-6">
      <ThemeToggle className="absolute right-6 top-6" />
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper">
            <Mail size={16} />
          </span>
          <span className="font-display text-[16px] font-semibold tracking-tight">
            MailMind
          </span>
        </Link>

        <div className="rounded-2xl border border-line bg-surface p-8 text-center">
          <h1 className="font-display text-xl font-semibold text-ink">
            Welcome back
          </h1>
          <p className="mt-1.5 text-[13.5px] text-ink-2">
            Sign in with Google to connect your inbox.
          </p>

          <button
            onClick={login}
            disabled={isLoading}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-full border border-line bg-surface px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:border-ink/30 disabled:opacity-60"
          >
            {isLoading ? (
              <Loader2 size={17} className="animate-spin text-ink-3" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.17.29-1.7V4.97H.98A9 9 0 0 0 0 9c0 1.45.35 2.83.98 4.03l2.97-2.33z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .98 4.97l2.97 2.33C4.66 5.17 6.65 3.58 9 3.58z"
                />
              </svg>
            )}
            {isLoading ? "Connecting…" : "Continue with Google"}
          </button>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-[11.5px] text-ink-3">
            <ShieldCheck size={13} />
            We never see or store your Google password.
          </p>
        </div>

        <p className="mt-6 text-center text-[12px] text-ink-3">
          By continuing you agree to MailMind&apos;s Terms &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}
