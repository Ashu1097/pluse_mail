export type Category =
  | "Work"
  | "College"
  | "Personal"
  | "Finance"
  | "Shopping"
  | "Travel"
  | "Security"
  | "Bills"
  | "Promotions"
  | "Jobs"
  | "Interviews";

export interface EmailItem {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  summary: string;
  category: Category;
  date: string;
  time: string;
  priority: number; // 0-100, drives the signal meter
  confidence: number; // AI confidence 0-100
  unread: boolean;
  actionItems: string[];
  deadlines: string[];
  meeting?: { title: string; when: string; location: string };
  links: string[];
  attachments: string[];
  relatedIds: string[];
}

export interface EmailFilters {
  category?: Category | "All";
  query?: string;
  maxResults?: number;
}

export interface DailySummaryBreakdownItem {
  label: string;
  count: number;
}

export interface DailySummary {
  date: string;
  newEmails: number;
  breakdown: DailySummaryBreakdownItem[];
  topPriorities: string[];
  pendingReplies: string[];
  upcomingDeadlines: string[];
}

export interface TaskItem {
  id: string;
  label: string;
  emailId: string;
  done: boolean;
  due?: string;
}

export interface CategoryCount {
  category: Category;
  count: number;
}

export interface EmailsPerDayPoint {
  day: string;
  count: number;
}

export interface WeeklyTrendPoint {
  week: string;
  count: number;
}

export interface ContactStat {
  name: string;
  email: string;
  count: number;
  avgResponseHrs: number;
}

export interface AnalyticsSummary {
  emailsPerDay: EmailsPerDayPoint[];
  weeklyTrend: WeeklyTrendPoint[];
  categoryDistribution: CategoryCount[];
  topContacts: ContactStat[];
}
