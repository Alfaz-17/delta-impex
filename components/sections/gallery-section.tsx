"use client";

import Image from "next/image";

const GALLERY_ITEMS = [
  {
    src: "/images/mood/hero-marine-detail.png",
    category: "MARINE",
    id: "MAR-EX-991",
    title: "Precision Engine Components",
    desc: "Genuine spare parts for crosshead and trunk piston engines.",
  },
  {
    src: "/images/mood/ro-water-flow.png",
    category: "RO SYSTEMS",
    id: "RO-TECH-042",
    title: "Advanced Membrane Filtration",
    desc: "Industrial grade desalination and water recovery modules.",
  },
  {
    src: "/images/mood/hero-industrial-scale.png",
    category: "INDUSTRIAL",
    id: "IND-PR-108",
    title: "Power Plant Infrastructure",
    desc: "Heavy industrial solutions for global energy reliability.",
  },
  {
    src: "/images/mood/hero-industrial-detail.png",
    category: "INDUSTRIAL",
    id: "IND-PREC-075",
    title: "Technical Control Systems",
    desc: "High-accuracy monitoring and industrial automation parts.",
  },
  {
    src: "/images/mood/hero-marine-sunset.png",
    category: "MARINE",
    id: "MAR-APP-234",
    title: "Intermodal Logistics Support",
    desc: "Global delivery and integration for specialized marine parts.",
  },
  {
    src: "/Gallery/Whisk_ac43c800066de9990a94519f045935d5dr (1).jpeg",
    category: "RO SYSTEMS",
    id: "RO-MOD-882",
    title: "Water Treatment Assembly",
    desc: "Custom engineered RO racks for industrial processing.",
  },
];

export function GallerySection() {
  return (
    <section className="bg-[#1B3A5C] py-8 md:py-10 lg:py-12">
      <div className="section-container mb-6 md:mb-8">
        <span className="label-tech mb-3 block">Technical Archive</span>
        <h2 className="heading-section max-w-xl text-white">
          Showcasing Our <span className="font-light italic text-accent">Global Assets.</span>
        </h2>
      </div>

      <div className="section-container grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_ITEMS.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5C] via-[#1B3A5C]/20 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                  {item.category}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{item.id}</span>
              </div>
              <h3 className="mb-1 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/60">{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
