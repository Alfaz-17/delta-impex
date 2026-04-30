"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-dark-base flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Technical Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-48 h-20 mb-12"
            >
              <Image
                src="/logo.png"
                alt="Delta Impex Logo"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Progress Bar Container */}
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between font-tech text-[8px] uppercase tracking-[0.3em] text-white/40">
                <div className="relative h-4 overflow-hidden flex-1">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={statusIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0"
                    >
                      {loadingStatuses[statusIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span>{Math.round(progress)}%</span>
              </div>
              
              <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-accent-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                />
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-white/30 blur-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 1.2 }}
                />
              </div>
            </div>

            {/* Technical Detail */}
            <div className="mt-12 flex items-center gap-6">
                <div className="flex flex-col items-center">
                    <span className="text-[7px] font-tech text-accent uppercase tracking-widest mb-1">Division</span>
                    <span className="text-[9px] font-sans font-bold text-white uppercase tracking-tighter">Marine / RO</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex flex-col items-center">
                    <span className="text-[7px] font-tech text-accent uppercase tracking-widest mb-1">Protocol</span>
                    <span className="text-[9px] font-sans font-bold text-white uppercase tracking-tighter">Secure-NX</span>
                </div>
            </div>
          </div>

          {/* Decorative Corner Brackets */}
          <div className="absolute top-12 left-12 w-6 h-6 border-t border-l border-white/10" />
          <div className="absolute top-12 right-12 w-6 h-6 border-t border-r border-white/10" />
          <div className="absolute bottom-12 left-12 w-6 h-6 border-b border-l border-white/10" />
          <div className="absolute bottom-12 right-12 w-6 h-6 border-b border-r border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
