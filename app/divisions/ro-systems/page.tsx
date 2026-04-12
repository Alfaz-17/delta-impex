"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ROProcessSection } from "@/components/sections/ro-process-section";
import { ProductCatalog } from "@/components/product-catalog";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Metadata } from 'next'

export default function ROSystemsPage() {
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
            src="/ro/ro-plant-framed.png"
            alt="Advanced RO Water Treatment systems"
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
            Division 02
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[8vw] font-bold leading-[0.95] tracking-tighter text-white">
            Water Treatment <br /> & RO Systems.
          </h1>
        </div>
      </section>

      {/* E-Commerce Catalog Section */}
      <ProductCatalog divisionSlug="ro-water-treatment" divisionName="RO Water Treatment" />

      {/* Introduction Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background text-center border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tighter mb-8 transform skew-x-[-4deg]">
            RO Water Treatment Plants
          </h2>
          <p className="font-sans text-xl text-muted-foreground leading-relaxed mb-6">
            We supply RO systems for both marine and industrial use, including:
          </p>
          <ul className="list-none space-y-4 font-sans text-lg text-foreground mb-6 inline-block text-left">
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Reverse osmosis plants</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Water treatment equipment</li>
            <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Spare parts & maintenance support</li>
          </ul>
        </div>
      </section>

      {/* The Core Process */}
      <ROProcessSection />


      {/* Case Study / Gallery Placeholder */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden group">
            <Image
              src="/ro/ro-plant-clean.png"
              alt="Industrial RO Installation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-background/20" />
            <div className="absolute bottom-8 left-8">
              <span className="font-tech text-xs uppercase tracking-widest text-white/70 block mb-2">Project 01</span>
              <h3 className="font-display text-2xl text-white">Industrial Desalination Plant</h3>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden group">
            <Image
              src="/ro/ro-membrane-clean.png"
              alt="RO Membrane Replacement"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-background/20" />
            <div className="absolute bottom-8 left-8">
              <span className="font-tech text-xs uppercase tracking-widest text-white/70 block mb-2">Service 01</span>
              <h3 className="font-display text-2xl text-white">Advanced Membrane Sourcing</h3>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
