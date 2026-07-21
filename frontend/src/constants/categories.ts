import type { Category } from "@/types";

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  Work: { bg: "bg-violet-soft", text: "text-violet-dim" },
  College: { bg: "bg-amber-soft", text: "text-amber-dim" },
  Personal: { bg: "bg-paper-2", text: "text-ink-2" },
  Finance: { bg: "bg-green-soft", text: "text-green" },
  Shopping: { bg: "bg-amber-soft", text: "text-amber-dim" },
  Travel: { bg: "bg-violet-soft", text: "text-violet-dim" },
  Security: { bg: "bg-security-soft", text: "text-security-dim" },
  Bills: { bg: "bg-green-soft", text: "text-green" },
  Promotions: { bg: "bg-paper-2", text: "text-ink-3" },
  Jobs: { bg: "bg-amber-soft", text: "text-amber-dim" },
  Interviews: { bg: "bg-violet-soft", text: "text-violet-dim" },
};

export const ALL_CATEGORIES: Category[] = [
  "Work",
  "College",
  "Personal",
  "Finance",
  "Shopping",
  "Travel",
  "Security",
  "Bills",
  "Promotions",
  "Jobs",
  "Interviews",
];
