"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CATEGORY_COLORS } from "@/constants/categories";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const HEX = {
  violet: "#6753E0",
  amber: "#C2811F",
  green: "#2C8F63",
  line: "#E3E0D8",
  ink3: "#8B8C93",
};

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalytics();

  if (isLoading || !data) {
    return (
      <>
        <TopBar title="Analytics" subtitle="Loading your inbox trends…" />
        <div className="flex-1 px-8 py-6 text-[13px] text-ink-3">
          Crunching the numbers…
        </div>
      </>
    );
  }

  const { emailsPerDay, weeklyTrend, categoryDistribution, topContacts } = data;

  const avgResponse = (
    topContacts.reduce((s, c) => s + c.avgResponseHrs, 0) / topContacts.length
  ).toFixed(1);

  return (
    <>
      <TopBar
        title="Analytics"
        subtitle="How your inbox behaves, distilled into numbers."
      />

      <div className="flex-1 space-y-6 overflow-y-auto px-8 py-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Avg. response time", value: `${avgResponse}h` },
            { label: "Emails this week", value: "112" },
            { label: "Most active category", value: "Work" },
            { label: "Unread", value: "6" },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <p className="font-display text-2xl font-semibold text-ink">
                {s.value}
              </p>
              <p className="mt-1 text-[12px] text-ink-3">{s.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-5">
            <p className="mb-4 text-[13px] font-semibold text-ink">
              Emails per day
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={emailsPerDay}>
                <CartesianGrid strokeDasharray="3 3" stroke={HEX.line} vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: HEX.ink3 }}
                  axisLine={{ stroke: HEX.line }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: HEX.ink3 }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: `1px solid ${HEX.line}`,
                  }}
                />
                <Bar dataKey="count" fill={HEX.violet} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <p className="mb-4 text-[13px] font-semibold text-ink">
              Weekly trend
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={HEX.line} vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: HEX.ink3 }}
                  axisLine={{ stroke: HEX.line }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: HEX.ink3 }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: `1px solid ${HEX.line}`,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={HEX.amber}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: HEX.amber }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-5">
          <p className="mb-4 text-[13px] font-semibold text-ink">
            Category distribution
          </p>
          <div className="space-y-2.5">
            {categoryDistribution
              .sort((a, b) => b.count - a.count)
              .map((c) => {
                const max = Math.max(...categoryDistribution.map((d) => d.count));
                const pct = (c.count / max) * 100;
                return (
                  <div key={c.category} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-[12.5px] text-ink-2">
                      {c.category}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper-2">
                      <div
                        className={`h-full rounded-full ${CATEGORY_COLORS[c.category].bg}`}
                        style={{
                          width: `${pct}%`,
                          backgroundColor: HEX.violet,
                          opacity: 0.35 + (pct / 100) * 0.65,
                        }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right font-mono text-[12px] text-ink-3">
                      {c.count}
                    </span>
                  </div>
                );
              })}
          </div>
        </Card>

        <Card className="overflow-hidden">
          <p className="border-b border-line px-5 py-4 text-[13px] font-semibold text-ink">
            Most active contacts
          </p>
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-line text-[11.5px] uppercase tracking-wide text-ink-3">
                <th className="px-5 py-2.5 font-medium">Contact</th>
                <th className="px-5 py-2.5 font-medium">Emails</th>
                <th className="px-5 py-2.5 font-medium">Avg. response</th>
              </tr>
            </thead>
            <tbody>
              {topContacts.map((c) => (
                <tr key={c.email} className="border-b border-line last:border-0">
                  <td className="px-5 py-3">
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-[11.5px] text-ink-3">{c.email}</p>
                  </td>
                  <td className="px-5 py-3 font-mono text-ink-2">{c.count}</td>
                  <td className="px-5 py-3 font-mono text-ink-2">
                    {c.avgResponseHrs}h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
