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
              Inventory Catalog.
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
                    {/* Image Area - Cardless Style */}
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-muted/10 rounded-xl group-hover:bg-muted/20 transition-colors">
                      <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0">
                        {product.imageUrl ? (
                          <Image 
                            src={product.imageUrl} 
                            alt={product.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                           <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
                              <FileText className="w-8 h-8 text-muted-foreground/30" />
                           </div>
                        )}
                      </Link>
                      
                      {/* Interaction Overlay: Visible on hover for desktop */}
                      <div className="absolute inset-0 bg-background/60 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                        <Link 
                          href={`/products/${product.slug}`}
                          className="px-6 py-3 bg-white text-black btn-text rounded-full hover:bg-white/80 transition-colors flex items-center gap-2 shadow-xl translate-y-4 lg:group-hover:translate-y-0 duration-300 delay-75 z-10"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          View Details
                        </Link>
                      </div>
                    </div>

                    {/* Typography Area */}
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <span className="label-tech !mb-0 max-w-full truncate">
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </div>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="heading-sub !text-base line-clamp-2 transition-colors group-hover:text-primary">
                          {product.name}
                        </h3>
                      </Link>
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
