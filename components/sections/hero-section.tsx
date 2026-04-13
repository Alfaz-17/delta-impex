"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // TEXT
  const textOpacity = useTransform(smooth, [0, 0.2], [1, 0]);

  // VIDEO
  const clip = useTransform(
    smooth,
    [0.1, 0.6],
    [
      "inset(0% 0% 0% 0% round 0px)",
      "inset(20% 20% 20% 20% round 28px)",
    ]
  );

  const videoOpacity = useTransform(smooth, [0.5, 0.8], [1, 0]);

  // 🔥 GRID CONTAINER SCALE (important)
  const gridScale = useTransform(smooth, [0.3, 1], [0.8, 1]);
  const gridOpacity = useTransform(smooth, [0.3, 1], [0, 1]);

  // 🔥 SIDE ENTRY (keep your flow)
  const leftX = useTransform(smooth, [0.2, 1], ["-120%", "0%"]);
  const rightX = useTransform(smooth, [0.2, 1], ["120%", "0%"]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* 🎬 VIDEO */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            clipPath: clip,
            WebkitClipPath: clip,
            opacity: videoOpacity,
          }}
        >
          <video
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-16 md:px-16 md:pb-24 lg:pb-28"
            style={{ opacity: textOpacity }}
          >
            {/* Dark overlay for text legibility over video */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 pointer-events-none" />

            <div className="relative z-10 max-w-3xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.4)' }}>
              <p className="label-tech !text-white/70 mb-4 md:mb-5 drop-shadow-lg">
                Marine &amp; Industrial Specialists
              </p>
              <h1 className="heading-display text-white !font-bold mb-4 md:mb-6 drop-shadow-2xl">
                DELTA IMPEX
              </h1>
              <p className="body-text !text-white/85 max-w-xl mb-6 md:mb-8 drop-shadow-lg" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                Your trusted global supplier of specialized marine engine spare parts, 
                industrial machinery, and advanced RO water treatment systems.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/divisions/marine-parts"
                  className="btn-text bg-white text-foreground px-6 py-3 md:px-8 md:py-3.5 rounded-full hover:bg-white/90 transition-colors shadow-xl"
                >
                  Explore Catalog
                </Link>
                <Link
                  href="/contact"
                  className="btn-text text-white border border-white/40 px-6 py-3 md:px-8 md:py-3.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-md shadow-lg"
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 🔥 PERFECT GRID CENTER */}
<motion.div
  className="absolute z-20 left-1/2 top-1/2 
             w-[92vw] 
             md:w-[85vw] 
             lg:w-[80vw] 
             xl:w-[70vw]"
  style={{
    translateX: "-50%",
    translateY: "-50%",
    scale: gridScale,
    opacity: gridOpacity,
  }}
>
<div className="grid grid-cols-2 gap-3 h-[70vh] max-h-[700px]">
    {/* LEFT */}
<motion.div className="flex flex-col gap-3 h-full" style={{ x: leftX }}>      <Card
        src="/images/mood/hero-marine-sunset.png"
        title="Marine Parts"
        desc="Ship spare parts"
      />
      <Card
        src="/images/mood/hero-marine-detail.png"
        title="Precision Spares"
        desc="High-quality components"
      />
    </motion.div>

    {/* RIGHT */}
<motion.div className="flex flex-col gap-3 h-full" style={{ x: rightX }}>      <Card
        src="/images/mood/hero-industrial-scale.png"
        title="Industrial Supply"
        desc="Factory solutions"
      />
      <Card
        src="/ro/ro-plant-clean.png"
        title="RO Systems"
        desc="Water treatment"
      />
    </motion.div>

  </div>
</motion.div>
      </div>
    </section>
  );
}

// 🔥 CARD COMPONENT (clean + reusable)
function Card({ src, title, desc }: any) {
  return (
    <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/10">
      <Image src={src} alt={title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3">
        <h3 className="text-white text-sm font-semibold">{title}</h3>
        <p className="text-white/80 text-xs">{desc}</p>
      </div>
    </div>
  );
}