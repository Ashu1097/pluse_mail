import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  /** Timestamp (ms) of the last successful Gmail fetch, for the sync badge. */
  lastSyncedAt: number | null;
  setLastSyncedAt: (ts: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  lastSyncedAt: null,
  setLastSyncedAt: (lastSyncedAt) => set({ lastSyncedAt }),
}));
