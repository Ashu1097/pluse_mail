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
  | "Interviews";

export const categoryColor: Record<Category, string> = {
  Work: "var(--color-tag-work)",
  College: "var(--color-tag-college)",
  Personal: "var(--color-tag-personal)",
  Finance: "var(--color-tag-finance)",
  Shopping: "var(--color-tag-shopping)",
  Travel: "var(--color-tag-travel)",
  Security: "var(--color-tag-security)",
  Bills: "var(--color-tag-bills)",
  Promotions: "var(--color-tag-promotions)",
  Interviews: "var(--color-tag-interviews)",
};

export interface MockEmail {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string[];
  category: Category;
  time: string;
  date: string;
  unread: boolean;
  summary: string;
  importantDates: string[];
  actionItems: string[];
  attachments: { name: string; size: string }[];
  relatedIds: string[];
}

export const mockEmails: MockEmail[] = [
  {
    id: "1",
    sender: "Greenhouse \u2014 TechNova",
    senderEmail: "noreply@greenhouse.io",
    subject: "Interview confirmed: Backend Engineer, Thu 2:00 PM",
    preview:
      "Your interview for the Backend Engineer role has been confirmed for Thursday at 2:00 PM with the platform team.",
    body: [
      "Hi Alex,",
      "This confirms your interview for the Backend Engineer role at TechNova on Thursday, July 16 at 2:00 PM (Pacific).",
      "You'll be meeting with two members of the platform team for a 45-minute technical conversation, followed by a 15-minute Q&A. A calendar invite with the video link is attached separately.",
      "Please reply to this email if you need to reschedule, or reach out to your recruiter directly.",
      "Good luck!",
      "The TechNova Recruiting Team",
    ],
    category: "Interviews",
    time: "9:41 AM",
    date: "Today",
    unread: true,
    summary:
      "TechNova confirmed a 45-minute technical interview for the Backend Engineer role this Thursday at 2:00 PM, followed by 15 minutes of Q&A.",
    importantDates: ["Thu, Jul 16 \u00b7 2:00 PM \u2014 Interview"],
    actionItems: [
      "Reply if you need to reschedule",
      "Review the platform team's public engineering blog before Thursday",
    ],
    attachments: [{ name: "calendar-invite.ics", size: "3 KB" }],
    relatedIds: ["5"],
  },
  {
    id: "2",
    sender: "Amazon",
    senderEmail: "auto-confirm@amazon.com",
    subject: "Your invoice for order #114-2938 is ready",
    preview:
      "Your invoice for order #114-2938 ($64.99) is now available. Payment is due within 14 days.",
    body: [
      "Hello Alex,",
      "Your invoice for order #114-2938 is attached to this email.",
      "Order total: $64.99",
      "Payment due: within 14 days of the order date",
      "Items: USB-C hub, wireless mouse",
      "Thanks for shopping with us.",
    ],
    category: "Finance",
    time: "8:15 AM",
    date: "Today",
    unread: true,
    summary:
      "Amazon invoice for order #114-2938 totaling $64.99, due within 14 days. Covers a USB-C hub and wireless mouse.",
    importantDates: ["Due in 3 days"],
    actionItems: ["Pay invoice #114-2938 ($64.99)"],
    attachments: [{ name: "invoice-114-2938.pdf", size: "112 KB" }],
    relatedIds: [],
  },
  {
    id: "3",
    sender: "Prof. A. Meadows",
    senderEmail: "a.meadows@university.edu",
    subject: "Assignment 4 posted \u2014 due next Friday",
    preview:
      "Assignment 4 (distributed systems consensus) is posted. It's due next Friday at 11:59 PM. Office hours moved to Wednesday.",
    body: [
      "Hi all,",
      "Assignment 4, covering distributed consensus (Raft and Paxos), is now posted on the course site.",
      "It's due next Friday at 11:59 PM. Late submissions lose 10% per day.",
      "Note that office hours this week are moved to Wednesday, 3\u20135 PM, due to a scheduling conflict.",
      "\u2014 Prof. Meadows",
    ],
    category: "College",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    summary:
      "Assignment 4 on distributed consensus (Raft/Paxos) is due next Friday at 11:59 PM. Office hours moved to Wednesday 3\u20135 PM.",
    importantDates: ["Due Fri, 11:59 PM", "Office hours: Wed, 3\u20135 PM"],
    actionItems: ["Submit Assignment 4 before Friday, 11:59 PM"],
    attachments: [{ name: "assignment-4.pdf", size: "220 KB" }],
    relatedIds: [],
  },
  {
    id: "4",
    sender: "Delta Air Lines",
    senderEmail: "no-reply@delta.com",
    subject: "Check-in is open for flight DL 1420",
    preview:
      "Check-in is now open for your flight DL 1420, departing Saturday at 7:45 AM from SFO.",
    body: [
      "Hi Alex,",
      "Online check-in is now open for flight DL 1420, departing Saturday, July 18 at 7:45 AM from San Francisco (SFO) to Atlanta (ATL).",
      "Seat 14C is confirmed. Boarding closes 20 minutes before departure.",
      "Safe travels,",
      "Delta Air Lines",
    ],
    category: "Travel",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
    summary:
      "Check-in is open for flight DL 1420, Saturday 7:45 AM, SFO \u2192 ATL, seat 14C confirmed.",
    importantDates: ["Sat, Jul 18 \u00b7 7:45 AM \u2014 Departure"],
    actionItems: ["Check in for flight DL 1420"],
    attachments: [],
    relatedIds: [],
  },
  {
    id: "5",
    sender: "Sam \u2014 TechNova Recruiting",
    senderEmail: "sam.recruiting@technova.io",
    subject: "Re: Interview logistics",
    preview:
      "Quick note ahead of Thursday \u2014 you'll get a Zoom link an hour before, and feel free to ask about the team's on-call rotation.",
    body: [
      "Hi Alex,",
      "Ahead of Thursday, just a quick note: you'll receive the Zoom link about an hour before the interview.",
      "Also, feel free to ask the team about their on-call rotation and how the platform group splits ownership \u2014 it usually leads to a good conversation.",
      "Looking forward to it,",
      "Sam",
    ],
    category: "Interviews",
    time: "3 days ago",
    date: "Jul 13",
    unread: false,
    summary:
      "TechNova's recruiter says the Zoom link arrives an hour before Thursday's interview, and suggests asking about the platform team's on-call rotation.",
    importantDates: [],
    actionItems: ["Reply to Sam confirming logistics"],
    attachments: [],
    relatedIds: ["1"],
  },
  {
    id: "6",
    sender: "The Batch \u2014 DeepLearning.AI",
    senderEmail: "thebatch@deeplearning.ai",
    subject: "This week: efficient inference, new benchmark results",
    preview:
      "This week's newsletter covers efficient inference techniques and new benchmark results from several labs.",
    body: [
      "This week in The Batch:",
      "\u2014 Efficient inference techniques gaining traction in production",
      "\u2014 New benchmark results comparing open and closed models",
      "\u2014 Research roundup from this week's top papers",
      "Read the full issue on our site.",
    ],
    category: "Promotions",
    time: "2 days ago",
    date: "Jul 14",
    unread: false,
    summary:
      "Weekly AI newsletter covering efficient inference techniques and new benchmark comparisons.",
    importantDates: [],
    actionItems: [],
    attachments: [],
    relatedIds: [],
  },
];

export function getEmailById(id: string) {
  return mockEmails.find((e) => e.id === id);
}
