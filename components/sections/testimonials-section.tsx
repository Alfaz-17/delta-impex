"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl heading-section !not-italic !font-semibold !leading-snug text-foreground">
          Delta Impex combines extensive global sourcing networks with deep technical expertise — 
          designed for marine and industrial operators who refuse to compromise on quality, reliability, or operational continuity.
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/about-hero.png"
          alt="Delta Impex operational legacy"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
