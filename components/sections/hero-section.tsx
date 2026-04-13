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
            className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:px-16"
            style={{ opacity: textOpacity }}
          >
            <h1 className="text-white text-4xl md:text-6xl font-bold mb-3">
              DELTA IMPEX
            </h1>
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
      <Image src={src} alt={title} fill className="object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-3">
        <h3 className="text-white text-sm font-semibold">{title}</h3>
        <p className="text-white/80 text-xs">{desc}</p>
      </div>
    </div>
  );
}