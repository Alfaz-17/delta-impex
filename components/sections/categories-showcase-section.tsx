"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Anchor, Droplet, ArrowRight } from "lucide-react";
import Link from "next/link";

const divisionMeta: Record<string, { description: string; tag: string; image: string }> = {
  "marine-industrial": {
    description: "Reliable supplier of ship spare parts and industrial equipment. Specializing in main engines, turbochargers, and auxiliary machinery.",
    tag: "Maritime Excellence",
    image: "/images/mood/hero-marine-sunset.png"
  },
  "ro-water-treatment": {
    description: "Advanced RO systems for marine and land-based industries, converting seawater into pure drinking water with technical precision.",
    tag: "Technical Solutions",
    image: "/images/mood/ro-water-flow.png"
  },
};

export function CategoriesShowcaseSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCategories() {
      setIsLoading(true);
      try {
        const divRes = await fetch("/api/divisions");
        const divisions = await divRes.json();
        
        const catRes = await fetch("/api/categories");
        const allCategories = await catRes.json();
        
        const grouped = divisions.map((div: any) => ({
          ...div,
          categories: allCategories.filter((c: any) => c.division?._id === div._id || c.division === div._id)
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
    <section className="bg-background py-24 md:py-32 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-12 md:mb-24 lg:flex lg:items-end lg:justify-between gap-12">
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
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
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

                    {/* Categories as clean subtle list */}
                    <div className="mb-12">
                      <p className="label-tech !text-muted-foreground mb-6">Core Portfolio</p>
                      <div className="flex flex-wrap gap-x-8 gap-y-4">
                        {division.categories.slice(0, 6).map((cat: any) => (
                          <Link 
                            href={`/divisions/${division.slug}?category=${cat._id}`}
                            key={cat._id}
                            className="text-xs font-bold text-foreground/70 hover:text-primary transition-all flex items-center gap-2 group/link hover:translate-x-1"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover/link:bg-primary transition-colors" />
                            {cat.name}
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
