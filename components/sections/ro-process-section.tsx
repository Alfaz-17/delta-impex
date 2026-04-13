"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Droplets, Settings, Zap, Filter, Beaker, Database, LucideIcon } from "lucide-react";

interface Step {
  image: string;
  title: string;
  description: string | React.ReactNode;
  icon: LucideIcon;
}

const steps: Step[] = [
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

function StepImage({ step, idx, total, progress }: { step: Step; idx: number; total: number; progress: MotionValue<number> }) {
  const start = idx / total;
  const end = (idx + 1) / total;
  
  const opacity = useTransform(progress, 
    [start - 0.05, start, end, end + 0.05], 
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, 
    [start, end], 
    [1.1, 1]
  );

  return (
    <motion.div
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
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>
    </motion.div>
  );
}

function StepContent({ step, idx, total, progress }: { step: Step; idx: number; total: number; progress: MotionValue<number> }) {
  const start = idx / total;
  const end = (idx + 1) / total;
  
  const opacity = useTransform(progress, 
    [start - 0.02, start, end - 0.02, end], 
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, 
    [start - 0.02, start, end], 
    [20, 0, 0]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none md:pointer-events-auto"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg">
          <step.icon size={24} />
        </div>
        <span className="label-tech mb-0 text-primary">
          Step 0{idx + 1}
        </span>
      </div>
      
      <h3 className="heading-section mb-6">
        {step.title}
      </h3>
      
      <div className="body-text !leading-relaxed text-muted-foreground">
        {step.description}
      </div>
      
      {/* Progress Line */}
      <div className="mt-12 h-[1px] w-full bg-border/40">
        <motion.div 
          className="h-full bg-primary" 
          style={{ width: `${((idx + 1) / total) * 100}%` }}
        />
      </div>
    </motion.div>
  );
}

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
      <div className="px-6 py-24 text-center md:px-12 md:py-32 lg:px-20 lg:py-40 border-b border-border/10">
        <h2 className="heading-display mb-6 text-foreground">
          Turning Seawater into <br />
          <span className="text-muted-foreground">Pure Drinking Water.</span>
        </h2>
        <p className="mx-auto max-w-2xl body-text !leading-relaxed">
          A Reverse Osmosis (RO) Seawater Desalination Plant is an advanced water treatment system 
          designed to convert saline seawater into clean, safe, and potable freshwater.
        </p>
      </div>

      {/* Sticky Scroll Section */}
      <div className="relative h-[600vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden md:flex-row">
          
          {/* Left: Images */}
          <div className="relative h-1/2 w-full overflow-hidden md:h-full md:w-1/2 bg-muted">
            {steps.map((step, idx) => (
              <StepImage 
                key={idx} 
                step={step} 
                idx={idx} 
                total={steps.length} 
                progress={smoothProgress} 
              />
            ))}
            
            {/* Number Overlay */}
            <div className="absolute bottom-6 left-6 z-20 md:bottom-12 md:left-12">
              <div className="font-tech text-6xl font-bold text-white/10 md:text-9xl tracking-tighter">
                <StepCounter progress={smoothProgress} total={steps.length} />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="relative flex h-1/2 w-full items-center justify-center bg-background px-6 md:h-full md:w-1/2 md:px-12 lg:px-20">
            <div className="relative w-full max-w-lg h-full">
              {steps.map((step, idx) => (
                <StepContent 
                  key={idx} 
                  step={step} 
                  idx={idx} 
                  total={steps.length} 
                  progress={smoothProgress} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outro / CTA */}
      <div className="border-t border-border px-6 py-24 text-center md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="label-tech mb-8">
          Reliable Supply Globally
        </p>
        <h4 className="mx-auto max-w-4xl heading-section !not-italic !tracking-normal">
          From vessels at sea to industrial plants on land, providing high-quality spare parts and RO systems.
        </h4>
      </div>
    </section>
  );
}

function StepCounter({ progress, total }: { progress: MotionValue<number>, total: number }) {
  const step = useTransform(progress, (v) => Math.min(total, Math.floor(v * total) + 1));
  
  // Create a sub-component or just use a hook to get the value safely if possible
  // Actually, MotionValue inside a motion.span is best
  return <motion.span>{useTransform(step, (s) => `0${s}`)}</motion.span>;
}
