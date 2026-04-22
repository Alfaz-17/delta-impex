"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const GALLERY_ITEMS = [
  {
    src: "/images/mood/hero-marine-detail.png",
    category: "MARINE",
    id: "MAR-EX-991",
    title: "Precision Engine Components",
    desc: "Genuine spare parts for crosshead and trunk piston engines.",
  },
  {
    src: "/images/mood/ro-water-flow.png",
    category: "RO SYSTEMS",
    id: "RO-TECH-042",
    title: "Advanced Membrane Filtration",
    desc: "Industrial grade desalination and water recovery modules.",
  },
  {
    src: "/images/mood/hero-industrial-scale.png",
    category: "INDUSTRIAL",
    id: "IND-PR-108",
    title: "Power Plant Infrastructure",
    desc: "Heavy industrial solutions for global energy reliability.",
  },
  {
    src: "/images/mood/hero-industrial-detail.png",
    category: "INDUSTRIAL",
    id: "IND-PREC-075",
    title: "Technical Control Systems",
    desc: "High-accuracy monitoring and industrial automation parts.",
  },
  {
    src: "/images/mood/hero-marine-sunset.png",
    category: "MARINE",
    id: "MAR-APP-234",
    title: "Intermodal Logistics Support",
    desc: "Global delivery and integration for specialized marine parts.",
  },
  {
    src: "/Gallery/Whisk_ac43c800066de9990a94519f045935d5dr (1).jpeg",
    category: "RO SYSTEMS",
    id: "RO-MOD-882",
    title: "Water Treatment Assembly",
    desc: "Custom engineered RO racks for industrial processing.",
  },
];

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate horizontal scroll based on vertical progress
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section 
      ref={containerRef}
      className="relative h-[400vh] bg-[#020617]"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Section Header */}
        <div className="section-container relative z-20 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="label-tech mb-4 block">Technical Archive</span>
            <h2 className="heading-section text-white max-w-xl">
              Showcasing Our <span className="text-accent italic font-light">Global Assets.</span>
            </h2>
          </div>
          <p className="body-premium max-w-sm text-white/50 border-l border-white/10 pl-6">
            A visual documentation of precision spares, RO systems, and industrial infrastructure 
            delivered to our global partners.
          </p>
        </div>

        {/* Horizontal Track */}
        <motion.div 
          style={{ x: springX }}
          className="flex gap-8 px-[var(--section-px)] will-change-transform"
        >
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryTile key={index} item={item} index={index} />
          ))}
        </motion.div>

        {/* Progress Indicator */}
        <div className="section-container relative z-20 mt-16 flex items-center gap-6">
          <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] w-12 text-right">01</div>
          <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
             <motion.div 
               style={{ scaleX: scrollYProgress }} 
               className="absolute inset-0 bg-accent origin-left"
             />
          </div>
          <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] w-12">06</div>
        </div>
      </div>
    </section>
  );
}

function GalleryTile({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] aspect-[16/10] group rounded-[2.5rem] overflow-hidden border border-white/5 glass-premium"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Image */}
      <Image
        src={item.src}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70"
        sizes="(max-width: 768px) 80vw, 40vw"
      />

      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-[#020617]/20 group-hover:bg-[#020617]/0 transition-colors duration-500" />

      {/* ── TECHNICAL SCAN LINE ── */}
      <motion.div 
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: index * 2 }}
        className="absolute left-0 right-0 h-[1px] bg-accent/40 z-10 pointer-events-none"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-md">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.category}</span>
          </div>
          <span className="label-tech !text-[11px] !text-white/40 !mb-0 font-mono tracking-tighter">
            REF: {item.id}
          </span>
        </div>

        <div className="max-w-xs space-y-3">
          <h3 className="heading-sub !text-white text-2xl lg:text-3xl leading-tight transition-transform group-hover:-translate-y-1">
            {item.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {item.desc}
          </p>
        </div>
      </div>

      {/* Technical Dot Grids */}
      <div className="absolute top-1/2 left-4 w-12 h-12 grid-technical-dots opacity-20" />
      <div className="absolute top-1/2 right-4 w-12 h-12 grid-technical-dots opacity-20" />
    </motion.div>
  );
}
