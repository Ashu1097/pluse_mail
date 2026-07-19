"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Mail,
  Sparkles,
  Bell,
  ShieldCheck,
  Trash2,
  Plus,
  Monitor,
} from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [dailySummary, setDailySummary] = useState(true);
  const [replyNudges, setReplyNudges] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(false);
  const [multiProvider, setMultiProvider] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => {};
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AppShell>
      <div className="max-w-[760px] mx-auto px-5 md:px-8 py-8">
        <div className="mb-8">
          <p className="text-eyebrow text-primary mb-1">Settings</p>
          <h1 className="text-display-md text-ink">Account & preferences</h1>
        </div>

        <div className="flex flex-col gap-5">
          {/* Appearance */}
          <Card level={1} radius="lg" className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Monitor size={15} className="text-ink-subtle" />
              <h2 className="text-card-title text-ink">Appearance</h2>
            </div>
            <p className="text-body-sm text-ink-subtle mb-4">
              Choose how PlusEmail looks on this device.
            </p>
            <div className="flex gap-2">
              {(["light", "dark", "system"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setTheme(option)}
                  className={cn(
                    "flex-1 rounded-md border px-3 py-2 text-body-sm capitalize transition-colors",
                    mounted && theme === option
                      ? "border-primary text-primary bg-primary/10"
                      : "border-hairline text-ink-subtle hover:text-ink hover:border-hairline-strong"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </Card>

          {/* Connected accounts */}
          <Card level={1} radius="lg" className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Mail size={15} className="text-ink-subtle" />
              <h2 className="text-card-title text-ink">Connected accounts</h2>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md bg-surface-2 border border-hairline px-4 py-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-full bg-surface-3 border border-hairline-strong flex items-center justify-center text-caption text-ink-subtle shrink-0">
                  A
                </div>
                <div className="min-w-0">
                  <p className="text-body-sm text-ink truncate">
                    alex.rivera@gmail.com
                  </p>
                  <p className="text-caption text-ink-tertiary">
                    Primary · Syncing
                  </p>
                </div>
              </div>
              <Badge dotColor="var(--color-semantic-success)">Connected</Badge>
            </div>
            <Button variant="utility" size="sm">
              <Plus size={13} />
              Connect another Gmail account
            </Button>
          </Card>

          {/* AI preferences */}
          <Card level={1} radius="lg" className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={15} className="text-ink-subtle" />
              <h2 className="text-card-title text-ink">AI preferences</h2>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 border-b border-hairline">
              <div>
                <p className="text-body-sm text-ink">Model provider</p>
                <p className="text-caption text-ink-tertiary mt-0.5">
                  Gemini is used for summaries, extraction, and chat.
                </p>
              </div>
              <select className="text-body-sm bg-surface-2 border border-hairline rounded-md px-3 py-1.5 text-ink outline-none">
                <option>Gemini</option>
                <option disabled>OpenAI (coming soon)</option>
                <option disabled>Claude (coming soon)</option>
              </select>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-body-sm text-ink">
                  Allow multi-provider routing
                </p>
                <p className="text-caption text-ink-tertiary mt-0.5">
                  Automatically pick the best model per task once more
                  providers are available.
                </p>
              </div>
              <Switch checked={multiProvider} onChange={setMultiProvider} />
            </div>
          </Card>

          {/* Notifications */}
          <Card level={1} radius="lg" className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <Bell size={15} className="text-ink-subtle" />
              <h2 className="text-card-title text-ink">Notifications</h2>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 border-b border-hairline">
              <div>
                <p className="text-body-sm text-ink">Daily AI summary</p>
                <p className="text-caption text-ink-tertiary mt-0.5">
                  Delivered every morning at 7:00 AM.
                </p>
              </div>
              <Switch checked={dailySummary} onChange={setDailySummary} />
            </div>
            <div className="flex items-center justify-between gap-4 py-3 border-b border-hairline">
              <div>
                <p className="text-body-sm text-ink">Pending reply nudges</p>
                <p className="text-caption text-ink-tertiary mt-0.5">
                  A reminder when an email has waited more than 24 hours.
                </p>
              </div>
              <Switch checked={replyNudges} onChange={setReplyNudges} />
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-body-sm text-ink">Meeting reminders</p>
                <p className="text-caption text-ink-tertiary mt-0.5">
                  A heads-up 30 minutes before meetings found in your inbox.
                </p>
              </div>
              <Switch
                checked={meetingReminders}
                onChange={setMeetingReminders}
              />
            </div>
          </Card>

          {/* Privacy & data */}
          <Card level={1} radius="lg" className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck size={15} className="text-brand-secure" />
              <h2 className="text-card-title text-ink">Privacy & data</h2>
            </div>
            <p className="text-body-sm text-ink-subtle mb-4">
              PlusEmail authenticates over OAuth only and never sees or
              stores your Gmail password. Structured data extracted from
              your mail is encrypted at rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="utility" size="sm">
                Export my data
              </Button>
              <Button variant="utility" size="sm">
                Re-sync from scratch
              </Button>
            </div>
          </Card>

          {/* Danger zone */}
          <Card
            level={1}
            radius="lg"
            className="p-6 border-[color:var(--color-tag-security)]/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trash2 size={15} className="text-[color:var(--color-tag-security)]" />
              <h2 className="text-card-title text-ink">Danger zone</h2>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <p className="text-body-sm text-ink-subtle max-w-[420px]">
                Disconnecting removes PlusEmail&apos;s access to your Gmail
                account and permanently deletes all synced data.
              </p>
              <Button
                variant="utility"
                size="sm"
                className="border-[color:var(--color-tag-security)]/40 text-[color:var(--color-tag-security)] hover:border-[color:var(--color-tag-security)]"
              >
                Disconnect account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
