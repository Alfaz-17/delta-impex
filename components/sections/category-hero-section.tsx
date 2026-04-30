"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Globe, Check, Circle, Square, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";

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

import { getCategories, getCachedCategories } from "@/lib/categories";

export function CategoryHeroSection() {
  const [categories, setCategories] = useState<Category[]>(getCachedCategories() || []);

  useEffect(() => {
    // Categories are now static, no need for fetch
    setCategories(getCachedCategories()?.slice(0, 6) || []);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          DESKTOP SECTIONS — md and above only
      ═══════════════════════════════════════ */}
      <InfiniteGrid 
        className="hidden md:block w-full mt-7"
        bgClassName="bg-[linear-gradient(135deg,#ffffff_0%,#f8fcfd_50%,#f0f7ff_100%)]"
      >
        
        {/* Hero Section */}
        <div
          className="relative w-full"
          style={{ height: "75vh" }}
        >
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl opacity-60" />
          
          {/* Corner Brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-primary/20" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-primary/20" />

          {/* Left: Ship image with wave animation */}
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              y: [0, -15, 0],                
              rotate: [0, 1.2, 0, -1.2, 0]   
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="absolute inset-y-0 left-0 flex items-center justify-center"
            style={{ width: "52%" }}
          >
            <div className="relative w-full h-full max-w-3xl flex items-center justify-center">
              <Image
                src="/hero.png"
                alt="Marine Supply Ship"
                fill
                sizes="52vw"
                className="object-contain object-center z-10 drop-shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
                priority
              />
              <motion.div
                className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-accent/30 blur-xl rounded-full"
                animate={{
                  scaleX: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex items-center justify-center pr-10 lg:pr-16"
            style={{ width: "48%", paddingLeft: "1rem" }}
          >
            <div className="w-full max-w-md space-y-6 pt-12">
              <div className="space-y-3">

                <h1 className="heading-display text-primary uppercase leading-[0.9] tracking-tighter !text-4xl lg:!text-5xl xl:!text-6xl">
                  Marine & <br />
                  <span className="text-accent italic font-medium">Industrial</span> <br />
                  Suppliers.
                </h1>
                <p className="body-premium text-slate-500 text-sm lg:text-base max-w-sm">
                  Reliable spare parts and machinery for ships and industries.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="px-6 py-3.5 bg-primary text-white rounded-none font-display font-bold uppercase text-[11px] tracking-widest transition-all hover:bg-accent shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                >
                  Explore Catalog
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 border border-primary/20 text-primary rounded-none font-display font-bold uppercase text-[11px] tracking-widest hover:border-accent hover:text-accent transition-all bg-white/30 backdrop-blur-sm"
                >
                  Contact Expert
                </Link>
              </div>

           
            </div>
          </motion.div>
        </div>

        {/* Categories Quick Nav — HIGH NEGATIVE MARGIN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative w-full mt-[-9rem] pb-12 z-20"
        >
          <div className="section-container">
            <div className="flex items-center gap-4 mb-8 pt-8">
              <span className="h-px w-12 bg-accent/30" />
              <p className="font-tech text-[9px] font-bold uppercase mb-[-4rem] tracking-[0.4em] text-accent">Core Product Categories</p>
              <span className="h-px flex-1 bg-primary/5" />
            </div>

            <div className="grid grid-cols-6 gap-5 lg:gap-8">
              {categories.slice(0, 6).map((category) => (
                  <div key={category._id} className="group">
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="flex flex-col items-center gap-4 text-center"
                    >
                      <div className="relative w-full aspect-square flex items-center justify-center p-2">
                        {category.imageUrl ? (
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Globe className="w-10 h-10 text-primary/20" />
                        )}
                      </div>
                      <span className="font-tech text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 group-hover:text-accent transition-colors">
                        {category.name}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
        </motion.div>
      </InfiniteGrid>

      {/* ═════════════════════════════════════════
          MOBILE SECTIONS — below md only
      ═══════════════════════════════════════ */}
      <InfiniteGrid 
        className="md:hidden w-full pt-20 pb-12"
        bgClassName="bg-white"
      >
        
        <div className="px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.1 }
              }
            }}
            className="space-y-6"
          >
            {/* Background Floating Orbs (Mobile) - Optimized with lower blur for performance */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
              <motion.div 
                animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-10 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px]" 
              />
              <motion.div 
                animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-40 left-0 w-40 h-40 bg-primary/10 rounded-full blur-[50px]" 
              />
            </div>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="label-tech text-accent text-[10px]"
            >
              Technical Sourcing Leaders
            </motion.p>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="heading-display text-primary text-4xl uppercase tracking-tighter leading-none"
            >
              Marine & <br />
              <span className="text-accent italic font-medium">Industrial</span> <br />
              Suppliers.
            </motion.h1>

            <motion.div 
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              className="relative aspect-video w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -10, 0],
                  scale: 1
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
              >
                <Image
                  src="/hero.png"
                  alt="Marine Supply Ship"
                  fill
                  className="object-contain z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)]"
                />
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-3 bg-accent/20 blur-xl rounded-full z-0"
                  animate={{ scaleX: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>

            <motion.p 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="body-text text-slate-500 text-sm leading-snug"
            >
              Precision sourcing for mission-critical engine components and industrial machinery.
            </motion.p>

            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="flex flex-col gap-3"
            >
              <Link
                href="/products"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase text-[10px] tracking-widest relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Catalog</span>
                <ArrowRight size={16} className="relative z-10" />
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  className="absolute inset-0 bg-accent/20"
                  transition={{ duration: 0.5 }}
                />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center px-8 py-4 border border-primary/10 text-primary font-bold uppercase text-[10px] tracking-widest"
              >
                Contact Expert
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-12 border-t border-primary/5"
          >
            <p className="font-tech text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-6 text-center">Our Categories</p>
            <div className="grid grid-cols-3 gap-4">
              {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category.slug}`}
                    className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
                  >
                    <div className="relative w-full aspect-square flex items-center justify-center p-2 bg-slate-50 border border-primary/5">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Globe className="w-6 h-6 text-primary/10" />
                      )}
                    </div>
                    <span className="font-tech text-[8px] font-bold uppercase tracking-wider text-primary/60 text-center leading-tight px-1">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
          </motion.div>
        </div>
      </InfiniteGrid>

    </>
  );
}