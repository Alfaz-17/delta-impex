"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Layers, Anchor, Droplet } from "lucide-react";
import Link from "next/link";

export function CategoriesShowcaseSection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCategories() {
      setIsLoading(true);
      try {
        // Fetch all divisions
        const divRes = await fetch("/api/divisions");
        const divisions = await divRes.json();
        
        // Fetch categories for all divisions
        const catRes = await fetch("/api/categories");
        const allCategories = await catRes.json();
        
        // Group by division
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
    <section className="bg-background py-24 md:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <p className="font-tech text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Our Expertise
          </p>
          <h2 className="heading-display text-4xl md:text-5xl">
            Industry Sectors.
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {categories.map((division) => (
              <div key={division._id} className="relative group">
                <div className="absolute inset-0 bg-muted/20 rounded-3xl -z-10 group-hover:bg-muted/40 transition-colors duration-500" />
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {division.slug === "marine-industrial" ? <Anchor className="w-5 h-5" /> : <Droplet className="w-5 h-5" />}
                    </div>
                    <h3 className="heading-sub text-2xl mb-0">{division.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {division.categories.map((cat: any) => (
                      <Link 
                        href={`/divisions/${division.slug}?category=${cat._id}`}
                        key={cat._id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/50 hover:border-primary/30 hover:bg-primary/5 transition-all group/item"
                      >
                        <span className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link 
                      href={`/divisions/${division.slug}`}
                      className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Explore Catalog &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
