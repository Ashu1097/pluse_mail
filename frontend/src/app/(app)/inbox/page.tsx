"use client";

import { TopBar } from "@/components/layout/TopBar";
import { EmailRow } from "@/components/inbox/EmailRow";
import { useEmails } from "@/hooks/useEmails";
import { useEmailStore } from "@/store/email-store";
import { ALL_CATEGORIES } from "@/constants/categories";
import { EMAIL_PAGE_SIZE_OPTIONS, ALL_EMAILS_FETCH_CAP } from "@/constants/config";
import type { Category } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: (Category | "All")[] = ["All", ...ALL_CATEGORIES];

export default function InboxPage() {
  const categoryFilter = useEmailStore((s) => s.categoryFilter);
  const setCategoryFilter = useEmailStore((s) => s.setCategoryFilter);
  const pageSize = useEmailStore((s) => s.pageSize);
  const setPageSize = useEmailStore((s) => s.setPageSize);

  const { data: emails = [], isLoading, isFetching } = useEmails({
    category: categoryFilter,
    maxResults: pageSize,
  });
  const unreadCount = emails.filter((e) => e.unread).length;
  const hitCap = pageSize >= ALL_EMAILS_FETCH_CAP && emails.length >= ALL_EMAILS_FETCH_CAP;

  return (
    <>
      <TopBar
        title="Inbox"
        subtitle={isLoading ? "Loading…" : `${emails.length} emails · ${unreadCount} unread`}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-8 py-3">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-[12.5px] font-medium transition-colors",
                categoryFilter === c
                  ? "bg-ink text-paper"
                  : "text-ink-2 hover:bg-paper-2"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface p-1">
          {EMAIL_PAGE_SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => setPageSize(size)}
              className={cn(
                "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                pageSize === size
                  ? "bg-ink text-paper"
                  : "text-ink-2 hover:bg-paper-2"
              )}
            >
              {size}
            </button>
          ))}
          <button
            onClick={() => setPageSize(ALL_EMAILS_FETCH_CAP)}
            className={cn(
              "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
              pageSize === ALL_EMAILS_FETCH_CAP
                ? "bg-ink text-paper"
                : "text-ink-2 hover:bg-paper-2"
            )}
          >
            All
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isFetching && !isLoading && (
          <p className="px-8 py-2 text-center text-[11.5px] text-ink-3">
            Refreshing…
          </p>
        )}

        {!isLoading && emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              Nothing here
            </p>
            <p className="mt-1 text-[13px] text-ink-3">
              No emails in this category yet.
            </p>
          </div>
        ) : (
          emails.map((email) => <EmailRow key={email.id} email={email} />)
        )}

        {hitCap && (
          <p className="px-8 py-4 text-center text-[12px] text-ink-3">
            Showing the {ALL_EMAILS_FETCH_CAP} most recent messages —
            that&apos;s the practical cap for &quot;All&quot; to keep things
            fast and within Gmail&apos;s API rate limits.
          </p>
        )}
      </div>
    </>
  );
}
