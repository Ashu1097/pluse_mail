import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ListChecks, Paperclip, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AskAboutEmail } from "@/components/app/ask-about-email";
import { getEmailById, mockEmails, categoryColor } from "@/lib/mock-emails";

export function generateStaticParams() {
  return mockEmails.map((e) => ({ id: e.id }));
}

export default async function EmailDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const email = getEmailById(id);
  if (!email) notFound();

  const related = email.relatedIds
    .map((rid) => getEmailById(rid))
    .filter(Boolean);

  return (
    <AppShell>
      <div className="max-w-[960px] mx-auto px-5 md:px-8 py-8">
        <Link
          href="/inbox"
          className="inline-flex items-center gap-2 text-caption text-ink-subtle hover:text-ink mb-6"
        >
          <ArrowLeft size={13} />
          Back to inbox
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Original email */}
          <Card level={1} radius="lg" className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge dotColor={categoryColor[email.category]}>
                {email.category}
              </Badge>
              <span className="text-caption text-ink-tertiary">
                {email.date} · {email.time}
              </span>
            </div>
            <h1 className="text-headline text-ink mb-4">{email.subject}</h1>
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-hairline">
              <div className="h-9 w-9 rounded-full bg-surface-2 border border-hairline-strong flex items-center justify-center text-body-sm text-ink-subtle shrink-0">
                {email.sender.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-body-sm text-ink truncate">
                  {email.sender}
                </p>
                <p className="text-caption text-ink-tertiary truncate">
                  {email.senderEmail}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {email.body.map((para, i) => (
                <p key={i} className="text-body text-ink-muted">
                  {para}
                </p>
              ))}
            </div>

            {email.attachments.length > 0 && (
              <div className="mt-6 pt-5 border-t border-hairline">
                <p className="text-caption text-ink-tertiary mb-3">
                  Attachments
                </p>
                <div className="flex flex-wrap gap-2">
                  {email.attachments.map((a) => (
                    <div
                      key={a.name}
                      className="flex items-center gap-2 rounded-md bg-surface-2 border border-hairline px-3 py-2"
                    >
                      <Paperclip size={13} className="text-ink-tertiary" />
                      <span className="text-body-sm text-ink-muted">
                        {a.name}
                      </span>
                      <span className="text-caption text-ink-tertiary">
                        {a.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Side panel: AI summary, dates, tasks, related, ask AI */}
          <div className="flex flex-col gap-5">
            <Card level={1} radius="lg" className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-primary" />
                <h2 className="text-card-title text-ink">AI summary</h2>
              </div>
              <p className="text-body-sm text-ink-subtle">{email.summary}</p>
            </Card>

            {email.importantDates.length > 0 && (
              <Card level={1} radius="lg" className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-ink-subtle" />
                  <h2 className="text-card-title text-ink">
                    Important dates
                  </h2>
                </div>
                <ul className="flex flex-col gap-2">
                  {email.importantDates.map((d) => (
                    <li
                      key={d}
                      className="text-body-sm text-ink-muted rounded-md bg-surface-2 border border-hairline px-3 py-2"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {email.actionItems.length > 0 && (
              <Card level={1} radius="lg" className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks size={14} className="text-ink-subtle" />
                  <h2 className="text-card-title text-ink">Action items</h2>
                </div>
                <ul className="flex flex-col gap-2">
                  {email.actionItems.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2.5 text-body-sm text-ink-muted"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary shrink-0 mt-2" />
                      {a}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {related.length > 0 && (
              <Card level={1} radius="lg" className="p-5">
                <h2 className="text-card-title text-ink mb-3">
                  Related emails
                </h2>
                <ul className="flex flex-col gap-3">
                  {related.map(
                    (r) =>
                      r && (
                        <li key={r.id}>
                          <Link
                            href={`/inbox/${r.id}`}
                            className="block rounded-md bg-surface-2 border border-hairline px-3 py-2.5 hover:border-hairline-strong transition-colors"
                          >
                            <p className="text-body-sm text-ink truncate">
                              {r.sender}
                            </p>
                            <p className="text-caption text-ink-subtle truncate mt-0.5">
                              {r.subject}
                            </p>
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </Card>
            )}

            <Card level={1} radius="lg" className="p-5">
              <AskAboutEmail subject={email.subject} />
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
