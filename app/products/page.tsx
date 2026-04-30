"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { ProductCatalog } from "@/components/product-catalog";
import { BusinessLoader } from "@/components/ui/business-loader";

type DivisionRecord = {
  _id: string;
  name: string;
  slug: string;
};

type CategoryRecord = {
  _id: string;
  slug: string;
  division?: string | { _id?: string };
};

function normalizeDivisionSlug(value: string | null) {
  if (!value) {
    return null;
  }

  return value;
}

function ProductsListingContent() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categorySlug = searchParams.get("category");
  const divisionId = searchParams.get("divisionId");
  const rawDivisionSlug = searchParams.get("divisionSlug");

  const [divisionSlug, setDivisionSlug] = useState<string>("marine-industrial");
  const [divisionName, setDivisionName] = useState<string>("Marine & Industrial");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function resolveRoute() {
      setIsReady(false);

      try {
        const divRes = await fetch("/api/divisions");
        const divisionsData = await divRes.json();
        if (!divRes.ok) {
          throw new Error(divisionsData?.error || "Failed to load divisions");
        }

        const divisions: DivisionRecord[] = Array.isArray(divisionsData) ? divisionsData : [];
        const requestedDivisionSlug = normalizeDivisionSlug(rawDivisionSlug);

        let targetDiv =
          (divisionId ? divisions.find((d) => d._id === divisionId) : undefined) ||
          (requestedDivisionSlug ? divisions.find((d) => d.slug === requestedDivisionSlug) : undefined);

        if (!targetDiv && (categoryId || categorySlug)) {
          const catRes = await fetch("/api/categories");
          const categoriesData = await catRes.json();
          if (!catRes.ok) {
            throw new Error(categoriesData?.error || "Failed to load categories");
          }

          const categories: CategoryRecord[] = Array.isArray(categoriesData) ? categoriesData : [];
          const category =
            (categoryId ? categories.find((c) => c._id === categoryId) : undefined) ||
            (categorySlug ? categories.find((c) => c.slug === categorySlug) : undefined);

          if (category) {
            const divId =
              typeof category.division === "string" ? category.division : category.division?._id;
            targetDiv = divisions.find((d) => d._id === divId);
          }
        }

        if (targetDiv) {
          setDivisionSlug(targetDiv.slug);
          setDivisionName(targetDiv.name);
        } else {
          setDivisionSlug("marine-industrial");
          setDivisionName("Marine & Industrial");
        }
      } catch (error) {
        console.error("Routing error:", error);
        setDivisionSlug("marine-industrial");
        setDivisionName("Marine & Industrial");
      } finally {
        setIsReady(true);
      }
    }

    resolveRoute();
  }, [categoryId, categorySlug, divisionId, rawDivisionSlug]);

  if (!isReady) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <BusinessLoader size="md" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <ProductCatalog divisionSlug={divisionSlug} divisionName={divisionName} />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><BusinessLoader size="lg" /></div>}>
        <main className="min-h-screen bg-background">
          <ProductsListingContent />
        </main>
      </Suspense>
      <FooterSection />
    </>
  );
}
