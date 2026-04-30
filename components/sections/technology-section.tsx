"use client";

import Image from "next/image";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

export function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 border-t border-border">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)',
          backgroundSize: '2rem 2rem'
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <FadeInOnScroll>
              <p className="label-tech text-accent mb-6">Advanced Engineering</p>
              <h2 className="heading-display text-primary mb-8 uppercase tracking-tighter leading-none">
                RO Water <br />
                <span className="text-accent italic font-medium">Desalination.</span>
              </h2>
              <div className="space-y-8 max-w-xl">
                <p className="body-premium text-slate-600">
                  We supply specialized RO systems for both marine and industrial use, designed to convert saline seawater into clean, safe, and potable freshwater.
                </p>
                <p className="body-text text-slate-500 text-sm leading-relaxed">
                  Our technology plays a vital role in regions where freshwater resources are limited, especially in coastal and industrial areas. We provide complete solutions including Reverse Osmosis plants, water treatment equipment, and specialized maintenance support.
                </p>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-slate-100">
                  {[
                    "Seawater Desalination",
                    "Technical Maintenance",
                    "Advanced Filtration",
                    "Global Supply Chain",
                    "Industrial Scale",
                    "Marine Specialized"
                  ].map((item, i) => (
                    <li key={i} className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInOnScroll>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2">
            <FadeInOnScroll direction="right">
              <div className="relative group">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-accent/10 blur-[100px] opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity duration-700" />
                
                <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square overflow-hidden rounded-none border border-primary/5 shadow-2xl">
                  <Image
                    src="/ro/ro-plant-framed.png"
                    alt="Industrial RO Plant"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>

                {/* Technical Badge Overlay */}
                <div className="absolute -bottom-6 -left-6 bg-primary p-6 border border-white/10 hidden md:block">
                  <p className="font-tech text-[9px] uppercase tracking-[0.3em] text-white/60 mb-2">Technical Standard</p>
                  <p className="font-display font-bold text-xl text-white">ISO CERTIFIED</p>
                </div>
              </div>
            </FadeInOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
