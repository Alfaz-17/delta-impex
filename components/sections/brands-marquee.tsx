"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

function BrandItem({ imageUrl, name }: { imageUrl: string; name: string }) {
  return (
    <div className="brand-marquee-item flex-shrink-0 flex items-center justify-center mx-8 md:mx-12 lg:mx-16">
      <div className="relative h-12 w-28 md:h-16 md:w-36 lg:h-20 lg:w-44">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, 176px"
        />
      </div>
    </div>
  );
}

export function BrandsMarquee({ brands: initialBrands }: { brands?: { imageUrl: string; name: string }[] }) {
  const defaultBrands = [
    { imageUrl: "/brands/Screenshot 2026-02-08 115904.png", name: "DEUTZ" },
    { imageUrl: "/brands/Screenshot 2026-02-08 115911.png", name: "MTU" },
    { imageUrl: "/brands/Screenshot 2026-02-08 115918.png", name: "MAN B&W" },
    { imageUrl: "/brands/Screenshot 2026-02-08 115925.png", name: "HANSHIN DIESEL" },
    { imageUrl: "/brands/Screenshot 2026-02-08 115930.png", name: "VOLVO PENTA" },
    { imageUrl: "/brands/Screenshot 2026-02-08 115936.png", name: "CUMMINS MARINE" },
    { imageUrl: "/brands/Screenshot 2026-02-08 115948.png", name: "PERKINS" },
    { imageUrl: "/brands/Screenshot 2026-02-08 120007.png", name: "CAT" },
  ];

  const brands = initialBrands && initialBrands.length > 0 ? initialBrands : defaultBrands;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Duplicate the brands array 4x for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section
      ref={sectionRef}
      id="brands"
      className="relative bg-background overflow-hidden py-8 md:py-10 lg:py-12"
    >
      {/* Subtle grain texture overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Section Label */}
      <div
        className="text-center mb-12 md:mb-16 lg:mb-20 px-6"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <p className="label-tech !text-muted-foreground mb-4">
          Trusted By Industry Leaders
        </p>
        <div className="mx-auto h-px w-12 bg-gradient-to-r from-transparent via-muted-foreground/40 to-transparent" />
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div
        className="relative mb-6 md:mb-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 lg:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 lg:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="marquee-track-left flex">
          {duplicatedBrands.map((brand, i) => (
            <BrandItem key={`row1-${i}`} imageUrl={brand.imageUrl} name={brand.name} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — scrolls right */}
      <div
        className="relative"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
        }}
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="marquee-track-right flex">
          {duplicatedBrands.map((brand, i) => (
            <BrandItem key={`row2-${i}`} imageUrl={brand.imageUrl} name={brand.name} />
          ))}
        </div>
      </div>

      {/* Thin separator line at bottom */}
      <div className="mt-6 md:mt-8 lg:mt-10 mx-6 md:mx-12 lg:mx-20">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
