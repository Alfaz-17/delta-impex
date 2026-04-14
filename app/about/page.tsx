"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(progress, [start, end], ["rgba(0,0,0,0.15)", "var(--foreground)"]);
  
  return (
    <motion.span style={{ color }}>
      {word}{index < total - 1 ? " " : ""}
    </motion.span>
  );
}

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.2"]
  });
  
  const words = text.split(" ");
  
  return (
    <p ref={containerRef} className="heading-section !not-italic !font-semibold font-sans">
      {words.map((word, index) => (
        <Word 
          key={index} 
          word={word} 
          index={index} 
          total={words.length} 
          progress={scrollYProgress} 
        />
      ))}
    </p>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl md:rounded-[3rem]">
      <motion.div style={{ y, height: "120%", top: "-10%", position: "absolute", width: "100%" }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    </div>
  );
}

const values = [
  {
    title: "Quality First",
    description: "We source only the highest-quality parts — new, used, or reconditioned — each thoroughly inspected before delivery.",
  },
  {
    title: "Timely Delivery",
    description: "Our logistics network ensures your parts reach you on schedule, whether at port or at your facility.",
  },
  {
    title: "Cost-Effective",
    description: "We help optimize your maintenance budgets with competitive pricing across our full product range.",
  },
  {
    title: "Long-Term Trust",
    description: "We don't just sell parts — we build relationships that last decades with consistent service and reliability.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(heroProgress, [0, 1], [1.1, 1.2]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);

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
            src="/images/mood/hero-marine-sunset.png"
            alt="Delta Impex Legacy"
            fill
            className="object-cover opacity-70 contrast-125 saturate-50"
            priority
          />
          {/* Legibility overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 text-center px-6" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)' }}>
          <FadeInOnScroll>
            <p className="label-tech text-white/80 mb-6 drop-shadow-xl">
              Global Industrial Expertise
            </p>
            <h1 className="heading-display text-white !leading-[0.95] drop-shadow-2xl">
              Our Legacy.
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Main Content */}
      <div className="section-container pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-12">
            <FadeInOnScroll>
              <div className="mb-12 md:mb-16">
                <p className="label-tech text-muted-foreground mb-4">
                  Company Overview
                </p>
                <h2 className="heading-section text-foreground">
                  About Delta Impex.
                </h2>
              </div>
            </FadeInOnScroll>
          </div>

          {/* Large Reveal Text */}
          <div className="lg:col-span-8">
            <div className="space-y-2">
              <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">Introduction</p>
              <ScrollRevealText text="Delta Impex is a Bhavnagar-based company specializing in marine spare parts, industrial solutions, and RO water treatment systems, delivering reliable and cost-effective solutions to clients across both maritime and land-based industries." />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-4 space-y-12">
            <FadeInOnScroll delay={0.1}>
              <div className="space-y-4">
                <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">Marine Division</p>
                <h3 className="heading-sub text-foreground !mb-4">Global Marine Engineering.</h3>
                <p className="body-text !leading-relaxed text-muted-foreground">
                  In the <strong className="text-foreground font-medium border-b border-primary/20">marine sector</strong>, we supply a complete range of ship spare parts and machinery, including main and auxiliary engine components, turbochargers, pumps, compressors, navigation equipment, and engine room systems. 
                </p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.15}>
              <div className="space-y-4">
                <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">Industrial Division</p>
                <h3 className="heading-sub text-foreground">Heavy Industrial Solutions.</h3>
                <p className="body-text !leading-relaxed text-muted-foreground">
                  Our <strong className="text-foreground font-medium border-b border-primary/20">industrial division</strong> supports land-based industries with machinery, generator sets, spare parts, and essential equipment.
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>

        {/* Feature Image */}
        <div className="mt-24 md:mt-32 rounded-3xl md:rounded-[3rem] overflow-hidden bg-muted/10 border border-border/50">
          <Image 
            src="/about-delta.jpeg" 
            alt="Delta Impex Industrial Scale" 
            width={1920}
            height={1080}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
          />
        </div>

        {/* Vision Section */}
        <div className="mt-24 md:mt-32 py-24 px-8 md:px-16 bg-foreground rounded-3xl md:rounded-[4rem] text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/5 pattern-grid-white opacity-10" />
          <FadeInOnScroll className="relative z-10 max-w-4xl mx-auto">
            <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-background/50 mb-8">
              Our Vision
            </p>
            <p className="heading-section !not-italic !font-medium text-background">
              "To become a trusted global supplier in marine, industrial, and water treatment sectors by delivering reliable, efficient, and cost-effective solutions."
            </p>
          </FadeInOnScroll>
        </div>

        {/* Values Section */}
        <div className="mt-24 md:mt-32 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <FadeInOnScroll>
              <div>
                <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">
                  Our Advantage
                </p>
                <h2 className="heading-display text-foreground">
                  Why Choose<br/>Delta Impex.
                </h2>
              </div>
            </FadeInOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              {values.map((item, idx) => (
                <FadeInOnScroll key={idx} delay={idx * 0.1}>
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-tech text-xs text-primary font-bold">0{idx + 1}</span>
                      <div className="h-px flex-1 bg-border group-hover:bg-primary/30 transition-colors" />
                    </div>
                    <h4 className="heading-sub text-foreground !mb-3">{item.title}</h4>
                    <p className="body-text text-muted-foreground">{item.description}</p>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
