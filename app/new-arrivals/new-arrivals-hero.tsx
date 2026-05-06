"use client";

import { motion } from "framer-motion";

export function NewArrivalsHero() {
  return (
    <section className="bg-primary pt-40 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} 
      />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <p className="label-tech text-accent mb-6 uppercase tracking-[0.4em]">Inventory Update</p>
          <h1 className="heading-display text-white !leading-[0.9] uppercase tracking-tighter">
            New <span className="text-accent italic font-medium">Arrivals</span> & <br />
            Technical Stock.
          </h1>
          <p className="body-premium text-white/70 max-w-2xl mt-8 border-l-2 border-accent pl-6">
            Explore the latest technical additions to our marine and industrial inventory. High-quality spares, freshly sourced and verified for technical compliance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
