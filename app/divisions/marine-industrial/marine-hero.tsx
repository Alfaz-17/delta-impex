"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

export function MarineDivisionHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: heroScale }}
      >
        <Image
          src="/images/marine-parts-clean.png"
          alt="Marine engine spare parts"
          fill
          className="object-cover opacity-60 contrast-125 saturate-[0.8]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </motion.div>

      <div className="relative z-10 text-center px-6" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)' }}>
        <FadeInOnScroll>
          <p className="label-tech text-white/80 mb-6 drop-shadow-xl uppercase tracking-[0.4em]">
            Division 01
          </p>
          <h1 className="heading-display text-white !leading-[0.95] uppercase drop-shadow-2xl">
            Marine & Industrial <br />
            <span className="text-accent-blue italic">Global Sourcing.</span>
          </h1>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
