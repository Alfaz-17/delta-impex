"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      // mobile settings
      smoothTouch: false, // native touch is usually better on mobile
      touchMultiplier: 2,
    });

    // RAF loop to handle scroll updates efficiently
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync scroll position on orientation change or resize
    const handleResize = () => {
      lenisRef.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{children}</>;
}
