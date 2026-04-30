"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BusinessLoader({ className, size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn("relative", sizes[size])}>
        {/* Outer Ring (Ship's Wheel / Compass style) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dashed border-accent/20 rounded-full"
        />
        
        {/* Inner Rotating Propeller/Gear */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary fill-current">
            <path d="M12,2L14.5,9H9.5L12,2M12,22L9.5,15H14.5L12,22M2,12L9,14.5V9.5L2,12M22,12L15,9.5V14.5L22,12Z" />
            <circle cx="12" cy="12" r="2" className="text-accent" />
          </svg>
        </motion.div>

        {/* Pulse effect */}
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent rounded-full blur-xl"
        />
      </div>
      
      <div className="flex flex-col items-center">
        <span className="font-tech text-[8px] uppercase tracking-[0.4em] text-accent animate-pulse">Initializing Sync</span>
        <div className="flex gap-1 mt-1">
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-accent rounded-full" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-accent rounded-full" />
            <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-accent rounded-full" />
        </div>
      </div>
    </div>
  );
}
