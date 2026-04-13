"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

type CategoryType = "marine" | "ro";

interface FeaturedProductsSectionProps {
  initialCategory?: CategoryType;
  divisionSlug?: string;
  hideTabs?: boolean;
  featuredOnly?: boolean;
  title?: string;
  subtitle?: string;
}

export function FeaturedProductsSection({ 
  initialCategory = "marine",
  divisionSlug,
  hideTabs = false,
  featuredOnly = false,
  title = "Detailed Inventory.",
  subtitle = "Dual-Sector Expertise."
}: FeaturedProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>(initialCategory);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const targetSlug = divisionSlug || (activeTab === "marine" ? "marine-industrial" : "ro-water-treatment");
        
        const divRes = await fetch("/api/divisions");
        const divisions = await divRes.json();
        const division = divisions.find((d: any) => d.slug === targetSlug);
        
        if (division) {
          let url = `/api/products?divisionId=${division._id}`;
          if (featuredOnly) {
            url += "&isFeatured=true";
          }
          const res = await fetch(url);
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [activeTab, divisionSlug, featuredOnly]);

  return (
    <section id="parts-grid" className="bg-background py-16 md:py-24 lg:py-32">
      {/* Section Title & Tabs */}
      <div className="px-6 text-center md:px-12 lg:px-20 mb-12 md:mb-20">
        <FadeInOnScroll>
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-display text-foreground uppercase mb-6">
              {title}
              <br />
              <span className="text-muted-foreground">{subtitle}</span>
            </h2>
            
            {/* Tab Switcher */}
            {!hideTabs && (
              <div className="mt-10 flex justify-center">
                <div className="inline-flex items-center rounded-full bg-muted/30 p-1.5 border border-border/50 backdrop-blur-sm">
                  <button
                    onClick={() => setActiveTab("marine")}
                    className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 ${
                      activeTab === "marine" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Marine Industrial
                  </button>
                  <button
                    onClick={() => setActiveTab("ro")}
                    className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 ${
                      activeTab === "ro" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Water Systems
                  </button>
                </div>
              </div>
            )}

            <p className="mx-auto mt-8 max-w-xl body-text !leading-relaxed">
              {activeTab === "marine" 
                ? "Expertly sourced main engine components, auxiliary machinery, and essential industrial equipment for global operations."
                : "Advanced desalination and purification components designed for high-performance RO water treatment environments."}
            </p>
          </div>
        </FadeInOnScroll>
      </div>

      {/* Features Grid */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="flex justify-center items-center py-40">
              <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border/50 rounded-3xl opacity-40">
              <p className="font-tech text-[10px] uppercase tracking-[0.4em]">Inventory Synchronizing...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
              {products.map((product, index) => (
                <FadeInOnScroll 
                  key={product._id} 
                  delay={index * 0.1}
                >
                  <div 
                    className={`group relative flex flex-col transition-all duration-700 ${
                      index % 2 === 1 ? "md:mt-24" : ""
                    }`}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-3xl bg-muted/20 border border-border/10">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 600px"
                      />
                      
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Featured Badge */}
                      {product.isFeatured && (
                        <div className="absolute top-5 right-5 z-20 overflow-hidden rounded-full">
                          <div className="absolute inset-0 bg-primary/95 backdrop-blur-md" />
                          <p className="relative px-4 py-1.5 text-[9px] font-bold text-white uppercase tracking-[0.2em]">
                            Featured
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-8 md:pt-10">
                      <div className="flex justify-between items-center mb-4">
                        <span className="label-tech !text-primary !mb-0">
                          {product.category?.name || 'Technical Solutions'}
                        </span>
                        {product.price && (
                          <span className="font-tech text-[10px] text-muted-foreground/60">
                            REF: {product._id?.substring(0, 8).toUpperCase()}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="heading-sub !mb-3 transition-colors group-hover:text-primary">
                        {product.name}
                      </h3>
                      
                      {product.description && (
                        <p className="body-text line-clamp-2 md:line-clamp-3 mb-6">
                          {product.description}
                        </p>
                      )}

                      <Link 
                        href={`/divisions/${product.division?.slug || (activeTab === 'marine' ? 'marine-industrial' : 'ro-water-treatment')}`}
                        className="inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-bold group-hover:text-primary transition-colors"
                      >
                        Technical Specs <ArrowRight className="w-3 h-3 translate-y-[-1px] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
