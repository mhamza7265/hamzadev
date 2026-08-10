"use client";

import {
  SessionProvider as NextAuthSessionProvider,
  type SessionProviderProps,
} from "next-auth/react";

export default function SessionProvider({
  children,
  ...props
}: SessionProviderProps) {
  return (
    <NextAuthSessionProvider {...props}>{children}</NextAuthSessionProvider>
  );
}
