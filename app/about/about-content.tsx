"use client";

import { motion } from 'framer-motion';
import { Shield, Award, Users, Globe, Clock, CheckCircle2, Waves, Factory, Zap, Droplets } from 'lucide-react';
import Image from 'next/image';
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function AboutContent() {
  const values = [
    {
      icon: CheckCircle2,
      title: "Tested & Verified",
      description: "Every spare part is thoroughly checked to ensure it works perfectly before we ship it to you.",
    },
    {
      icon: Globe,
      title: "Worldwide Shipping",
      description: "We deliver products quickly to ports and factories all over the world.",
    },
    {
      icon: Users,
      title: "Expert Knowledge",
      description: "Our team has years of experience with marine engines, machinery, and water treatment systems.",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "We focus on quick turnarounds so your ship or factory can keep running without delays.",
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="font-sans">
        {/* Hero Section */}
        <section className="relative min-h-[60dvh] pt-28 sm:pt-32 md:pt-36 flex items-center justify-center overflow-hidden bg-[#020617]">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/about-hero.png" 
              alt="About Delta Impex" 
              fill
              priority
              className="object-cover opacity-40 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/80 to-[#020617]" />
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="label-tech mb-4 block text-accent">Proven Excellence</span>
              <h1 className="heading-display text-white mb-6 uppercase">
                About <span className="text-accent font-black tracking-tighter">DELTA</span> <span className="text-white italic font-medium">Impex</span>
              </h1>
              <p className="body-premium text-white/90 max-w-2xl mx-auto italic border-l-2 border-accent pl-6">
                Marine & Industrial Machinery Spare Parts Solutions
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Profile & Legacy */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="label-tech mb-4 text-accent">Our Legacy</h2>
                <h3 className="heading-section mb-8 uppercase tracking-tighter text-primary">
                  Carrying the <span className="text-accent italic font-medium">Legacy</span> Forward
                </h3>
                <div className="body-premium space-y-6">
                  <p>
                    <strong className="text-primary font-bold">Delta Impex</strong> is a India-based company. We provide parts and machinery for ships and land-based industries.
                  </p>
                  <p>
                    With our experience and wide network, we help ship owners and industrial clients get reliable parts at the best prices.
                  </p>
                  <p>
                    We are committed to delivering quality products and fast service to build long-term relationships with our clients.
                  </p>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative mt-8 lg:mt-0 group"
              >
                <Image
                  src="/og-image.png"
                  alt="Delta Impex Technical Inventory"
                  width={500}
                  height={300}
                  className="shadow-2xl border border-border rounded-xl"
                />
                <div className="absolute -bottom-8 -right-8 bg-primary p-8 hidden md:block border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
                  <span className="font-display font-bold text-5xl text-white block leading-none">30<span className="text-accent-foreground/50">+</span></span>
                  <span className="font-tech text-white/80 text-[10px] uppercase font-bold tracking-[0.3em] block mt-3">Years of Mastery</span>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[9px] font-tech text-white/40 uppercase tracking-widest">Industry Leader</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-background border-y border-border/50">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="label-tech mb-4 text-accent">Core Capabilities</h2>
              <h3 className="heading-section mb-6 uppercase tracking-tighter text-primary">
                Why Choose <span className="text-accent italic font-medium">Delta Impex</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-slate-50/50 border border-border hover:border-accent/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="heading-sub text-base mb-4 uppercase tracking-tight text-primary">{value.title}</h4>
                  <p className="body-text text-slate-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Products & Services Section */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }} 
          />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-tech text-[10px] tracking-[0.4em] uppercase text-white/60 font-bold mb-4">Our Portfolio</h2>
              <h3 className="heading-display text-white mb-6 uppercase">
                Our Products <span className="text-white italic font-medium border-b-2 border-accent">& Services</span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Marine & Ship Spare Parts */}
              <motion.div 
                className="bg-white/5 border border-white/10 p-8 sm:p-10 rounded-none relative group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white flex items-center justify-center shrink-0">
                    <Waves className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="heading-sub text-xl uppercase tracking-tight">Marine & Ship Spare Parts</h4>
                </div>
                <p className="body-text text-white/80 mb-6">We supply all types of ship spare parts for main and auxiliary machinery, including:</p>
                <ul className="grid grid-cols-1 gap-3 mb-8">
                  {[
                    "Main engine & auxiliary engine spares",
                    "Turbochargers, pumps & compressors",
                    "Purifiers & separators",
                    "Heat exchangers & coolers",
                    "Electrical & navigation equipment",
                    "Deck & engine room machinery",
                    "All types of marine consumables"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-4">
                  <span className="btn-text px-3 py-1 bg-white text-primary hover:bg-accent hover:text-white transition-colors">New</span>
                  <span className="btn-text px-3 py-1 bg-white text-primary hover:bg-accent hover:text-white transition-colors">Used</span>
                  <span className="btn-text px-3 py-1 bg-white text-primary hover:bg-accent hover:text-white transition-colors">Reconditioned</span>
                </div>
              </motion.div>

              {/* Industrial, Power Plant & RO */}
              <div className="space-y-8">
                {/* Industrial Solutions */}
                <motion.div 
                  className="bg-white/5 border border-white/10 p-8 rounded-none group"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-white flex items-center justify-center shrink-0">
                      <Factory className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="heading-sub text-lg uppercase tracking-tight">Industrial Solutions</h4>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {["Industrial engines", "Generator sets (gensets)", "Machinery spare parts", "Industrial equipment"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Power Plant */}
                  <motion.div 
                    className="bg-white/5 border border-white/10 p-6 rounded-none group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-5 h-5 text-accent" />
                      <h4 className="font-tech text-xs uppercase tracking-wider">Power Plant Supply</h4>
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed">Power plant equipment, engines, generators, and ongoing spare parts support.</p>
                  </motion.div>

                  {/* RO Water Treatment */}
                  <motion.div 
                    className="bg-white/5 border border-white/10 p-6 rounded-none group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Droplets className="w-5 h-5 text-accent" />
                      <h4 className="font-tech text-xs uppercase tracking-wider">RO Water Systems</h4>
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed">Reverse osmosis plants, water treatment equipment, and maintenance support.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="label-tech mb-4 text-accent">Technical Expertise</h2>
              <h3 className="heading-section mb-6 uppercase tracking-tighter text-primary">
                Engine & Machinery <span className="text-accent italic font-medium">Experience</span>
              </h3>
              <p className="body-text max-w-3xl mx-auto italic border-l-2 border-accent pl-6 text-left md:text-center md:border-l-0 md:pl-0 text-slate-500">
                Specialized knowledge in low-speed and medium-speed marine engines, assisting routine maintenance and urgent breakdowns.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* MAN B&W */}
              <div className="p-8 sm:p-12 border border-slate-200 group hover:border-accent transition-all duration-700 bg-white shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h4 className="heading-sub text-xl mb-6 uppercase tracking-tight text-primary">MAN B&W / Sulzer Engines</h4>
                <ul className="body-text space-y-3 mb-6 text-slate-600">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> S50MC, S60MC, S70MC series</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Specialized Cylinder Components</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Fuel Pumps & Injection Systems</li>
                </ul>
                <p className="body-text text-sm italic border-t border-slate-100 pt-6 text-slate-400">
                  Supplying cylinder liners, pistons, fuel system parts, bearings, and valves for global ship managers.
                </p>
              </div>

              {/* Auxiliary systems */}
              <div className="p-8 sm:p-12 border border-slate-200 group hover:border-accent transition-all duration-700 bg-white shadow-sm hover:shadow-xl">
                <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="heading-sub text-xl mb-6 uppercase tracking-tight text-primary">Auxiliary & Processing</h4>
                <ul className="body-text space-y-3 mb-6 text-slate-600">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Air Compressors & Starter Motors</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Fresh Water Generators & RO Plants</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> Oil Purifiers & Separation Systems</li>
                </ul>
                <p className="body-text text-sm italic border-t border-slate-100 pt-6 text-slate-400">
                  Ensuring technical accuracy and proper documentation for uninterrupted onboard operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Promise */}
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '100px 100px'
            }} 
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <h2 className="label-tech mb-6 text-accent">Our Promise</h2>
              <h3 className="heading-display text-white mb-8 uppercase">
                Quality Without <br/> <span className="text-accent italic">Compromise</span>
              </h3>
              <p className="body-premium text-white/80 mb-6">
                Across all machinery categories, one principle remains constant: we do not compromise on quality or technical accuracy.
              </p>
              <p className="body-text text-white/50 italic border-l-2 border-accent pl-6 max-w-2xl">
                Every component is stocked after complete inspection and N.D. Test. We promise honest communication, fair prices, and reliable parts so you never have to worry about quality or delays.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 border-t border-white/10 pt-12">
                <div className="font-sans">
                    <h4 className="heading-sub text-sm text-white uppercase tracking-widest mb-2">New OEM Surplus</h4>
                    <p className="text-xs text-white/40">Genuine parts from recycled ship stores.</p>
                </div>
                <div className="font-sans">
                    <h4 className="heading-sub text-sm text-white uppercase tracking-widest mb-2">Reconditioned</h4>
                    <p className="text-xs text-white/40">Tested on bench with full reports.</p>
                </div>
                <div className="font-sans">
                    <h4 className="heading-sub text-sm text-white uppercase tracking-widest mb-2">Ready Stock</h4>
                    <p className="text-xs text-white/40">Immediate delivery for urgent breakdowns.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterSection />
    </main>
  );
}
