"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Search, FileText, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface ProductCatalogProps {
  divisionSlug: string;
  divisionName: string;
}

const ITEMS_PER_PAGE = 8;

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

  // Reset to first page when filtering
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
    <section className="bg-background py-16 md:py-24 border-t border-border/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="heading-display mb-4">
              Inventory <span className="text-accent-blue italic">Catalog.</span>
            </h2>
            <p className="body-text leading-relaxed">
              Explore our comprehensive range of high-quality {divisionName.toLowerCase()} solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0 w-full lg:w-auto">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-56">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full h-12 px-4 appearance-none pl-4 pr-10 bg-muted/20 border border-border/50 rounded-full text-sm focus:outline-none focus:border-primary/50 transition-colors text-foreground cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-muted/20 border border-border/50 rounded-full text-sm focus:outline-none focus:border-primary/50 transition-colors text-foreground"
               />
            </div>
          </div>
        </div>

        {/* Product Grid (Full Width) */}
        <div>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-border/50 rounded-3xl bg-muted/5">
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-tech opacity-50">No products found matching criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-10 md:gap-x-6 md:gap-y-16">
                {paginatedProducts.map((product) => (
                  <div key={product._id} className="group relative">
                    {/* Premium Catalog Card - Tech Frame */}
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-2xl bg-white/[0.01] border border-white/[0.06] transition-all duration-500 group-hover:border-accent-blue/30 group-hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                      
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
                              <FileText className="w-10 h-10 text-white/10" />
                           </div>
                        )}
                      </div>

                      {/* Technical Overlay Indicators */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                        <div className="h-1 w-1 bg-accent-blue rounded-full shadow-[0_0_8px_rgba(91,155,213,0.8)]" />
                      </div>
                    </div>

                    {/* Typography Area - Glass Labels */}
                    <div className="px-1 relative">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="shrink-0 text-[8px] font-tech text-accent-blue opacity-50 px-1.5 py-0.5 border border-accent-blue/30 rounded uppercase">ID:{product.code?.slice(-4) || '9241'}</span>
                        <span className="label-tech !mb-0 !text-[9px] !text-slate-400 capitalize truncate">
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="heading-sub !text-[15px] md:!text-[17px] font-bold leading-snug transition-colors group-hover:text-accent-blue line-clamp-2 min-h-[3rem]">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Hidden Explore Trigger */}
                      <div className="h-[2px] w-0 bg-accent-blue transition-all duration-500 group-hover:w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-20 flex items-center justify-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex gap-2 mx-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                          currentPage === i + 1 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "border border-border text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
