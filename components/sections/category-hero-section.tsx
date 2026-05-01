"use client";

import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getCachedCategories } from "@/lib/categories";

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
  const [categories, setCategories] = useState<Category[]>(getCachedCategories() || []);

  useEffect(() => {
    const allCategories = getCachedCategories() || [];
    const filtered = allCategories.filter(cat => cat.division?.slug !== "ro-solutions");
    setCategories(filtered.slice(0, 6));
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/hero-poster.png"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/0 bg-gradient-to-b from-black/5 via-transparent to-black/0" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-left px-8 lg:px-24 pt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md space-y-4"
        >
          <div className="space-y-2">
            <h1 className="font-display text-slate-100 text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.1] tracking-tighter">
              Marine & <br />
              <span className="text-accent-blue font-black italic">Industrial</span> <br />
              Suppliers.
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/products"
              className="px-7 py-3 bg-primary text-white font-display font-bold uppercase text-[10px] tracking-widest transition-all hover:bg-accent shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
            >
              Explore
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 border border-accent/20 text-slate-200 backdrop-blur-md font-display font-bold uppercase text-[10px] tracking-widest hover:bg-accent hover:text-white transition-all"
            >
              Contact
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Category Display */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="relative z-10 w-full bg-gradient-to-t from-black/95 to-transparent pb-8 pt-10 -mt-16"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-accent/30" />
            <p className="font-tech text-[9px] font-bold uppercase tracking-[0.3em] text-accent/60">Core Product Categories</p>
            <span className="h-px flex-1 bg-accent/10" />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-2 md:gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/products?category=${category.slug}`}
                className="group flex flex-col items-center gap-1.5 text-center transition-all duration-300"
              >
                <div className="relative w-full max-w-[80px] md:max-w-[105px] aspect-square flex items-center justify-center transition-all duration-500">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-contain transition-all duration-500 group-hover:scale-110 opacity-100"
                    />
                  ) : (
                    <Globe className="w-8 h-8 text-accent/60 group-hover:text-accent transition-colors" />
                  )}
                </div>
                <span className="font-tech text-[8px] font-bold uppercase tracking-[0.2em] text-slate-300 group-hover:text-accent transition-colors drop-shadow-sm px-1">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative side brackets */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-accent/20 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-accent/20 pointer-events-none" />
    </section>
  );
}