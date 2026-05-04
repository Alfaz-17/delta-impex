import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import { ArrowLeft, ArrowRight, ShieldCheck, Globe, Clock, Package } from "lucide-react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import ProductStructuredData from "@/components/seo/product-structured-data";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import { ProductFAQ } from "@/components/sections/product-faq";

import type { Metadata, ResolvingMetadata } from 'next'

import { STATIC_CATEGORIES } from "@/lib/categories";
import { SITE_INFO } from "@/lib/site";

export const revalidate = 3600; // Revalidate every hour, or when revalidatePath is called

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  await connectToDatabase();
  const { slug } = await params;
  const productRaw = await Product.findOne({ slug }).lean();

  if (!productRaw) {
    return { title: 'Product Not Found | Delta Impex' }
  }

  const product = productRaw as any;
  const category = STATIC_CATEGORIES.find(c => c.slug === product.category)?.name || "Technical Spares";
  const previousImages = (await parent).openGraph?.images || []

  const title = `${product.name} — ${category} | Delta Impex`;
  const description = product.description 
    ? `${product.description.substring(0, 150)}... Buy ${product.name} at Delta Impex. High-quality marine and industrial equipment. Request a quote today.`
    : `High-quality ${product.name} specialized for marine and industrial applications. Global sourcing and delivery available at Delta Impex. Inquire now!`;

  return {
    title,
    description,
    keywords: [product.name, category, "marine spares", "industrial machinery", "Delta Impex", "ship equipment"],
    alternates: {
      canonical: `https://deltaimpex.co/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://deltaimpex.co/products/${slug}`,
      images: [product.imageUrl || '/og-image.png', ...previousImages],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.imageUrl || '/og-image.png'],
    }
  }
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  const { slug } = await params;

  Division.schema; 

  const productRaw = await Product.findOne({ slug })
    .populate("division")
    .lean();

  if (!productRaw) {
    notFound();
  }

  const p = productRaw as any;
  const cat = STATIC_CATEGORIES.find((c) => c.slug === p.category);
  const product = {
    ...p,
    category: cat ? { name: cat.name, slug: cat.slug } : { name: p.category, slug: p.category }
  };

  const relatedProductsRaw = await Product.find({
    category: p.category, // category is already a slug in the DB
    _id: { $ne: product._id }
  })
    .limit(4)
    .lean();

  const relatedProducts = relatedProductsRaw.map((rp: any) => {
    const rCat = STATIC_CATEGORIES.find((c) => c.slug === rp.category);
    return {
      ...rp,
      category: rCat ? { name: rCat.name, slug: rCat.slug } : { name: rp.category, slug: rp.category }
    };
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
       <Header />
       <ProductStructuredData 
         product={{
           title: product.name,
           description: product.description || "",
           image: `${SITE_INFO.domain}${product.imageUrl || "/og-image.png"}`,
           category: product.category?.name,
           condition: product.condition,
           sku: product._id.toString(),
           brand: SITE_INFO.name
         }} 
         slug={slug} 
       />
       <BreadcrumbSchema 
          items={[
            { name: "Home", item: "/" },
            { name: "Products", item: "/products" },
            { name: product.division?.name || "Inventory", item: `/products?divisionSlug=${product.division?.slug || 'marine-industrial'}` },
            { name: product.name, item: `/products/${slug}` }
          ]}
        />
       
       <main className="flex-1 pt-32 pb-24">
          {/* Breadcrumb Navigation */}
          <div className="section-container mb-12">
            <Link 
              href={`/products?divisionSlug=${product.division?.slug || 'marine-industrial'}`} 
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowLeft size={14} />
              </div>
              <span className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                Back to {product.division?.name || 'Inventory'}
              </span>
            </Link>
          </div>

          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              
              {/* Left: Premium Image Showcase */}
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/5 blur-[100px] opacity-30 pointer-events-none" />
                
                <div className="relative aspect-square overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl p-12 md:p-20 flex items-center justify-center">
                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-primary/10" />
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-primary/10" />
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
                  
                  <Image 
                    src={product.imageUrl || "/placeholder.svg"} 
                    alt={product.name}
                    fill
                    className="object-contain p-8 md:p-16 group-hover:scale-105 transition-transform duration-1000"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* Tech Specs Label */}
                  <div className="absolute bottom-12 left-12 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-tech text-[9px] font-bold uppercase tracking-widest text-primary/60">Technical Standard Verified</span>
                  </div>
                </div>
              </div>

              {/* Right: Technical Details */}
              <div className="flex flex-col pt-4">
                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent font-tech text-[9px] font-bold uppercase tracking-widest rounded-none border border-accent/20">
                      {product.category?.name || "Technical Equipment"}
                    </span>
                    {product.condition && (
                      <span className="px-3 py-1 bg-primary/5 text-primary/60 font-tech text-[9px] font-bold uppercase tracking-widest rounded-none border border-primary/10">
                        {product.condition}
                      </span>
                    )}
                  </div>
                  
                  <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-primary leading-[0.95] tracking-tighter uppercase">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-6 py-6 border-y border-slate-100">
                    <div className="flex items-center gap-3">
                      <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-slate-400">Reference:</p>
                      <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary">{product._id.toString().substring(0, 8)}</p>
                    </div>
                    {product.price && (
                      <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
                        <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-slate-400">Price:</p>
                        <p className="font-display text-xl font-bold text-accent">{product.price}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8 mb-12">
                  <div className="prose prose-slate max-w-none">
                    <p className="body-premium text-slate-600 leading-relaxed italic border-l-4 border-accent pl-6">
                      {product.description || "Detailed technical specifications currently undergoing catalog synchronization. Please contact our engineering department for comprehensive data sheets."}
                    </p>
                  </div>

                  {/* High-Contrast Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: ShieldCheck, title: "Certified", value: "Verified Parts" },
                      { icon: Globe, title: "Sourcing", value: "Global Range" },
                      { icon: Clock, title: "Supply", value: "Rapid Response" },
                      { icon: Package, title: "Condition", value: product.condition || "Inspected" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 border border-slate-100 bg-slate-50/50 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-none bg-primary/5 flex items-center justify-center text-accent">
                          <item.icon size={16} />
                        </div>
                        <div>
                          <p className="text-[8px] font-tech font-bold uppercase tracking-widest text-slate-400">{item.title}</p>
                          <p className="text-[10px] font-tech font-bold uppercase tracking-widest text-primary">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-display font-bold uppercase text-[11px] tracking-[0.2em] transition-all hover:bg-accent shadow-2xl"
                  >
                    Request Technical Quote
                    <ArrowRight size={16} />
                  </Link>
                  <Link 
                    href={`https://wa.me/91${SITE_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello, I am interested in ${product.name}`)}`} 
                    target="_blank"
                    className="inline-flex items-center justify-center px-8 py-5 border-2 border-primary/10 text-primary font-display font-bold uppercase text-[11px] tracking-[0.2em] hover:border-accent hover:text-accent transition-all bg-white"
                  >
                    WhatsApp Support
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Technical FAQ Section */}
          <ProductFAQ productName={product.name} />

          {/* Related Products Section (Dark Contrast) */}
          {relatedProducts.length > 0 && (
            <section className="mt-32 pt-24 border-t border-slate-100">
               <div className="section-container">
                  <div className="flex items-center justify-between mb-16">
                    <div className="max-w-xl">
                      <p className="label-tech text-accent mb-4">You May Also Require</p>
                      <h2 className="heading-display text-primary uppercase tracking-tighter">Related <span className="text-accent italic font-medium">Spares.</span></h2>
                    </div>
                    <Link href="/products" className="hidden md:flex items-center gap-3 font-tech text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors">
                      View Full Catalog <ArrowRight size={14} />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((item: any) => (
                      <Link href={`/products/${item.slug}`} key={item._id} className="group block">
                        <div className="relative aspect-square mb-6 overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-accent transition-all duration-700 p-8 flex items-center justify-center">
                          <Image
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="space-y-2">
                           <p className="font-tech text-[9px] font-bold uppercase tracking-widest text-accent">{item.category?.name}</p>
                           <h3 className="heading-sub !text-base text-primary group-hover:text-accent transition-colors line-clamp-2">{item.name}</h3>
                        </div>
                      </Link>
                    ))}
                  </div>
               </div>
            </section>
          )}
       </main>
       <FooterSection />
    </div>
  );
};
