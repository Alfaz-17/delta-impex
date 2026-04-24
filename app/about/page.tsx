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

function ListCard({
  title,
  items,
  note,
}: {
  title: string;
  items: string[];
  note?: string;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-muted/10 p-6 md:p-8">
      <h3 className="heading-sub text-foreground !mb-4">{title}</h3>
      <ul className="space-y-3 text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="body-text !leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
      {note ? <p className="body-text !leading-relaxed text-muted-foreground mt-5">{note}</p> : null}
    </div>
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
    <main className="min-h-screen bg-background">
      <Header />

      <section ref={heroRef} className="relative flex h-screen items-center overflow-hidden bg-foreground">
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          <Image
            src="/images/mountain-sunrise.png"
            alt="Delta Impex operations"
            fill
            className="object-cover opacity-70 contrast-125 saturate-50"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>

        <div className="section-container relative z-10 w-full py-24 md:py-28 text-white" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)" }}>
          <div className="mx-auto max-w-3xl text-center">
            <FadeInOnScroll>
              <p className="label-tech mb-6 text-white/80">About Us</p>
              <h1 className="heading-section !leading-[1.05] text-white">
                Marine and industrial supply solutions.
              </h1>
              <p className="mt-6 body-text !leading-relaxed text-white/82">
                Delta Impex is a Bhavnagar-based supplier of machinery, spare parts, and complete system solutions.
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      <div className="section-container pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <FadeInOnScroll>
              <p className="label-tech mb-4 text-muted-foreground">Company Overview</p>
              <h2 className="heading-section text-foreground">About Delta Impex.</h2>
            </FadeInOnScroll>

            <div className="mt-10 space-y-5">
              <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary">Introduction</p>
              <ScrollRevealText text="Our work is simple and practical. We help ship owners, technical managers, and industrial operators source the right equipment at the right price, without unnecessary delays or complications." />
              <p className="max-w-3xl body-text !leading-relaxed text-muted-foreground">
                We focus on availability, clear communication, and dependable delivery so clients can move quickly without overpaying or dealing with unnecessary complexity.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-5">
            <FadeInOnScroll delay={0.1}>
              <div className="rounded-3xl border border-border/60 bg-muted/10 p-6 md:p-8">
                <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary">Sourcing Strength</p>
                <p className="mt-4 body-text !leading-relaxed text-muted-foreground">
                  With strong connections in the market and hands-on industry knowledge, we are able to source a wide range of products whether new, used, or reconditioned depending on the client&apos;s requirement and budget.
                </p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.15}>
              <div className="rounded-3xl border border-border/60 bg-muted/10 p-6 md:p-8">
                <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary">What We Focus On</p>
                <div className="mt-4 space-y-3">
                  {focusPoints.map((item) => (
                    <p key={item} className="body-text text-foreground">
                      {item}
                    </p>
                  ))}
                </div>
                <p className="mt-5 body-text !leading-relaxed text-muted-foreground">
                  We don&apos;t operate on short-term deals. Most of our work comes from repeat clients who trust our sourcing and delivery process.
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>

        <div className="mt-16 md:mt-20 overflow-hidden rounded-3xl border border-border/50 bg-muted/10 max-w-5xl mx-auto">
          <Image
            src="/hero-poster.png"
            alt="Delta Impex industrial supply"
            width={1920}
            height={1080}
            className="h-auto w-full max-h-[420px] object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        <section className="mt-16 md:mt-20">
          <FadeInOnScroll>
            <p className="font-tech mb-4 text-xs font-bold uppercase tracking-[0.4em] text-primary">What We Do</p>
            <h2 className="heading-section text-foreground">Marine, industrial, power, and water treatment support.</h2>
          </FadeInOnScroll>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FadeInOnScroll>
              <ListCard
                title="Marine & Ship Spare Parts"
                items={marineParts}
                note={`All items can be arranged in ${productConditions.join(", ")} condition.`}
              />
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.05}>
              <ListCard title="Industrial Supply" items={industrialSupply} />
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <ListCard title="Power Plant Equipment" items={powerPlantSupport} />
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.15}>
              <div className="rounded-3xl border border-border/60 bg-muted/10 p-6 md:p-8">
                <h3 className="heading-sub text-foreground !mb-4">RO Water Treatment Solutions</h3>
                <p className="body-text !leading-relaxed text-muted-foreground">
                  We supply Reverse Osmosis (RO) systems designed for both marine and industrial applications.
                </p>
                <p className="mt-4 body-text !leading-relaxed text-muted-foreground">
                  These systems are used to convert seawater or contaminated water into clean, usable freshwater, especially important in coastal and resource-limited areas.
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </section>

        <section className="mt-16 md:mt-20">
          <FadeInOnScroll>
            <p className="font-tech mb-4 text-xs font-bold uppercase tracking-[0.4em] text-primary">How It Works</p>
            <h2 className="heading-section text-foreground">RO desalination, step by step.</h2>
          </FadeInOnScroll>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roSteps.map((step, index) => (
              <FadeInOnScroll key={step.title} delay={index * 0.04}>
                <div className="h-full rounded-3xl border border-border/60 bg-background p-6">
                  <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-primary">Stage {index + 1}</p>
                  <h3 className="mt-3 heading-sub text-foreground !mb-3">{step.title}</h3>
                  <p className="body-text !leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </section>

        <section className="mt-16 grid grid-cols-1 gap-6 pb-24 md:mt-20 lg:grid-cols-2">
          <FadeInOnScroll>
            <div className="rounded-3xl border border-border/60 bg-muted/10 p-6 md:p-8">
              <p className="font-tech mb-4 text-xs font-bold uppercase tracking-[0.4em] text-primary">How We Work</p>
              <h2 className="heading-sub text-foreground !mb-4">Requirement-based sourcing, not fixed catalog selling.</h2>
              <div className="space-y-3">
                {workProcess.map((item) => (
                  <p key={item} className="body-text text-muted-foreground">
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-5 body-text !leading-relaxed text-muted-foreground">
                This flexible approach helps reduce costs and ensures faster availability, especially for hard-to-find items.
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.08}>
            <div className="rounded-3xl border border-border/60 bg-muted/10 p-6 md:p-8">
              <p className="font-tech mb-4 text-xs font-bold uppercase tracking-[0.4em] text-primary">Our Approach</p>
              <h2 className="heading-sub text-foreground !mb-4">Built around clarity, reliability, and long-term trust.</h2>
              <div className="space-y-3">
                {approachPoints.map((item) => (
                  <p key={item} className="body-text text-muted-foreground">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
        </section>
      </div>

      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
