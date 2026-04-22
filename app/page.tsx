import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import dynamic from "next/dynamic";
import type { Metadata } from 'next'

// Dynamic imports for heavy or off-screen sections to optimize initial load
const PhilosophySection = dynamic(() => import("@/components/sections/philosophy-section").then(mod => mod.PhilosophySection));
const AboutPreviewSection = dynamic(() => import("@/components/sections/about-preview-section").then(mod => mod.AboutPreviewSection));
const CategoriesShowcaseSection = dynamic(() => import("@/components/sections/categories-showcase-section").then(mod => mod.CategoriesShowcaseSection));
const BrandsMarquee = dynamic(() => import("@/components/sections/brands-marquee").then(mod => mod.BrandsMarquee));
const TechnologySection = dynamic(() => import("@/components/sections/technology-section").then(mod => mod.TechnologySection));
const GallerySection = dynamic(() => import("@/components/sections/gallery-section").then(mod => mod.GallerySection));
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials-section").then(mod => mod.TestimonialsSection));
const FooterSection = dynamic(() => import("@/components/sections/footer-section").then(mod => mod.FooterSection));
const FeaturedProductsSection = dynamic(() => import("@/components/sections/featured-products-section").then(mod => mod.FeaturedProductsSection));

export const metadata: Metadata = {
  title: "Delta Impex | Premium Marine & Industrial Spares",
  description: "Your trusted global supplier of specialized marine engine spare parts, industrial machinery, and advanced RO water treatment systems since day one.",
  openGraph: {
    title: "Delta Impex | Premium Marine Spares & RO Systems",
    description: "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.",
    url: 'https://www.deltaimpex.co',
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />

      {/* Dynamic Marine Featured Section - Moved Up */}
      <FeaturedProductsSection 
        divisionSlug="marine-industrial" 
        hideTabs={true} 
        featuredOnly={true}
        title="Marine Engineering." 
        subtitle="Featured Inventory."
      />

      <PhilosophySection />
      <AboutPreviewSection />
      
      {/* Dynamic RO Featured Section - Moved Up */}
      <FeaturedProductsSection 
        divisionSlug="ro-water-treatment" 
        hideTabs={true} 
        featuredOnly={true}
        title="Water Treatment." 
        subtitle="Technical Highlights."
      />

      <BrandsMarquee />
      <TechnologySection />
      
      <GallerySection />

      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
