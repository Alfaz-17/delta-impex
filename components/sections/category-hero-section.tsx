"use client";

import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { STATIC_CATEGORIES } from "@/lib/categories";

export function CategoryHeroSection() {
  const categories = STATIC_CATEGORIES;

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex flex-col justify-between">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-[65%_center] md:object-center"
          poster="/hero-poster.png"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/0 bg-gradient-to-b from-black/5 via-transparent to-black/0" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-left px-6 md:px-12 lg:px-24 pt-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md space-y-3"
        >
          <div className="space-y-1">
            <h1 className="font-display text-slate-300 text-2xl md:text-4xl lg:text-5xl uppercase leading-[1] tracking-tighter">
              Marine & <br />
              <span className="text-accent-blue italic">Industrial</span> <br />
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
              className="px-7 py-3 bg-accent text-white font-display font-bold uppercase text-[10px] tracking-widest transition-all hover:bg-accent-blue shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
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
        className="relative z-10 w-full bg-gradient-to-t from-black/95 to-transparent pb-8 pt-10 -mt-20 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-accent/30" />
            <p className="font-tech text-[9px] font-bold uppercase tracking-[0.3em] text-accent-blue">Our Products Categories</p>
            <span className="h-px flex-1 bg-accent/10" />
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

          <div className="marquee-track-right flex w-max">
            {[...categories, ...categories].map((category, i) => (
              <Link
                key={`${category.slug}-${i}`}
                href={`/products?category=${category.slug}`}
                className="group flex flex-col items-center gap-2 text-center transition-all duration-300 flex-shrink-0 pr-20"
              >
                <div className="relative w-32 md:w-30 aspect-square flex items-center justify-center transition-all duration-500 bg-white shadow-lg rounded-[2rem] border border-white group-hover:border-accent group-hover:scale-105">
                  {category.imageUrl ? (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-contain p-3 transition-all duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Globe className="w-10 h-10 text-accent/60 group-hover:text-accent transition-colors" />
                  )}
                </div>
                <span className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-slate-200 group-hover:text-accent-blue transition-colors drop-shadow-sm px-1">
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