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
    title: "Marine Engineering",
    description:
      "A complete range of ship spare parts and machinery, from engine components to navigation systems. New, used, and reconditioned solutions.",
  },
  {
    icon: Zap,
    title: "Industrial Solutions",
    description:
      "Supporting land-based industries with machinery, generator sets, and infrastructure equipment tailored to operational requirements.",
  },
  {
    icon: Globe,
    title: "RO Water Treatment",
    description:
      "Advanced reverse osmosis desalination plants for marine and industrial use, converting raw water into clean, usable resources.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Service",
    description:
      "Building long-term partnerships through quality products, competitive pricing, and reliable global sourcing expertise.",
  },
];

export function AboutPreviewSection() {
  return (
    <section id="about-preview" className="relative bg-background overflow-hidden border-t border-border">
      {/* Grain texture */}
      <div className="grain-overlay absolute inset-0 pointer-events-none opacity-50" />

      {/* Top — Large statement + image */}
      <div className="relative px-6 pt-24 pb-16 md:px-12 md:pt-32 md:pb-20 lg:px-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20 items-start">
            
            {/* Left — Text (Split-style) */}
            <div className="lg:col-span-6">
              <FadeInOnScroll>
                <div>
                  <p className="label-tech text-primary mb-6">
                    The Delta Impex Legacy
                  </p>
                  <h2 className="heading-display text-foreground mb-8">
                    Industrial Mastery.
                    <br />
                    <span className="text-muted-foreground/60">Global Scale.</span>
                  </h2>
                  <p className="body-text !text-foreground !font-medium mb-6">
                    Bhavnagar-based specialists in <span className="text-primary italic">marine spare parts, industrial machinery, and advanced RO systems.</span>
                  </p>
                  <p className="body-text mb-10">
                    We deliver reliable, cost-effective solutions across both maritime and land-based industries, ensuring operational continuity through a massive global sourcing network.
                  </p>
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 btn-text text-foreground border-b border-primary/40 pb-2 hover:text-primary hover:border-primary transition-all duration-300"
                  >
                    Explore Our Core Story
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
            </div>

            {/* Right — Image & Stats */}
            <div className="lg:col-span-6">
              <FadeInOnScroll delay={0.2}>
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:rounded-[3rem] shadow-2xl">
                  <Image
                    src="/images/marine-parts-clean.png"
                    alt="Precision marine engineering — Delta Impex global operations"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Floating stat badge - Fixed to 3 divisions */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2rem] p-8">
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="heading-sub !mb-0 !font-semibold text-white">
                            3
                          </p>
                          <p className="label-tech !text-white/50 mt-1 !mb-0">
                            Divisions
                          </p>
                        </div>
                        <div className="border-x border-white/10">
                          <p className="heading-sub !mb-0 !font-semibold text-white">
                            50+
                          </p>
                          <p className="font-tech text-[10px] uppercase tracking-widest text-white/50 mt-1">
                            Countries
                          </p>
                        </div>
                        <div>
                          <p className="heading-sub !mb-0 !font-semibold text-white">
                            24/7
                          </p>
                          <p className="font-tech text-[10px] uppercase tracking-widest text-white/50 mt-1">
                            Precision
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
      </div>

      {/* Section Divider */}
      <div className="px-6 md:px-12 lg:px-20 mx-auto max-w-7xl">
        <div className="h-px bg-border/60" />
      </div>

      {/* Bottom — Capabilities Grid */}
      <div className="px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <FadeInOnScroll>
            <p className="label-tech text-primary mb-16">
              Core Technical Capabilities
            </p>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, i) => (
              <FadeInOnScroll key={i} delay={i * 0.1}>
                <div className="group relative p-6 md:p-10 border border-border rounded-2xl md:rounded-[2.5rem] hover:bg-muted/50 transition-all duration-500 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/20">
                    <cap.icon size={26} strokeWidth={1.5} />
                  </div>
                  {/* Title */}
                  <h3 className="heading-sub text-foreground mb-4">
                    {cap.title}
                  </h3>
                  {/* Description */}
                  <p className="body-text">
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
