"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.5, // Slightly longer duration for "weight"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1, // Faster responsiveness
      lerp: 0.08, // Smoother interpolation
      smoothTouch: false,
      touchMultiplier: 1,
    });

    // RAF loop to handle scroll updates efficiently
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Sync scroll position on orientation change or resize
    const handleResize = () => {
      lenisRef.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{children}</>;
}
