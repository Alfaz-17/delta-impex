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

export default function HomeContent({ 
  initialData, 
  footerData,
  marineProducts = [],
  roProducts = []
}: { 
  initialData?: any, 
  footerData?: any,
  marineProducts?: any[],
  roProducts?: any[]
}) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* 01. HERO SECTION */}
      <CategoryHeroSection 
        heading={initialData?.heroHeading}
        subheading={initialData?.heroSubheading}
        bgImage={initialData?.heroImageUrl}
        categoryLabel={initialData?.heroCategoryLabel}
      />

      {/* 02. MARINE FEATURED */}
      <FeaturedProductsSection 
        divisionSlug="marine-industrial" 
        hideTabs={true} 
        featuredOnly={true}
        title={initialData?.marineTitle || "Marine Engineering."} 
        subtitle={initialData?.marineSubtitle || "Featured Inventory."}
        isDark={false}
        viewAllText={initialData?.viewAllText}
        technicalDetailsText={initialData?.technicalDetailsText}
        emptyText={initialData?.emptyText}
        initialProducts={marineProducts}
      />

      {/* 03. ABOUT PREVIEW */}
      <AboutPreviewSection 
        isDark={true} 
        label={initialData?.aboutLabel}
        title={initialData?.aboutTitle}
        subtitle={initialData?.aboutSubtitle}
        description={initialData?.aboutDescription}
        secondaryText={initialData?.aboutSecondaryText}
        experience={initialData?.aboutExperience}
        experienceLabel={initialData?.aboutExperienceLabel}
        image={initialData?.aboutImageUrl}
      />
      
      {/* 04. WATER FEATURED */}
      <FeaturedProductsSection 
        divisionSlug="ro-solutions" 
        hideTabs={true} 
        featuredOnly={true}
        title={initialData?.waterTitle || "Water Treatment."} 
        subtitle={initialData?.waterSubtitle || "Technical Highlights."}
        isDark={false}
        viewAllText={initialData?.viewAllText}
        technicalDetailsText={initialData?.technicalDetailsText}
        emptyText={initialData?.emptyText}
        initialProducts={roProducts}
      />

      {/* 05. BRANDS & TECH */}
      <BrandsMarquee brands={initialData?.brands} />
      <TechnologySection 
        heading={initialData?.techHeading}
        description={initialData?.techDescription}
        secondaryDescription={initialData?.techSecondaryDescription}
        label={initialData?.techLabel}
        badgeLabel={initialData?.techBadgeLabel}
        badgeTitle={initialData?.techBadgeTitle}
        items={initialData?.techItems}
      />
      
      {/* 06. SEO & FOOTER */}
      <SeoContentSection 
        title1={initialData?.seoTitle1}
        content1={initialData?.seoContent1}
      />
      <FooterSection data={footerData} />
    </main>
  );
}
