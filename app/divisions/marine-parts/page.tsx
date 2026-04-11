"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const categories = [
  { title: "Main Propulsion", items: ["Cylinder Liners", "Pistons", "Crankshafts", "Bearings"] },
  { title: "Auxiliary Engines", items: ["Fuel Pumps", "Injectors", "Turbochargers", "Valves"] },
  { title: "Industrial Power", items: ["Generators", "Control Panels", "Switchgears", "Transformers"] },
  { title: "Deck Machinery", items: ["Winches", "Windlasses", "Capstans", "Hydraulic Pumps"] },
];

export default function MarinePartsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.6)));
      setHeroScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <Image
            src="/images/marine-parts-clean.png"
            alt="Marine engine spare parts"
            fill
            className="object-cover contrast-[1.1] saturate-[1.1] opacity-60"
            style={{
              transform: `scale(${1 + heroScrollProgress * 0.15})`,
            }}
            priority
          />
        </div>
        <div
          className="relative z-10 text-center px-6"
          style={{
            opacity: 1 - heroScrollProgress * 1.5,
            transform: `translateY(${heroScrollProgress * 80}px)`,
          }}
        >
          <p className="font-tech text-sm uppercase tracking-[0.4em] text-white/70 mb-6">
            Division 01
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[8vw] font-bold leading-[0.95] tracking-tighter text-white">
            Marine & <br /> Industrial Parts.
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-8 italic">
                Sourcing Excellence.
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                Delta Impex is a leading supplier of high-quality marine engine spare parts and industrial machinery. 
                With a deep network of trusted manufacturers and reconditioners, we provide solutions that ensure 
                operational continuity for vessels and power plants worldwide.
              </p>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/mood/hero-marine-detail.png"
                alt="Precision marine parts inspection"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="p-8 border border-border rounded-3xl hover:bg-muted transition-colors duration-500">
                <h3 className="font-tech text-xs uppercase tracking-widest text-primary mb-6">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="font-sans text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <FeaturedProductsSection 
        initialCategory="marine" 
        hideTabs={true} 
        title="Inventory." 
        subtitle="Marine Engineering Solutions."
      />

      {/* Call to Action Bar */}
      <section className="bg-foreground text-background py-20">
        <div className="px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl text-center md:text-left">
            Need a specific part? <br />
            <span className="text-white/60">Our sourcing team is ready.</span>
          </h2>
          <a href="/contact" className="bg-white text-foreground font-bold px-10 py-5 rounded-full hover:scale-105 transition-transform uppercase tracking-widest text-sm">
            Request a Quote
          </a>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
