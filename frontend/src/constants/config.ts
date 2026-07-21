export const APP_NAME = "MailMind";

/** Base URL for the real backend. Falls back to same-origin mock services in dev. */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

/** Selectable inbox page sizes, shown as buttons/dropdown in the UI. */
export const EMAIL_PAGE_SIZE_OPTIONS = [30, 60, 100] as const;

/**
 * What "All" fetches. Gmail inboxes can hold tens of thousands of
 * messages - fetching every one of them fully (each is a separate API
 * call) would be slow and can trip per-user rate limits, so "All" is
 * capped at a large-but-practical number rather than being literally
 * unbounded. Raise this if you need more and have the API quota for it.
 */
export const ALL_EMAILS_FETCH_CAP = 250;

