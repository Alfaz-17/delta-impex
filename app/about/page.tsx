"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
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
            src="/images/hero-main.png"
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

      {/* Intro Text Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background">
        <div className="mx-auto max-w-5xl">
          <ScrollRevealText text="Delta Impex is specialized in providing premium marine and industrial machinery spare parts and advanced RO water treatment systems. Built on a foundation of reliability and precision, we serve the global fleet and engineering industries with unwavering commitment." />
        </div>
      </section>

      {/* Why Choose Us (Editorial) */}
      <EditorialSection />

      {/* Parallax Break */}
      <section className="px-6 md:px-12 lg:px-20">
        <ParallaxImage src="/images/mood/hero-industrial-scale.png" alt="Industrial scale operations" />
      </section>

      {/* Testimonials / Integrity */}
      <TestimonialsSection />

      {/* Values Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="p-8 border border-border rounded-3xl hover:bg-muted transition-colors duration-500">
                  <h3 className="font-display text-2xl font-medium mb-4">{v.title}</h3>
                  <p className="text-muted-foreground text-sm font-sans leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Visual */}
      <section className="px-6 py-24 md:px-12 lg:px-20">
        <ParallaxImage src="/images/mood/vision-abstract.png" alt="Vision for the future" />
      </section>

      <FooterSection />
    </main>
  );
}
