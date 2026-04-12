"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Metadata } from 'next'
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
    <p ref={containerRef} className="text-3xl font-semibold leading-snug md:text-4xl lg:text-5xl font-sans">
      {words.map((word, index) => {
        const wordProgress = index / words.length;
        const isRevealed = progress > wordProgress;
        return (
          <span key={index} className="transition-colors duration-150" style={{ color: isRevealed ? "var(--foreground)" : "#e4e4e7" }}>
            {word}{index < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}

function FadeInOnScroll({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(60px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      setOffset(scrollProgress * 80 - 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl md:rounded-[3rem]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      />
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
            src="/images/hero-clean.png"
            alt="Marine and Industrial engineering legacy"
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
          <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-white/70 mb-6">
            Global Industrial Expertise
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[8vw] font-bold leading-[0.95] tracking-tighter text-white">
            Our Legacy.
          </h1>
        </div>
      </section>

      {/* About Section - Split Layout */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4">
                  Company Overview
                </p>
                <h2 className="font-display text-4xl leading-tight md:text-5xl font-medium text-foreground">
                  About Delta Impex.
                </h2>
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="lg:col-span-8 space-y-16">
              <FadeInOnScroll>
                <div className="space-y-2">
                  <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">Introduction</p>
                  <p className="text-xl md:text-3xl leading-relaxed font-sans text-foreground font-medium">
                    Delta Impex is a Bhavnagar-based company specializing in <span className="text-primary">marine spare parts, industrial solutions, and RO water treatment systems</span>, delivering reliable and cost-effective solutions to clients across both maritime and land-based industries.
                  </p>
                </div>
              </FadeInOnScroll>
              
              <FadeInOnScroll delay={0.1}>
                <div className="space-y-4">
                  <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">Marine Division</p>
                  <h3 className="font-display text-2xl font-medium text-foreground">Global Marine Engineering.</h3>
                  <p className="text-lg md:text-xl leading-relaxed font-sans text-muted-foreground">
                    In the <strong className="text-foreground font-medium border-b border-primary/20">marine sector</strong>, we supply a complete range of ship spare parts and machinery, including main and auxiliary engine components, turbochargers, pumps, compressors, navigation equipment, and engine room systems. We offer <strong className="text-foreground font-medium">new, used, and reconditioned parts</strong>, ensuring flexibility and affordability without compromising on quality.
                  </p>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={0.15}>
                <div className="space-y-4">
                  <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">Industrial Division</p>
                  <h3 className="font-display text-2xl font-medium text-foreground">Heavy Industrial Solutions.</h3>
                  <p className="text-lg md:text-xl leading-relaxed font-sans text-muted-foreground">
                    Our <strong className="text-foreground font-medium border-b border-primary/20">industrial division</strong> supports land-based industries with machinery, generator sets, spare parts, and essential equipment. We cater to factories, plants, and infrastructure projects with dependable products tailored to operational requirements.
                  </p>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={0.2}>
                <div className="space-y-4">
                  <p className="font-tech text-[10px] uppercase tracking-widest text-primary font-bold">RO Water Treatment</p>
                  <h3 className="font-display text-2xl font-medium text-foreground">Advanced Desalination.</h3>
                  <p className="text-lg md:text-xl leading-relaxed font-sans text-muted-foreground">
                    Alongside this, we provide advanced <strong className="text-foreground font-medium border-b border-primary/20">RO water treatment and desalination solutions</strong> for both marine and industrial use. From reverse osmosis plants to complete water purification systems and maintenance support, we help convert seawater and raw water into clean, usable resources.
                  </p>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={0.25}>
                <div className="pt-12 border-t border-border space-y-8">
                  <p className="text-lg md:text-xl leading-relaxed font-sans text-muted-foreground italic">
                    With strong sourcing capabilities, industry expertise, and a commitment to timely delivery, Delta Impex ensures high performance, reliability, and customer satisfaction in every project.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed font-sans text-foreground font-medium">
                    We are dedicated to building long-term relationships by delivering <span className="text-primary underline underline-offset-8 decoration-solid">quality products, competitive pricing, and trusted service</span> across all our business segments.
                  </p>
                </div>
              </FadeInOnScroll>
            </div>

          </div>
        </div>
      </section>

      {/* Vision Statement Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-foreground text-background">
        <div className="mx-auto max-w-5xl text-center">
          <FadeInOnScroll>
            <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-background/50 mb-8">
              Our Vision
            </p>
            <p className="font-display text-3xl leading-snug md:text-5xl font-medium text-background">
              "To become a trusted global supplier in marine, industrial, and water treatment sectors by delivering reliable, efficient, and cost-effective solutions."
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Why Choose Us - Nexterra Split Layout */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background border-t border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4">
                  Our Advantage
                </p>
                <h2 className="font-display text-4xl leading-tight md:text-5xl font-medium text-foreground">
                  Why Choose<br/>Delta Impex.
                </h2>
              </div>
            </div>

            {/* Scrolling Right Column - Value Props */}
            <div className="lg:col-span-8 space-y-24">
              
              {/* Category 1: Marine & Industrial */}
              <div className="space-y-12">
                <FadeInOnScroll>
                  <h3 className="font-tech text-xs font-bold uppercase tracking-widest text-primary border-b border-border pb-4">
                    Marine & Industrial Solutions
                  </h3>
                </FadeInOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {[
                    {
                      title: "Complete Range of Products",
                      desc: "We supply a wide variety of marine spare parts and industrial equipment, covering engines, machinery, and essential components."
                    },
                    {
                      title: "New, Used & Reconditioned Options",
                      desc: "Flexible sourcing options help reduce costs while maintaining performance and reliability."
                    },
                    {
                      title: "Strong Global Sourcing Network",
                      desc: "Our network enables us to quickly source and deliver even hard-to-find spare parts."
                    },
                    {
                      title: "Fast Response & Timely Delivery",
                      desc: "We understand the urgency of operations and ensure quick turnaround to minimize downtime."
                    },
                    {
                      title: "Quality & Reliability",
                      desc: "All products are carefully selected to meet industry standards and ensure long-term performance."
                    },
                    {
                      title: "Cost-Effective Solutions",
                      desc: "We provide competitive pricing without compromising on quality."
                    }
                  ].map((item, idx) => (
                    <FadeInOnScroll key={idx} delay={idx * 0.05}>
                      <div className="group">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-tech text-xs text-muted-foreground font-bold italic">M{idx + 1}</span>
                          <div className="h-px flex-1 bg-border group-hover:bg-primary/30 transition-colors" />
                        </div>
                        <h4 className="font-display text-xl font-medium mb-3 text-foreground">{item.title}</h4>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>

              {/* Category 2: RO Water Treatment */}
              <div className="space-y-12">
                <FadeInOnScroll>
                  <h3 className="font-tech text-xs font-bold uppercase tracking-widest text-primary border-b border-border pb-4">
                    RO Water Treatment Solutions
                  </h3>
                </FadeInOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {[
                    {
                      title: "Advanced Water Treatment Technology",
                      desc: "We offer modern reverse osmosis systems designed for efficient and reliable water purification."
                    },
                    {
                      title: "Marine & Industrial Applications",
                      desc: "Our RO solutions are suitable for ships, coastal areas, and industrial plants."
                    },
                    {
                      title: "Complete System Supply",
                      desc: "From RO plants to filtration systems and spare parts, we provide end-to-end solutions."
                    },
                    {
                      title: "High Efficiency & Performance",
                      desc: "Our systems ensure effective removal of salts, impurities, and contaminants."
                    },
                    {
                      title: "Maintenance & Support",
                      desc: "We provide ongoing support and spare parts to ensure smooth operation."
                    },
                    {
                      title: "Sustainable & Reliable Solutions",
                      desc: "Our water treatment systems help convert seawater into clean, usable water efficiently."
                    }
                  ].map((item, idx) => (
                    <FadeInOnScroll key={idx} delay={idx * 0.05}>
                      <div className="group">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="font-tech text-xs text-muted-foreground font-bold italic">W{idx + 1}</span>
                          <div className="h-px flex-1 bg-border group-hover:bg-primary/30 transition-colors" />
                        </div>
                        <h4 className="font-display text-xl font-medium mb-3 text-foreground">{item.title}</h4>
                        <p className="font-sans text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeInOnScroll>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Unique Visual Break */}
      <section className="px-6 md:px-12 lg:px-20">
        <ParallaxImage src="/images/mood/hero-industrial-detail.png" alt="Precision machinery detail" />
      </section>

      {/* Values Grid - Perfectly Balanced Length */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="p-8 border border-border rounded-[2rem] hover:bg-muted/50 transition-all duration-500 h-full flex flex-col">
                  <h3 className="font-display text-xl font-medium mb-4">{v.title}</h3>
                  <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Final Unique Bottom Visual - RO Focus */}
      <section className="px-6 py-24 md:px-12 lg:px-20">
        <ParallaxImage src="/images/mood/ro-water-flow.png" alt="Industrial Water Treatment Flow" />
      </section>

      <FooterSection />
    </main>
  );
}
