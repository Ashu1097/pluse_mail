import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-paper">
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
