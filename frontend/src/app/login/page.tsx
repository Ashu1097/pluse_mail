import Link from "next/link";
import { ShieldCheck, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/marketing/logo";

const points = [
  { icon: Lock, text: "OAuth only \u2014 we never see or store your password" },
  { icon: Zap, text: "First sync and daily summary start within minutes" },
  { icon: ShieldCheck, text: "Disconnect and delete your data any time" },
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <div className="px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={20} />
          <span className="text-body-sm text-ink">PlusEmail</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Card level={1} radius="lg" className="w-full max-w-[400px] p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size={32} />
            <h1 className="text-headline text-ink mt-5">
              Sign in to PlusEmail
            </h1>
            <p className="text-body-sm text-ink-subtle mt-2">
              Connect your Gmail account to get your first AI summary.
            </p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 rounded-md bg-inverse-canvas text-inverse-ink text-button px-4 py-2.5 hover:bg-inverse-surface-1 transition-colors">
            <GoogleG />
            Continue with Google
          </button>

          <div className="flex flex-col gap-3 mt-7">
            {points.map((p) => (
              <div key={p.text} className="flex items-start gap-2.5">
                <p.icon
                  size={14}
                  className="text-brand-secure shrink-0 mt-0.5"
                />
                <span className="text-caption text-ink-tertiary">
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="px-6 pb-8 text-center">
        <p className="text-caption text-ink-tertiary">
          By continuing you agree to PlusEmail&apos;s Terms and Privacy
          Policy.
        </p>
      </div>
    </main>
  );
}

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.89c2.27-2.09 3.58-5.17 3.58-8.8Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.89-3.02c-1.08.72-2.46 1.15-4.04 1.15-3.1 0-5.73-2.1-6.67-4.92H1.3v3.1C3.26 21.3 7.3 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.33 14.31A7.2 7.2 0 0 1 4.95 12c0-.8.14-1.58.38-2.31v-3.1H1.3A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.3 5.41l4.03-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.3 0 3.26 2.7 1.3 6.59l4.03 3.1c.94-2.82 3.57-4.92 6.67-4.92Z"
      />
    </svg>
  );
}
