import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/section-wrapper";
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
  title: "Delta Impex | Premium Marine Engine Spares & RO Water Systems",
  description: "Global supplier of ship engine spare parts, industrial machinery, and advanced reverse osmosis (RO) water treatment plants. Trusted technical sourcing and worldwide delivery.",
  keywords: ["marine spare parts", "RO water treatment", "ship engine spares", "industrial machinery supplier", "desalination plants", "marine engineering", "Delta Impex Bhavnagar"],
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

      <SectionWrapper>
        <PhilosophySection />
      </SectionWrapper>
      
      <SectionWrapper>
        <AboutPreviewSection />
      </SectionWrapper>
      
      {/* Dynamic RO Featured Section - Moved Up */}
      <SectionWrapper>
        <FeaturedProductsSection 
          divisionSlug="ro-water-treatment" 
          hideTabs={true} 
          featuredOnly={true}
          title="Water Treatment." 
          subtitle="Technical Highlights."
        />
      </SectionWrapper>

      <BrandsMarquee />
      <TechnologySection />
      
      <GallerySection />

      <FooterSection />
    </main>
  );
}
