"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-canvas overflow-hidden">
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
          <button
            className="absolute top-4 left-[248px] text-ink-subtle"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
