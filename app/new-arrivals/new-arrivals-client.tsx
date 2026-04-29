"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Package, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  price?: string;
  condition?: string;
  isFeatured?: boolean;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  division: {
    _id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const getConditionColor = (condition?: string) => {
    switch (condition?.toLowerCase()) {
      case 'new':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'reconditioned':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <FadeInOnScroll delay={index * 0.1}>
      <div key={product._id} className="group relative">
        {/* Premium Catalog Card - Tech Frame */}
        <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-2xl bg-white/[0.01] border border-white/[0.06] transition-all duration-500 group-hover:border-accent-blue/30 group-hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
          
          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center gap-1 px-3 py-1 bg-accent-blue/20 text-accent-blue text-[10px] font-tech uppercase tracking-widest rounded-full border border-accent-blue/30">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            </div>
          )}

          {/* Interaction Link Background */}
          <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" />

          {/* Coordinate Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '1.25rem 1.25rem' }} />
          
          {/* Technical Decorative Corner Highlights */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Image Content */}
          <div className="relative h-full w-full p-6 transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-1">
            {product.imageUrl ? (
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-10 h-10 text-white/10" />
              </div>
            )}
          </div>

          {/* Condition Badge */}
          {product.condition && (
            <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
              <span className={`px-2 py-1 md:px-3 md:py-1 text-[9px] md:text-[10px] font-tech uppercase tracking-widest rounded-full border ${getConditionColor(product.condition)}`}>
                {product.condition}
              </span>
            </div>
          )}

          {/* Technical Overlay Indicators */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
            <div className="h-1 w-1 bg-accent-blue rounded-full shadow-[0_0_8px_rgba(91,155,213,0.8)]" />
          </div>
        </div>

        {/* Typography Area - Glass Labels */}
        <div className="px-1 relative">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="shrink-0 text-[8px] font-tech text-accent-blue opacity-50 px-1.5 py-0.5 border border-accent-blue/30 rounded uppercase">ID:{product._id?.slice(-4) || '9241'}</span>
            <span className="label-tech !mb-0 !text-[9px] !text-slate-400 capitalize truncate">
              {product.category?.name || "Uncategorized"}
            </span>
          </div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="heading-sub !text-[15px] md:!text-[17px] font-bold leading-snug transition-colors group-hover:text-accent-blue line-clamp-2 min-h-[3rem]">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-slate-300 text-xs md:text-sm font-medium">
              {product.price || "Contact for Price"}
            </span>
            
            <Link 
              href={`/products/${product.slug}`}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-accent-blue text-white rounded-full text-xs md:text-sm font-medium transition-all hover:bg-accent-blue/80 hover:scale-105"
            >
              <span className="hidden md:inline">View Details</span>
              <span className="md:hidden">View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="flex items-center gap-1 text-slate-400 text-[10px] md:text-xs mt-2">
            <Clock className="w-3 h-3" />
            {new Date(product.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

export function NewArrivalsClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/new-arrivals");
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data);
      } else {
        console.error("Failed to fetch products:", data.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(91,155,213,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(91,155,213,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem'
        }} />
        
        <div className="section-container px-4 md:px-0 relative z-10">
          <FadeInOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-16 bg-accent-blue/50" />
                <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-accent-blue">
                  Latest Inventory
                </p>
                <span className="h-px w-16 bg-accent-blue/50" />
              </div>
              
              <h1 className="heading-display mb-4 md:mb-6 text-2xl md:text-5xl lg:text-6xl">
                New <span className="text-accent-blue italic">Arrivals.</span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed text-sm md:text-lg font-medium mb-4 md:mb-8 px-4">
                Discover our latest marine engine parts, machinery, and equipment. 
                Fresh inventory added weekly with immediate availability from our ready stock.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Package className="w-4 h-4 text-accent-blue" />
                  <span className="text-white text-sm font-medium">{products.length} New Products</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Clock className="w-4 h-4 text-accent-blue" />
                  <span className="text-white text-sm font-medium">Updated Weekly</span>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-24 lg:py-32 bg-white/2">
        <div className="section-container px-4 md:px-0">
          {isLoading ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-10 md:gap-x-6 md:gap-y-16">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="group relative">
                    <div className="relative aspect-4/5 mb-6 overflow-hidden rounded-2xl bg-white/1 border border-white/6">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-slate-800 rounded-2xl h-32 md:h-40 w-full animate-pulse" />
                      </div>
                    </div>
                    <div className="px-1 relative">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="shrink-0 text-[8px] font-tech text-accent-blue opacity-50 px-1.5 py-0.5 border border-accent-blue/30 rounded uppercase">ID:9241</span>
                        <span className="label-tech !mb-0 !text-[9px] !text-slate-400 capitalize truncate">Loading</span>
                      </div>
                      <div className="h-4 bg-slate-700 rounded mb-2" />
                      <div className="h-4 bg-slate-700 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-10 md:gap-x-6 md:gap-y-16">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
          
          {/* Load More Button */}
          <FadeInOnScroll delay={0.8}>
            <div className="text-center mt-16">
              <Link 
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold transition-all hover:scale-105 hover:bg-accent border border-slate-800"
              >
                <span className="btn-text">View All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
