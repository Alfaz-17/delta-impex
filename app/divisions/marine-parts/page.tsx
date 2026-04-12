"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductCatalog } from "@/components/product-catalog";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Metadata } from 'next'

import { motion, useScroll, useTransform } from "framer-motion";

export default function MarinePartsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="/images/marine-parts-clean.png"
            alt="Marine engine spare parts"
            fill
            className="object-cover contrast-[1.1] saturate-[1.1] opacity-60"
            priority
          />
        </motion.div>

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <p className="label-tech text-white/70 mb-6">
            Division 01
          </p>
          <h1 className="heading-display text-white text-5xl md:text-7xl lg:text-[8vw] !leading-[0.95] tracking-tighter uppercase">
            Marine & <br /> Industrial Parts.
          </h1>
        </motion.div>
      </section>

      {/* E-Commerce Catalog Section */}
      <ProductCatalog divisionSlug="marine-industrial" divisionName="Marine & Industrial" />

      {/* Main Content Info */}
      <section className="px-6 py-24 md:px-12 md:py-32 bg-background border-b border-border/50 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-12">
              <div>
                <h2 className="heading-section mb-4">
                  Marine & Ship Spare Parts
                </h2>
                <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                  We supply all types of ship spare parts for main and auxiliary machinery, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-sans text-muted-foreground mb-6">
                  <li>Main engine & auxiliary engine spares</li>
                  <li>Turbochargers, pumps & compressors</li>
                  <li>Purifiers & separators</li>
                  <li>Heat exchangers & coolers</li>
                  <li>Electrical & navigation equipment</li>
                  <li>Deck & engine room machinery</li>
                  <li>All types of marine consumables</li>
                </ul>
                <p className="font-sans font-bold text-foreground mb-2">Available in:</p>
                <ul className="list-disc pl-5 space-y-2 font-sans text-muted-foreground">
                  <li>New</li>
                  <li>Used</li>
                  <li>Reconditioned</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-4xl font-medium tracking-tighter mb-4 italic">
                  Industrial Solutions
                </h2>
                <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-6">
                  We provide similar solutions for land-based industries, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 font-sans text-muted-foreground">
                  <li>Industrial engines</li>
                  <li>Generator sets (gensets)</li>
                  <li>Machinery spare parts</li>
                  <li>Industrial equipment & components</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-4xl font-medium tracking-tighter mb-4 italic">
                  Power Plant Supply
                </h2>
                <ul className="list-disc pl-5 space-y-2 font-sans text-muted-foreground">
                  <li>Power plant equipment</li>
                  <li>Engines & generators</li>
                  <li>Spare parts & support</li>
                </ul>
              </div>
            </div>
            <div className="relative aspect-[16/9] lg:aspect-square rounded-3xl overflow-hidden">
              <Image
                src="/images/mood/hero-marine-detail.png"
                alt="Precision marine parts inspection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action Bar */}
      <section className="bg-foreground text-background py-20">
        <div className="px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
          <h2 className="heading-section text-border !italic text-3xl md:text-4xl text-center md:text-left">
            Need a specific part? <br />
            <span className="text-white/60">Our sourcing team is ready.</span>
          </h2>
          <a href="/contact" className="bg-white text-foreground px-10 py-5 rounded-full hover:scale-105 transition-transform btn-text !text-sm">
            Request a Quote
          </a>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
