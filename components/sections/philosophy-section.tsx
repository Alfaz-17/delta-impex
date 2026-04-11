"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLAnchorElement>(null);
  const rightCardRef = useRef<HTMLAnchorElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    
    // Alpine comes from left (-100% to 0%)
    const alpineTranslateX = (1 - progress) * -100;
    
    // Forest comes from right (100% to 0%)
    const forestTranslateX = (1 - progress) * 100;
    
    // Title fades out as blocks come together
    const titleOpacity = (1 - progress).toString();
    
    // Direct DOM updates
    if (titleRef.current) {
      titleRef.current.style.opacity = titleOpacity;
    }
    if (leftCardRef.current) {
      leftCardRef.current.style.transform = `translate3d(${alpineTranslateX}%, 0, 0)`;
    }
    if (rightCardRef.current) {
      rightCardRef.current.style.transform = `translate3d(${forestTranslateX}%, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="parts" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div 
              ref={titleRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 will-change-[opacity]"
              style={{ opacity: 1 }}
            >
              <h2 className="text-[12vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw] text-center px-6 font-display">
                Our Core Divisions.
              </h2>
            </div>

            {/* Product Grid */}
            <div className="relative z-10 grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:px-12 lg:px-20">
              {/* Alpine Image - comes from left */}
              <Link 
                ref={leftCardRef}
                href="/divisions/marine-parts"
                className="relative aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer will-change-transform"
                style={{
                  transform: `translate3d(-100%, 0, 0)`,
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
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white font-tech">
                    Marine & Industrial Parts
                  </span>
                </div>
              </Link>

              {/* Forest Image - comes from right */}
              <Link 
                ref={rightCardRef}
                href="/divisions/ro-systems"
                className="relative aspect-[4/3] overflow-hidden rounded-2xl group cursor-pointer will-change-transform"
                style={{
                  transform: `translate3d(100%, 0, 0)`,
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
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-medium rounded-full bg-[rgba(255,255,255,0.2)] text-white font-tech">
                    RO Water Treatment
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Trusted Partner Since Inception
          </p>
          <p className="mt-8 leading-relaxed text-muted-foreground text-3xl text-center">
            Delta Impex operates two specialized divisions: the supply of high-quality Marine & Industrial machinery spare parts, 
            and the provision of advanced RO Water Treatment Plants for both land and sea applications.
          </p>
        </div>
      </div>
    </section>
  );
}
