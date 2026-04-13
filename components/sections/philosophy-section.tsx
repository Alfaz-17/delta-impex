"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

export function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // 🔥 RESPONSIVE ENTRY (fix mobile overflow)
  const leftX = useTransform(
    smooth,
    [0, 1],
    ["-100%", "0%"] // reduced from -150%
  );

  const rightX = useTransform(
    smooth,
    [0, 1],
    ["100%", "0%"] // reduced from 150%
  );

  const titleOpacity = useTransform(smooth, [0, 0.6], [1, 0]);

  return (
    <section id="parts" className="bg-background">

      {/* 🔥 SCROLL AREA (reduced for mobile feel) */}
      <div
        ref={containerRef}
        className="relative h-[180vh] md:h-[220vh] lg:h-[250vh]"
      >        
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          
          <div className="relative w-full">

            {/* TITLE */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="heading-display text-center px-4 md:px-6">
                Our Core Divisions.
              </h2>
            </motion.div>

            {/* GRID */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 
                            gap-6 md:gap-8 lg:gap-12 
                            px-4 md:px-12 lg:px-20 
                            w-full max-w-7xl mx-auto">

              {/* LEFT */}
              <motion.div style={{ x: leftX }}>
                <Card
                  href="/divisions/marine-parts"
                  src="/images/marine-parts-clean.png"
                  label="Marine & Industrial Parts"
                />
              </motion.div>

              {/* RIGHT */}
              <motion.div style={{ x: rightX }}>
                <Card
                  href="/divisions/ro-systems"
                  src="/ro/ro-plant-clean.png"
                  label="RO Water Treatment"
                />
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="text-center max-w-4xl mx-auto">
          <p className="label-tech !text-primary mb-4 md:mb-6">
            Trusted Partner Since Inception
          </p>

          <p className="body-text leading-relaxed">
            Delta Impex operates two specialized divisions: the supply of high-quality Marine & Industrial machinery spare parts,
            and the provision of advanced RO Water Treatment Plants for both land and sea applications.
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ href, src, label }: any) {
  return (
    <Link
      href={href}
      className="relative block 
                 aspect-[4/3] 
                 rounded-2xl md:rounded-3xl lg:rounded-[2.5rem] 
                 overflow-hidden 
                 group shadow-xl md:shadow-2xl"
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />

      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition" />

      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
        <span className="backdrop-blur-md px-4 py-2 md:px-6 md:py-3 
                         text-xs md:text-sm lg:text-base
                         font-semibold 
                         rounded-full 
                         bg-primary/90 text-white 
                         border border-white/20 
                         shadow-lg
                         whitespace-nowrap">
          {label}
        </span>
      </div>
    </Link>
  );
}