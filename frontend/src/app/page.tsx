import Link from "next/link";
import {
  Mail,
  Sparkles,
  Search,
  MessageSquareText,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const FEATURES = [
  {
    icon: MessageSquareText,
    title: "Chat with your inbox",
    body: "Ask “when is my interview” or “show me invoices from Amazon” and get a straight answer, sourced from the actual emails.",
  },
  {
    icon: Search,
    title: "Search in plain language",
    body: "No more guessing keywords. Search the way you’d ask a person — “bills due this week” just works.",
  },
  {
    icon: Sparkles,
    title: "Every email, distilled",
    body: "Senders, dates, deadlines, action items and meetings are pulled out automatically the moment mail arrives.",
  },
  {
    icon: BarChart3,
    title: "See your inbox's shape",
    body: "Response times, busiest contacts, and category trends — the patterns you'd never notice by scrolling.",
  },
  {
    icon: ShieldCheck,
    title: "Google OAuth, always",
    body: "MailMind never sees or stores your password. Disconnect access from your Google account at any time.",
  },
  {
    icon: Inbox,
    title: "Daily inbox report",
    body: "One digest every morning: what's new, what needs a reply, and what's due — before you open a single email.",
  },
];

const STEPS = [
  {
    n: "Connect",
    body: "Sign in with Google. MailMind syncs your inbox securely in the background.",
  },
  {
    n: "Distill",
    body: "Every email is summarized and indexed — senders, dates, tasks, meetings, links.",
  },
  {
    n: "Ask",
    body: "Search or chat in plain language. Get answers, not a wall of unread mail.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-paper">
            <Mail size={15} />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">
            MailMind
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden text-[13.5px] font-medium text-ink-2 hover:text-ink sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-paper hover:bg-ink/85"
          >
            Get started
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-[12px] font-medium text-ink-2">
            <Sparkles size={12} className="text-violet-dim" />
            Now reading Gmail in natural language
          </span>
          <h1 className="mt-5 font-display text-[44px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[56px]">
            Your inbox,
            <br />
            distilled to what
            <br />
            matters.
          </h1>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-2">
            MailMind reads every email so you don&apos;t have to — surfacing
            deadlines, meetings and tasks, and letting you ask your inbox
            questions in plain English.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-paper hover:bg-ink/85"
            >
              Connect Gmail <ArrowRight size={15} />
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-line bg-surface px-5 py-3 text-[14px] font-medium text-ink hover:border-ink/30"
            >
              View live demo
            </Link>
          </div>
          <p className="mt-3 text-[12px] text-ink-3">
            Google OAuth only. Your password never touches our servers.
          </p>
        </div>

        {/* Signature distillation visual */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[32px] bg-violet-soft/40 blur-2xl" />
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_0_rgba(20,23,31,0.03)]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
              21 new emails
            </p>
            <div className="space-y-1.5 opacity-70">
              {[
                "Interview confirmed — Thursday 10 AM",
                "Your invoice for Order #402-8817",
                "Assignment 3 posted — due Monday",
                "Credit card bill generated",
                "50% off your next 3 orders",
              ].map((t, i) => (
                <div
                  key={t}
                  className="flex items-center gap-2 rounded-lg bg-paper px-3 py-2"
                  style={{ opacity: 1 - i * 0.14 }}
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-ink-3" />
                  <span className="truncate text-[12px] text-ink-2">{t}</span>
                </div>
              ))}
            </div>

            <div className="my-4 flex items-center justify-center">
              <div className="h-8 w-px signal-bar" style={{ writingMode: "vertical-lr" }} />
            </div>

            <div className="rounded-xl bg-dark p-4">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-violet" />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                  Today, distilled
                </p>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white">
                One interview Thursday at 10 AM, an assignment due Monday,
                and a card bill due the 28th. Everything else can wait.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                  <div className="signal-bar h-full w-[92%] rounded-full" />
                </div>
                <span className="font-mono text-[10.5px] text-white/60">
                  92% signal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-3">
            How it works
          </p>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n}>
                <p className="font-display text-3xl font-semibold text-violet-soft">
                  <span className="text-violet">{s.n}</span>
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                  {s.body}
                </p>
                {i < STEPS.length - 1 && (
                  <div className="mt-6 hidden h-px bg-line sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Built for people who get too much email.
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-line bg-surface p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-soft text-violet-dim">
                  <Icon size={16} />
                </span>
                <p className="mt-4 text-[14.5px] font-semibold text-ink">
                  {f.title}
                </p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-dark px-8 py-14 text-center">
          <h3 className="font-display text-3xl font-semibold text-white">
            Stop reading. Start asking.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-white/70">
            Connect your Gmail and let MailMind turn today&apos;s inbox into
            three sentences you actually need.
          </p>
          <Link
            href="/login"
            className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-[#14171F] hover:bg-white/90"
          >
            Connect Gmail <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-[12px] text-ink-3 sm:flex-row">
          <span>© 2026 MailMind. Not affiliated with Google.</span>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
