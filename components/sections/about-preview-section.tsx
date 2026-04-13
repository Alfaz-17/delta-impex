"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { 
  Building2, 
  Users2, 
  Settings, 
  Trophy, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Globe,
  Anchor
} from "lucide-react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  AnimatePresence 
} from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

const capabilities = [
  {
    icon: ShieldCheck,
    title: "Unmatched Reliability",
    description: "Every spare part and system undergoes rigorous inspection to ensure maximum uptime in demanding marine and industrial environments."
  },
  {
    icon: Globe,
    title: "Global Supply Chain",
    description: "Our extensive international network enables us to source and deliver critical components anywhere in the world, on time."
  },
  {
    icon: Zap,
    title: "Technical Excellence",
    description: "Deep domain expertise in main engines, auxiliary machinery, and advanced RO systems ensures precise technical matching."
  },
  {
    icon: Clock,
    title: "Operational Speed",
    description: "We understand that every hour counts. Specialized logistics designed for 24/7 industrial and maritime operations."
  }
];

export function AboutPreviewSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      id="about-preview"
      ref={containerRef}
      className="relative bg-background overflow-hidden"
    >
      {/* Top — Main Story */}
      <div className="section-container relative z-10 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left — Image Side */}
          <FadeInOnScroll direction="right">
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden group">
              <motion.div style={{ y }} className="absolute inset-0">
                <Image
                  src="/images/about-hero.png"
                  alt="Delta Impex Industrial Legacy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              {/* Decorative border */}
              <div className="absolute inset-x-8 bottom-8 h-24 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-between px-8 text-white">
                <div>
                  <p className="text-[10px] font-tech uppercase tracking-[0.3em] opacity-60">Established</p>
                  <p className="text-xl font-display font-bold">LEGACY SOURCING</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-tech uppercase tracking-[0.3em] opacity-60">Operations</p>
                  <p className="text-xl font-display font-bold">GLOBAL REACH</p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Right — Content Side */}
          <div className="space-y-10 md:space-y-12">
            <FadeInOnScroll>
              <div>
                <p className="label-tech text-primary mb-5">
                  The Delta Advantage
                </p>
                <h2 className="heading-display text-foreground mb-8">
                  Excellence in <br /> 
                  <span className="text-primary italic">Precision Engineering.</span>
                </h2>
                <div className="space-y-6">
                  <p className="body-text !leading-relaxed text-muted-foreground">
                    At Delta Impex, we don&apos;t just supply parts; we provide operational continuity. 
                    Specializing in high-end marine machinery and industrial solutions, 
                    our legacy is built on a foundation of technical precision and global reliability.
                  </p>
                  <p className="body-text !leading-relaxed text-muted-foreground">
                    From vessels in the mid-ocean to heavy industrial plants, we ensure that your 
                    critical systems keep running with zero compromise on quality or performance.
                  </p>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <FadeInOnScroll delay={0.1}>
                <div>
                  <h3 className="heading-sub text-foreground mb-2">3500+</h3>
                  <p className="label-tech !text-muted-foreground !mb-0 lowercase">SKUs inventoried</p>
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll delay={0.2}>
                <div>
                  <h3 className="heading-sub text-foreground mb-2">24h</h3>
                  <p className="label-tech !text-muted-foreground !mb-0 lowercase">Response Guarantee</p>
                </div>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll delay={0.3}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 py-4 pr-6 rounded-full bg-foreground text-background font-tech text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-500 shadow-xl"
              >
                <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                Explore Our Legacy
              </Link>
            </FadeInOnScroll>
          </div>
        </div>

        {/* Decorative background accent */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="section-container">
        <div className="h-px bg-border/60" />
      </div>

      {/* Bottom — Capabilities Grid */}
      <div className="px-6 py-20 md:py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeInOnScroll>
            <div className="flex items-end justify-between mb-10 md:mb-16">
              <div>
                <p className="label-tech text-primary mb-3">
                  What We Do
                </p>
                <h2 className="heading-section text-foreground">
                  Core Capabilities.
                </h2>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Mobile: Compact horizontal cards | Desktop: Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {capabilities.map((cap, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-border bg-background hover:bg-muted/40 transition-all duration-500 h-full">
                  {/* Number badge */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <span className="font-tech text-[10px] font-bold text-muted-foreground/30 tracking-widest">
                      0{i + 1}
                    </span>
                  </div>
                  
                  {/* Mobile: Horizontal | Desktop: Vertical */}
                  <div className="flex items-start gap-4 p-5 md:flex-col md:p-8">
                    {/* Icon */}
                    <div className="shrink-0 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20">
                      <cap.icon size={22} strokeWidth={1.5} />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 min-w-0 md:mt-4">
                      <h3 className="font-display font-medium text-foreground mb-1.5 md:mb-3" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
                        {cap.title}
                      </h3>
                      <p className="body-text !leading-relaxed line-clamp-3 md:line-clamp-none">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
