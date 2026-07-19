"use client";

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { AppShell } from "@/components/app/app-shell";
import { Card } from "@/components/ui/card";
import {
  emailsPerDay,
  weeklyTrend,
  categoryDistribution,
  activeContacts,
} from "@/lib/mock-analytics";

const totalThisMonth = categoryDistribution.reduce((s, c) => s + c.count, 0);
const maxCategory = Math.max(...categoryDistribution.map((c) => c.count));

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-surface-2 border border-hairline-strong px-3 py-2">
      <p className="text-caption text-ink-tertiary">{label}</p>
      <p className="text-body-sm text-ink">{payload[0].value} emails</p>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="max-w-[1080px] mx-auto px-5 md:px-8 py-8">
        <div className="mb-8">
          <p className="text-eyebrow text-primary mb-1">Analytics</p>
          <h1 className="text-display-md text-ink">Your inbox, in numbers.</h1>
        </div>

        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Emails this month", value: totalThisMonth.toString() },
            { label: "Avg. response time", value: "4.2 hrs" },
            { label: "Categories tracked", value: categoryDistribution.length.toString() },
            { label: "Busiest day", value: "Tuesdays" },
          ].map((s) => (
            <Card key={s.label} level={1} radius="lg" className="p-5">
              <p className="text-display-md text-ink leading-none">
                {s.value}
              </p>
              <p className="text-caption text-ink-tertiary mt-2">{s.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Emails per day */}
          <Card level={1} radius="lg" className="p-6">
            <h2 className="text-card-title text-ink mb-1">Emails per day</h2>
            <p className="text-caption text-ink-tertiary mb-5">Last 14 days</p>
            <div className="h-[220px] -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={emailsPerDay}>
                  <defs>
                    <linearGradient id="emailsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0075de" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0075de" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e6e6e6"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#a39e98", fontSize: 11 }}
                    axisLine={{ stroke: "#e6e6e6" }}
                    tickLine={false}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fill: "#a39e98", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#0075de"
                    strokeWidth={2}
                    fill="url(#emailsFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Weekly trend */}
          <Card level={1} radius="lg" className="p-6">
            <h2 className="text-card-title text-ink mb-1">Weekly trend</h2>
            <p className="text-caption text-ink-tertiary mb-5">
              Last 6 weeks
            </p>
            <div className="h-[220px] -ml-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e6e6e6"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#a39e98", fontSize: 11 }}
                    axisLine={{ stroke: "#e6e6e6" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#a39e98", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="emails"
                    stroke="#0075de"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#0075de" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Category distribution */}
          <Card level={1} radius="lg" className="p-6">
            <h2 className="text-card-title text-ink mb-5">
              Category distribution
            </h2>
            <div className="flex flex-col gap-3.5">
              {categoryDistribution
                .sort((a, b) => b.count - a.count)
                .map((c) => (
                  <div key={c.category} className="flex items-center gap-3">
                    <span className="text-body-sm text-ink-muted w-24 shrink-0">
                      {c.category}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-surface-2 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(c.count / maxCategory) * 100}%`,
                          backgroundColor: c.color,
                        }}
                      />
                    </div>
                    <span className="text-caption text-ink-tertiary w-6 text-right shrink-0">
                      {c.count}
                    </span>
                  </div>
                ))}
            </div>
          </Card>

          {/* Most active contacts */}
          <Card level={1} radius="lg" className="p-6">
            <h2 className="text-card-title text-ink mb-5">
              Most active contacts
            </h2>
            <ul className="flex flex-col gap-1">
              {activeContacts.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between gap-3 py-2.5 border-b border-hairline last:border-b-0"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-7 w-7 rounded-full bg-surface-2 border border-hairline-strong flex items-center justify-center text-caption text-ink-subtle shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <span className="text-body-sm text-ink truncate">
                      {c.name}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-body-sm text-ink-muted">
                      {c.emails} emails
                    </p>
                    {c.avgResponseHrs !== null && (
                      <p className="text-caption text-ink-tertiary">
                        ~{c.avgResponseHrs}h avg reply
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
