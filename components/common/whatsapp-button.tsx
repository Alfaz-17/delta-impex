"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE_INFO } from "@/lib/site";

export function WhatsAppButton() {
  const [showLabel, setShowLabel] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowLabel(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const message = "Hello Delta Impex, I'm interested in your marine and industrial solutions.";
  const whatsappUrl = `${SITE_INFO.whatsappHref}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 group">
      {/* Technical Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white border border-accent/20 px-4 py-2 shadow-2xl shadow-accent/10 relative"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
            <span className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary whitespace-nowrap">Technical Sales Support</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-[#25D366] text-white rounded-none shadow-2xl shadow-[#25D366]/40 group"
      >
        {/* Animated Background Ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#25D366] rounded-none z-0"
        />
        
        {/* Corner Brackets (Delta Theme) */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50" />

        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 relative z-10" />
      </motion.a>
    </div>
  );
}
