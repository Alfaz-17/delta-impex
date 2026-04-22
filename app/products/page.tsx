"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductCatalog } from "@/components/product-catalog";
import { Loader2 } from "lucide-react";

function ProductsListingContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const divisionId = searchParams.get("divisionId");
  
  const [divisionSlug, setDivisionSlug] = useState<string | null>(null);
  const [divisionName, setDivisionName] = useState<string>("All Products");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function resolveRoute() {
      try {
        const res = await fetch("/api/divisions");
        const divisions = await res.json();
        
        let targetDiv = null;
        if (divisionId) {
          targetDiv = divisions.find((d: any) => d._id === divisionId);
        } else if (categoryId) {
          // If we have categoryId, we find its division
          const catRes = await fetch(`/api/categories`);
          const categories = await catRes.json();
          const category = categories.find((c: any) => c._id === categoryId);
          if (category) {
            const divId = typeof category.division === 'string' ? category.division : category.division?._id;
            targetDiv = divisions.find((d: any) => d._id === divId);
          }
        }

        if (targetDiv) {
          setDivisionSlug(targetDiv.slug);
          setDivisionName(targetDiv.name);
        } else {
          // Fallback to Marine if ambiguous or not found
          setDivisionSlug("marine-industrial");
          setDivisionName("Marine & Industrial");
        }
      } catch (error) {
        console.error("Routing error:", error);
      } finally {
        setIsReady(true);
      }
    }
    resolveRoute();
  }, [categoryId, divisionId]);

  if (!isReady) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Passing the resolved division data to the existing ProductCatalog component */}
      <ProductCatalog 
        divisionSlug={divisionSlug || "marine-industrial"} 
        divisionName={divisionName} 
      />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary/40" /></div>}>
        <ProductsListingContent />
      </Suspense>
      <FooterSection />
    </>
  );
}
