"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

export function ROHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
      <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
        <Image
          src="/ro/ro-plant-framed.png"
          alt="Advanced RO Water Treatment systems"
          fill
          className="object-cover contrast-[1.1] saturate-[1.1] opacity-60"
          priority
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 text-center px-6" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)' }}>
        <FadeInOnScroll>
          <p className="label-tech text-white/80 mb-6 drop-shadow-xl uppercase tracking-[0.4em]">
            Division 02
          </p>
          <h1 className="heading-display text-white !leading-[0.95] uppercase drop-shadow-2xl">
            Water Treatment <br /> & <span className="text-accent-blue italic">RO Systems.</span>
          </h1>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
