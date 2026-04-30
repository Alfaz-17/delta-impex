"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

interface AboutPreviewSectionProps {
  isDark?: boolean;
}

export function AboutPreviewSection({ isDark = true }: AboutPreviewSectionProps) {
  return (
    <section className={`py-24 md:py-32 relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-primary" : "bg-background"}`}>
      {/* Background patterns */}
      <div className={`absolute inset-0 opacity-5 ${isDark ? "opacity-5" : "opacity-[0.03]"}`} 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, ${isDark ? 'white' : '#1B3A5C'} 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} 
      />
      <div className={`absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2 pointer-events-none ${isDark ? "opacity-100" : "opacity-20"}`} />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <FadeInOnScroll direction="right">
            <div className="relative group">
              <div className={`relative aspect-[4/3] rounded-none overflow-hidden border shadow-2xl transition-all duration-700 ${isDark ? "border-white/10" : "border-primary/10"}`}>
                <Image
                  src="/about-hero.png"
                  alt="Delta Impex Industrial Legacy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />
              </div>
              
              {/* Premium Experience Badge */}
              <div className={`absolute -bottom-8 -right-8 p-8 hidden md:block border shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 ${
                isDark ? "bg-background border-border" : "bg-primary border-white/10 shadow-[0_20px_50px_rgba(27,58,92,0.3)]"
              }`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                <span className={`font-display font-bold text-5xl block leading-none ${isDark ? "text-primary" : "text-white"}`}>30<span className="text-accent">+</span></span>
                <span className={`font-tech text-[10px] uppercase font-bold tracking-[0.3em] block mt-3 ${isDark ? "text-accent" : "text-white/60"}`}>Years of Mastery</span>
                <div className={`mt-4 pt-4 border-t flex items-center gap-2 ${isDark ? "border-border" : "border-white/10"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className={`text-[9px] font-tech uppercase tracking-widest ${isDark ? "text-muted-foreground" : "text-white/40"}`}>Industry Leader</span>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          {/* Content Side */}
          <div className="flex flex-col justify-center space-y-8">
            <FadeInOnScroll>
              <p className="label-tech text-accent mb-4">The Delta Impex Legacy</p>
              <h2 className={`heading-display mb-6 uppercase tracking-tighter ${isDark ? "text-white" : "text-primary"}`}>
                Marine Expertise. <br />
                <span className="text-accent italic font-medium">Industrial Reliability.</span>
              </h2>
              <div className="space-y-6">
                <p className={`body-premium leading-relaxed ${isDark ? "text-white/80" : "text-slate-600"}`}>
                  Internationally recognized as the most technically competent supplier from India for New, Recondition and Second-hand Engine Parts and Machinery.
                </p>
                <p className={`body-text text-sm ${isDark ? "text-white/60" : "text-slate-500"}`}>
                  Based in Bhavnagar, Gujarat, we have been a cornerstone of the maritime supply chain, specializing in high-quality marine ship spares and critical machinery equipment since 2017.
                </p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <div className="flex flex-wrap gap-4">
                <span className={`btn-text px-4 py-1.5 transition-colors ${isDark ? "bg-white text-primary" : "bg-primary text-white"}`}>New</span>
                <span className={`btn-text px-4 py-1.5 transition-colors ${isDark ? "bg-white text-primary" : "bg-primary text-white"}`}>Used</span>
                <span className={`btn-text px-4 py-1.5 transition-colors ${isDark ? "bg-white text-primary" : "bg-primary text-white"}`}>Reconditioned</span>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3}>
              <Link
                href="/about"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-none font-display font-bold uppercase text-sm tracking-widest transition-all shadow-xl group ${
                  isDark ? "bg-white text-primary hover:bg-accent hover:text-white" : "bg-primary text-white hover:bg-accent"
                }`}
              >
                Learn Our Story
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeInOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
