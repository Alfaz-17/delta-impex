"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-start bg-[#020617] overflow-hidden">
      {/* ── CINEMATIC MP4 LAYER ── */}
      <div className="absolute inset-0 z-0">
        <video
          src="/hero.mp4"
          poster="/hero-poster.png"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-1000"
        />
        {/* Compressed Gradient - Heavier edge, faster falloff to show ship */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/60 to-transparent z-0" />
        <div className="absolute inset-0 grid-technical-dots opacity-10" />
      </div>

      <div className="section-container relative z-10 w-full flex flex-col items-start translate-y-[-5%] md:translate-y-0">
        
        {/* ── FIXED-FIT COMPACT CONTENT ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl md:max-w-2xl flex flex-col items-start space-y-4 md:space-y-5"
        >
       
         

          {/* Proper Compact Heading */}
          <motion.h1 
            variants={itemVariants}
            className="heading-display text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[2.4rem] leading-[1.1] tracking-tight uppercase"
          >
            Marine & Industrial Spares. <br />
            <span className="text-accent underline decoration-white/20 underline-offset-4 md:underline-offset-6">Engineered Excellence.</span>
          </motion.h1>

          {/* Compact Subtext - Constrained Width */}
          <motion.p 
            variants={itemVariants}
            className="body-premium max-w-lg text-xs md:text-sm text-white/90 leading-relaxed drop-shadow-md"
          >
            Empowering global maritime and industrial sectors with genuine OEM spare parts, 
            technical reverse osmosis solutions, and precision-engineered logistics.
          </motion.p>

          {/* Compact CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/catalog"
              className="group relative px-7 py-3 bg-white text-primary rounded-full font-bold flex items-center gap-2 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl group-hover:text-white w-full sm:w-auto justify-center sm:justify-start"
            >
              <span className="relative z-10 transition-colors duration-300 text-sm">Explore Catalog</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1 transition-colors duration-300" />
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
            </Link>
            
            <Link
              href="/contact"
              className="px-7 py-3 border border-white/20 text-white rounded-full font-bold backdrop-blur-3xl hover:bg-white hover:text-primary transition-all active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start text-sm"
            >
              Request Quote
            </Link>
          </motion.div>

          {/* Minimal Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="hidden sm:flex flex-wrap items-center justify-start gap-x-6 gap-y-2 pt-4 border-t border-white/10 w-full max-w-md"
          >
            {[
              { icon: ShieldCheck, text: "OEM Verified" },
              { icon: Zap, text: "JIT Logistics" },
              { icon: Globe, text: "Multi-Sector" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-white/40 group hover:text-white/80 transition-colors">
                <feature.icon className="w-3.5 h-3.5 text-accent" />
                <span className="text-[8px] font-bold uppercase tracking-widest">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR - Anchored and subtle ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-6 flex flex-col items-start gap-2"
      >
        <span className="text-[8px] text-white/30 uppercase tracking-[0.4em] font-bold shadow-md">Discover</span>
        <motion.div 
          animate={{ height: [0, 24, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] bg-accent h-6 ml-1"
        />
      </motion.div>
    </section>
  );
}