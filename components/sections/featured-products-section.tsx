"use client";
import React, { useState } from "react";
import { FadeImage } from "@/components/fade-image";

type Category = "marine" | "ro";

const products: Record<Category, any[]> = {
  marine: [
    {
      title: "Main & Auxiliary Engines",
      description: "New and reconditioned main engines and auxiliary machinery.",
      image: "/images/marine-parts-clean.png",
    },
    {
      title: "Turbochargers & Pumps",
      description: "High Performance Components",
      image: "/images/categories/turbo-pump.png",
    },
    {
      title: "Purifiers & Separators",
      description: "Oil and Fuel Treatment",
      image: "/images/categories/purifier.png",
    },
    {
      title: "Heat Exchangers & Coolers",
      description: "Industrial Cooling Systems",
      image: "/images/categories/heat-exchanger.png",
    },
    {
      title: "Electrical & Navigation",
      description: "Precision Electronics",
      image: "/images/categories/electrical.png",
    },
    {
      title: "Marine Consumables",
      description: "General Supplies & Hardware",
      image: "/images/categories/consumables.png",
    },
  ],
  ro: [
    {
      title: "Pre-Treatment Skids",
      description: "Multi-media & Carbon Filtration",
      image: "/ro/ro-plant-clean.png",
    },
    {
      title: "High-Pressure Pumps",
      description: "CNP & Vertical Multistage Units",
      image: "/ro/ro-pump-clean.png",
    },
    {
      title: "Membrane Vessels",
      description: "Advanced Semi-permeable Systems",
      image: "/ro/ro-membrane-clean.png",
    },
    {
      title: "Controls & PLC",
      description: "Automated System Management",
      image: "/images/categories/electrical.png",
    },
    {
      title: "CIP Systems",
      description: "Clean-in-Place Maintenance Units",
      image: "/ro/ro-plant-framed.png",
    },
    {
      title: "Instrumentation",
      description: "Monitoring & Measurement Tools",
      image: "/images/mood/ro-water-flow.png",
    },
  ],
};

interface FeaturedProductsSectionProps {
  initialCategory?: Category;
  hideTabs?: boolean;
  title?: string;
  subtitle?: string;
}

export function FeaturedProductsSection({ 
  initialCategory = "marine", 
  hideTabs = false,
  title = "Detailed Inventory.",
  subtitle = "Dual-Sector Expertise."
}: FeaturedProductsSectionProps) {
  const [activeTab, setActiveTab] = useState<Category>(initialCategory);

  return (
    <section id="parts-grid" className="bg-background">
      {/* Section Title & Tabs */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl font-display uppercase italic">
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

      {/* Features Grid - Zig Zag Asymmetric Layout */}
      <div className="grid grid-cols-1 gap-8 px-6 pb-40 md:grid-cols-2 lg:grid-cols-3 md:px-12 lg:px-20">
        {products[activeTab].map((product, index) => (
          <div 
            key={`${activeTab}-${product.title}`} 
            className={`group transition-all duration-700 ${
              index % 2 === 1 ? "md:translate-y-20" : ""
            }`}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <FadeImage
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Content */}
            <div className="py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {product.description}
              </p>
              <h3 className="text-foreground text-xl font-semibold">
                {product.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
