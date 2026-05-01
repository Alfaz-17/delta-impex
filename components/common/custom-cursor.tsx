"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSelectable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList.contains("cursor-pointer");
      
      setIsHovering(!!isSelectable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null; // Don't show on touch devices
  }

  return (
    <>
      {/* Main Marine Helm (Outer) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          left: -24,
          top: -24,
          scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          animate={{ rotate: isHovering ? 90 : 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative w-full h-full"
        >
          {/* Ship's Wheel SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full text-cursor fill-none stroke-current stroke-[3]">
            {/* Outer Rim */}
            <circle cx="50" cy="50" r="35" />
            {/* Spokes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <line
                key={angle}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos((angle * Math.PI) / 180)}
                y2={50 + 45 * Math.sin((angle * Math.PI) / 180)}
              />
            ))}
            {/* Inner Ring */}
            <circle cx="50" cy="50" r="10" />
          </svg>

          {/* Compass Markers (Visible on Hover) */}
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-[8px] font-tech font-bold uppercase tracking-widest text-cursor">N</div>
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-[8px] font-tech font-bold uppercase tracking-widest text-cursor">S</div>
                <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 text-[8px] font-tech font-bold uppercase tracking-widest text-cursor">W</div>
                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-[8px] font-tech font-bold uppercase tracking-widest text-cursor">E</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precision Hub (Inner) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-cursor rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -3,
          top: -3,
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
