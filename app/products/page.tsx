import { Suspense } from "react";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductCatalog } from "@/components/product-catalog";
import { MarineLoader } from "@/components/ui/marine-loader";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import Division from "@/lib/models/Division";
import { STATIC_CATEGORIES } from "@/lib/categories";

export const revalidate = 3600; // Cache for 1 hour

async function getProductsData() {
  await connectToDatabase();
  
  const [productsRaw, divisionsRaw] = await Promise.all([
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

  return { products, divisions };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { products, divisions } = await getProductsData();
  const params = await searchParams;

  const categoryId = params.categoryId as string;
  const categorySlug = params.category as string;
  const divisionId = params.divisionId as string;
  const rawDivisionSlug = params.divisionSlug as string;

  let targetDiv =
    (divisionId ? divisions.find((d) => d._id === divisionId) : undefined) ||
    (rawDivisionSlug ? divisions.find((d) => d.slug === rawDivisionSlug) : undefined);

  if (!targetDiv && (categoryId || categorySlug)) {
    const category =
      (categoryId ? STATIC_CATEGORIES.find((c: any) => c._id === categoryId) : undefined) ||
      (categorySlug ? STATIC_CATEGORIES.find((c) => c.slug === categorySlug) : undefined);

    if (category) {
      const divSlug = category.division;
      targetDiv = divisions.find((d) => d.slug === divSlug);
    }
  }

  const divisionSlug = targetDiv?.slug || "marine-industrial";
  const divisionName = targetDiv?.name || "Marine & Industrial";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><MarineLoader size="lg" /></div>}>
          <ProductCatalog 
            divisionSlug={divisionSlug} 
            divisionName={divisionName} 
            initialProducts={products}
            initialDivisions={divisions}
          />
        </Suspense>
      </main>
      <FooterSection />
    </>
  );
}
