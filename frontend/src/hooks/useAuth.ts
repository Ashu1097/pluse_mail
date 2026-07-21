"use client";

import { useSession } from "next-auth/react";
import { signInWithGoogle, signOutUser } from "@/services/auth";
import type { User } from "@/types";

function toUser(session: ReturnType<typeof useSession>["data"]): User | null {
  if (!session?.user?.email) return null;
  const name = session.user.name ?? session.user.email;
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    id: session.user.email,
    name,
    email: session.user.email,
    avatarInitials: initials,
    avatarUrl: session.user.image ?? undefined,
    provider: "google",
  };
}

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: toUser(session),
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    sessionError: session?.error,
    login: signInWithGoogle,
    logout: signOutUser,
  };
}
