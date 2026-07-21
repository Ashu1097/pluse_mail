"use client";

import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useUIStore } from "@/store/ui-store";

export function useSyncStatus() {
  const isSyncing = useIsFetching({ queryKey: ["emails"] }) > 0;
  const lastSyncedAt = useUIStore((s) => s.lastSyncedAt);
  const queryClient = useQueryClient();

  function refresh() {
    queryClient.invalidateQueries({ queryKey: ["emails"] });
  }

  return { isSyncing, lastSyncedAt, refresh };
}
