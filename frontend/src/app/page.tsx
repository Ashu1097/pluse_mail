import Link from "next/link";
import {
  Search,
  MessageSquareText,
  FileClock,
  Tags,
  ListChecks,
  BarChart3,
  ShieldCheck,
  Mail,
  ScanText,
  Sparkles,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TopNav } from "@/components/marketing/top-nav";
import { Footer } from "@/components/marketing/footer";
import { InboxMockup } from "@/components/marketing/inbox-mockup";
import { SummaryMockup } from "@/components/marketing/summary-mockup";

const features = [
  {
    icon: MessageSquareText,
    title: "Ask your inbox",
    body: "\u201cWhen is my interview?\u201d \u201cShow me invoices from Amazon.\u201d Get a direct answer, not a search results page.",
  },
  {
    icon: Search,
    title: "Smart search",
    body: "Search means, not keywords. \u201cBills due this week\u201d finds them even if that phrase never appears.",
  },
  {
    icon: FileClock,
    title: "Daily summary",
    body: "One digest every morning: what's new, what's urgent, what's waiting on a reply.",
  },
  {
    icon: Tags,
    title: "Automatic categories",
    body: "Work, college, finance, travel, interviews \u2014 every email sorted the moment it arrives.",
  },
  {
    icon: ListChecks,
    title: "Action items, extracted",
    body: "Deadlines, tasks, and meeting details pulled out of the email body automatically.",
  },
  {
    icon: BarChart3,
    title: "Inbox analytics",
    body: "Response times, busiest senders, and category trends, tracked week over week.",
  },
];

const pipeline = [
  { step: "01", label: "Fetch", body: "Pulls new mail through the Gmail API on a secure, incremental sync." },
  { step: "02", label: "Clean", body: "Strips HTML and tracking cruft down to plain, readable text." },
  { step: "03", label: "Embed", body: "Generates a vector embedding so meaning, not just keywords, is searchable." },
  { step: "04", label: "Summarize", body: "An LLM writes a short summary and pulls out dates, senders, and links." },
  { step: "05", label: "Extract", body: "Action items, deadlines, and meeting details are structured and stored." },
  { step: "06", label: "Serve", body: "Everything lands in your dashboard, chat, and search \u2014 instantly." },
];

