"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Anchor, Droplet, ArrowRight, Globe } from "lucide-react";
import { MarineLoader } from "@/components/ui/marine-loader";
import Link from "next/link";

const divisionMeta: Record<string, { description: string; tag: string; image: string }> = {
  "marine-industrial": {
    description: "Reliable supplier of ship spare parts and industrial equipment. Specializing in main engines, turbochargers, and auxiliary machinery.",
    tag: "Maritime Excellence",
    image: "/images/mood/hero-marine-sunset.png"
  },
  "ro-solutions": {
    description: "Advanced RO systems for marine and land-based industries, converting seawater into pure drinking water with technical precision.",
    tag: "Technical Solutions",
    image: "/images/mood/ro-water-flow.png"
  },
};

import { STATIC_CATEGORIES } from "@/lib/categories";

export function CategoriesShowcaseSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCategories() {
      setIsLoading(true);
      try {
        const divRes = await fetch("/api/divisions");
        const divisions = await divRes.json();
        
        const grouped = divisions.map((div: any) => ({
          ...div,
          categories: STATIC_CATEGORIES.filter((c) => c.division === div.slug)
        }));
        
        setCategories(grouped);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllCategories();
  }, []);

  return (
    <section className="bg-background py-8 md:py-10 lg:py-12 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 lg:flex lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label-tech mb-5">
              Service Portfolio
            </p>
            <h2 className="heading-display mb-6">
              Critical Supplies. <br className="hidden md:block" />
              <span className="text-muted-foreground">Globally Sourced.</span>
            </h2>
          </div>
          <p className="body-text max-w-md lg:mb-8">
            Specialized solutions delivering high-quality marine engine components and advanced water treatment technologies across industrial sectors.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <MarineLoader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {categories.map((division) => {
              const meta = divisionMeta[division.slug] || { description: "", tag: "" };
              const isMarineDivision = division.slug === "marine-industrial";
              
              return (
                <div key={division._id} className="group relative rounded-3xl border border-border/20 overflow-hidden p-8 md:p-12 hover:border-primary/50 transition-all duration-700 min-h-[500px] flex flex-col justify-end">
                  
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={meta.image || "/images/about-hero-new.png"}
                      alt={division.name}
                      fill
                      className="object-cover opacity-30 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                  </div>

                  <div className="relative z-10">
                    {/* Top: Division Header */}
                    <div className="mb-10">
                      <div className="flex items-center justify-between mb-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isMarineDivision ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20' : 'bg-accent/20 text-accent shadow-lg shadow-accent/20'} backdrop-blur-md`}>
                          {isMarineDivision ? <Anchor className="w-6 h-6" /> : <Droplet className="w-6 h-6" />}
                        </div>
                        <span className="label-tech !mb-0 !text-muted-foreground">
                          {meta.tag}
                        </span>
                      </div>

                      <h3 className="heading-sub mb-4 !text-2xl md:text-3xl">
                        {division.name}
                      </h3>
                      
                      <p className="body-text !leading-relaxed max-w-md !text-foreground/80">
                        {meta.description}
                      </p>
                    </div>

                    {/* Categories as smooth marquee with images */}
                    <div className="mb-12 overflow-hidden relative">
                      <p className="label-tech !text-muted-foreground mb-6">Core Portfolio</p>
                      
                      {/* Edge fade masks for the card-level marquee */}
                      <div className="absolute left-0 bottom-0 top-[40px] w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                      <div className="absolute right-0 bottom-0 top-[40px] w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                      <div className="marquee-track-right flex gap-32">
                        {[...division.categories, ...division.categories, ...division.categories].map((cat: any, idx: number) => (
                          <Link 
                            href={`/products?category=${cat.slug}`}
                            key={`${cat.slug}-${idx}`}
                            className="group/link flex flex-col items-center gap-2 text-center transition-all duration-300 flex-shrink-0"
                          >
                            <div className="relative w-[450px] h-[450px] flex items-center justify-center transition-all duration-500 bg-white/5 backdrop-blur-sm rounded-[3rem] border border-white/5 group-hover/link:border-primary/30 group-hover/link:bg-primary/5">
                              {cat.imageUrl ? (
                                <img
                                  src={cat.imageUrl}
                                  alt={cat.name}
                                  className="w-full h-full object-contain p-2 transition-all duration-500 group-hover/link:scale-110"
                                />
                              ) : (
                                <Globe className="w-24 h-24 text-muted-foreground/60 group-hover/link:text-primary transition-colors" />
                              )}
                            </div>
                            <span className="font-tech text-base font-bold uppercase tracking-[0.2em] text-foreground/70 group-hover/link:text-primary transition-colors whitespace-nowrap">
                              {cat.name}
                            </span>





                          </Link>
                        ))}
                      </div>
                    </div>



                    {/* CTA Footer */}
                    <div className="pt-8 border-t border-border/20">
                      <Link 
                        href={`/divisions/${division.slug}`}
                        className="label-tech !mb-0 transition-all hover:gap-6 flex items-center gap-4 text-primary"
                      >
                        Explore Detailed Catalog
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
