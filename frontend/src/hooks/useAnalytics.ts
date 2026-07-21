"use client";

import { useMemo } from "react";
import { computeAnalytics } from "@/services/analytics";
import { useEmails } from "@/hooks/useEmails";

/**
 * Reuses the same cached "emails" query as the dashboard/inbox/chat
 * pages instead of firing its own live Gmail fetch, so switching to the
 * Analytics tab is instant once the inbox has been loaded once.
 */
export function useAnalytics() {
  const { data: emails, isLoading, error } = useEmails();
  const data = useMemo(
    () => (emails ? computeAnalytics(emails) : undefined),
    [emails]
  );
  return { data, isLoading, error };
}
