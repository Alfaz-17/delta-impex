"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ROProcessSection } from "@/components/sections/ro-process-section";
import { ProductCatalog } from "@/components/product-catalog";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Metadata } from 'next'

import { motion, useScroll, useTransform } from "framer-motion";

export default function ROSystemsPage() {
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
            src="/ro/ro-plant-framed.png"
            alt="Advanced RO Water Treatment systems"
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
            Division 02
          </p>
          <h1 className="heading-display text-white !leading-[0.95] uppercase">
            Water Treatment <br /> & RO Systems.
          </h1>
        </motion.div>
      </section>

      {/* E-Commerce Catalog Section */}
      <ProductCatalog divisionSlug="ro-water-treatment" divisionName="RO Water Treatment" />

      {/* Introduction Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background text-center border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-section mb-8">
            RO Water Treatment Plants
          </h2>
          <p className="body-text !leading-relaxed mb-6">
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
