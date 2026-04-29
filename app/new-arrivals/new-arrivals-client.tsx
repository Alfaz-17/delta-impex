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
      <div className="group relative overflow-hidden rounded-4xl bg-dark-card border border-white/8 transition-all duration-500 hover:border-accent-blue/30 hover:scale-[1.02]">
        {/* Featured Badge */}
        {product.isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="flex items-center gap-1 px-3 py-1 bg-accent-blue/20 text-accent-blue text-[10px] font-tech uppercase tracking-widest rounded-full border border-accent-blue/30">
              <Star className="w-3 h-3 fill-current" />
              Featured
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <Package className="w-16 h-16 text-accent-blue/30" />
            )}
          </div>
          
          {/* Condition Badge */}
          {product.condition && (
            <div className="absolute bottom-4 right-4">
              <span className={`px-3 py-1 text-[10px] font-tech uppercase tracking-widest rounded-full border ${getConditionColor(product.condition)}`}>
                {product.condition}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-accent-blue font-tech text-xs uppercase tracking-widest">
              {product.category.name}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Clock className="w-3 h-3" />
              {new Date(product.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-accent-blue transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm font-medium">
              {product.price || "Contact for Price"}
            </span>
            
            <Link 
              href={`/products/${product.slug}`}
              className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-full text-sm font-medium transition-all hover:bg-accent-blue/80 hover:scale-105"
            >
              View Details
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(91,155,213,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(91,155,213,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '3rem 3rem'
        }} />
        
        <div className="section-container relative z-10">
          <FadeInOnScroll>
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-16 bg-accent-blue/50" />
                <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-accent-blue">
                  Latest Inventory
                </p>
                <span className="h-px w-16 bg-accent-blue/50" />
              </div>
              
              <h1 className="heading-display mb-6">
                New <span className="text-accent-blue italic">Arrivals.</span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed text-lg font-medium mb-8">
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
      <section className="py-24 md:py-32 bg-white/2">
        <div className="section-container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-800 rounded-4xl h-64 mb-4" />
                  <div className="h-4 bg-slate-700 rounded mb-2" />
                  <div className="h-4 bg-slate-700 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
