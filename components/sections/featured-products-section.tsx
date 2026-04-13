"use client";
import React, { useState, useEffect } from "react";
import { FadeImage } from "@/components/fade-image";
import { Loader2 } from "lucide-react";

type CategoryType = "marine" | "ro";

interface FeaturedProductsSectionProps {
  initialCategory?: CategoryType;
  divisionSlug?: string;
  hideTabs?: boolean;
  featuredOnly?: boolean; // New prop
  title?: string;
  subtitle?: string;
}

export function FeaturedProductsSection({ 
  initialCategory = "marine",
  divisionSlug,
  hideTabs = false,
  featuredOnly = false,
  title = "Detailed Inventory.",
  subtitle = "Dual-Sector Expertise."
}: FeaturedProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<CategoryType>(initialCategory);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const targetSlug = divisionSlug || (activeTab === "marine" ? "marine-industrial" : "ro-water-treatment");
        
        const divRes = await fetch("/api/divisions");
        const divisions = await divRes.json();
        const division = divisions.find((d: any) => d.slug === targetSlug);
        
        if (division) {
          let url = `/api/products?divisionId=${division._id}`;
          if (featuredOnly) {
            url += "&isFeatured=true";
          }
          const res = await fetch(url);
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [activeTab, divisionSlug, featuredOnly]);

  return (
    <section id="parts-grid" className="bg-background min-h-screen">
      {/* Section Title & Tabs */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl heading-display uppercase">
          {title}
          <br />
          {subtitle}
        </h2>
        
        {/* Tab Switcher */}
        {!hideTabs && (
          <div className="mt-12 flex justify-center">
            <div className="inline-flex items-center rounded-full bg-muted p-1 border border-border">
              <button
                onClick={() => setActiveTab("marine")}
                className={`px-8 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === "marine" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Marine Parts
              </button>
              <button
                onClick={() => setActiveTab("ro")}
                className={`px-8 py-2 text-sm font-medium rounded-full transition-all ${
                  activeTab === "ro" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RO Systems
              </button>
            </div>
          </div>
        )}

        <p className="mx-auto mt-8 max-w-md text-sm text-muted-foreground font-sans">
          {activeTab === "marine" 
            ? "A comprehensive selection of main engine, auxiliary machinery, and industrial equipment components."
            : "Precision-engineered RO desalination components for specialized water treatment plants."}
        </p>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-40 md:px-12 lg:px-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-40">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-40 border border-dashed border-border rounded-[3rem] opacity-30">
            <p className="font-tech text-xs uppercase tracking-[0.4em]">No Live Inventory Available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {products.map((product, index) => (
              <div 
                key={product._id} 
                className={`group transition-all duration-700 ${
                  index % 2 === 1 ? "md:translate-y-20" : ""
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                  <FadeImage
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.isFeatured && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-widest">
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Content */}
                <div className="py-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs uppercase tracking-widest text-primary font-tech">
                      {product.category?.name}
                    </p>
                    {product.price && (
                      <p className="text-xs font-tech text-muted-foreground">{product.price}</p>
                    )}
                  </div>
                  <h3 className="text-foreground text-xl font-semibold">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
