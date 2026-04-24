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
      <div className="section-container relative z-10 py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Left — Image Side */}
          <FadeInOnScroll direction="right">
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden group border border-border/50">
              <motion.div style={{ y }} className="absolute inset-0">
                <Image
                  src="/images/about-hero-new.png"
                  alt="Delta Impex Industrial Legacy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              
              {/* Minimalist Data Overlays */}
              <div className="absolute top-8 left-8">
                <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl">
                  <p className="label-tech !mb-0 !text-foreground !text-[8px]">Global Sourcing</p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Right — Content Side */}
          <div className="space-y-10 md:space-y-12">
            <FadeInOnScroll>
              <div>
                <p className="label-tech mb-5">
                  The Delta Impex Legacy
                </p>
                <h2 className="heading-display mb-8">
                  Marine Expertise. <br /> 
                  <span className="text-muted-foreground">Industrial Reliability.</span>
                </h2>
                <div className="space-y-6">
                  <p className="body-text !leading-relaxed">
                    Delta Impex is a Bhavnagar-based company focused on supplying marine and industrial machinery, spare parts, and complete systems.
                  </p>
                  <p className="body-text !leading-relaxed">
                    With strong sourcing capabilities and industry knowledge, we support ship owners, managers, and industrial clients with efficient, reliable, and economical supply solutions. Our commitment is to deliver quality products, timely service, and long-term business relationships.
                  </p>
                  <div className="pt-4">
                    <p className="label-tech mb-2">Our Vision</p>
                    <p className="body-text italic">
                      "To become a trusted global supplier for marine and industrial sectors, delivering reliable and cost-effective solutions."
                    </p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <FadeInOnScroll delay={0.1}>
                <div>
                  <h3 className="heading-sub mb-2">100%</h3>
                  <p className="label-tech !text-muted-foreground !mb-0 lowercase">Authentic parts check</p>
                </div>
              </FadeInOnScroll>
              <FadeInOnScroll delay={0.2}>
                <div>
                  <h3 className="heading-sub mb-2">Fast</h3>
                  <p className="label-tech !text-muted-foreground !mb-0 lowercase">Expedited quoting</p>
                </div>
              </FadeInOnScroll>
            </div>

            <FadeInOnScroll delay={0.3}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 py-4 pr-8 pl-4 rounded-full bg-foreground text-background label-tech !mb-0 transition-all duration-500 shadow-2xl hover:bg-accent hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 group-hover:bg-white/20">
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                Detailed Methodology
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
      <div className="px-6 py-8 md:py-10 md:px-12 lg:px-20">
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
                    <span className="label-tech !mb-0 !text-muted-foreground/20 !text-[12px]">
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
                      <h3 className="heading-sub mb-1.5 md:mb-3">
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
