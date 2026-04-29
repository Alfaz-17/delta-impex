"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

export function AboutPreviewSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Image Side */}
          <FadeInOnScroll direction="right">
            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/about-hero.png"
                alt="Delta Impex Industrial Legacy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-tech text-xs uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full">
                  Complete Engine & Machinery Solutions
                </p>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Content Side */}
          <div className="flex flex-col justify-center space-y-6">
            <FadeInOnScroll>
              <p className="label-tech text-accent-blue">The Delta Impex Legacy</p>
              <h2 className="heading-display">
                Marine Expertise. <br />
                <span className="text-accent-blue italic">Industrial Reliability.</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Internationally recognized as the most technically competent supplier from India for New, Recondition and Second-hand Engine Parts and Machinery.
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-xs font-medium">New</span>
                <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-xs font-medium">Reconditioned</span>
                <span className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-xs font-medium">Second-hand</span>
                <span className="px-3 py-1 bg-accent-blue text-white rounded-full text-xs font-medium">Class Certified</span>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-full text-sm font-medium transition-all hover:bg-accent shadow-lg"
              >
                Learn More
                <ChevronRight size={16} />
              </Link>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
