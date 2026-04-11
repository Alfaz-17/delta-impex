"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";
import { Droplets, Settings, Zap, Filter, Beaker, Database } from "lucide-react";

const steps = [
  {
    image: "/images/mood/hero-marine-sunset.png",
    title: "Seawater Intake",
    description: "Seawater is drawn from the ocean through specially designed intake systems equipped with screens to remove large particles such as sand, debris, and marine life.",
    icon: Droplets,
  },
  {
    image: "/images/ro-generated/pretreatment.png",
    title: "Pre-Treatment",
    description: "Before entering the RO system, the water undergoes multi-stage filtration: removal of suspended solids, turbidity, and chemical dosing to prevent scaling.",
    icon: Settings,
  },
  {
    image: "/ro/ro-pump-clean.png",
    title: "High-Pressure Pumping",
    description: "The pre-treated seawater is pressurized using high-pressure pumps. This pressure is essential to overcome natural osmotic pressure and push water through the RO membranes.",
    icon: Zap,
  },
  {
    image: "/ro/ro-membrane-clean.png",
    title: "Reverse Osmosis Filtration",
    description: "At the core of the system are semi-permeable membranes that remove dissolved salts (TDS), eliminate bacteria, viruses, and heavy metals to produce high-quality freshwater.",
    icon: Filter,
  },
  {
    image: "/images/mood/ro-water-flow.png",
    title: "Post-Treatment",
    description: "The purified water is conditioned with mineral balancing, pH adjustment, and final disinfection using UV or chlorination to make it suitable for consumption.",
    icon: Beaker,
  },
  {
    image: "/images/mood/hero-industrial-scale.png",
    title: "Storage & Distribution",
    description: "The treated water is stored in tanks and distributed for domestic, industrial, or commercial use, ensuring a reliable supply of clean water.",
    icon: Database,
  },
];

export function ROProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const textWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberTextRef = useRef<HTMLSpanElement>(null);
  
  const lastActiveStepRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const updateOnScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const { top, height } = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate which step is active based on scroll position
    const progress = Math.max(0, -top / (height - viewportHeight));
    const stepIndex = Math.max(0, Math.min(steps.length - 1, Math.floor(progress * steps.length)));
    
    // Update active styles without triggering a React re-render
    if (stepIndex !== lastActiveStepRef.current) {
      // Deactivate previous
      const prevStep = lastActiveStepRef.current;
      if (imageWrappersRef.current[prevStep]) {
        imageWrappersRef.current[prevStep]!.style.opacity = "0";
      }
      if (imageImagesRef.current[prevStep]) {
        imageImagesRef.current[prevStep]!.style.transform = "scale(1.1)";
      }
      if (textWrappersRef.current[prevStep]) {
        textWrappersRef.current[prevStep]!.style.opacity = "0";
        textWrappersRef.current[prevStep]!.style.transform = "translateY(2rem)"; // translate-y-8
        textWrappersRef.current[prevStep]!.style.pointerEvents = "none";
      }

      // Activate current
      if (imageWrappersRef.current[stepIndex]) {
        imageWrappersRef.current[stepIndex]!.style.opacity = "1";
      }
      if (imageImagesRef.current[stepIndex]) {
        imageImagesRef.current[stepIndex]!.style.transform = "scale(1)";
      }
      if (textWrappersRef.current[stepIndex]) {
        textWrappersRef.current[stepIndex]!.style.opacity = "1";
        textWrappersRef.current[stepIndex]!.style.transform = "translateY(0)"; // translate-y-0
        textWrappersRef.current[stepIndex]!.style.pointerEvents = "auto";
      }
      
      if (numberTextRef.current) {
        numberTextRef.current.innerText = `0${stepIndex + 1}`;
      }

      lastActiveStepRef.current = stepIndex;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateOnScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Set initial state
    updateOnScroll();
    if (textWrappersRef.current[0]) {
      textWrappersRef.current[0].style.opacity = "1";
      textWrappersRef.current[0].style.transform = "translateY(0)";
      textWrappersRef.current[0].style.pointerEvents = "auto";
    }
    if (imageWrappersRef.current[0]) {
      imageWrappersRef.current[0].style.opacity = "1";
    }
    if (imageImagesRef.current[0]) {
      imageImagesRef.current[0].style.transform = "scale(1)";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateOnScroll]);

  return (
    <section ref={containerRef} className="relative bg-background">
      {/* Introduction Header */}
      <div className="px-6 py-24 text-center md:px-12 md:py-32 lg:px-20 lg:py-40">
        <h2 className="mb-6 font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Turning Seawater into <br />
          <span className="text-muted-foreground">Pure Drinking Water.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          A Reverse Osmosis (RO) Seawater Desalination Plant is an advanced water treatment system 
          designed to convert saline seawater into clean, safe, and potable freshwater.
        </p>
      </div>

      {/* Sticky Scroll Section */}
      <div className="relative h-[600vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden md:flex-row">
          
          {/* Left: Images */}
          <div className="relative h-1/2 w-full overflow-hidden md:h-full md:w-1/2">
            {steps.map((step, idx) => (
              <div
                key={idx}
                ref={(el) => { imageWrappersRef.current[idx] = el; }}
                className="absolute inset-0 transition-opacity duration-1000 opacity-0"
              >
                <div className="absolute inset-0 z-10 bg-foreground/20" />
                <Image
                  ref={(el) => { imageImagesRef.current[idx] = el; }}
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-[2000ms] scale-110"
                />
              </div>
            ))}
            
            {/* Number Overlay */}
            <div className="absolute bottom-6 left-6 z-20 md:bottom-12 md:left-12">
              <span ref={numberTextRef} className="font-tech text-6xl font-bold text-white/20 md:text-9xl">
                01
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="relative flex h-1/2 w-full items-center justify-center bg-background px-6 md:h-full md:w-1/2 md:px-12 lg:px-20">
            <div className="relative w-full max-w-lg">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  ref={(el) => { textWrappersRef.current[idx] = el; }}
                  className="absolute inset-0 flex flex-col justify-center transition-all duration-700 opacity-0 translate-y-8 pointer-events-none"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                      <step.icon size={24} />
                    </div>
                    <span className="font-tech text-sm uppercase tracking-[0.2em] text-muted-foreground">
                      Step 0{idx + 1}
                    </span>
                  </div>
                  
                  <h3 className="mb-6 font-display text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  
                  {/* Progress Line */}
                  <div className="mt-12 h-[1px] w-full bg-border">
                    <div 
                      ref={(el) => { progressBarsRef.current[idx] = el; }}
                      className="h-full bg-foreground transition-all duration-300" 
                      style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outro / CTA */}
      <div className="border-t border-border px-6 py-24 text-center md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="font-tech text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Reliable Supply Globally
        </p>
        <h4 className="mx-auto max-w-4xl font-display text-3xl font-medium leading-snug tracking-tight text-foreground md:text-4xl lg:text-5xl">
          From vessels at sea to industrial plants on land, providing high-quality spare parts and RO systems.
        </h4>
      </div>
    </section>
  );
}
