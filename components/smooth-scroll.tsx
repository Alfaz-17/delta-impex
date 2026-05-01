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
      duration: 1.8, // Increased duration for a more luxurious, weighted feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // Standard multiplier for consistent feel
      lerp: 0.04, // Lower lerp for extremely smooth interpolation
      smoothTouch: false,
      touchMultiplier: 1.5,
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
