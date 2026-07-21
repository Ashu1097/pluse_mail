"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUIStore } from "@/store/ui-store";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    // Any successful "emails" query (inbox list, single message, etc.)
    // counts as a real sync - drives the "Synced Xm ago" badge in the TopBar.
    const unsubscribe = client.getQueryCache().subscribe((event) => {
      if (
        event.type === "updated" &&
        event.query.queryKey[0] === "emails" &&
        event.query.state.status === "success" &&
        event.query.state.dataUpdatedAt
      ) {
        useUIStore.getState().setLastSyncedAt(event.query.state.dataUpdatedAt);
      }
    });
    return unsubscribe;
  }, [client]);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
