"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import Image from "next/image";
import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

const focusPoints = [
  "Supplying reliable products",
  "Maintaining consistent service",
  "Building long-term business relationships",
];


const marineParts = [
  "Main engine & auxiliary engine spares",
  "Turbochargers, pumps, and compressors",
  "Purifiers and separators",
  "Heat exchangers and cooling systems",
  "Electrical and navigation equipment",
  "Deck and engine room machinery",
  "Marine consumables",
];

const industrialSupply = [
  "Industrial engines",
  "Generator sets (gensets)",
  "Machinery spare parts",
  "Industrial equipment and components",
];

const powerPlantSupport = [
  "Power plant equipment",
  "Engines and generators",
  "Spare parts and technical support",
];

const productConditions = ["New", "Used", "Reconditioned"];

const roSteps = [
  {
    title: "1. Seawater Intake",
    description:
      "Water is drawn through intake systems that remove large particles like sand and debris.",
  },
  {
    title: "2. Pre-Treatment",
    description:
      "Multi-stage filtration removes suspended solids and protects the system from scaling and biological damage.",
  },
  {
    title: "3. High-Pressure Pumping",
    description: "Water is pressurized to pass through RO membranes.",
  },
  {
    title: "4. Reverse Osmosis Filtration",
    description:
      "Membranes remove salts, bacteria, heavy metals, and impurities, producing clean water.",
  },
  {
    title: "5. Post-Treatment",
    description:
      "Water is conditioned with mineral balancing, pH adjustment, and disinfection.",
  },
  {
    title: "6. Storage & Use",
    description:
      "Clean water is stored and distributed for industrial or domestic use.",
  },
];

const workProcess = [
  "Clients share specifications or part details",
  "We source from our network",
  "We provide suitable options (new / used / reconditioned)",
  "We handle supply and delivery",
];

const approachPoints = [
  "Practical sourcing instead of over-promising",
  "Clear communication on availability and condition",
  "Focus on reliability over branding",
  "Long-term business mindset",
];

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(progress, [start, end], ["rgba(100,116,139,0.45)", "var(--foreground)"]);

  return <motion.span style={{ color }}>{word}{index < total - 1 ? " " : ""}</motion.span>;
}

