"use client";

import Link from "next/link";
import { ArrowRight, Globe, Check, Circle, Square } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  division: {
    _id: string;
    name: string;
    slug: string;
  };
  productCount?: number;
}

export function CategoryHeroSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories?includeCounts=true");
        const data = await response.json();
        setCategories(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          DESKTOP SECTIONS — md and above only
      ═══════════════════════════════════════ */}
      <section
        className="hidden md:block relative w-full mt-7 mb-[-3rem] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #e0f4ff 50%, #d1e7ff 100%)",
        }}
      >
        {/* Square Grid Pattern like Footer */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(91,155,213,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(91,155,213,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '3rem 3rem' 
          }} 
        />
        {/* Secondary Fine Grid */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(91,155,213,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(91,155,213,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '0.75rem 0.75rem' 
          }} 
        />
        
        {/* Hero Section */}
        <div
          className="relative w-full"
          style={{ height: "80vh" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-accent-blue/10 to-transparent rounded-full blur-2xl opacity-60" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tl from-accent-blue/8 to-transparent rounded-full blur-2xl opacity-50" />
          <div className="absolute top-20 left-20 w-24 h-24 opacity-20">
            <Check className="w-full h-full text-accent-blue" strokeWidth={1} />
          </div>
          <div className="absolute top-32 right-32 w-20 h-20 opacity-15">
            <Circle className="w-full h-full text-accent-blue" strokeWidth={1} />
          </div>
          <div className="absolute bottom-32 left-32 w-32 h-32 opacity-12">
            <Square className="w-full h-full text-accent-blue" strokeWidth={1} />
          </div>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(91,155,213,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(91,155,213,0.1) 1px, transparent 1px)`,
              backgroundSize: "3rem 3rem",
            }}
          />
          {/* Check pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.01]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(91,155,213,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(91,155,213,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '2rem 2rem'
            }}
          />
          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-accent-blue/30" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-accent-blue/30" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-accent-blue/30" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-accent-blue/30" />

          {/* Left: Ship image */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 flex items-center justify-center"
            style={{ width: "55%" }}
          >
            <div className="relative w-full h-full max-w-4xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/5 via-transparent to-accent-blue/3 rounded-2xl" />
              <Image
                src="/hero.png"
                alt="Marine Supply Ship"
                fill
                sizes="55vw"
                className="object-contain object-center relative z-10"
                priority
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex mt-7 items-center justify-center pr-10 lg:pr-16"
            style={{ width: "45%", paddingLeft: "2rem" }}
          >
            <div className="w-full max-w-lg space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-accent-blue rounded-full" />
                <p className="label-tech">Delta Impex Global</p>
              </div>
              <h1 className="heading-display !text-slate-900 uppercase">
                Marine &amp; <br />
                <span className="text-accent-blue italic">Industrial</span>
                <br />
                Suppliers.
              </h1>
              <p className="body-premium">
                Precision sourcing for mission-critical engine components and industrial machinery.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/products"
                  className="px-6 py-3 bg-slate-900 text-white rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 hover:bg-accent shadow-lg"
                >
                  <span className="btn-text">Explore Catalog</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border-2 border-slate-200 text-slate-900 rounded-full font-bold hover:border-accent-blue/40 hover:text-accent-blue transition-all active:scale-95 btn-text bg-white/60 backdrop-blur-sm"
                >
                  Contact Expert
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full mt-[-3.5rem]"
          style={{ height: "30vh" }}
        >
          <div className="h-full flex flex-col items-center justify-start px-6">
            <div className="flex items-center gap-3 mb-[-2]">
              <span className="h-px w-6 bg-accent-blue/50 rounded-full" />
              <p className="text-[8px] font-black uppercase tracking-[0.45em] text-accent-blue/80">
                Categories
              </p>
              <span className="flex-1 h-px bg-slate-200 rounded-full" />
            </div>

            {isLoading ? (
              <div className="grid grid-cols-5 gap-5 max-w-5xl">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-24 h-24 bg-slate-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-5 max-w-5xl">
                {categories.slice(0, 6).map((category) => (
                  <motion.div
                    key={category._id}
                    whileHover={{ y: -3, scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-28 h-28 flex items-center justify-center overflow-hidden">
                        {category.imageUrl ? (
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full object-contain transition-transform group-hover:scale-110"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement;
                              t.style.display = "none";
                            }}
                          />
                        ) : (
                          <Globe className="w-8 h-8 text-accent-blue/50" />
                        )}
                      </div>
                      <span className="text-[13px] font-bold uppercase tracking-wide text-slate-700 text-center leading-tight">
                        {category.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* ═════════════════════════════════════════
          MOBILE SECTIONS — below md only
      ═══════════════════════════════════════ */}
      <section
        className="md:hidden relative w-full mt-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #e0f4ff 50%, #d1e7ff 100%)",
        }}
      >
        {/* Square Grid Pattern like Hero */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(91,155,213,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(91,155,213,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '3rem 3rem' 
          }} 
        />
        {/* Secondary Fine Grid */}
        <div 
          className="absolute inset-0 opacity-[0.08]" 
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(91,155,213,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(91,155,213,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '0.75rem 0.75rem' 
          }} 
        />
        
        {/* Ship image — compact */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
          style={{ height: "210px" }}
        >
          <Image
            src="/hero.png"
            alt="Marine Supply Ship"
            fill
            sizes="100vw"
            className="object-contain object-center"
            priority
          />
        </motion.div>

        {/* Text + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="px-5 pb-6 space-y-3 mt-[-1.5rem]"
        >
          <div className="flex items-center gap-2">
            <span className="h-[2px] w-6 bg-accent-blue rounded-full" />
            <p className="label-tech text-[10px] tracking-widest font-sans">Delta Impex Global</p>
          </div>

          <h1
            className="text-slate-900 uppercase font-sans leading-[1.1]"
            style={{ fontSize: "clamp(1.75rem, 6vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            Marine &amp;{" "}
            <span className="text-accent-blue italic">Industrial</span>{" "}
            Suppliers.
          </h1>

          <p className="text-slate-500 text-sm leading-snug max-w-xs font-sans hidden">
            Precision sourcing for mission-critical engine components and industrial machinery.
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-full font-bold active:scale-95 transition-transform shadow-md font-sans"
            >
              <span className="text-sm font-bold tracking-wide font-sans">Explore Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center px-5 py-3 border-2 border-slate-200 text-slate-900 rounded-full font-bold hover:border-accent-blue/40 hover:text-accent-blue transition-all active:scale-95 btn-text bg-white/60 backdrop-blur-sm font-sans"
            >
              <span className="font-sans">Contact Expert</span>
            </Link>
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-4 py-5 mt-[-2rem]"
        >
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[9px] mb-[-1rem] font-black uppercase tracking-[0.4em] text-accent-blue/80">
              Categories
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-24 h-24 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-5">
              {categories.slice(0, 6).map((category) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category.slug}`}
                  className="flex flex-col items-center gap-2 py-3 px-1 rounded-lg border border-slate-100 active:scale-95 transition-transform"
                >
                  <div className="w-20 h-24 flex items-center justify-center overflow-hidden">
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-contain transition-transform group-hover:scale-110"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = "none";
                        }}
                      />
                    ) : (
                      <Globe className="w-8 h-8 text-accent-blue/50" />
                    )}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700 text-center leading-tight">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
}