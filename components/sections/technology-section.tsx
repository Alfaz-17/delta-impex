"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startOffset = windowHeight * 0.9;
      const endOffset = windowHeight * 0.1;
      
      const totalDistance = startOffset - endOffset;
      const currentPosition = startOffset - rect.top;
      
      const newProgress = Math.max(0, Math.min(1, currentPosition / totalDistance));
      setProgress(newProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = text.split(" ");
  
  return (
    <p
      ref={containerRef}
      className="heading-section text-foreground/15"
    >
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;
        
        return (
          <span
            key={index}
            className="transition-colors duration-200"
            style={{
              color: isRevealed ? "var(--foreground)" : "inherit",
              opacity: isRevealed ? 1 : 1,
            }}
          >
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
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
  return (
    <section className="bg-foreground py-24 md:py-32 lg:py-48 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <p className="label-tech !text-accent mb-6">Advanced Engineering</p>
            <h2 className="heading-display mb-8">
              RO Water <br />
              <span className="text-white/40">Desalination.</span>
            </h2>
            <div className="space-y-8 max-w-xl">
              <p className="body-text !text-white/80">
                We supply specialized RO systems for both marine and industrial use, designed to convert saline seawater into clean, safe, and potable freshwater.
              </p>
              <p className="body-text !text-white/60">
                Our technology plays a vital role in regions where freshwater resources are limited, especially in coastal and industrial areas. We provide complete solutions including Reverse Osmosis plants, water treatment equipment, and specialized maintenance support.
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4">
                {[
                  "Seawater Desalination",
                  "Technical Maintenance",
                  "Advanced Filtration",
                  "Global Supply Chain",
                  "Industrial Scale",
                  "Marine Specialized"
                ].map((item, i) => (
                  <li key={i} className="label-tech !mb-0 !text-white/90 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square group transition-all duration-700">
              <div className="absolute inset-0 bg-accent/20 blur-[100px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/ro/ro-plant-framed.png"
                  alt="Industrial RO Plant"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
