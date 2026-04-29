import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import Division from "@/lib/models/Division";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";

import type { Metadata, ResolvingMetadata } from 'next'

// Opt-in to dynamic rendering due to connection caching limits and params
export const dynamic = "force-dynamic";




export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  await connectToDatabase();
  const { slug } = await params;
  const product = await Product.findOne({ slug }).populate("category").lean();

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${product.name} | Delta Impex Marine & Industrial`,
    description: product.description || `High-quality ${product.name} available at Delta Impex. Specialized marine engine parts and industrial equipment.`,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `https://deltaimpex.co/products/${slug}`,
      images: [product.imageUrl || '/og-image.png', ...previousImages],
    },
    keywords: [product.name, product.category?.name, "marine spares", "industrial equipment", "Delta Impex"],
  }
};





export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  await connectToDatabase();
  
  const { slug } = await params;

  // Ensure we register models
  Division.schema; 
  Category.schema;

  const product = await Product.findOne({ slug })
    .populate("category")
    .populate("division")
    .lean();

  if (!product) {
    notFound();
  }

  const relatedProducts = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id }
  })
    .populate("category")
    .limit(4)
    .lean();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.imageUrl,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Delta Impex"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://deltaimpex.co/products/${slug}`,
      "priceCurrency": "USD",
      "price": product.price ? product.price.replace(/[^0-9.]/g, '') : "0",
      "availability": "https://schema.org/InStock",
      "itemCondition": product.condition === 'New' ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://deltaimpex.co"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": product.division?.name || "Divisions",
        "item": `https://deltaimpex.co/divisions/${product.division?.slug || 'marine-industrial'}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.category?.name || "Category",
        "item": `https://deltaimpex.co/products?category=${product.category?.slug || ''}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": product.name,
        "item": `https://deltaimpex.co/products/${slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background mt-10 text-foreground flex flex-col">
       <Header />
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
       />
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
       />
       <main className="flex-1 pt-24  pb-16 md:pt-32 md:pb-24 section-container">
          {/* Back button */}
          <Link href={`/products?divisionSlug=${product.division?.slug || 'marine-industrial'}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 md:mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {product.division?.name || 'Inventory'}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
             {/* Left: Image Viewer */}
             <div className="relative w-full aspect-[4/3] md:aspect-square bg-muted/10 border border-border/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center p-8">
                 {/* object-contain ensures the image is fully visible and not cropped */}
                <Image 
                   src={product.imageUrl || "/placeholder.svg"} 
                   alt={product.name}
                   fill
                   className="object-contain p-4 md:p-12 hover:scale-105 transition-transform duration-700"
                   priority
                   sizes="(max-width: 1024px) 100vw, 50vw"
                />
             </div>

              {/* Right: Details */}
             <div className="flex flex-col justify-center">
                <div className="mb-6">
                   <p className="font-tech text-xs uppercase tracking-widest text-primary mb-3">
                     {product.category?.name || "Equipment"}
                   </p>
                   <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
                     {product.name}
                   </h1>
                   <p className="font-mono text-sm text-muted-foreground uppercase tracking-wider">
                     REF: {product._id.toString().substring(0, 8)}
                   </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                   {product.price && (
                      <div className="bg-primary/5 border border-primary/10 rounded-[1rem] px-5 py-2.5">
                        <span className="font-mono text-lg font-bold text-foreground">{product.price}</span>
                      </div>
                   )}
                   {product.condition && (
                      <div className="flex items-center text-sm text-foreground font-medium border border-primary/20 rounded-[1rem] px-4 py-3 bg-primary/5">
                         {product.condition}
                      </div>
                   )}
                </div>

                <div className="prose prose-invert max-w-none mb-10 text-foreground/90">
                   {product.description ? (
                      <p className="leading-relaxed text-base md:text-lg">{product.description}</p>
                   ) : (
                      <p className="leading-relaxed italic text-muted-foreground text-base md:text-lg">Detailed description currently unavailable for this item. Please inquire for full specifications.</p>
                   )}
                </div>

                <div className="border-t border-border/50 pt-8 mt-auto">
                   <h3 className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Specifications</h3>
                   <ul className="space-y-3 font-mono text-xs md:text-sm">
                      <li className="flex justify-between border-b border-border/20 pb-3">
                         <span className="text-muted-foreground">Division</span>
                         <span className="text-foreground font-medium text-right">{product.division?.name || '-'}</span>
                      </li>
                      <li className="flex justify-between border-b border-border/20 pb-3">
                         <span className="text-muted-foreground">Category</span>
                         <span className="text-foreground font-medium text-right">{product.category?.name || '-'}</span>
                      </li>
                   </ul>
                </div>
                
                <div className="mt-12">
                   <Link href="/contact" className="w-full inline-flex justify-center items-center px-8 py-5 bg-foreground text-background hover:bg-foreground/90 font-tech font-bold text-[11px] md:text-xs uppercase tracking-widest rounded-full transition-all shadow-xl">
                      Inquire About Product
                   </Link>
                </div>
             </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
             <div className="pt-16 md:pt-24 border-t border-border/50">
                <div className="flex items-center justify-between mb-10 md:mb-16">
                   <h2 className="text-2xl md:text-4xl font-display font-medium text-foreground">Similar Products</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                   {relatedProducts.map((item: any) => (
                      <Link href={`/products/${item.slug}`} key={item._id} className="group flex flex-col">
                         <div className="relative aspect-square overflow-hidden rounded-2xl md:rounded-[2rem] bg-muted/10 border border-border/50 transition-all duration-500 group-hover:border-primary flex items-center justify-center p-4">
                            <Image
                               src={item.imageUrl || "/placeholder.svg"}
                               alt={item.name}
                               fill
                               className="object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                            />
                         </div>
                         <div className="pt-5">
                            <h3 className="font-display text-base md:text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
                            <p className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground/60">{item.category?.name}</p>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>
          )}
       </main>
    </div>
  );
};
