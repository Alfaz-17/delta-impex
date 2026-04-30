"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { motion } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NewArrivalsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* 01. PREMIUM HERO (Dark Contrast) */}
      <section className="bg-primary pt-40 pb-24 relative overflow-hidden">
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
            <p className="label-tech text-accent mb-6 uppercase tracking-[0.4em]">Inventory Update</p>
            <h1 className="heading-display text-white !leading-[0.9] uppercase tracking-tighter">
              New <span className="text-accent italic font-medium">Arrivals</span> & <br />
              Technical Stock.
            </h1>
            <p className="body-premium text-white/70 max-w-2xl mt-8 border-l-2 border-accent pl-6">
              Explore the latest technical additions to our marine and industrial inventory. High-quality spares, freshly sourced and verified for technical compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02. NEW ARRIVALS GRID (Dark Mode Sections) */}
      <div className="space-y-0">
        <FeaturedProductsSection 
          divisionSlug="marine-industrial" 
          hideTabs={true} 
          featuredOnly={true}
          title="Marine Components." 
          subtitle="Latest Marine Arrivals"
          isDark={false}
        />
        
        <FeaturedProductsSection 
          divisionSlug="ro-solutions" 
          hideTabs={true} 
          featuredOnly={true}
          title="Water Solutions." 
          subtitle="New Water Tech"
          isDark={true}
        />
      </div>

      {/* 03. CTA SECTION */}
      <section className="py-24 bg-white border-t border-slate-100 text-center">
        <div className="section-container">
          <FadeInOnScroll>
            <h2 className="heading-display text-primary uppercase tracking-tighter mb-8">Looking for a <span className="text-accent italic font-medium">Specific</span> Part?</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link 
                href="/products" 
                className="px-10 py-5 bg-primary text-white font-display font-bold uppercase text-xs tracking-widest hover:bg-accent transition-all shadow-xl"
              >
                Browse Full Catalog
              </Link>
              <Link 
                href="/contact" 
                className="px-10 py-5 border-2 border-primary text-primary font-display font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all"
              >
                Inquire Now
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
