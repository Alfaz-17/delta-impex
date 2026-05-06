import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import Link from "next/link";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import { STATIC_CATEGORIES } from "@/lib/categories";
import { NewArrivalsHero } from "./new-arrivals-hero";

export const revalidate = 3600;

async function getNewArrivalsData() {
  await connectToDatabase();
  
  const getProductsForDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    if (!division) return [];
    
    const productsRaw = await Product.find({ 
      division: division._id,
      isFeatured: true // For now using featured as "new arrivals" or we could add a new field
    })
    .limit(8)
    .lean();

    return productsRaw.map((p: any) => {
      const cat = STATIC_CATEGORIES.find((c) => c.slug === p.category);
      return {
        ...p,
        _id: p._id.toString(),
        division: { _id: p.division.toString(), name: division.name, slug: division.slug },
        category: cat ? { name: cat.name, slug: cat.slug } : { name: p.category, slug: p.category },
      };
    });
  };

  const [marineProducts, roProducts] = await Promise.all([
    getProductsForDivision("marine-industrial"),
    getProductsForDivision("ro-solutions")
  ]);

  return { marineProducts, roProducts };
}

export default async function NewArrivalsPage() {
  const { marineProducts, roProducts } = await getNewArrivalsData();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <NewArrivalsHero />

      {/* 02. NEW ARRIVALS GRID (Dark Mode Sections) */}
      <div className="space-y-0">
        <FeaturedProductsSection 
          divisionSlug="marine-industrial" 
          hideTabs={true} 
          featuredOnly={true}
          title="Marine Components." 
          subtitle="Latest Marine Arrivals"
          isDark={false}
          initialProducts={marineProducts}
        />
        
        <FeaturedProductsSection 
          divisionSlug="ro-solutions" 
          hideTabs={true} 
          featuredOnly={true}
          title="Water Solutions." 
          subtitle="New Water Tech"
          isDark={true}
          initialProducts={roProducts}
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
