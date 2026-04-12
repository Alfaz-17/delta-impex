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

  // Apply a gentle spring so the effect is ultra smooth and not jerky
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Translate left box from -150% to 0%
  const leftX = useTransform(smoothProgress, [0, 1], ["-150%", "0%"]);
  // Translate right box from 150% to 0%
  const rightX = useTransform(smoothProgress, [0, 1], ["150%", "0%"]);
  // Title fades out as cards collapse
  const titleOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <section id="parts" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={containerRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[12vw] leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw] text-center px-6 heading-display">
                Our Core Divisions.
              </h2>
            </motion.div>

            {/* Product Grid with 32px gap */}
            <div className="relative z-10 grid grid-cols-1 gap-8 px-6 md:grid-cols-2 md:px-12 lg:px-20 max-w-[100rem] mx-auto">
              
              {/* Left Image */}
              <motion.div style={{ x: leftX }}>
                <Link 
                  href="/divisions/marine-parts"
                  className="relative block aspect-[4/3] overflow-hidden rounded-[3rem] group cursor-pointer shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <Image
                    src="/images/marine-parts-clean.png"
                    alt="Marine and Industrial spare parts"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute bottom-10 left-10">
                    <span className="backdrop-blur-xl px-6 py-3 text-xs font-bold rounded-full bg-primary/80 text-white label-tech mb-0 border border-white/20 shadow-lg">
                      Marine & Industrial Parts
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Right Image */}
              <motion.div style={{ x: rightX }}>
                <Link 
                  href="/divisions/ro-systems"
                  className="relative block aspect-[4/3] overflow-hidden rounded-[3rem] group cursor-pointer shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <Image
                    src="/ro/ro-plant-clean.png"
                    alt="RO Water Treatment Plants and systems"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute bottom-10 left-10">
                    <span className="backdrop-blur-xl px-6 py-3 text-xs font-bold rounded-full bg-primary/80 text-white label-tech mb-0 border border-white/20 shadow-lg">
                      RO Water Treatment
                    </span>
                  </div>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14 underline-offset-8">
        <div className="text-center max-w-5xl mx-auto">
          <p className="label-tech uppercase">
            Trusted Partner Since Inception
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-2xl md:text-3xl lg:text-4xl heading-display text-center">
            Delta Impex operates two specialized divisions: the supply of high-quality Marine & Industrial machinery spare parts, 
            and the provision of advanced RO Water Treatment Plants for both land and sea applications.
          </p>
        </div>
      </div>
    </section>
  );
}
