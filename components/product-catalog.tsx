"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Search, FileText, ChevronLeft, ChevronRight, ArrowRight, Filter } from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCatalogProps {
  divisionSlug: string;
  divisionName: string;
}

const ITEMS_PER_PAGE = 12;

export function ProductCatalog({ divisionSlug, divisionName }: ProductCatalogProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const divRes = await fetch("/api/divisions");
        const divisions = await divRes.json();
        const division = Array.isArray(divisions) ? divisions.find((d: any) => d.slug === divisionSlug) : null;
        
        if (division) {
          const catRes = await fetch(`/api/categories?divisionId=${division._id}`);
          const catData = await catRes.json();
          setCategories(Array.isArray(catData) ? catData : []);

          const prodRes = await fetch(`/api/products?divisionId=${division._id}`);
          const prodData = await prodRes.json();
          setProducts(Array.isArray(prodData) ? prodData : []);
        } else {
          setCategories([]);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching catalog data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [divisionSlug]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category?._id === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      {/* 01. PREMIUM PAGE HEADER (Dark Contrast) */}
      <section className="bg-primary pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} 
        />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="label-tech text-accent mb-4">Our Products</p>
            <h1 className="heading-display text-white mb-6 uppercase tracking-tighter">
              {divisionName} <span className="text-accent italic font-medium">Catalog.</span>
            </h1>
            <p className="body-premium text-white/70 max-w-2xl italic border-l-2 border-accent pl-6">
              High-quality spare parts and machinery for all your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02. SEARCH & FILTER CONTROLS (Floating Bar) */}
      <section className="relative z-20 -mt-8">
        <div className="section-container">
          <div className="bg-white border border-border shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="pl-11 pr-10 py-3 bg-slate-50 border border-slate-100 font-tech text-[10px] font-bold uppercase tracking-widest text-primary focus:outline-none focus:border-accent appearance-none cursor-pointer min-w-[200px] transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <input 
                type="text" 
                placeholder="Search by part name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 font-tech text-[10px] font-bold uppercase tracking-widest text-primary focus:outline-none focus:border-accent transition-all placeholder:text-slate-300"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 03. PRODUCT GRID (Light Mode with High Contrast Cards) */}
      <section className="py-20 md:py-32">
        <div className="section-container">
          {isLoading ? (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-accent" />
              <p className="font-tech text-[10px] uppercase tracking-widest text-slate-400">Syncing Catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-32 text-center border-2 border-dashed border-slate-100 bg-slate-50/50">
              <p className="heading-sub text-slate-300 uppercase tracking-widest">No matching technical results found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {paginatedProducts.map((product, index) => (
                  <motion.div 
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 4) * 0.1 }}
                  >
                    <Link 
                      href={`/products/${product.slug}`}
                      className="group block"
                    >
                      {/* Premium Card Design */}
                      <div className="relative aspect-square mb-6 overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-accent transition-all duration-700 shadow-sm hover:shadow-2xl hover:shadow-primary/5">
                        {/* Background Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
                        
                        <div className="relative h-full w-full p-10 flex items-center justify-center transform transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-y-2">
                          {product.imageUrl ? (
                            <Image 
                              src={product.imageUrl} 
                              alt={product.name} 
                              fill 
                              className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                              sizes="(max-width: 768px) 100vw, 25vw"
                            />
                          ) : (
                            <FileText className="w-16 h-16 text-primary/10" />
                          )}
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/20 transition-all duration-500 group-hover:border-accent" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/20 transition-all duration-500 group-hover:border-accent" />
                      </div>

                      {/* Typography Area */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-px bg-accent/30 group-hover:w-10 transition-all duration-500" />
                          <p className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-accent group-hover:text-primary transition-colors">
                            {product.category?.name || "General Spares"}
                          </p>
                        </div>
                        <h3 className="heading-sub !text-lg text-primary line-clamp-2 min-h-[3rem] group-hover:text-accent transition-colors duration-500">
                          {product.name}
                        </h3>
                        <div className="pt-4 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-primary group-hover:text-accent">
                          <span className="font-tech text-[10px] font-bold uppercase tracking-[0.3em]">View Technical Data</span>
                          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* 04. PREMIUM PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-24 pt-12 border-t border-slate-100 flex items-center justify-center gap-4">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 flex items-center justify-center border border-slate-200 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-20"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-12 h-12 font-tech text-[10px] font-bold uppercase tracking-widest transition-all ${
                          currentPage === i + 1 
                            ? "bg-primary text-white shadow-xl" 
                            : "border border-slate-200 text-primary hover:bg-slate-50"
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 flex items-center justify-center border border-slate-200 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-20"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
