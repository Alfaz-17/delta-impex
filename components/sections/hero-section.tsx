"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";

const word = "DELTA";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Apply a gentle spring for buttery smooth interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Text fades out quickly as scroll begins
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const textPointerEvents = useTransform(smoothProgress, [0, 0.1], ["auto", "none"]);

  // Video shrinks into a Bento Grid center card via clip-path
  // Insets: top/bottom 12%, left/right 26.5%, rounded 32px corners
  const videoClipPath = useTransform(
    smoothProgress,
    [0.1, 1], // Start shrinking slightly after text starts fading
    ["inset(0% 0% 0% 0% round 0px)", "inset(12% 26.5% 12% 26.5% round 32px)"]
  );

  // Side columns slide into place from off-screen
  const leftColumnX = useTransform(smoothProgress, [0.2, 1], ["-150%", "0%"]);
  const rightColumnX = useTransform(smoothProgress, [0.2, 1], ["150%", "0%"]);
  const columnOpacity = useTransform(smoothProgress, [0.4, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-background h-[250vh]">
      {/* Sticky boundary locking the layout to viewport during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        
        {/* The Full-Screen to Shrunken-Center Video */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-auto"
          style={{ 
            clipPath: videoClipPath,
            WebkitClipPath: videoClipPath // Safari support
          }}
        >
          <video
            src="/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/75 to-black/20" />
          
          {/* Main Hero Content - Fades out on scroll */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-end items-start px-6 pb-20 md:px-16 md:pb-24 lg:px-24 lg:pb-28 text-left"
            style={{ 
              opacity: textOpacity,
              pointerEvents: textPointerEvents as any
            }}
          >
            <p className="tracking-[0.3em] text-white/80 uppercase text-[10px] sm:text-xs font-semibold mb-3 border-l-2 border-white/50 pl-4">
              Powering Marine & Industrial Progress
            </p>
            <h1 className="max-w-5xl text-[12vw] sm:text-[7vw] md:text-[10vw] lg:text-[6vw] font-black leading-[0.9] tracking-tighter text-white font-display uppercase mb-4 drop-shadow-lg">
              DELTA IMPEX
            </h1>
            <p className="max-w-xl text-white/80 text-xs sm:text-sm md:text-base font-light leading-relaxed mb-8 drop-shadow">
              Your trusted partner for marine and industrial supply solutions. From vessels at sea to industrial plants on land, we deliver high-quality machinery parts and reverse osmosis systems.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Link 
                href="/contact"
                className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Request a Quote
              </Link>
              <Link 
                href="/about"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Explore Divisions
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Left Column (2 Images) */}
        <motion.div 
          className="absolute flex flex-col gap-4 z-20"
          style={{ 
            left: "2.5%", 
            top: "12%", 
            bottom: "12%", 
            width: "23%",
            x: leftColumnX,
            opacity: columnOpacity
          }}
        >
          <div className="relative flex-1 w-full overflow-hidden rounded-[32px] shadow-2xl">
            <Image
              src="/images/mood/hero-marine-sunset.png"
              alt="Marine engineering solutions at sea"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="relative flex-1 w-full overflow-hidden rounded-[32px] shadow-2xl">
            <Image
              src="/images/mood/hero-marine-detail.png"
              alt="Precision marine machinery detail"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Right Column (2 Images) */}
        <motion.div 
          className="absolute flex flex-col gap-4 z-20"
          style={{ 
            right: "2.5%", 
            top: "12%", 
            bottom: "12%", 
            width: "23%",
            x: rightColumnX,
            opacity: columnOpacity
          }}
        >
          <div className="relative flex-1 w-full overflow-hidden rounded-[32px] shadow-2xl">
            <Image
              src="/images/mood/hero-industrial-scale.png"
              alt="Industrial spare parts supply and power plants"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="relative flex-1 w-full overflow-hidden rounded-[32px] shadow-2xl">
            <Image
              src="/images/mood/hero-industrial-detail.png"
              alt="Advanced industrial inspection and equipment"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
