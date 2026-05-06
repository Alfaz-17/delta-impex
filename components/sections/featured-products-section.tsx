"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { m, AnimatePresence } from "framer-motion";

type CategoryType = "marine" | "ro";

interface FeaturedProductsSectionProps {
  initialCategory?: CategoryType;
  divisionSlug?: string;
  hideTabs?: boolean;
  featuredOnly?: boolean;
  title?: string;
  subtitle?: string;
  isDark?: boolean;
  viewAllText?: string;
  technicalDetailsText?: string;
  emptyText?: string;
  initialProducts?: any[];
}

export function FeaturedProductsSection({ 
  initialCategory = "marine",
  divisionSlug,
  hideTabs = false,
  featuredOnly = false,
  title = "Detailed Inventory.",
  subtitle = "Our newest products.",
  isDark = true,
  viewAllText,
  technicalDetailsText,
  emptyText,
  initialProducts = []
}: FeaturedProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>(initialCategory);
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(initialProducts.length === 0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      // If we already have initial products and this is the first load, don't fetch
      if (initialProducts.length > 0 && products === initialProducts) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const targetSlug = divisionSlug || (activeTab === "marine" ? "marine-industrial" : "ro-solutions");
        const slugCandidates = [targetSlug];

        let loadedProducts: any[] = [];

        for (const slug of slugCandidates) {
          let url = `/api/products?divisionSlug=${slug}&limit=12`;
          if (featuredOnly) {
            url += "&isFeatured=true";
          }

          const res = await fetch(url);
          const data = await res.json();
          if (Array.isArray(data) && data.length) {
            loadedProducts = data;
            break;
          }
        }

        // UX fallback: if no featured products are marked yet, show latest items.
        if (!loadedProducts.length && featuredOnly) {
          for (const slug of slugCandidates) {
            const res = await fetch(`/api/products?divisionSlug=${slug}&limit=12`);
            const data = await res.json();
            if (Array.isArray(data) && data.length) {
              loadedProducts = data;
              break;
            }
          }
        }

        setProducts(loadedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [activeTab, divisionSlug, featuredOnly]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`py-24 md:py-32 overflow-hidden relative ${isDark ? "bg-primary text-white" : "bg-background text-foreground"}`}>
      {/* Background patterns for dark mode */}
      {isDark && (
        <>
          <div className="absolute inset-0 opacity-5" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} 
          />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2 pointer-events-none" />
        </>
      )}

      {/* Editorial Header */}
      <div className="section-container mb-12 md:mb-16 relative z-10">
        <FadeInOnScroll>
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-12 ${isDark ? "border-white/10" : "border-border/50"}`}>
            <div className="max-w-xl">
              <p className={`label-tech uppercase tracking-[0.3em] mb-4 ${isDark ? "text-accent" : "text-primary"}`}>
                {subtitle}
              </p>
              <h2 className="heading-display uppercase tracking-tighter">
                {title.split(' ').slice(0, -1).join(' ')} <span className={`${isDark ? "text-accent" : "text-accent-blue"} italic font-medium`}>{title.split(' ').slice(-1)}</span>
              </h2>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-8">
                <div className="flex items-center gap-6">
                    {!hideTabs && (
                        <div className="flex items-center gap-6 px-1">
                            <button
                                onClick={() => setActiveTab("marine")}
                                className={`label-tech !mb-0 transition-all pb-2 border-b-2 ${
                                    activeTab === "marine" 
                                      ? (isDark ? "text-white border-accent" : "text-primary border-accent") 
                                      : (isDark ? "text-white/40 border-transparent hover:text-white" : "text-muted-foreground border-transparent hover:text-foreground")
                                }`}
                            >
                                Marine
                            </button>
                            <button
                                onClick={() => setActiveTab("ro")}
                                className={`label-tech !mb-0 transition-all pb-2 border-b-2 ${
                                    activeTab === "ro" 
                                      ? (isDark ? "text-white border-accent" : "text-primary border-accent") 
                                      : (isDark ? "text-white/40 border-transparent hover:text-white" : "text-muted-foreground border-transparent hover:text-foreground")
                                }`}
                            >
                                Water
                            </button>
                        </div>
                    )}
                    
                    {/* Premium Controls */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => scroll('left')}
                            className={`w-12 h-12 rounded-none border flex items-center justify-center transition-all duration-300 ${
                              isDark 
                                ? "border-white/10 text-white hover:bg-white hover:text-primary" 
                                : "border-border text-foreground hover:bg-foreground hover:text-background"
                            }`}
                            aria-label="Scroll Left"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className={`w-12 h-12 rounded-none border flex items-center justify-center transition-all duration-300 ${
                              isDark 
                                ? "border-white/10 text-white hover:bg-white hover:text-primary" 
                                : "border-border text-foreground hover:bg-foreground hover:text-background"
                            }`}
                            aria-label="Scroll Right"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <Link 
                    href={`/products?divisionSlug=${divisionSlug || (activeTab === 'marine' ? 'marine-industrial' : 'ro-solutions')}`}
                    className={`group flex items-center gap-3 text-[10px] font-tech font-bold uppercase tracking-widest transition-colors ${
                      isDark ? "text-white/40 hover:text-accent" : "text-muted-foreground hover:text-primary"
                    }`}
                >
                    {viewAllText || "View Full Directory"} 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </div>

      {/* Horizontal Scroller Container */}
      <div className="relative z-10">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 md:gap-12 px-[5%] md:px-[6%] pb-12 snap-x snap-mandatory no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {isLoading ? (
            <div className="flex gap-8 md:gap-12 w-full">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex-none w-[280px] md:w-[320px] space-y-8">
                  <div className={`aspect-square w-full ${isDark ? "bg-white/5" : "bg-slate-100"} animate-pulse rounded-none`} />
                  <div className="space-y-4 px-2">
                    <div className={`h-3 w-24 ${isDark ? "bg-white/10" : "bg-slate-100"} animate-pulse`} />
                    <div className={`h-6 w-full ${isDark ? "bg-white/10" : "bg-slate-100"} animate-pulse`} />
                  </div>
                </div>
              ))}
            </div>
          ) : (!Array.isArray(products) || products.length === 0) ? (
            <div className={`w-full text-center py-24 border border-dashed rounded-none opacity-40 ${isDark ? "border-white/20" : "border-border/50"}`}>
              <p className="font-tech text-[10px] uppercase tracking-[0.4em]">{emptyText || "Establishing Catalog Sync..."}</p>
            </div>
          ) : (
            products.map((product, index) => {
              return (
                <m.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                  className="flex-none w-[280px] md:w-[320px] snap-start transform-gpu"
                >
                  <Link 
                    href={`/products/${product.slug}`}
                    className="group relative block"
                  >
                    {/* Premium Card Container */}
                    <div className={`relative aspect-square overflow-hidden rounded-none border p-10 flex items-center justify-center transition-transform duration-300 will-change-transform ${
                      isDark 
                        ? "bg-white/5 border-white/10 group-hover:border-accent/40" 
                        : "bg-white border-slate-100 group-hover:border-accent/40 shadow-sm"
                    }`}>
                      
                      {/* Technical Background Layer */}
                      <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
                      
                      {/* Ambient Glows */}
                      <div className={`absolute -top-24 -right-24 h-48 w-48 rounded-full blur-[60px] transition-all duration-500 ${
                        isDark ? "bg-accent/20 group-hover:bg-accent/40" : "bg-accent-blue/10 group-hover:bg-accent-blue/20"
                      }`} />
                      
                      {/* Product Image */}
                      <div className="relative w-full h-full transform transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-1 will-change-transform">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 280px, 320px"
                        />
                      </div>
                      
                      {/* Glass Bottom Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Typography Area */}
                    <div className="mt-8 px-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`h-px w-4 ${isDark ? "bg-accent/40" : "bg-accent-blue/30"}`} />
                        <p className={`font-tech text-[9px] font-bold uppercase tracking-[0.2em] transition-colors ${
                          isDark ? "text-accent group-hover:text-white" : "text-accent-blue group-hover:text-primary"
                        }`}>
                          {product.category?.name || 'Precision Component'}
                        </p>
                      </div>
                      
                      <h3 className={`heading-sub text-xl md:text-2xl transition-colors duration-500 line-clamp-2 ${
                        isDark ? "text-white group-hover:text-accent" : "text-primary group-hover:text-accent-blue"
                      }`}>
                        {product.name}
                      </h3>
                      
                      {/* Interaction Footer */}
                      <div className={`mt-6 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 ${
                        isDark ? "text-white/60 group-hover:text-accent" : "text-primary/60 group-hover:text-accent-blue"
                      }`}>
                         <span className="text-[10px] font-tech font-bold uppercase tracking-[0.3em]">{technicalDetailsText || "Technical Details"}</span>
                         <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </m.div>
              );
            })
          )}
          
          {/* End Spacing to ensure the last item doesn't stick to the edge */}
          <div className="flex-none w-[10%] h-1" />
        </div>
      </div>
    </section>
  );
}
