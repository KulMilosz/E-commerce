"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ProvidersProps } from "@/app/types";

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}
