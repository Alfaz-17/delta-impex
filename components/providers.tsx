"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { LazyMotion, domMax } from "framer-motion";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LazyMotion features={domMax}>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: "inherit",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            },
          }}
        />
      </LazyMotion>
    </SessionProvider>
  );
}
