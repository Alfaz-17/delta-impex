"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Droplets, Settings, Zap, Filter, Beaker, Database } from "lucide-react";

const steps = [
  {
    image: "/images/mood/hero-marine-sunset.png",
    title: "1. Seawater Intake",
    description: "Seawater is drawn from the ocean through specially designed intake systems equipped with screens to remove large particles such as sand, debris, and marine life.",
    icon: Droplets,
  },
  {
    image: "/images/ro-generated/pretreatment.png",
    title: "2. Pre-Treatment",
    description: (
      <>
        Before entering the RO system, the water undergoes multi-stage filtration:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Removal of suspended solids and turbidity</li>
          <li>Chemical dosing to prevent scaling and biological growth</li>
        </ul>
        <p className="mt-2">This step ensures long life and efficiency of the membranes.</p>
      </>
    ),
    icon: Settings,
  },
  {
    image: "/ro/ro-pump-clean.png",
    title: "3. High-Pressure Pumping",
    description: "The pre-treated seawater is pressurized using high-pressure pumps. This pressure is essential to overcome natural osmotic pressure and push water through the RO membranes.",
    icon: Zap,
  },
  {
    image: "/ro/ro-membrane-clean.png",
    title: "4. Reverse Osmosis Filtration",
    description: (
      <>
        At the core of the system are semi-permeable membranes that:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Remove dissolved salts (TDS)</li>
          <li>Eliminate bacteria, viruses, and heavy metals</li>
          <li>Produce high-quality freshwater (permeate)</li>
        </ul>
        <p className="mt-2">The remaining concentrated brine is safely discharged or managed.</p>
      </>
    ),
    icon: Filter,
  },
  {
    image: "/images/mood/ro-water-flow.png",
    title: "5. Post-Treatment",
    description: (
      <>
        The purified water is conditioned to make it suitable for consumption:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Mineral balancing (calcium, magnesium)</li>
          <li>pH adjustment</li>
          <li>Final disinfection using UV or chlorination</li>
        </ul>
      </>
    ),
    icon: Beaker,
  },
  {
    image: "/images/mood/hero-industrial-scale.png",
    title: "6. Storage & Distribution",
    description: "The treated water is stored in tanks and distributed for domestic, industrial, or commercial use.",
    icon: Database,
  },
];

export function ROProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="relative bg-background">
      {/* Introduction Header */}
      <div className="px-6 py-24 text-center md:px-12 md:py-32 lg:px-20 lg:py-40">
        <h2 className="mb-6 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl italic">
          Turning Seawater into <br />
          <span className="text-muted-foreground">Pure Drinking Water.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-sans leading-relaxed">
          A Reverse Osmosis (RO) Seawater Desalination Plant is an advanced water treatment system 
          designed to convert saline seawater into clean, safe, and potable freshwater.
        </p>
      </div>

      {/* Sticky Scroll Section */}
      <div className="relative h-[600vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden md:flex-row">
          
          {/* Left: Images */}
          <div className="relative h-1/2 w-full overflow-hidden md:h-full md:w-1/2">
            {steps.map((step, idx) => {
              const start = idx / steps.length;
              const end = (idx + 1) / steps.length;
              
              // We want the image to fade in and scale slightly
              const opacity = useTransform(smoothProgress, 
                [start - 0.05, start, end, end + 0.05], 
                [0, 1, 1, 0]
              );
              const scale = useTransform(smoothProgress, 
                [start, end], 
                [1.1, 1]
              );

              return (
                <motion.div
                  key={idx}
                  style={{ opacity }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 z-10 bg-foreground/20" />
                  <motion.div style={{ scale }} className="absolute inset-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* Number Overlay */}
            <div className="absolute bottom-6 left-6 z-20 md:bottom-12 md:left-12">
              <motion.span className="font-tech text-6xl font-bold text-white/20 md:text-9xl">
                {steps.map((_, i) => {
                  const opacity = useTransform(smoothProgress, 
                    [i / steps.length, (i + 1) / steps.length], 
                    [1, 1]
                  );
                  // This is a bit tricky for plain text, simpler to just use progress
                  const stepNum = useTransform(smoothProgress, [0, 1], [1, steps.length]);
                  return null; // Logic below instead
                })}
                {/* Simplified step counter */}
                <StepCounter progress={smoothProgress} total={steps.length} />
              </motion.span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="relative flex h-1/2 w-full items-center justify-center bg-background px-6 md:h-full md:w-1/2 md:px-12 lg:px-20">
            <div className="relative w-full max-w-lg">
              {steps.map((step, idx) => {
                const start = idx / steps.length;
                const end = (idx + 1) / steps.length;
                
                const opacity = useTransform(smoothProgress, 
                  [start - 0.02, start, end - 0.02, end], 
                  [0, 1, 1, 0]
                );
                const y = useTransform(smoothProgress, 
                  [start - 0.02, start, end], 
                  [20, 0, 0]
                );

                return (
                  <motion.div
                    key={idx}
                    style={{ opacity, y, pointerEvents: "none" }} // Logic for pointerEvents handled by opacity
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                        <step.icon size={24} />
                      </div>
                      <span className="label-tech mb-0">
                        Step 0{idx + 1}
                      </span>
                    </div>
                    
                    <h3 className="mb-6 heading-sub !mb-6 !text-3xl md:!text-4xl lg:!text-5xl">
                      {step.title}
                    </h3>
                    
                    <div className="text-lg leading-relaxed text-muted-foreground font-sans">
                      {step.description}
                    </div>
                    
                    {/* Progress Line */}
                    <div className="mt-12 h-[1px] w-full bg-border">
                      <motion.div 
                        className="h-full bg-foreground" 
                        style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Outro / CTA */}
      <div className="border-t border-border px-6 py-24 text-center md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="label-tech mb-8">
          Reliable Supply Globally
        </p>
        <h4 className="mx-auto max-w-4xl heading-section leading-snug not-italic tracking-normal">
          From vessels at sea to industrial plants on land, providing high-quality spare parts and RO systems.
        </h4>
      </div>
    </section>
  );
}

function StepCounter({ progress, total }: { progress: any, total: number }) {
  const step = useTransform(progress, (v) => Math.min(total, Math.floor(v * total) + 1));
  const displayStep = useTransform(step, (s) => `0${s}`);
  
  return <motion.span>{displayStep}</motion.span>;
}
