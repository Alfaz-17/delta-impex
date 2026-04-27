"use client";

import Image from "next/image";
import Link from "next/link";

export function PhilosophySection() {
  return (
    <section id="divisions" className="bg-background py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center lg:text-left">
          <p className="label-tech !text-primary mb-5">
            Our Core Divisions
          </p>
          <h2 className="heading-display mb-8">
            Specialized Solutions <br className="hidden md:block" />
            <span className="text-accent-blue italic">for Sea & Land.</span>
          </h2>
          <div className="max-w-2xl">
            <p className="body-text leading-relaxed">
              Delta Impex operates two specialized divisions: a reliable supplier of all types of ship spare parts and industrial equipment, 
              and the provision of advanced RO Water Treatment Plants for both marine and land-based applications.
            </p>
          </div>
        </div>

        {/* Static Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          <Card
            href="/divisions/marine-industrial"
            src="/images/marine-parts-clean.png"
            label="Marine & Industrial Parts"
            tag="Engineering"
          />

          <Card
            href="/divisions/ro-solutions"
            src="/ro/ro-plant-clean.png"
            label="RO Water Treatment"
            tag="Technical"
          />

        </div>
      </div>
    </section>
  );
}

function Card({ href, src, label, tag }: any) {
  return (
    <Link
      href={href}
      className="relative block aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden group border border-border/50"
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 opacity-90 group-hover:opacity-100" />

      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
        <div className="flex flex-col gap-2">
          {tag && (
            <span className="w-fit px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-tech text-white uppercase tracking-widest">
              {tag}
            </span>
          )}
          <h3 className="text-white font-display text-xl md:text-3xl font-medium tracking-tight">
            {label}
          </h3>
          <div className="h-[1px] w-0 bg-white/40 transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </Link>
  );
}
