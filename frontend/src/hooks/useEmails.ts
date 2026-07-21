"use client";

import { useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  buildDailySummary,
  filterEmails,
  getEmailById,
  getEmails,
  getTasks,
} from "@/services/emails";
import type { EmailFilters } from "@/types";

/**
 * Only `maxResults` changes what's actually requested from the network.
 * Category/search filtering is applied client-side via `select` against
 * whatever page is already cached, so switching inbox category tabs
 * (which all share the same default page size) re-uses the cached data
 * instead of re-fetching the whole inbox from the live Gmail API.
 */
export function useEmails(filters?: EmailFilters) {
  const maxResults = filters?.maxResults ?? 30;
  return useQuery({
    queryKey: ["emails", maxResults],
    queryFn: () => getEmails({ maxResults }),
    select: (emails) => filterEmails(emails, filters),
    placeholderData: keepPreviousData,
  });
}

export function useEmail(id: string) {
  return useQuery({
    queryKey: ["email", id],
    queryFn: () => getEmailById(id),
    enabled: Boolean(id),
  });
}

/**
 * Derives the daily summary from the same cached "emails" query the
 * inbox/chat pages use, instead of firing a second live Gmail fetch.
 */
export function useDailySummary() {
  const { data: emails, isLoading, error } = useEmails();
  const data = useMemo(
    () => (emails ? buildDailySummary(emails) : undefined),
    [emails]
  );
  return { data, isLoading, error };
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}
