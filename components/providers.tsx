"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { LazyMotion, domMax } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LazyMotion features={domMax}>
        {children}
      </LazyMotion>
    </SessionProvider>
  );
}
