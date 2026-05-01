"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ROProcessSection } from "@/components/sections/ro-process-section";
import { ProductCatalog } from "@/components/product-catalog";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Metadata } from 'next'

import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ROSystemsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="/ro/ro-plant-framed.png"
            alt="Advanced RO Water Treatment systems"
            fill
            className="object-cover contrast-[1.1] saturate-[1.1] opacity-60"
            priority
          />
        </motion.div>

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <div className="relative z-10 text-center px-6" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)' }}>
          <FadeInOnScroll>
            <p className="label-tech text-white/80 mb-6 drop-shadow-xl uppercase tracking-[0.4em]">
              Division 02
            </p>
            <h1 className="heading-display text-white !leading-[0.95] uppercase drop-shadow-2xl">
              Water Treatment <br /> & <span className="text-accent-blue italic">RO Systems.</span>
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

      {/* E-Commerce Catalog Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-background text-primary/20"><Loader2 className="animate-spin" /></div>}>
        <ProductCatalog divisionSlug="ro-solutions" divisionName="RO Water Treatment" />
      </Suspense>

      {/* Introduction Section */}
      <section className="relative overflow-hidden bg-dark-base border-t border-white/[0.06]">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.5) 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
        <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-section mb-8 text-white">
              RO Water <span className="text-accent-blue italic">Treatment Plants.</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-300/90 mb-6">
              We supply RO systems for both marine and industrial use, including:
            </p>
            <ul className="list-none space-y-4 font-sans text-lg text-slate-200 mb-6 inline-block text-left">
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Reverse osmosis plants</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Water treatment equipment</li>
              <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Spare parts & maintenance support</li>
            </ul>
          </div>
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
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-background/20" />
            <div className="absolute bottom-8 left-8">
              <span className="font-tech text-xs uppercase tracking-widest text-white/70 block mb-2">Project 01</span>
              <h3 className="heading-sub text-white !mb-0">Advanced Membrane Sourcing</h3>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden group">
            <Image
              src="/ro/ro-membrane-clean.png"
              alt="RO Membrane Replacement"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-background/20" />
            <div className="absolute bottom-8 left-8">
              <span className="font-tech text-xs uppercase tracking-widest text-white/70 block mb-2">Service 01</span>
              <h3 className="heading-sub text-white !mb-0">Advanced Membrane Sourcing</h3>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
