"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

const word = "DELTA";

const sideImages = [
  {
    src: "/images/mood/hero-marine-sunset.png",
    alt: "Marine engineering solutions at sea",
    position: "left",
    span: 1,
  },
  {
    src: "/images/mood/hero-marine-detail.png",
    alt: "Precision marine machinery detail",
    position: "left",
    span: 1,
  },
  {
    src: "/images/mood/hero-industrial-scale.png",
    alt: "Industrial spare parts supply and power plants",
    position: "right",
    span: 1,
  },
  {
    src: "/images/mood/hero-industrial-detail.png",
    alt: "Advanced industrial inspection and equipment",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateOnScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = window.innerHeight * 2;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

    // Text fades out first (0 to 0.2)
    const textOpacity = Math.max(0, 1 - (progress / 0.2));

    // Image transforms start after text fades (0.2 to 1)
    const imageProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.8));

    // Smooth interpolations using GPU-accelerated values
    const insetTopParams = imageProgress * 15; // 0% to 15%
    const insetSideParams = imageProgress * 29; // 0% to 29%
    const borderRadius = imageProgress * 24; // 0px to 24px
    
    // Side columns slide in
    const sideTranslateLeft = -150 + (imageProgress * 150); // -150% to 0%
    const sideTranslateRight = 150 - (imageProgress * 150); // 150% to 0%
    const sideOpacity = imageProgress;

    // Direct DOM updates — bypass React re-render entirely
    if (textOverlayRef.current) {
      textOverlayRef.current.style.opacity = `${textOpacity}`;
    }
    
    if (centerRef.current) {
      // Use clip-path instead of width/height changing for zero layout thrashing
      centerRef.current.style.clipPath = `inset(${insetTopParams}% ${insetSideParams}% ${insetTopParams}% ${insetSideParams}% round ${borderRadius}px)`;
      centerRef.current.style.WebkitClipPath = `inset(${insetTopParams}% ${insetSideParams}% ${insetTopParams}% ${insetSideParams}% round ${borderRadius}px)`;
    }

    if (leftColRef.current) {
      leftColRef.current.style.transform = `translate3d(${sideTranslateLeft}%, 0, 0)`;
      leftColRef.current.style.opacity = `${sideOpacity}`;
    }
    
    if (rightColRef.current) {
      rightColRef.current.style.transform = `translate3d(${sideTranslateRight}%, 0, 0)`;
      rightColRef.current.style.opacity = `${sideOpacity}`;
    }

  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateOnScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateOnScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateOnScroll]);

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          
          {/* Bento Grid Container - Absolute positioning to prevent layout reflows */}
          <div
            ref={gridRef}
            className="relative h-full w-full"
          >
            {/* Center Image - Fills container but is cropped by clip-path on scroll */}
            <div
              ref={centerRef}
              className="absolute inset-0 overflow-hidden will-change-[clip-path]"
              style={{
                clipPath: 'inset(0% 0% 0% 0% round 0px)',
                WebkitClipPath: 'inset(0% 0% 0% 0% round 0px)',
                zIndex: 10,
              }}
            >
              <Image
                src="/images/hero-clean.png"
                alt="Delta Impex Marine and Industrial Solutions"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/30" />
              
              {/* Overlay Text - Fades out first. Placed INSIDE center so it gets clipped together */}
              <div
                ref={textOverlayRef}
                className="absolute inset-0 flex items-end overflow-hidden will-change-[opacity]"
                style={{ opacity: 1, paddingBottom: '60px' }}
              >
                <h1 className="w-full text-center text-[22vw] font-medium leading-[0.8] tracking-tighter text-white font-display">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Left Column - Fixed absolute sizes, animated with transform */}
            <div
              ref={leftColRef}
              className="absolute flex flex-col will-change-transform z-20"
              style={{
                top: '15%',
                bottom: '15%',
                left: '2%',
                width: '25%',
                gap: '16px',
                transform: 'translate3d(-150%, 0, 0)',
                opacity: 0,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-1 overflow-hidden"
                  style={{ borderRadius: '24px' }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Right Column - Fixed absolute sizes, animated with transform */}
            <div
              ref={rightColRef}
              className="absolute flex flex-col will-change-transform z-20"
              style={{
                top: '15%',
                bottom: '15%',
                right: '2%',
                width: '25%',
                gap: '16px',
                transform: 'translate3d(150%, 0, 0)',
                opacity: 0,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div
                  key={idx}
                  className="relative flex-1 overflow-hidden"
                  style={{ borderRadius: '24px' }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Tagline Section */}
      <div className="px-6 pt-32 pb-28 md:pt-48 md:px-12 md:pb-36 lg:px-20 lg:pt-56 lg:pb-44">
        <p className="mx-auto max-w-4xl text-center text-2xl leading-relaxed text-muted-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug">
          Delta Impex: Specialized in Marine & Industrial Spare Parts 
          <br />
          and Advanced RO Water Treatment Solutions.
        </p>
        <p className="mx-auto mt-12 max-w-2xl text-center text-lg text-muted-foreground">
          Your trusted partner for comprehensive supply solutions, from vessels at sea to industrial plants on land, 
          providing high-quality spare parts and reverse osmosis water treatment systems.
        </p>
        <div className="flex justify-center mt-12">
          <Link 
            href="/about"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-[0.3em] text-foreground hover:gap-4 transition-all duration-300"
          >
            Explore Our Legacy <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
