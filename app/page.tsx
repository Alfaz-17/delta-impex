import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/section-wrapper";
import dynamic from "next/dynamic";
import type { Metadata } from 'next'

// Dynamic imports for heavy or off-screen sections to optimize initial load
const PhilosophySection = dynamic(() => import("@/components/sections/philosophy-section").then(mod => mod.PhilosophySection));
const AboutPreviewSection = dynamic(() => import("@/components/sections/about-preview-section").then(mod => mod.AboutPreviewSection));
const BrandsMarquee = dynamic(() => import("@/components/sections/brands-marquee").then(mod => mod.BrandsMarquee));
const TechnologySection = dynamic(() => import("@/components/sections/technology-section").then(mod => mod.TechnologySection));
const FooterSection = dynamic(() => import("@/components/sections/footer-section").then(mod => mod.FooterSection));
const SeoContentSection = dynamic(() => import("@/components/sections/seo-content-section").then(mod => mod.SeoContentSection));
const FeaturedProductsSection = dynamic(() => import("@/components/sections/featured-products-section").then(mod => mod.FeaturedProductsSection));

export const metadata: Metadata = {
  title: "Delta Impex | Marine Engine Spares & RO Water Treatment",
  description: "Delta Impex is a global supplier of marine engine spare parts, industrial machinery, and advanced RO water treatment plants with trusted technical sourcing and worldwide delivery.",
  keywords: ["Delta Impex", "marine spare parts", "RO water treatment", "ship engine spares", "industrial machinery supplier", "desalination plants", "marine engineering", "Delta Impex Bhavnagar"],
  alternates: {
    canonical: "https://deltaimpex.co/",
  },
  openGraph: {
    title: "Delta Impex | Marine Spares & RO Water Treatment",
    description: "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.",
    url: 'https://deltaimpex.co/',
    siteName: "Delta Impex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delta Impex | Marine Spares & RO Water Treatment",
    description: "Global supplier of marine engine spare parts and RO treatment systems.",
  },
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
          divisionSlug="ro-solutions" 
          hideTabs={true} 
          featuredOnly={true}
          title="Water Treatment." 
          subtitle="Technical Highlights."
        />
      </SectionWrapper>

      <BrandsMarquee />
      <TechnologySection />
      <SeoContentSection />

      <FooterSection />
    </main>
  );
}

