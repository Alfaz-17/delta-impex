"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Anchor, Droplet, ArrowRight } from "lucide-react";
import Link from "next/link";

const divisionMeta: Record<string, { description: string; color: string }> = {
  "marine-industrial": {
    description: "Ship spare parts, engine components, turbochargers, pumps & industrial machinery.",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  "ro-water-treatment": {
    description: "Reverse osmosis plants, membranes, high-pressure pumps & water purification systems.",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
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
    <section className="bg-background py-20 md:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="label-tech !text-primary mb-3">
            Our Divisions
          </p>
          <h2 className="heading-display text-foreground mb-4">
            What We Supply.
          </h2>
          <p className="body-text max-w-xl">
            Two specialized divisions delivering comprehensive solutions across maritime and industrial sectors.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {categories.map((division) => {
              const meta = divisionMeta[division.slug] || { description: "", color: "" };
              const isMarineDivision = division.slug === "marine-industrial";
              
              return (
                <div key={division._id} className="group relative rounded-2xl md:rounded-3xl border border-border overflow-hidden bg-background hover:border-primary/20 transition-all duration-500">
                  
                  {/* Top: Division Header */}
                  <div className="p-6 md:p-8 pb-4 md:pb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${isMarineDivision ? 'bg-primary/10 text-primary' : 'bg-cyan-500/10 text-cyan-600'}`}>
                        {isMarineDivision ? <Anchor className="w-5 h-5" /> : <Droplet className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-display font-medium text-foreground" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}>
                          {division.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-tech uppercase tracking-wider">
                          {division.categories.length} categories
                        </p>
                      </div>
                    </div>
                    
                    <p className="body-text !leading-relaxed mb-5">
                      {meta.description}
                    </p>
                  </div>

                  {/* Categories as pill tags */}
                  <div className="px-6 md:px-8 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {division.categories.map((cat: any) => (
                        <Link 
                          href={`/divisions/${division.slug}?category=${cat._id}`}
                          key={cat._id}
                          className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all hover:scale-[1.03] active:scale-[0.97] ${
                            isMarineDivision 
                              ? 'bg-primary/5 text-primary border-primary/15 hover:bg-primary/10' 
                              : 'bg-cyan-500/5 text-cyan-700 border-cyan-500/15 hover:bg-cyan-500/10'
                          }`}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="p-6 md:p-8 pt-4 md:pt-5 border-t border-border/30">
                    <Link 
                      href={`/divisions/${division.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors"
                    >
                      <span className="uppercase tracking-widest font-tech text-[11px]">
                        Explore Full Catalog
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
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
