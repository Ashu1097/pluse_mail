"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, Shield, Bell, Cpu, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { ALL_CATEGORIES } from "@/constants/categories";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet",
        checked ? "border-violet bg-violet" : "border-line bg-paper-2"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [daily, setDaily] = useState(true);
  const [urgent, setUrgent] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(ALL_CATEGORIES.map((c) => [c, true]))
  );

  return (
    <>
      <TopBar title="Settings" subtitle="Manage your account, sync, and AI preferences." />

      <div className="flex-1 space-y-6 overflow-y-auto px-8 py-6">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Mail size={15} className="text-ink-3" />
            <p className="text-[13px] font-semibold text-ink">
              Connected account
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-soft text-green">
                <CheckCircle2 size={16} />
              </span>
              <div>
                <p className="text-[13px] font-medium text-ink">
                  {user?.email ?? "Not connected"}
                </p>
                <p className="text-[12px] text-ink-3">Connected via Google OAuth</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={logout}>
              Disconnect
            </Button>
          </div>
          <button className="mt-3 text-[12.5px] font-medium text-violet-dim hover:underline">
            + Connect another Gmail account
          </button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Cpu size={15} className="text-ink-3" />
            <p className="text-[13px] font-semibold text-ink">AI &amp; sync</p>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-ink">LLM provider</p>
                <p className="text-[12px] text-ink-3">Used for summaries, chat, and extraction</p>
              </div>
              <select className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] text-ink focus:border-violet focus:outline-none">
                <option>Gemini</option>
                <option>Claude</option>
                <option>GPT-4o</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-ink">Sync frequency</p>
                <p className="text-[12px] text-ink-3">How often new mail is fetched</p>
              </div>
              <select className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] text-ink focus:border-violet focus:outline-none">
                <option>Real-time</option>
                <option>Every 15 minutes</option>
                <option>Hourly</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Bell size={15} className="text-ink-3" />
            <p className="text-[13px] font-semibold text-ink">Notifications</p>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { label: "Daily AI summary", state: daily, set: setDaily },
              { label: "Urgent email alerts", state: urgent, set: setUrgent },
              { label: "Weekly analytics digest", state: weekly, set: setWeekly },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <p className="text-[13px] text-ink-2">{row.label}</p>
                <Toggle checked={row.state} onChange={() => row.set((v) => !v)} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-ink-3" />
            <p className="text-[13px] font-semibold text-ink">Categories</p>
          </div>
          <p className="mt-1 text-[12px] text-ink-3">
            Turn off categories you don&apos;t want MailMind to track.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {ALL_CATEGORIES.map((c) => (
              <div key={c} className="flex items-center gap-3">
                <Toggle
                  checked={enabled[c]}
                  onChange={() =>
                    setEnabled((e) => ({ ...e, [c]: !e[c] }))
                  }
                />
                <p className="text-[13px] text-ink-2">{c}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
