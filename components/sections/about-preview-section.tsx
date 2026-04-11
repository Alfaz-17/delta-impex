"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Anchor, Globe, Zap, ShieldCheck } from "lucide-react";

function FadeInOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "translateY(0px)";
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(50px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

const capabilities = [
  {
    icon: Anchor,
    title: "Marine Spare Parts",
    description:
      "Complete range of main engine, auxiliary engine, and deck machinery spare parts for all major marine brands worldwide.",
  },
  {
    icon: Globe,
    title: "Global Sourcing",
    description:
      "Strategic sourcing network spanning multiple continents, ensuring competitive pricing and reliable availability for every order.",
  },
  {
    icon: Zap,
    title: "RO Water Treatment",
    description:
      "Custom-engineered Reverse Osmosis desalination plants for marine vessels and land-based industrial applications.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Every part is rigorously inspected and certified — whether new, reconditioned, or OEM-equivalent — before dispatch.",
  },
];

export function AboutPreviewSection() {
  return (
    <section id="about-preview" className="relative bg-background overflow-hidden">
      {/* Grain texture */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Top — Large statement + image */}
      <div className="relative px-6 pt-24 pb-16 md:px-12 md:pt-32 md:pb-20 lg:px-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Left — Text */}
            <FadeInOnScroll>
              <div>
                <p className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
                  About Delta Impex
                </p>
                <h2 className="font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.05] mb-8">
                  Engineering Trust
                  <br />
                  <span className="text-muted-foreground">Since Day One.</span>
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-xl mb-4">
                  Delta Impex is a specialized supplier of high-quality marine &amp;
                  industrial machinery spare parts and advanced RO water treatment
                  systems. We serve shipyards, vessel operators, and industrial
                  facilities across the globe.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground max-w-xl">
                  With a commitment to precision, prompt delivery, and long-term
                  partnerships, we have built a reputation as a trusted name in the
                  marine and industrial engineering sectors.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 mt-10 font-tech text-sm uppercase tracking-[0.15em] text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors duration-300"
                >
                  Learn More About Us
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </FadeInOnScroll>

            {/* Right — Image */}
            <FadeInOnScroll delay={0.2}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/mood/hero-marine-sunset.png"
                  alt="Marine vessel at sunset — Delta Impex global operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                {/* Floating stat badge */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="font-display text-2xl font-semibold text-white md:text-3xl">
                          2
                        </p>
                        <p className="font-tech text-[10px] uppercase tracking-widest text-white/60 mt-1">
                          Divisions
                        </p>
                      </div>
                      <div className="border-x border-white/20">
                        <p className="font-display text-2xl font-semibold text-white md:text-3xl">
                          50+
                        </p>
                        <p className="font-tech text-[10px] uppercase tracking-widest text-white/60 mt-1">
                          Countries
                        </p>
                      </div>
                      <div>
                        <p className="font-display text-2xl font-semibold text-white md:text-3xl">
                          24/7
                        </p>
                        <p className="font-tech text-[10px] uppercase tracking-widest text-white/60 mt-1">
                          Support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="mx-6 md:mx-12 lg:mx-20">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Bottom — Capabilities Grid */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeInOnScroll>
            <p className="font-tech text-xs uppercase tracking-[0.3em] text-muted-foreground mb-16 text-center">
              What We Do
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="group relative p-8 border border-border rounded-3xl hover:bg-muted/50 transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 group-hover:scale-110">
                    <cap.icon size={22} strokeWidth={1.5} />
                  </div>
                  {/* Title */}
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    {cap.title}
                  </h3>
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {cap.description}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
