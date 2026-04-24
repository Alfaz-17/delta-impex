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
                {title}
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
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
                  className={`flex-none w-[280px] md:w-[360px] snap-start transition-all duration-1000 ${
                    isOffset ? "mt-4 md:mt-6 lg:mt-8" : ""
                  }`}
                >
                  <Link 
                    href={`/products/${product.slug}`}
                    className="group block"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-muted/10 border border-border/10 p-6 flex items-center justify-center transition-all duration-700 group-hover:shadow-2xl group-hover:border-white/20">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-1000"
                        sizes="(max-width: 768px) 280px, 380px"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Floating Indicator */}
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <ArrowRight size={16} className="text-white" />
                      </div>
                    </div>

                    {/* Typography Area */}
                    <div className="pt-8 pl-1">
                      <p className="label-tech !text-[9px] !text-accent mb-2 uppercase tracking-widest">
                        {product.category?.name || 'Precision Component'}
                      </p>
                      <h3 className="heading-sub text-xl md:text-2xl transition-colors group-hover:text-primary">
                        {product.name}
                      </h3>
                      
                      <div className="mt-6 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                         <div className="h-px w-8 bg-foreground" />
                         <span className="text-[10px] font-tech font-bold uppercase tracking-widest leading-none">Details</span>
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
