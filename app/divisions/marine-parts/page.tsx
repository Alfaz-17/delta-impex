"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductCatalog } from "@/components/product-catalog";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { Ship, Anchor, Gauge, Cog, Filter, Zap, Compass, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { icon: Ship, name: "Main & Auxiliary Engine Spares" },
  { icon: Cog, name: "Turbochargers & Compressors" },
  { icon: Filter, name: "Purifiers & Separators" },
  { icon: Gauge, name: "Pumps & Heat Exchangers" },
  { icon: Compass, name: "Navigation Equipment" },
  { icon: Zap, name: "Electrical Systems" },
];

export default function MarinePartsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <Image
            src="/images/marine-parts-clean.png"
            alt="Marine engine spare parts"
            fill
            className="object-cover opacity-60 contrast-125 saturate-[0.8]"
            priority
          />
          {/* Legibility overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 text-center px-6" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)' }}>
          <FadeInOnScroll>
            <p className="label-tech text-white/80 mb-6 drop-shadow-xl uppercase tracking-[0.4em]">
              Division 01
            </p>
            <h1 className="heading-display text-white !leading-[0.95] uppercase drop-shadow-2xl">
              Marine & Industrial <br />
              <span className="text-primary italic">Global Souring.</span>
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Section 1: Introduction & Capabilities */}
      <section className="section-container pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <FadeInOnScroll>
              <div className="mb-12">
                <p className="label-tech text-primary mb-4">Precision Components</p>
                <h2 className="heading-display text-foreground mb-8">Ship Spare Parts <br/>& Machinery.</h2>
                <p className="body-text !leading-relaxed text-muted-foreground mb-8 text-xl">
                  We supply a comprehensive range of high-performance ship spare parts for main engines, 
                  auxiliary machinery, and navigation systems, ensuring operational continuity for global maritime fleets.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <cat.icon size={18} />
                      </div>
                      <span className="font-tech text-[11px] uppercase tracking-widest text-muted-foreground font-bold group-hover:text-foreground transition-colors">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>

          <div className="lg:col-span-5 space-y-12 bg-muted/30 p-8 md:p-12 rounded-[2.5rem] border border-border/50">
            <FadeInOnScroll delay={0.1}>
              <div className="space-y-4">
                <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">Industrial Solutions</p>
                <h3 className="heading-sub text-foreground">Heavy Machinery & Power.</h3>
                <p className="body-text !leading-relaxed text-muted-foreground text-sm">
                  Beyond the sea, we support land-based industries with high-capacity industrial engines, 
                  generator sets, and specialized power plant equipment designed for extreme reliability.
                </p>
                <ul className="space-y-3 pt-4">
                  {["Industrial Generator Sets", "Heavy Engine Components", "Power Plant Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-medium text-foreground/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="catalog" className="pt-24 md:pt-32">
        <ProductCatalog divisionSlug="marine-industrial" divisionName="Marine & Industrial" />
      </section>

      {/* Secondary Image/Content Block */}
      <section className="section-container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeInOnScroll direction="right">
              <div className="relative aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-border/10">
                <Image
                  src="/images/mood/hero-marine-detail.png"
                  alt="Quality inspection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <div className="space-y-8">
                <p className="label-tech text-primary">Availability Standards</p>
                <h2 className="heading-section">New, Used, or Reconditioned.</h2>
                <p className="body-text !leading-relaxed">
                  We understand maintenance budgets. Our inventory is curated to offer flexible sourcing 
                  options without compromising on safety or performance standards. Every part is 
                  rigorously inspected before global dispatch.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    {["GENUINE", "OEM", "RECONDITIONED"].map((tag, i) => (
                        <span key={i} className="px-5 py-2.5 rounded-full border border-border text-[10px] font-tech font-bold uppercase tracking-widest text-muted-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </FadeInOnScroll>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-foreground text-background py-24 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 pattern-grid-white opacity-5" />
        <div className="section-container relative z-10 flex flex-col items-center text-center">
          <FadeInOnScroll>
            <h2 className="heading-display !text-background mb-8">
              Need a specific part? <br />
              <span className="text-primary italic">Our team is ready.</span>
            </h2>
            <p className="body-text !text-background/60 max-w-2xl mx-auto mb-12">
              Our global sourcing network specializes in locating critical components for 
              out-of-production machinery and urgent maintenance requirements.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-6 px-10 py-5 rounded-full bg-primary text-white font-tech text-xs uppercase tracking-[0.3em] font-bold hover:scale-105 transition-all duration-500 shadow-2xl"
            >
              Request a Technical Quote <ChevronRight size={16} />
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
