"use client";

import { Header } from "@/components/header";
import { CategoryHeroSection } from "@/components/sections/category-hero-section";
import dynamic from "next/dynamic";

// Dynamic imports for heavy or off-screen sections to optimize initial load
const AboutPreviewSection = dynamic(() => import("@/components/sections/about-preview-section").then(mod => mod.AboutPreviewSection));
const BrandsMarquee = dynamic(() => import("@/components/sections/brands-marquee").then(mod => mod.BrandsMarquee));
const TechnologySection = dynamic(() => import("@/components/sections/technology-section").then(mod => mod.TechnologySection));
const FooterSection = dynamic(() => import("@/components/sections/footer-section").then(mod => mod.FooterSection));
const SeoContentSection = dynamic(() => import("@/components/sections/seo-content-section").then(mod => mod.SeoContentSection));
const FeaturedProductsSection = dynamic(() => import("@/components/sections/featured-products-section").then(mod => mod.FeaturedProductsSection));

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* 01. HERO SECTION (Light/Brand Contrast) */}
      <CategoryHeroSection />

      {/* 02. MARINE FEATURED (Light Contrast - Rhythm) */}
      <FeaturedProductsSection 
        divisionSlug="marine-industrial" 
        hideTabs={true} 
        featuredOnly={true}
        title="Marine Engineering." 
        subtitle="Featured Inventory."
        isDark={false}
      />

      {/* 03. ABOUT PREVIEW (Dark Contrast) */}
      <AboutPreviewSection isDark={true} />
      
      {/* 04. WATER FEATURED (Light Contrast) */}
      <FeaturedProductsSection 
        divisionSlug="ro-solutions" 
        hideTabs={true} 
        featuredOnly={true}
        title="Water Treatment." 
        subtitle="Technical Highlights."
        isDark={false}
      />

      {/* 05. BRANDS & TECH (Alternating) */}
      <BrandsMarquee />
      <TechnologySection />
      
      {/* 06. SEO & FOOTER */}
      <SeoContentSection />
      <FooterSection />
    </main>
  );
}
