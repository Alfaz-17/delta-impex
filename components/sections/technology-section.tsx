"use client";

import Image from "next/image";

export function TechnologySection() {
  return (
    <section className="relative overflow-hidden bg-dark-base py-8 text-white md:py-10 lg:py-12">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(91,155,213,0.4) 1px, transparent 0)",
          backgroundSize: "2rem 2rem",
        }}
      />
      {/* Background Glows - using brand variables */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-glow/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <p className="label-tech !text-accent-blue mb-6">Advanced Engineering</p>
            <h2 className="heading-display mb-8">
              RO Water <br />
              <span className="text-accent-blue italic">Desalination.</span>
            </h2>
            <div className="space-y-8 max-w-xl">
              <p className="body-text !text-slate-200">
                We supply specialized RO systems for both marine and industrial use, designed to convert saline seawater into clean, safe, and potable freshwater.
              </p>
              <p className="body-text !text-slate-300/80">
                Our technology plays a vital role in regions where freshwater resources are limited, especially in coastal and industrial areas. We provide complete solutions including Reverse Osmosis plants, water treatment equipment, and specialized maintenance support.
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4">
                {[
                  "Seawater Desalination",
                  "Technical Maintenance",
                  "Advanced Filtration",
                  "Global Supply Chain",
                  "Industrial Scale",
                  "Marine Specialized"
                ].map((item, i) => (
                  <li key={i} className="label-tech !mb-0 !text-slate-100 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image Side */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square md:aspect-[4/5] lg:aspect-square group transition-all duration-700">
              <div className="absolute inset-0 bg-accent-blue/20 blur-[100px] opacity-30 pointer-events-none transition-opacity group-hover:opacity-50" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/12 shadow-2xl shadow-black/30">
                <Image
                  src="/ro/ro-plant-framed.png"
                  alt="Industrial RO Plant"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-transparent to-transparent opacity-90" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
