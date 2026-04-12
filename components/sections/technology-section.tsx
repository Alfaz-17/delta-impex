"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Slower animation - more viewport range
    const startOffset = windowHeight * 0.9;
    const endOffset = windowHeight * 0.1;
    
    const totalDistance = startOffset - endOffset;
    const currentPosition = startOffset - rect.top;
    
    const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
    
    wordsRef.current.forEach((span, index) => {
      if (!span) return;
      const wordProgress = index / wordsRef.current.length;
      const isRevealed = newProgress > wordProgress;
      span.style.color = isRevealed ? "var(--foreground)" : "#e4e4e7";
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  const words = text.split(" ");
  
  return (
    <p
      ref={containerRef}
      className="text-3xl lg:text-5xl heading-display leading-tight"
    >
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => { wordsRef.current[index] = el; }}
          className="transition-colors duration-150"
          style={{ color: "#e4e4e7" }}
        >
          {word}{index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

const sideImages = [
  {
    src: "/ro/ro-pump-clean.png",
    alt: "High Pressure RO Pump",
    position: "left",
    span: 1,
  },
  {
    src: "/ro/ro-membrane-clean.png",
    alt: "Advanced RO Membrane",
    position: "left",
    span: 1,
  },
  {
    src: "/ro/ro-plant-clean.png",
    alt: "Industrial Filtration System",
    position: "right",
    span: 1,
  },
  {
    src: "/images/mood/ro-water-flow.png",
    alt: "RO Water Treatment Flow",
    position: "right",
    span: 1,
  },
];

export function TechnologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const titleWordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  
  const descriptionText = "Specializing in high-performance RO Water Treatment Plants, Delta Impex provides custom-engineered solutions for desalination and purification. Our systems serve both marine vessels and land-based industrial sectors, ensuring a reliable supply of clean water through advanced membrane technology and efficient filtration systems.";

  const updateOnScroll = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollableHeight = window.innerHeight * 2;
    const scrolled = -rect.top;
    const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
    
    // Image transforms start after title fades (0.2 to 1)
    const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
    
    // Smooth interpolations using GPU-accelerated values
    const insetTopParams = imageProgress * 15; // 0% to 15%
    const insetSideParams = imageProgress * 29; // 0% to 29%
    const borderRadius = imageProgress * 24; // 0px to 24px
    
    // Side columns slide in
    const sideTranslateLeft = -150 + (imageProgress * 150); // -150% to 0%
    const sideTranslateRight = 150 - (imageProgress * 150); // 150% to 0%
    const sideOpacity = imageProgress;

    if (centerRef.current) {
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

    titleWordsRef.current.forEach((span, index) => {
      if (!span) return;
      const wordFadeStart = index * 0.07;
      const wordFadeEnd = wordFadeStart + 0.07;
      const wordProgress = Math.max(0, Math.min(1, (scrollProgress - wordFadeStart) / (wordFadeEnd - wordFadeStart)));
      const wordOpacity = 1 - wordProgress;
      const wordBlur = wordProgress * 10;
      span.style.opacity = `${wordOpacity}`;
      span.style.filter = `blur(${wordBlur}px)`;
    });

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
    <section ref={sectionRef} id="ro-systems" className="relative bg-foreground">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          
          {/* Bento Grid Container - Absolute positioning to prevent reflows */}
          <div 
            ref={gridRef}
            className="relative h-full w-full"
          >
            
            {/* Main Center Image */}
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
                src="/ro/ro-plant-framed.png"
                alt="Reverse Osmosis plant and desalination technology"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/40" />
              
              {/* Title Text - Fades out word by word with blur */}
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              >
                <h2 className="max-w-3xl leading-tight tracking-tight text-white md:text-5xl lg:text-7xl text-5xl heading-display">
                  {["RO", "Desalination", "Water Systems."].map((word, index) => (
                    <span
                      key={index}
                      ref={(el) => { titleWordsRef.current[index] = el; }}
                      className="inline-block"
                      style={{
                        marginRight: index < 2 ? '0.3em' : '0',
                      }}
                    >
                      {word}
                      {index === 1 && <br />}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            {/* Left Column */}
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

            {/* Right Column */}
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

      {/* Description Section with Background Image and Scroll Reveal */}
      <div 
        className="relative overflow-hidden bg-background px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40"
      >
        {/* Text Content */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <ScrollRevealText text={descriptionText} />
        </div>
      </div>
    </section>
  );
}
