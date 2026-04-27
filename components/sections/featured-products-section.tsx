"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { motion, AnimatePresence } from "framer-motion";

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
  subtitle = "Our newest products."
}: FeaturedProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>(initialCategory);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
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
    <section className="bg-background py-8 md:py-10 lg:py-12 overflow-hidden">
      {/* Editorial Header */}
      <div className="section-container mb-6 md:mb-8">
        <FadeInOnScroll>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/50 pb-10">
            <div className="max-w-xl">
              <p className="label-tech !text-accent uppercase tracking-[0.3em] mb-4">
                {subtitle}
              </p>
              <h2 className="heading-display">
                {title.split(' ').slice(0, -1).join(' ')} <span className="text-accent-blue italic">{title.split(' ').slice(-1)}</span>
              </h2>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-8">
                <div className="flex items-center gap-6">
                    {!hideTabs && (
                        <div className="flex items-center gap-6 px-1">
                            <button
                                onClick={() => setActiveTab("marine")}
                                className={`label-tech !mb-0 transition-all pb-2 border-b-2 ${
                                    activeTab === "marine" ? "text-primary border-accent" : "text-muted-foreground border-transparent hover:text-foreground"
                                }`}
                            >
                                Marine
                            </button>
                            <button
                                onClick={() => setActiveTab("ro")}
                                className={`label-tech !mb-0 transition-all pb-2 border-b-2 ${
                                    activeTab === "ro" ? "text-primary border-accent" : "text-muted-foreground border-transparent hover:text-foreground"
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
                            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                            aria-label="Scroll Left"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                            aria-label="Scroll Right"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <Link 
                    href={`/products?divisionSlug=${divisionSlug || (activeTab === 'marine' ? 'marine-industrial' : 'ro-solutions')}`}
                    className="group flex items-center gap-3 text-[10px] font-tech font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                    View Full Directory 
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </div>

      {/* Horizontal Scroller Container */}
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 md:gap-12 px-[5%] md:px-[6%] pb-12 snap-x snap-mandatory no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px] w-full">
              <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
            </div>
          ) : (!Array.isArray(products) || products.length === 0) ? (
            <div className="w-full text-center py-24 border border-dashed border-border/50 rounded-3xl opacity-40">
              <p className="font-tech text-[10px] uppercase tracking-[0.4em]">Establishing Catalog Sync...</p>
            </div>
          ) : (
            products.map((product, index) => {
              // Maintaining the editorial stagger even in the scroller
              const isOffset = index % 2 === 1;
              
              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
                  className={`flex-none w-[280px] md:w-[320px] snap-start transition-all duration-1000 ${
                    isOffset ? "mt-4 md:mt-10 lg:mt-16" : ""
                  }`}
                >
                  <Link 
                    href={`/products/${product.slug}`}
                    className="group relative block"
                  >
                    {/* Premium Card Container */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] p-8 flex items-center justify-center transition-all duration-700 group-hover:border-accent-blue/30 group-hover:shadow-[0_0_50px_-12px_rgba(91,155,213,0.3)]">
                      
                      {/* Technical Background Layer */}
                      <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
                      
                      {/* Ambient Glows */}
                      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-accent-blue/10 blur-[60px] group-hover:bg-accent-blue/20 transition-all duration-700" />
                      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/5 blur-[60px]" />
                      
                      {/* Scanline Effect on Hover */}
                      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent top-0 -translate-y-full group-hover:animate-scanline pointer-events-none" />

                      {/* Product Image */}
                      <div className="relative w-full h-full transform transition-all duration-1000 group-hover:scale-110 group-hover:-translate-y-2">
                        <Image
                          src={product.imageUrl || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                          sizes="(max-width: 768px) 280px, 320px"
                        />
                      </div>
                      
                      {/* Glass Bottom Overlay */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Corner Accents */}
                      <div className="absolute top-6 left-6 h-px w-0 bg-accent-blue/40 transition-all duration-700 group-hover:w-8" />
                      <div className="absolute top-6 left-6 w-px h-0 bg-accent-blue/40 transition-all duration-700 group-hover:h-8" />
                    </div>

                    {/* Typography Area */}
                    <div className="mt-8 px-2">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-4 bg-accent-blue/30" />
                        <p className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-accent-blue group-hover:text-cyan-400 transition-colors">
                          {product.category?.name || 'Precision Component'}
                        </p>
                      </div>
                      
                      <h3 className="heading-sub text-xl md:text-2xl text-white group-hover:text-accent-blue transition-colors duration-500 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      {/* Interaction Footer */}
                      <div className="mt-6 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-white/60 group-hover:text-accent-blue">
                         <span className="text-[10px] font-tech font-bold uppercase tracking-[0.3em]">View Technical Specs</span>
                         <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
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
