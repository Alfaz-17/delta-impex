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
  subtitle = "Our newest products." // Updated default subtitle line
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
        const division = Array.isArray(divisions) ? divisions.find((d: any) => d.slug === targetSlug) : null;
        
        if (division) {
          let url = `/api/products?divisionId=${division._id}`;
          if (featuredOnly) {
            url += "&isFeatured=true";
          }
          const res = await fetch(url);
          const data = await res.json();
          setProducts(Array.isArray(data) ? data : []);
        } else {
          setProducts([]);
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
    <section id="parts-grid" className="bg-background py-12 md:py-24 lg:py-32">
      {/* Editorial Header: Left Aligned with Right CTA */}
      <div className="section-container mb-12 md:mb-32">
        <FadeInOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 border-b border-border/50 pb-8 md:pb-12">
            <div className="max-w-2xl">
              <h2 className="heading-display text-foreground leading-tight mb-4">
                {title}
              </h2>
              <p className="font-tech text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-6">
                 {/* Tab Switcher (Minimalist) */}
                {!hideTabs && (
                    <div className="flex items-center gap-6 border-b border-transparent">
                        <button
                            onClick={() => setActiveTab("marine")}
                            className={`font-tech text-[10px] uppercase tracking-widest transition-all pb-2 border-b ${
                                activeTab === "marine" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
                            }`}
                        >
                            Marine
                        </button>
                        <button
                            onClick={() => setActiveTab("ro")}
                            className={`font-tech text-[10px] uppercase tracking-widest transition-all pb-2 border-b ${
                                activeTab === "ro" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-foreground"
                            }`}
                        >
                            Water Systems
                        </button>
                    </div>
                )}
                
                <Link 
                    href={`/divisions/${divisionSlug || (activeTab === 'marine' ? 'marine-industrial' : 'ro-water-treatment')}`}
                    className="px-8 py-3.5 rounded-full border border-foreground text-[10px] font-tech font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-500"
                >
                    Shop Ready Stock
                </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </div>

      {/* Staggered Editorial Grid */}
      <div className="section-container">
        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
          </div>
        ) : (!Array.isArray(products) || products.length === 0) ? (
          <div className="text-center py-24 border border-dashed border-border/50 rounded-3xl opacity-40">
            <p className="font-tech text-[10px] uppercase tracking-[0.4em]">Inventory Synchronizing...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-16 lg:gap-x-20 md:gap-y-24">
            {products.map((product, index) => {
              // Staggering logic: 
              // Desktop (4 cols): offset 2nd and 4th
              // Mobile (2 cols): offset 2nd item in each row
              const isOffset = index % 2 === 1;
              const displayIndex = (index + 1).toString().padStart(2, '0');
              
              return (
                <FadeInOnScroll 
                  key={product._id} 
                  delay={(index % 4) * 0.1}
                >
                  <Link 
                    href={`/products/${product.slug}`}
                    className={`group relative flex flex-col block transition-all duration-1000 ${
                      isOffset ? "mt-12 md:mt-0 lg:mt-32" : ""
                    } ${
                        (index % 2 === 1) ? "md:mt-24 lg:mt-32" : ""
                    }`}
                  >

                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-muted/10 border border-border/10 shadow-sm transition-all duration-700 group-hover:shadow-2xl group-hover:border-white/20 p-4 flex items-center justify-center">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 md:p-8 group-hover:scale-105 transition-transform duration-1000"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </div>

                    {/* Content below image */}
                    <div className="pt-4 md:pt-8 lg:pt-10 pl-1 flex flex-col h-full">
                      <h3 className="font-display text-sm md:text-lg lg:text-xl font-medium text-foreground mb-2 md:mb-3 leading-tight transition-colors group-hover:text-white line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex justify-between items-center">
                           <span className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
                               {product.category?.name || 'Technical Component'}
                           </span>
                        </div>
                      </div>
                      
                      <div className="hidden lg:block absolute -right-8 lg:-right-10 top-0 bottom-0 w-[1px] bg-border/20 group-last:hidden" />
                    </div>
                  </Link>
                </FadeInOnScroll>
              );
            })}
          </div>
        )}
      </div>

      {/* Optional bottom margin for the next section */}
      <div className="h-24 md:h-40" />
    </section>
  );
}
