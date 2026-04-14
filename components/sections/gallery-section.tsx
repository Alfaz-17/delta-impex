"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const images = [
    { src: "/Gallery/Whisk_ac43c800066de9990a94519f045935d5dr (1).jpeg", alt: "Product Manufacturing" },
    { src: "/Gallery/Whisk_c448308d3c4966fbdce4d4131d8f69f2dr (1).jpeg", alt: "Inventory Stock" },
    { src: "/Gallery/Whisk_d6ccd92cb71c6548bd64856634f3075fdr.jpeg", alt: "Part Components" },
  ];

  // Calculate section height based on content width
  useEffect(() => {
    const calculateHeight = () => {
      if (!scrollTrackRef.current || !galleryRef.current) return;
      const containerWidth = scrollTrackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      // Height = viewport height + the extra scroll needed to reveal all content
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      galleryRef.current.style.height = `${totalHeight}px`;
    };

    // Small delay to ensure container is rendered
    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !scrollTrackRef.current) return;
    
    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = scrollTrackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Total scroll distance needed to reveal all images
    const totalScrollDistance = containerWidth - viewportWidth;
    
    // Current scroll position within this section
    const scrolled = Math.max(0, -rect.top);
    
    // Progress from 0 to 1
    const progress = Math.min(1, scrolled / totalScrollDistance);
    
    // Calculate new translateX
    const newTranslateX = progress * -totalScrollDistance;
    
    scrollTrackRef.current.style.transform = `translate3d(${newTranslateX}px, 0, 0)`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  return (
    <section 
      id="gallery"
      ref={galleryRef}
      className="relative bg-background"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full items-center">
          {/* Horizontal scrolling container */}
          <div 
            ref={scrollTrackRef}
            className="flex gap-6 px-6 will-change-transform"
            style={{
              transform: `translate3d(0px, 0, 0)`,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
              touchAction: 'pan-y',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[50vh] md:h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[60vw] lg:w-[45vw] bg-muted/10 border border-border/50"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-contain p-4 md:p-8"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
