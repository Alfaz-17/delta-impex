"use client";

import { motion } from 'framer-motion';
import { Shield, Award, Users, Globe, Clock, CheckCircle2, Waves, Factory, Zap, Droplets } from 'lucide-react';
import Image from 'next/image';
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export default function AboutContent({ initialData, footerData }: { initialData?: any, footerData?: any }) {
  const values = initialData?.values || [
    {
      title: "Tested & Verified",
      description: "Every spare part is thoroughly checked to ensure it works perfectly before we ship it to you.",
    },
    {
      title: "Worldwide Shipping",
      description: "We deliver products quickly to ports and factories all over the world.",
    },
    {
      title: "Expert Knowledge",
      description: "Our team has years of experience with marine engines, machinery, and water treatment systems.",
    },
    {
      title: "Fast Delivery",
      description: "We focus on quick turnarounds so your ship or factory can keep running without delays.",
    }
  ];

  const getIcon = (title: string) => {
    if (title.includes("Tested")) return CheckCircle2;
    if (title.includes("Shipping")) return Globe;
    if (title.includes("Knowledge")) return Users;
    return Clock;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="font-sans">
        {/* Hero Section */}
        <section className="relative min-h-[60dvh] pt-28 sm:pt-32 md:pt-36 flex items-center justify-center overflow-hidden bg-[#020617]">
          <div className="absolute inset-0 z-0">
            <Image 
              src={initialData?.heroImageUrl || "/about-hero.png"} 
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
              <span className="label-tech mb-4 block text-accent">{initialData?.heroLabel || "Proven Excellence"}</span>
              <h1 className="heading-display text-white mb-6 uppercase">
                {initialData?.title || "About DELTA Impex"}
              </h1>
              <p className="body-premium text-white/90 max-w-2xl mx-auto italic ">
                {initialData?.heroSubtitle || "Marine & Industrial Machinery Spare Parts Solutions"}
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
                <h2 className="label-tech mb-4 text-accent">{initialData?.legacyLabel || "Our Legacy"}</h2>
                <h3 className="heading-section mb-8 uppercase tracking-tighter text-primary">
                  {initialData?.legacyTitle || (
                      <>Carrying the <span className="text-accent italic font-medium">Legacy</span> Forward</>
                  )}
                </h3>
                <div className="body-premium space-y-6">
                  <p>
                    {initialData?.missionStatement || "Delta Impex is a India-based company. We provide parts and machinery for ships and land-based industries."}
                  </p>
                  <p>
                    {initialData?.legacyDescription2 || "With our experience and wide network, we help ship owners and industrial clients get reliable parts at the best prices."}
                  </p>
                  <p>
                    {initialData?.legacyDescription3 || "We are committed to delivering quality products and fast service to build long-term relationships with our clients."}
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
                  <span className="font-display font-bold text-5xl text-white block leading-none">
                    {initialData?.experienceYears || "20"}<span className="text-accent-foreground/50">+</span>
                  </span>
                  <span className="font-tech text-white/80 text-[10px] uppercase font-bold tracking-[0.3em] block mt-3">
                    {initialData?.experienceLabel || "Years of Mastery"}
                  </span>
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[9px] font-tech text-white/40 uppercase tracking-widest">
                      {initialData?.experienceBadge || "Industry Leader"}
                    </span>
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
              <h2 className="label-tech mb-4 text-accent">{initialData?.valuesLabel || "Core Capabilities"}</h2>
              <h3 className="heading-section mb-6 uppercase tracking-tighter text-primary">
                {initialData?.valuesTitle || (
                    <>Why Choose <span className="text-accent italic font-medium">Delta Impex</span></>
                )}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value: any, index: number) => {
                const Icon = getIcon(value.title);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 bg-slate-50/50 border border-border hover:border-accent/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="heading-sub text-base mb-4 uppercase tracking-tight text-primary">{value.title}</h4>
                    <p className="body-text text-slate-600">{value.description}</p>
                  </motion.div>
                );
              })}
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
              <h2 className="font-tech text-[10px] tracking-[0.4em] uppercase text-white/60 font-bold mb-4">{initialData?.portfolioLabel || "Our Portfolio"}</h2>
              <h3 className="heading-display text-white mb-6 uppercase">
                {initialData?.portfolioTitle || (
                    <>Our Products <span className="text-white italic font-medium border-b-2 border-accent">& Services</span></>
                )}
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
                  <h4 className="heading-sub text-xl uppercase tracking-tight">{initialData?.portfolioMarineTitle || "Marine & Ship Spare Parts"}</h4>
                </div>
                <p className="body-text text-white/80 mb-6">{initialData?.portfolioMarineDesc || "We supply all types of ship spare parts for main and auxiliary machinery, including:"}</p>
                <ul className="grid grid-cols-1 gap-3 mb-8">
                  {(initialData?.portfolioMarineItems || [
                    "Main engine & auxiliary engine spares",
                    "Turbochargers, pumps & compressors",
                    "Purifiers & separators",
                    "Heat exchangers & coolers",
                    "Electrical & navigation equipment",
                    "Deck & engine room machinery",
                    "All types of marine consumables"
                  ]).map((item: string, i: number) => (
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
                    <h4 className="heading-sub text-lg uppercase tracking-tight">{initialData?.portfolioIndustrialTitle || "Industrial Solutions"}</h4>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {(initialData?.portfolioIndustrialItems || ["Industrial engines", "Generator sets (gensets)", "Machinery spare parts", "Industrial equipment"]).map((item: string, i: number) => (
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
                      <h4 className="font-tech text-xs uppercase tracking-wider">{initialData?.portfolioPowerTitle || "Power Plant Supply"}</h4>
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed">{initialData?.portfolioPowerDesc || "Power plant equipment, engines, generators, and ongoing spare parts support."}</p>
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
                      <h4 className="font-tech text-xs uppercase tracking-wider">{initialData?.portfolioRoTitle || "RO Water Systems"}</h4>
                    </div>
                    <p className="text-[12px] text-white/60 leading-relaxed">{initialData?.portfolioRoDesc || "Reverse osmosis plants, water treatment equipment, and maintenance support."}</p>
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
              <h2 className="label-tech mb-4 text-accent">{initialData?.expertiseLabel || "Technical Expertise"}</h2>
              <h3 className="heading-section mb-6 uppercase tracking-tighter text-primary">
                {initialData?.expertiseTitle || (
                    <>Engine & Machinery <span className="text-accent italic font-medium">Experience</span></>
                )}
              </h3>
              <p className="body-text max-w-3xl mx-auto italic border-l-2 border-accent pl-6 text-left md:text-center md:border-l-0 md:pl-0 text-slate-500">
                {initialData?.expertiseDescription || "Specialized knowledge in low-speed and medium-speed marine engines, assisting routine maintenance and urgent breakdowns."}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {(initialData?.expertise || [
                { 
                  title: "MAN B&W / Sulzer Engines", 
                  items: ["S50MC, S60MC, S70MC series", "Specialized Cylinder Components", "Fuel Pumps & Injection Systems"],
                  footerText: "Supplying cylinder liners, pistons, fuel system parts, bearings, and valves for global ship managers."
                },
                { 
                  title: "Auxiliary & Processing", 
                  items: ["Air Compressors & Starter Motors", "Fresh Water Generators & RO Plants", "Oil Purifiers & Separation Systems"],
                  footerText: "Ensuring technical accuracy and proper documentation for uninterrupted onboard operations."
                },
              ]).map((exp: any, index: number) => (
                <div key={index} className="p-8 sm:p-12 border border-slate-200 group hover:border-accent transition-all duration-700 bg-white shadow-sm hover:shadow-xl">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center mb-8 group-hover:bg-accent transition-colors">
                    {index === 0 ? <Shield className="w-8 h-8 text-white" /> : <Award className="w-8 h-8 text-white" />}
                  </div>
                  <h4 className="heading-sub text-xl mb-6 uppercase tracking-tight text-primary">{exp.title}</h4>
                  <ul className="body-text space-y-3 mb-6 text-slate-600">
                    {exp.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-accent rounded-full" /> {item}</li>
                    ))}
                  </ul>
                  <p className="body-text text-sm italic border-t border-slate-100 pt-6 text-slate-400">
                    {exp.footerText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        {initialData?.teamMembers && initialData.teamMembers.length > 0 && (
          <section className="py-24 bg-slate-50 border-t border-border">
            <div className="container mx-auto px-6 lg:px-8">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="label-tech mb-4 text-accent">{initialData?.teamLabel || "Our Leadership"}</h2>
                <h3 className="heading-section mb-6 uppercase tracking-tighter text-primary">
                  {initialData?.teamTitle || (
                      <>The Minds Behind <span className="text-accent italic font-medium">Delta Impex</span></>
                  )}
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {initialData.teamMembers.map((member: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-border">
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <Users className="w-12 h-12 text-slate-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="mt-6 text-center">
                      <h4 className="heading-sub text-lg uppercase tracking-tight text-primary mb-1">{member.name}</h4>
                      <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-accent font-bold">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

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
              <h2 className="label-tech mb-6 text-accent">{initialData?.promiseLabel || "Our Promise"}</h2>
              <h3 className="heading-display text-white mb-8 uppercase">
                {initialData?.promiseTitle ? initialData.promiseTitle.split('\n').map((line: string, i: number) => (
                  <span key={i}>{line}<br /></span>
                )) : (
                  <>Quality Without <br/> <span className="text-accent italic">Compromise</span></>
                )}
              </h3>
              <p className="body-premium text-white/80 mb-6">
                {initialData?.promiseDesc || "Across all machinery categories, one principle remains constant: we do not compromise on quality or technical accuracy."}
              </p>
              <p className="body-text text-white/50 italic border-l-2 border-accent pl-6 max-w-2xl">
                {initialData?.promiseNote || "Every component is stocked after complete inspection and N.D. Test. We promise honest communication, fair prices, and reliable parts so you never have to worry about quality or delays."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 border-t border-white/10 pt-12">
                {(initialData?.promiseDetails || [
                  { label: "New OEM Surplus", desc: "Genuine parts from recycled ship stores." },
                  { label: "Reconditioned", desc: "Tested on bench with full reports." },
                  { label: "Ready Stock", desc: "Immediate delivery for urgent breakdowns." },
                ]).map((detail: any, i: number) => (
                  <div key={i} className="font-sans">
                      <h4 className="heading-sub text-sm text-white uppercase tracking-widest mb-2">{detail.label}</h4>
                      <p className="text-xs text-white/40">{detail.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterSection data={footerData} />
    </main>
  );
}
