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
      {/* HERO SECTION: Left Image + Right Content */}
      <section
        className="relative w-full mt-7 mb-[-3rem] overflow-hidden"
        style={{
          height: "80vh",
          background: "#ffffff",
          backgroundImage: `
            linear-gradient(to right, rgba(91,155,213,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(91,155,213,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      >
        {/* UNIQUE DECORATIVE ELEMENTS */}
        {/* Large Check Marks - Top Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-10 left-10 w-32 h-32"
        >
          <Check className="w-full h-full text-accent-blue" strokeWidth={1} />
        </motion.div>

        {/* Large Check Marks - Top Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-20 right-20 w-24 h-24"
        >
          <Check className="w-full h-full text-accent-blue" strokeWidth={1} />
        </motion.div>

        {/* Large Circle - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-20 left-20 w-40 h-40"
        >
          <Circle className="w-full h-full text-accent-blue" strokeWidth={1} />
        </motion.div>

        {/* Large Square - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 45 }}
          animate={{ opacity: 0.08, scale: 1, rotate: 45 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-10 right-10 w-28 h-28"
        >
          <Square className="w-full h-full text-accent-blue" strokeWidth={1} />
        </motion.div>

        {/* Animated Geometric Shapes */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-accent-blue/20 rounded-lg"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/3 w-12 h-12 border-2 border-accent-blue/15 rounded-full"
        />

        {/* Technical Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />
          <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-accent-blue/30 to-transparent" />
          <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-accent-blue/30 to-transparent" />
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-accent-blue/30" />
        <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-accent-blue/30" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-accent-blue/30" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-accent-blue/30" />

        {/* SHIP: Left Half */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 flex items-center justify-center"
          style={{ width: "55%" }}
        >
          <div className="relative w-full h-full max-w-4xl">
            <Image
              src="/hero.png"
              alt="Marine Supply Ship"
              fill
              sizes="55vw"
              className="object-contain object-center"
              priority
            />
          </div>
        </motion.div>

        {/* RIGHT CONTENT: Right Half */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 right-0 flex items-center justify-center pr-10 lg:pr-16"
          style={{ width: "45%", paddingLeft: "2rem" }}
        >
          <div className="w-full max-w-lg space-y-4">
            {/* Brand tag */}
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-accent-blue rounded-full" />
              <p className="label-tech">
                Delta Impex Global
              </p>
            </div>

            {/* Headline */}
            <h1 className="heading-display !text-slate-900 uppercase">
              Marine &amp; <br />
              <span className="text-accent-blue italic">Industrial</span>
              <br />
              Suppliers.
            </h1>

            {/* Subtext */}
            <p className="body-premium">
              Precision sourcing for mission-critical engine components and industrial machinery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/products"
                className="group relative px-6 py-3 bg-slate-900 text-white rounded-full font-bold flex items-center gap-2 overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <span className="btn-text relative z-10">
                  Explore Catalog
                </span>
                <ArrowRight className="relative z-10 w-3 h-3 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-accent-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
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

        </section>

      {/* CATEGORIES SECTION: Centered Below Hero */}
      <section
        className="relative w-full overflow-hidden pt-[-10]"
        style={{
          height: "30vh",
          background: "#ffffff",
          backgroundImage: `
            linear-gradient(to right, rgba(91,155,213,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(91,155,213,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-full flex flex-col items-center justify-start px-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-[-2]">
            <span className="h-px w-6 bg-accent-blue/50 rounded-full" />
            <p className="text-[8px] font-black uppercase tracking-[0.45em] text-accent-blue/80">
               Categories
            </p>
            <span className="flex-1 h-px bg-slate-200 rounded-full" />
          </div>

          {/* Categories Grid - Ready for 10 categories */}
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
                  <Link href={`/products?category=${category.slug}`} className="flex flex-col items-center gap-2">
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
                        <Globe className="w-10 h-10 text-accent-blue/50" />
                      )}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-slate-700 text-center leading-tight">
                      {category.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
}