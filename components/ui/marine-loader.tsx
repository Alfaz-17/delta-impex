"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Anchor } from "lucide-react";

export function MarineLoader({ className, size = "md" }: { className?: string, size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
      <div className={cn("relative", sizes[size])}>
        {/* Rotating Helm / Ship's Wheel Outline */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center text-accent/10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          </svg>
        </motion.div>
        
        {/* Pulsing Anchor in center */}
        <motion.div
          animate={{ 
            y: [-2, 2, -2],
            rotate: [-5, 5, -5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 flex items-center justify-center text-accent"
        >
          <Anchor size={size === "lg" ? 48 : size === "md" ? 32 : 20} strokeWidth={1.5} />
        </motion.div>

        {/* Waves effect at bottom */}
        <div className="absolute -bottom-4 inset-x-0 flex justify-center gap-1">
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="w-1.5 h-0.5 bg-accent/30 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            className="w-1.5 h-0.5 bg-accent/30 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            className="w-1.5 h-0.5 bg-accent/30 rounded-full"
          />
        </div>

        {/* Radar scan effect */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/0 via-accent/5 to-accent/0"
        />
      </div>
      
      <div className="flex flex-col items-center">
        <span className="font-tech text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Scanning Horizons</span>
        <motion.div 
          className="h-px w-12 bg-accent/20 mt-2 overflow-hidden relative"
        >
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-accent/60"
          />
        </motion.div>
      </div>
    </div>
  );
}
