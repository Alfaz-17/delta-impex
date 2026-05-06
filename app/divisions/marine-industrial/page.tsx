import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductCatalog } from "@/components/product-catalog";
import Image from "next/image";
import { Ship, Anchor, Gauge, Cog, Filter, Zap, Compass, ChevronRight, Loader2 } from "lucide-react";
import React, { Suspense } from "react";
import Link from "next/link";
import { MarineDivisionHero } from "./marine-hero"; // We'll extract the client-side logic
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import { STATIC_CATEGORIES } from "@/lib/categories";

export const revalidate = 3600;

const categories = [
  { icon: Ship, name: "Main & Auxiliary Engine Spares" },
  { icon: Cog, name: "Turbochargers, Pumps & Compressors" },
  { icon: Filter, name: "Purifiers & Separators" },
  { icon: Gauge, name: "FW Generators & Heat Exchangers" },
  { icon: Compass, name: "Navigation & Electronics" },
  { icon: Anchor, name: "Deck Machinery & Engine Room" },
];

async function getDivisionData() {
  await connectToDatabase();
  const [division, productsRaw, divisionsRaw] = await Promise.all([
    Division.findOne({ slug: "marine-industrial" }).lean(),
    Product.find({}).populate("division", "name slug").lean(),
    Division.find({}).lean()
  ]);

  const products = productsRaw.map((p: any) => {
    const cat = STATIC_CATEGORIES.find((c) => c.slug === p.category);
    return {
      ...p,
      _id: p._id.toString(),
      division: p.division ? { 
        _id: p.division._id.toString(), 
        name: p.division.name, 
        slug: p.division.slug 
      } : null,
      category: cat ? { name: cat.name, slug: cat.slug } : { name: p.category, slug: p.category },
    };
  });

  const divisions = divisionsRaw.map((d: any) => ({
    ...d,
    _id: d._id.toString()
  }));

  return { division, products, divisions };
}

export default async function MarinePartsPage() {
  const { division, products, divisions } = await getDivisionData();

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <MarineDivisionHero />

      {/* Product Catalog */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-background text-primary/20"><Loader2 className="animate-spin" /></div>}>
        <ProductCatalog 
          divisionSlug="marine-industrial" 
          divisionName="Marine & Industrial" 
          initialProducts={products}
          initialDivisions={divisions}
        />
      </Suspense>

      {/* Section 1: Introduction & Capabilities */}
      <section className="section-container pt-16 md:pt-24 border-t border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <FadeInOnScroll>
              <div className="mb-12">
                <p className="label-tech text-primary mb-4">Precision Components</p>
                <h2 className="heading-display text-foreground mb-8">Ship Spare Parts <br/>& Machinery.</h2>
                <p className="body-text !leading-relaxed text-muted-foreground mb-8 text-xl">
                  We supply a comprehensive range of high-performance ship spare parts for main engines, 
                  auxiliary machinery, and navigation systems, ensuring operational continuity for global maritime fleets.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue group-hover:bg-accent-blue group-hover:text-white transition-all duration-300">
                        <cat.icon size={18} />
                      </div>
                      <span className="font-tech text-[11px] uppercase tracking-widest text-muted-foreground font-bold group-hover:text-foreground transition-colors">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          </div>

          <div className="lg:col-span-5 space-y-12 relative overflow-hidden bg-dark-card p-8 md:p-12 rounded-[2.5rem] border border-white/[0.06] shadow-lg">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.5) 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent-glow/15 blur-[70px]" />
            <FadeInOnScroll delay={0.1}>
              <div className="relative z-10 space-y-4">
                <p className="font-tech text-[10px] uppercase tracking-widest text-accent-blue font-bold">Industrial & Power</p>
                <h3 className="heading-sub text-white">Heavy Machinery Solutions.</h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  Beyond the sea, we support land-based industries with high-capacity industrial engines (Cummins, Caterpillar, Perkins), generator sets, and specialized power plant equipment.
                </p>
                <ul className="space-y-3 pt-4">
                  {["Industrial Generator Sets (Gensets)", "Complete Power Plant Support", "Technical Machinery Solutions"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-medium text-slate-300/80">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Secondary Image/Content Block */}
      <section className="section-container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeInOnScroll direction="right">
              <div className="relative aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-border/10">
                <Image
                  src="/images/mood/hero-marine-detail.png"
                  alt="Quality inspection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll>
              <div className="space-y-8">
                <p className="label-tech text-primary">Availability Standards</p>
                <h2 className="heading-section">New, Used, or Reconditioned.</h2>
                <p className="body-text !leading-relaxed">
                  We understand maintenance budgets. Our inventory is curated to offer flexible sourcing 
                  options without compromising on safety or performance standards. Every part is 
                  rigorously inspected before global dispatch.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    {["GENUINE", "OEM", "RECONDITIONED"].map((tag, i) => (
                        <span key={i} className="px-5 py-2.5 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-[10px] font-tech font-bold uppercase tracking-widest text-accent-blue">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </FadeInOnScroll>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-foreground text-background py-24 md:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 pattern-grid-white opacity-5" />
        <div className="section-container relative z-10 flex flex-col items-center text-center">
          <FadeInOnScroll>
            <h2 className="heading-display !text-background mb-8">
              Need a specific part? <br />
              <span className="text-primary italic">Our team is ready.</span>
            </h2>
            <p className="body-text !text-background/60 max-w-2xl mx-auto mb-12">
              Our global sourcing network specializes in locating critical components for 
              out-of-production machinery and urgent maintenance requirements.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-6 px-10 py-5 rounded-full bg-primary text-white font-tech text-xs uppercase tracking-[0.3em] font-bold hover:scale-105 transition-all duration-500 shadow-2xl"
            >
              Request a Technical Quote <ChevronRight size={16} />
            </Link>
          </FadeInOnScroll>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