const plans = [
  {
    name: "Personal",
    price: "$0",
    period: "/month",
    tagline: "One Gmail account, the essentials.",
    features: [
      "1 Gmail account",
      "Daily AI summary",
      "Smart search",
      "50 AI chat questions / month",
    ],
    featured: false,
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    tagline: "For a full inbox and a busy week.",
    features: [
      "3 Gmail accounts",
      "Unlimited AI chat",
      "Action items & deadlines",
      "Inbox analytics",
      "Priority sync",
    ],
    featured: true,
    cta: "Start 14-day trial",
  },
  {
    name: "Team",
    price: "$29",
    period: "/user/month",
    tagline: "Shared inboxes, shared context.",
    features: [
      "Unlimited accounts",
      "Shared chat history",
      "Admin analytics",
      "SSO & audit log",
      "Dedicated support",
    ],
    featured: false,
    cta: "Contact sales",
  },
];

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="bg-canvas">
        {/* Hero — the one dark "night" island per the Notion spec */}
        <section className="relative bg-secondary overflow-hidden">
          <div className="mx-auto max-w-[1280px] px-6 pt-20 pb-28 md:pt-28 md:pb-36">
            <div className="max-w-[720px]">
              <p
                className="text-eyebrow mb-5"
                style={{ color: "var(--color-tag-work)" }}
              >
                AI email assistant
              </p>
              <h1 className="text-display-xl text-on-secondary">
                Your inbox, understood.
              </h1>
              <p className="text-body-lg text-on-secondary/75 mt-6 max-w-[560px]">
                PlusEmail reads every email that hits your Gmail, summarizes it,
                and lets you ask it questions in plain language — instead
                of you reading each one yourself.
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Link href="/login">
                  <Button size="md">Connect Gmail</Button>
                </Link>
                <Link href="/chat">
                  <Button variant="secondary" size="md">
                    See AI chat in action
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <ShieldCheck size={14} className="text-on-secondary/60" />
                <span className="text-caption text-on-secondary/60">
                  OAuth only — PlusEmail never sees or stores your Gmail
                  password.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-6 pb-24">
          <Card
            level={2}
            radius="xl"
            className="-mt-20 md:-mt-28 relative z-10 overflow-hidden"
          >
            <InboxMockup />
          </Card>
        </section>

        {/* Logo marquee */}
        <section className="border-y border-hairline bg-canvas py-10">
          <div className="mx-auto max-w-[1280px] px-6">
            <p className="text-caption text-ink-tertiary text-center mb-6">
              Reads mail from every Gmail-connected corner of your life
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {["Gmail", "Google Workspace", "Greenhouse", "Stripe", "Delta", "Notion"].map(
                (name) => (
                  <div
                    key={name}
                    className="rounded-xs bg-canvas px-4 py-3 text-center"
                  >
                    <span className="text-caption text-ink-subtle">
                      {name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="max-w-[560px] mb-14">
            <p className="text-eyebrow text-primary mb-4">Features</p>
            <h2 className="text-display-md text-ink">
              Everything after “Connect Gmail.”
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <Card key={f.title} level={1} radius="lg" className="p-6">
                <div className="h-9 w-9 rounded-md bg-surface-2 border border-hairline flex items-center justify-center mb-5">
                  <f.icon size={16} className="text-primary" />
                </div>
                <h3 className="text-card-title text-ink mb-2">{f.title}</h3>
                <p className="text-body-sm text-ink-subtle">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Pipeline */}
        <section className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="max-w-[560px] mb-14">
            <p className="text-eyebrow text-primary mb-4">
              How it processes mail
            </p>
            <h2 className="text-display-md text-ink">
              Every email moves through the same six-step pipeline.
            </h2>
            <p className="text-body text-ink-subtle mt-4">
              In that order, every time — from raw Gmail message to
              something you can ask a question about.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline rounded-lg overflow-hidden border border-hairline">
            {pipeline.map((p) => (
              <div key={p.step} className="bg-surface-1 p-6">
                <span className="text-mono text-ink-tertiary">{p.step}</span>
                <h3 className="text-card-title text-ink mt-3 mb-2">
                  {p.label}
                </h3>
                <p className="text-body-sm text-ink-subtle">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Second product shot: daily summary */}
        <section className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-eyebrow text-primary mb-4">Daily summary</p>
              <h2 className="text-display-md text-ink mb-5">
                One digest, every morning, before you open your inbox.
              </h2>
              <p className="text-body text-ink-subtle mb-8 max-w-[440px]">
                PlusEmail counts what came in overnight, flags what&apos;s urgent,
                and lists what&apos;s still waiting on a reply — generated on
                a 24-hour cycle so it&apos;s ready before your first coffee.
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  "Category breakdown of everything new",
                  "Ranked list of top priorities",
                  "Pending replies you haven't sent yet",
                  "Deadlines coming up this week",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-body-sm text-ink-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Card level={1} radius="xl" edge className="overflow-hidden">
              <SummaryMockup />
            </Card>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mx-auto max-w-[1280px] px-6 py-24">
          <Card level={1} radius="lg" className="p-8 md:p-12 max-w-[820px] mx-auto">
            <p className="text-body-lg text-ink">
              I stopped opening my inbox in the morning. I ask PlusEmail what
              needs a reply and it just tells me — with the actual email
              linked right there.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <div className="h-10 w-10 rounded-full bg-surface-2 border border-hairline flex items-center justify-center">
                <Mail size={16} className="text-ink-subtle" />
              </div>
              <div>
                <p className="text-body-sm text-ink">Early access user</p>
                <p className="text-caption text-ink-tertiary">
                  Graduate student & part-time contractor
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-[1280px] px-6 py-24">
          <div className="max-w-[560px] mb-14 mx-auto text-center">
            <p className="text-eyebrow text-primary mb-4">Pricing</p>
            <h2 className="text-display-md text-ink">
              Start free. Upgrade when your inbox does.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                level={1}
                radius="lg"
                className={
                  "p-6 flex flex-col " +
                  (plan.featured ? "bg-canvas" : "")
                }
              >
                {plan.featured && (
                  <Badge className="self-start mb-4 border-transparent bg-primary/10 text-primary">
                    Most popular
                  </Badge>
                )}
                <h3 className="text-headline text-ink">{plan.name}</h3>
                <p className="text-body-sm text-ink-subtle mt-1.5">
                  {plan.tagline}
                </p>
                <div className="flex items-baseline gap-1 mt-6">
                  <span className="text-display-md text-ink">
                    {plan.price}
                  </span>
                  <span className="text-body-sm text-ink-tertiary">
                    {plan.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5 mt-6 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-body-sm text-ink-muted"
                    >
                      <span className="h-1 w-1 rounded-full bg-ink-tertiary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === "Team" ? "/contact/sales" : "/login"}>
                  <Button variant="utility" className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Security strip */}
        <section id="security" className="mx-auto max-w-[1280px] px-6 pb-24">
          <Card level={1} radius="lg" className="p-8 flex flex-col md:flex-row gap-8 md:items-center">
            <div className="flex items-center gap-3 md:w-[280px] shrink-0">
              <div className="h-10 w-10 rounded-md bg-surface-2 border border-hairline flex items-center justify-center">
                <ShieldCheck size={18} className="text-brand-secure" />
              </div>
              <h3 className="text-card-title text-ink">PlusEmail Security</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {[
                { icon: ScanText, text: "OAuth 2.0 only \u2014 your Gmail password never touches our servers." },
                { icon: Database, text: "Structured data is encrypted at rest in isolated per-user storage." },
                { icon: Sparkles, text: "You can disconnect and delete all synced data at any time." },
              ].map((item) => (
                <div key={item.text} className="flex gap-3">
                  <item.icon size={16} className="text-ink-tertiary shrink-0 mt-0.5" />
                  <p className="text-body-sm text-ink-subtle">{item.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* CTA banner */}
        <section className="mx-auto max-w-[1280px] px-6 pb-24">
          <Card level={1} radius="lg" className="p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-headline text-ink mb-2">
                Connect your inbox in under a minute.
              </h2>
              <p className="text-body-sm text-ink-subtle">
                No password entry. No setup wizard. Sign in with Google and
                your first daily summary arrives tomorrow morning.
              </p>
            </div>
            <Link href="/login" className="shrink-0">
              <Button size="md">Connect Gmail</Button>
            </Link>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}
