"use client";

import { signIn, signOut } from "next-auth/react";
import { ROUTES } from "@/constants/routes";

/** Kicks off the real Google OAuth consent flow (Gmail readonly scope). */
export function signInWithGoogle() {
  return signIn("google", { callbackUrl: ROUTES.dashboard });
}

export function signOutUser() {
  return signOut({ callbackUrl: ROUTES.login });
}
