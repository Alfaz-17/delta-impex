"use client";

import Image from "next/image";

const specs = [
  { label: "Solutions", value: "Complete" },
  { label: "Pricing", value: "Competitive" },
  { label: "Sourcing", value: "Global" },
  { label: "Response", value: "Quick" },
];

export function EditorialSection() {
  return (
    <section id="vision" className="relative h-[150vh] bg-background">
      {/* Title Section */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl font-display">
          Why Choose Delta Impex.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
          Our commitment is to deliver quality products, timely service, and long-term business relationships.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground font-tech">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-3xl lg:text-4xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Mood Image */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9] overflow-hidden">
        <Image
          src="/images/mood/vision-abstract.png"
          alt="Delta Impex Industrial Vision"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
