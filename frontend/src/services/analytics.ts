import type { AnalyticsSummary, Category, ContactStat, EmailItem } from "@/types";

/**
 * Derives analytics from an already-fetched inbox page. There's no
 * backend aggregation service yet, so trends are only as deep as the
 * most recent ~30 synced messages - good enough to prove the wiring,
 * not a replacement for a real analytics job over full mail history.
 *
 * Pure/sync on purpose: takes the emails as an argument instead of
 * fetching its own copy, so the analytics page reuses the same cached
 * "emails" query as the dashboard/inbox rather than triggering another
 * full round-trip to the live Gmail API.
 */
export function computeAnalytics(emails: EmailItem[]): AnalyticsSummary {
  const categoryMap = new Map<Category, number>();
  const perDayMap = new Map<string, number>();
  const contactMap = new Map<string, { name: string; dates: number[] }>();

  for (const e of emails) {
    categoryMap.set(e.category, (categoryMap.get(e.category) ?? 0) + 1);
    perDayMap.set(e.date, (perDayMap.get(e.date) ?? 0) + 1);

    const contact = contactMap.get(e.senderEmail) ?? { name: e.sender, dates: [] };
    contact.dates.push(new Date(e.date).getTime());
    contactMap.set(e.senderEmail, contact);
  }

  const categoryDistribution = Array.from(categoryMap.entries()).map(
    ([category, count]) => ({ category, count })
  );

  const emailsPerDay = Array.from(perDayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, count]) => ({
      day: new Date(day).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      count,
    }));

  const topContacts: ContactStat[] = Array.from(contactMap.entries())
    .map(([email, { name, dates }]) => {
      const sorted = [...dates].sort((a, b) => a - b);
      const gaps = sorted.slice(1).map((d, i) => d - sorted[i]);
      const avgGapHrs =
        gaps.length > 0
          ? gaps.reduce((a, b) => a + b, 0) / gaps.length / 36e5
          : 0;
      return {
        name,
        email,
        count: dates.length,
        avgResponseHrs: Math.round(avgGapHrs * 10) / 10,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Weekly trend needs history the API isn't fetching yet (only the most
  // recent page of messages) - left empty rather than invented.
  const weeklyTrend: AnalyticsSummary["weeklyTrend"] = [];

  return { emailsPerDay, weeklyTrend, categoryDistribution, topContacts };
}
