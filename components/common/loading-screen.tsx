"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Anchor } from "lucide-react";
import { MarineLoader } from "@/components/ui/marine-loader";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const loadingStatuses = [
    "Establishing Secure Connection...",
    "Initializing Marine Database...",
    "Syncing Technical Schematics...",
    "Calibrating RO Systems...",
    "Delta Impex Ready."
  ];

  useEffect(() => {
    // Smoother progress increment
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        // Consistent but slightly varying increment for a 'real' feel
        const diff = Math.random() * 2 + 1; 
        return Math.min(oldProgress + diff, 100);
      });
    }, 60); // Faster updates for smoother motion

    const statusTimer = setInterval(() => {
      setStatusIndex((prev) => (prev < loadingStatuses.length - 1 ? prev + 1 : prev));
    }, 1200); // Slower status rotation for premium feel

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Technical Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-24 h-24"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-none stroke-current stroke-[3]">
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
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-primary/20 rounded-full blur-2xl -z-10"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-12 flex flex-col items-center"
            >
              <span className="font-tech text-[10px] uppercase tracking-[0.5em] text-primary font-bold">Delta Impex</span>
              <div className="h-px w-12 bg-primary/20 mt-3 relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-primary"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
