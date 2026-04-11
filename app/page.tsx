import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { BrandsMarquee } from "@/components/sections/brands-marquee";
import { TechnologySection } from "@/components/sections/technology-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <AboutPreviewSection />
      <BrandsMarquee />
      <TechnologySection />
      <GallerySection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
