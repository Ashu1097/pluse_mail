"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Paperclip } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { CategoryTabs } from "@/components/app/category-tabs";
import { Card } from "@/components/ui/card";
import { mockEmails, categoryColor } from "@/lib/mock-emails";

export default function InboxPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return mockEmails.filter((e) => {
      const matchesCategory = category === "All" || e.category === category;
      const matchesQuery =
        query.trim() === "" ||
        e.subject.toLowerCase().includes(query.toLowerCase()) ||
        e.sender.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <AppShell>
      <div className="max-w-[880px] mx-auto px-5 md:px-8 py-8">
        <div className="mb-6">
          <p className="text-eyebrow text-primary mb-1">Inbox</p>
          <h1 className="text-display-md text-ink">
            {filtered.length} email{filtered.length === 1 ? "" : "s"}
          </h1>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “bills due this week” or “flight tickets”"
          className="w-full rounded-md bg-surface-1 border border-hairline px-3.5 py-2.5 text-body-sm text-ink placeholder:text-ink-tertiary outline-none focus:border-primary-focus focus:ring-2 focus:ring-primary-focus/50 mb-5"
        />

        <div className="mb-5">
          <CategoryTabs active={category} onChange={setCategory} />
        </div>

        <Card level={1} radius="lg" className="overflow-hidden">
          {filtered.length === 0 && (
            <div className="p-10 text-center">
              <p className="text-body-sm text-ink-subtle">
                Nothing matches that yet. Try a different category or search
                term.
              </p>
            </div>
          )}
          <ul>
            {filtered.map((email) => (
              <li key={email.id} className="border-b border-hairline last:border-b-0">
                <Link
                  href={`/inbox/${email.id}`}
                  className="flex items-start gap-3 px-5 py-4 hover:bg-surface-2/60 transition-colors"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: categoryColor[email.category] }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={
                          "text-body-sm truncate " +
                          (email.unread ? "text-ink" : "text-ink-subtle")
                        }
                      >
                        {email.sender}
                      </span>
                      <span className="text-caption text-ink-tertiary shrink-0">
                        {email.time}
                      </span>
                    </div>
                    <p
                      className={
                        "text-body-sm truncate mt-0.5 " +
                        (email.unread ? "text-ink-muted" : "text-ink-tertiary")
                      }
                    >
                      {email.subject}
                    </p>
                    <p className="text-caption text-ink-tertiary truncate mt-1">
                      {email.preview}
                    </p>
                  </div>
                  {email.attachments.length > 0 && (
                    <Paperclip
                      size={13}
                      className="text-ink-tertiary shrink-0 mt-1"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
