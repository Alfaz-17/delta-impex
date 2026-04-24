"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="statement" className="bg-background overflow-hidden">
    

      {/* Cinematic Parallax Image */}
      <div ref={containerRef} className="relative aspect-[21/9] w-full overflow-hidden">
        <motion.div 
          style={{ y, height: "130%", top: "-15%", position: "absolute", width: "100%" }}
          className="will-change-transform"
        >
          <Image
            src="/images/about-hero.png"
            alt="Delta Impex operational legacy"
            fill
            sizes="100vw"
            className="object-cover contrast-[1.1] saturate-[0.8]"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
        
        {/* Safe area fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}
