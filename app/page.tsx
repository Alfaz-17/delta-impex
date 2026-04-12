import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { BrandsMarquee } from "@/components/sections/brands-marquee";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FooterSection } from "@/components/sections/footer-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { CategoriesShowcaseSection } from "@/components/sections/categories-showcase-section";
import type { Metadata } from 'next'

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
      <PhilosophySection />
      <AboutPreviewSection />
      
      <CategoriesShowcaseSection />

      <BrandsMarquee />
      <TechnologySection />
      
      {/* Dynamic Marine Featured Section */}
      <FeaturedProductsSection 
        divisionSlug="marine-industrial" 
        hideTabs={true} 
        featuredOnly={true}
        title="Marine Engineering." 
        subtitle="Featured Inventory."
      />

      <GallerySection />

      {/* Dynamic RO Featured Section */}
      <FeaturedProductsSection 
        divisionSlug="ro-water-treatment" 
        hideTabs={true} 
        featuredOnly={true}
        title="Water Treatment." 
        subtitle="Technical Highlights."
      />

      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
