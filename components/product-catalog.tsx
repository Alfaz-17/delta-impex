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

import { STATIC_CATEGORIES } from "@/lib/categories";
import { useSearchParams } from "next/navigation";

export function ProductCatalog({ divisionSlug, divisionName }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || searchParams.get("categoryId") || "all";

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>(STATIC_CATEGORIES.filter(c => c.division === divisionSlug));
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch all divisions to map the name if needed, but primarily we want categories
        const divRes = await fetch("/api/divisions");
        const divisions = await divRes.json();
        
        // Filter categories based on the current division for the UI tabs
        const filteredCats = STATIC_CATEGORIES.filter((cat: any) => cat.division === divisionSlug);
        setCategories(filteredCats);

        // Fetch ALL products so search is global across all divisions and categories
        const prodRes = await fetch(`/api/products`);
        const prodData = await prodRes.json();
        setProducts(Array.isArray(prodData) ? prodData : []);
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
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = product.name.toLowerCase().includes(query) || 
                          product.description?.toLowerCase().includes(query) ||
                          product.category?.name?.toLowerCase().includes(query);

    // If there is a search query, show all matching products from any category/division
    if (query.length > 0) {
      return matchesSearch;
    }

    // If no search query, filter by division and category as usual
    const matchesDivision = product.division?.slug === divisionSlug || 
                            product.division === divisionSlug; // handle potential populated/unpopulated cases
    
    const matchesCategory = activeCategory === "all" || 
                           product.category?._id === activeCategory || 
                           product.category?.slug === activeCategory;
                           
    return matchesDivision && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const [inquiryData, setInquiryData] = useState({ name: "", email: "", message: "" });
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inquiryData,
          type: "product_search",
          searchQuery: searchQuery,
          message: `Automatic Inquiry for Search: "${searchQuery}"\n\nUser Message: ${inquiryData.message}`
        }),
      });

      if (res.ok) {
        setInquiryStatus("success");
        setInquiryData({ name: "", email: "", message: "" });
        setTimeout(() => setInquiryStatus("idle"), 5000);
      } else {
        setInquiryStatus("error");
      }
    } catch (err) {
      setInquiryStatus("error");
    }
  };

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

      {/* 02. VISUAL CATEGORY FILTER & SEARCH */}
      <section className="relative z-20 -mt-12">
        <div className="section-container">
          <div className="bg-white border border-border shadow-2xl p-6 md:p-10 space-y-10">
            {/* Search Box (Top) */}
            <div className="relative w-full max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
              <input 
                type="text" 
                placeholder="Search by part name, engine model, or technical code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-100 font-sans text-sm font-medium text-primary focus:outline-none focus:border-accent transition-all placeholder:text-slate-300 shadow-inner"
               />
            </div>

            {/* Visual Category Scroller */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-tech text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">Select Specialty</h3>
                <div className="h-px flex-1 bg-slate-100 mx-6" />
              </div>

              <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 no-scrollbar -mx-2 px-2">
                {/* 'All' Option */}
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`flex-none flex flex-col items-center gap-3 transition-all opacity-100`}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border transition-all duration-500 rounded-none ${
                    activeCategory === "all" ? "bg-primary border-primary scale-110 shadow-xl" : "bg-slate-50 border-slate-100"
                  }`}>
                    <Filter className={`w-6 h-6 md:w-8 md:h-8 ${activeCategory === "all" ? "text-white" : "text-primary"}`} />
                  </div>
                  <span className={`font-tech text-[9px] font-bold uppercase tracking-widest ${activeCategory === "all" ? "text-primary" : "text-slate-400"}`}>All Parts</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`flex-none flex flex-col items-center gap-3 transition-all opacity-100`}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 relative p-3 border transition-all duration-500 rounded-none flex items-center justify-center ${
                      activeCategory === cat.slug ? "bg-white border-accent scale-110 shadow-xl" : "bg-slate-50 border-slate-100"
                    }`}>
                      {cat.imageUrl ? (
                        <img 
                          src={cat.imageUrl} 
                          alt={cat.name} 
                          className={`w-full h-full object-contain transition-transform duration-500 ${activeCategory === cat.slug ? "scale-110" : ""}`}
                        />
                      ) : (
                        <FileText className={`w-6 h-6 md:w-8 md:h-8 ${activeCategory === cat.slug ? "text-accent" : "text-primary/20"}`} />
                      )}
                      {/* Selected Indicator Dot */}
                      {activeCategory === cat.slug && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent border-2 border-white rounded-full" />
                      )}
                    </div>
                    <span className={`font-tech text-[9px] font-bold uppercase tracking-widest text-center max-w-[80px] leading-tight ${
                      activeCategory === cat.slug ? "text-primary" : "text-slate-400"
                    }`}>
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. PRODUCT GRID & CATEGORY CONTENT */}
      <section className="py-20 md:py-32">
        <div className="section-container">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-6">
                  <div className="aspect-square w-full bg-slate-50 border border-slate-100 animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-2 w-24 bg-slate-100 animate-pulse" />
                    <div className="h-6 w-full bg-slate-100 animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-100 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center space-y-12 py-12">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-8">
                  <Search className="w-8 h-8 text-slate-200" />
                </div>
                <h2 className="heading-sub text-3xl text-primary uppercase">No Results Found.</h2>
                <p className="body-premium text-slate-500 italic">
                  Currently not available in stock. However, we specialize in technical sourcing. Please submit an inquiry below and our engineers will find it for you.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 shadow-xl text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl pointer-events-none" />
                
                {inquiryStatus === "success" ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-primary">Inquiry Received</h3>
                    <p className="text-slate-500 font-tech text-[10px] uppercase tracking-widest">Our technical team will respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={inquiryData.name}
                          onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})}
                          className="w-full bg-transparent border-b border-slate-200 py-3 text-primary focus:outline-none focus:border-accent transition-all text-sm"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={inquiryData.email}
                          onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})}
                          className="w-full bg-transparent border-b border-slate-200 py-3 text-primary focus:outline-none focus:border-accent transition-all text-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400">Technical Details / Part Numbers</label>
                      <textarea 
                        required
                        value={inquiryData.message}
                        onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                        rows={3}
                        className="w-full bg-transparent border-b border-slate-200 py-3 text-primary focus:outline-none focus:border-accent transition-all text-sm resize-none"
                        placeholder={`I am looking for ${searchQuery}...`}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={inquiryStatus === "loading"}
                      className="w-full bg-primary text-white py-5 font-display font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-accent transition-all flex items-center justify-center gap-3 group"
                    >
                      {inquiryStatus === "loading" ? "Processing..." : "Send Technical Inquiry"}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    {inquiryStatus === "error" && (
                      <p className="text-red-500 text-[9px] font-tech uppercase text-center mt-2">Failed to send. Please try again or contact us via WhatsApp.</p>
                    )}
                  </form>
                )}
              </div>
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
                      className="group block relative"
                    >
                      {/* Premium Card Design */}
                      <div className="relative aspect-square mb-6 overflow-hidden bg-white border border-slate-100 group-hover:border-accent/40 transition-all duration-700 shadow-sm group-hover:shadow-[0_20px_50px_-12px_rgba(30,95,166,0.15)]">
                        {/* Background Patterns */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
                        
                        {/* Product Image */}
                        <div className="relative h-full w-full p-10 flex items-center justify-center transform transition-all duration-1000 group-hover:scale-110 group-hover:-translate-y-4">
                          {product.imageUrl ? (
                            <Image 
                              src={product.imageUrl} 
                              alt={product.name} 
                              fill 
                              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-700"
                              sizes="(max-width: 768px) 100vw, 25vw"
                              priority={index < 4}
                            />
                          ) : (
                            <FileText className="w-16 h-16 text-primary/10" />
                          )}
                        </div>

                        {/* Corner Accents (Animate on hover) */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-primary/10 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-accent" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-primary/10 transition-all duration-500 group-hover:w-8 group-hover:h-8 group-hover:border-accent" />
                        
                        {/* Technical Scanning Line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scanline" />
                      </div>

                      {/* Typography Area */}
                      <div className="space-y-3 px-2">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-px bg-accent/30 group-hover:w-12 transition-all duration-700" />
                          <p className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-accent group-hover:text-primary transition-colors">
                            {product.category?.name || "General Spares"}
                          </p>
                        </div>
                        <h3 className="heading-sub !text-lg text-primary line-clamp-2 min-h-[3rem] group-hover:text-accent transition-colors duration-500">
                          {product.name}
                        </h3>
                        <div className="pt-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-primary group-hover:text-accent">
                          <span className="font-tech text-[10px] font-bold uppercase tracking-[0.3em]">Technical Specs</span>
                          <div className="w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                            <ArrowRight size={14} />
                          </div>
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

          {/* SEO Optimized Category Description (Moved to bottom) */}
          <div className="max-w-4xl mt-32 pt-16 border-t border-slate-100 space-y-6">
            <h2 className="heading-sub text-3xl text-primary uppercase">
              Reliable <span className="text-accent italic font-medium">{divisionName}</span> Equipment.
            </h2>
            <p className="body-premium text-slate-600 leading-relaxed">
              Explore our extensive inventory of {divisionName.toLowerCase()} solutions, specifically curated for technical reliability and performance. 
              As a leading supplier based Alang Gujrat , India, Delta Impex specializes in sourcing high-quality {divisionSlug === 'marine-industrial' ? 'marine engine spares, ship machinery, and industrial components' : 'advanced RO water treatment systems and desalination plant parts'} for global clients.
            </p>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">
              Every part in our catalog undergoes rigorous technical verification to meet international maritime and industrial standards. 
              Whether you are looking for new, reconditioned, or second-hand machinery, our engineering team ensures that you receive the most cost-effective and durable solutions 
              delivered to any major port worldwide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