function ScrollRevealText({ text }: { text: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.92", "end 0.25"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className="max-w-3xl text-base md:text-lg leading-8 text-foreground"
    >
      {words.map((word, index) => (
        <Word
          key={`${word}-${index}`}
          word={word}
          index={index}
          total={words.length}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function TechnicalModule({
  title,
  items,
  index,
}: {
  title: string;
  items: string[];
  index: number;
}) {
  return (
    <FadeInOnScroll delay={index * 0.1}>
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-dark-card p-8 md:p-10 shadow-2xl transition-all duration-500 hover:border-accent-blue/30">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-tech text-accent-blue/60 border border-accent-blue/20 px-2 py-0.5 rounded uppercase tracking-widest">Module 0{index + 1}</span>
            <div className="h-px flex-grow bg-white/[0.08]" />
          </div>
          
          <h3 className="heading-sub text-white !mb-8 group-hover:text-accent-blue transition-colors">{title}</h3>
          
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] transition-all group-hover:bg-white/[0.04] group-hover:border-white/[0.08]">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(91,155,213,0.8)] shrink-0" />
                <p className="text-sm md:text-base text-slate-200 group-hover:text-white transition-colors leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(heroProgress, [0, 1], [1.02, 1.08]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Flagship Hero Section */}
      <section ref={heroRef} className="relative flex h-[90vh] items-center overflow-hidden bg-foreground">
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          <Image
            src="/about.jpg"
            alt="Delta Impex operations"
            fill
            className="object-cover opacity-80 contrast-125 saturate-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </motion.div>

        <div className="section-container relative z-10 w-full pt-20">
          <div className="max-w-4xl">
            <FadeInOnScroll>
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-12 bg-accent-blue" />
                <p className="label-tech !text-accent-blue tracking-[0.4em]">ABOUT US</p>
              </div>
              <h1 className="heading-display !text-white text-5xl md:text-7xl lg:text-8xl !leading-[0.9] uppercase">
                Marine & industrial <br />
                supply <span className="text-accent-blue italic">solutions.</span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-slate-100/80 font-light">
                Delta Impex is a India-based supplier of machinery, spare parts, and complete system solutions, bridging the gap between technical demand and global supply.
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Section 01: Narrative Overview */}
      <section className="section-container py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7">
            <FadeInOnScroll>
              <div className="flex items-center gap-4 mb-6">
                <p className="font-tech text-xs font-bold uppercase tracking-[0.3em] text-accent-blue">01. Overview</p>
                <div className="h-px flex-grow bg-accent-blue/10" />
              </div>
              <h2 className="heading-display text-4xl md:text-6xl mb-12">
                About Delta <span className="text-accent-blue italic">Impex.</span>
              </h2>
              
              <div className="space-y-10">
                <ScrollRevealText text="Our mission is to simplify industrial procurement. We help ship owners, technical managers, and industrial operators source the right equipment at the right price, eliminating the noise of traditional brokering." />
                
                <div className="p-8 rounded-[2rem] bg-white/[0.02] border-l-4 border-l-accent-blue border-y border-r border-white/10 backdrop-blur-sm">
                   <p className="text-lg md:text-xl leading-relaxed text-slate-600 font-medium italic">
                    "We focus on availability and clear communication so clients can move quickly without overpaying or dealing with unnecessary complexity."
                   </p>
                </div>
              </div>
            </FadeInOnScroll>
          </div>

          <div className="lg:col-span-5 space-y-6">
             <FadeInOnScroll delay={0.2}>
                <div className="relative overflow-hidden rounded-[2rem] bg-accent-blue/[0.03] border border-accent-blue/20 p-10">
                   <div className="absolute top-0 right-0 p-8">
                      <span className="text-[4rem] font-tech text-accent-blue/10 leading-none select-none">TRUST</span>
                   </div>
                   <h3 className="heading-sub !mb-6 text-white text-2xl">Sourcing Strength</h3>
                   <p className="text-slate-600 leading-relaxed text-lg">
                      With strong connections in the global market, we source everything from brand-new components to reconditioned heavy machinery, tailored specifically to your project requirements.
                   </p>
                </div>
             </FadeInOnScroll>
             
             <div className="grid grid-cols-1 gap-4">
                {focusPoints.map((point, i) => (
                  <FadeInOnScroll key={point} delay={0.3 + (i * 0.1)}>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/10 transition-colors hover:bg-white/[0.04]">
                       <div className="h-2 w-2 rounded-full bg-accent-blue" />
                       <span className="text-slate-600 font-tech text-xs uppercase tracking-widest">{point}</span>
                    </div>
                  </FadeInOnScroll>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Section 02: Core Capabilities (Technical Modules) */}
      <section className="bg-white/[0.02] py-24 md:py-32 border-y border-white/[0.06]">
        <div className="section-container">
          <FadeInOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-accent-blue mb-4">02. Capabilities</p>
                <h2 className="heading-display">
                  Marine & <span className="text-accent-blue italic">Industrial.</span>
                </h2>
              </div>
              <p className="max-w-sm text-slate-600 text-sm leading-relaxed font-medium">
                Specialized support across multiple heavy-industry sectors, ensuring high-performance machinery is always operational.
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechnicalModule title="Marine Spare Parts" items={marineParts.slice(0, 5)} index={0} />
            <TechnicalModule title="Industrial Supply" items={industrialSupply} index={1} />
            <TechnicalModule title="Power Plant Support" items={powerPlantSupport} index={2} />
          </div>

          <FadeInOnScroll>
            <div className="mt-16 p-12 rounded-[2.5rem] bg-dark-card border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-grow">
                  <h3 className="heading-sub text-white !mb-4">RO Water Treatment Systems</h3>
                  <p className="text-slate-200 leading-relaxed max-w-2xl font-medium">
                    Our Reverse Osmosis solutions are engineered for extreme environments, converting seawater into pure freshwater for marine vessels and remote industrial sites.
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-4">
                  <span className="text-white font-tech text-[10px] uppercase tracking-widest px-4 py-2 border border-white/30 rounded-full bg-white/5">New</span>
                  <span className="text-white font-tech text-[10px] uppercase tracking-widest px-4 py-2 border border-white/30 rounded-full bg-white/5">Used</span>
                  <span className="text-white font-tech text-[10px] uppercase tracking-widest px-4 py-2 border border-white/30 rounded-full bg-white/5">Reconditioned</span>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Section 03: Compact Technical Process (RO Steps) */}
      <section className="py-24 md:py-32 overflow-hidden bg-background">
        <div className="section-container">
          <FadeInOnScroll>
            <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
               <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-accent-blue">03. Process</p>
               <div className="h-px w-24 bg-accent-blue/10 hidden md:block" />
            </div>
            <h2 className="heading-display mb-16 text-center md:text-left">
              The RO <span className="text-accent-blue italic">Journey.</span>
            </h2>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roSteps.map((step, index) => (
              <FadeInOnScroll key={step.title} delay={index * 0.05}>
                <div className="group relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-dark-card p-8 transition-all duration-500 hover:border-accent-blue/40 hover:shadow-[0_0_40px_-20px_rgba(91,155,213,0.3)]">
                  <div className="flex items-start justify-between mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue font-tech text-sm font-bold group-hover:bg-accent-blue group-hover:text-white transition-all duration-500">
                      0{index + 1}
                    </span>
                    <div className="h-px flex-grow ml-4 mt-5 bg-white/[0.05]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4 group-hover:text-accent-blue transition-colors">
                    {step.title.split('. ')[1]}
                  </h3>
                  <p className="text-slate-200/80 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Backdrop Decoration */}
                  <div className="absolute -bottom-8 -right-8 text-6xl font-tech text-white/[0.02] select-none italic">{index+1}</div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

 

      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
