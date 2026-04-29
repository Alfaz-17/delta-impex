"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import Image from "next/image";
import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { Shield, Award, Users, Globe, Clock } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: 'No Compromise Quality',
    description: 'We prioritize technical accuracy and rigorous inspection for every component supplied.'
  },
  {
    icon: Users,
    title: 'Technical Expertise',
    description: 'Deep specialization in MAN B&W and Sulzer engine machinery and auxiliary systems.'
  },
  {
    icon: Award,
    title: '30+ Year Legacy',
    description: 'A trusted name serving the maritime industry with excellence since 2017.'
  },
  {
    icon: Globe,
    title: 'Global Export',
    description: 'Supporting ship managers and repair yards with fast international logistics.'
  }
];

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

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex h-[90vh] items-center overflow-hidden bg-gradient-to-br from-slate-900 via-accent-blue/20 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-lg animate-bounce" />
        </div>
        
        <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
          <Image
            src="/warehouse.png"
            alt="Delta Impex warehouse inventory"
            fill
            className="object-cover opacity-90 contrast-125 saturate-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent-blue/30 via-transparent to-background/60" />
        </motion.div>
        
        <div className="section-container relative z-10 w-full pt-20">
          <FadeInOnScroll>
            <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-accent-blue" />
                <p className="label-tech !text-white tracking-[0.4em] bg-accent-blue/10 px-6 py-2 rounded-full border border-cyan-400/30 backdrop-blur-sm">ABOUT US</p>
                <span className="h-px w-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-accent-blue" />
            </div>
              <h1 className="heading-display !text-white text-5xl md:text-7xl lg:text-8xl !leading-[0.9] uppercase drop-shadow-2xl">
                Marine & industrial <br />
                supply <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-accent-blue">solutions.</span>
              </h1>
              <p className="mt-10 max-w-2xl text-lg md:text-xl leading-relaxed text-white/90 font-light backdrop-blur-sm">
                Delta Impex is your trusted supplier for marine machinery and industrial spare parts. We make it easy, fast, and secure to get exactly what you need, wherever you are in the world.
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-background via-white/2 to-white/5">
        <div className="section-container">
          <FadeInOnScroll>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-16 bg-gradient-to-r from-accent-blue via-cyan-400 to-accent-blue" />
                <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-accent-blue">OUR VALUES</p>
                <span className="h-px w-16 bg-gradient-to-r from-accent-blue via-cyan-400 to-accent-blue" />
              </div>
              <h2 className="heading-display text-4xl md:text-6xl mb-12">
                Why Choose <span className="text-accent-blue italic">Delta Impex</span>
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeInOnScroll key={value.title} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-blue/5 via-white/10 to-cyan-500/5 border border-accent-blue/20 p-8 shadow-2xl transition-all duration-500 hover:border-accent-blue/40 hover:shadow-[0_20px_50px_-20px_rgba(91,155,213,0.3)]">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.4) 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="heading-sub text-white !mb-4 group-hover:text-accent-blue transition-colors">
                      {value.title}
                    </h3>
                    
                    <p className="text-slate-300 leading-relaxed text-sm font-medium group-hover:text-white transition-colors">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white/5 to-background">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInOnScroll>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <p className="font-tech text-xs font-bold uppercase tracking-[0.3em] text-accent-blue">EXPERTISE</p>
                  <div className="h-px flex-grow bg-accent-blue/10" />
                </div>
                <h2 className="heading-display text-4xl md:text-6xl mb-12">
                  Technical <span className="text-accent-blue italic">Excellence</span>
                </h2>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-blue/5 via-white/10 to-cyan-500/5 border border-accent-blue/20 backdrop-blur-sm">
                    <h4 className="text-accent-blue font-tech text-xs uppercase tracking-widest mb-3">MAN B&W & Sulzer Engines</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      Specialized knowledge in low-speed and medium-speed marine engines, including S50MC, S60MC, S70MC series, and auxiliary systems.
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-blue/5 via-white/10 to-cyan-500/5 border border-accent-blue/20 backdrop-blur-sm">
                    <h4 className="text-accent-blue font-tech text-xs uppercase tracking-widest mb-3">Comprehensive Inventory</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      Main engines, auxiliary engines, air compressors, pumps, heat exchangers, fresh water generators, and deck equipment.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <div className="relative">
                <Image
                  src="/warehouse.png"
                  alt="Delta Impex technical expertise"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-accent-blue to-cyan-500 p-8 rounded-2xl shadow-2xl border border-accent-blue/20">
                  <span className="text-3xl font-black text-white block">30+</span>
                  <span className="text-white/60 text-[10px] uppercase font-black tracking-widest block mt-2">Years Experience</span>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
