"use client";

import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Globe, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { SITE_INFO } from "@/lib/site";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { AnimatePresence, motion } from "framer-motion";

export default function ContactContent({ initialData, footerData }: { initialData?: any, footerData?: any }) {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string; message?: string }>({});

  const contactMethods = initialData?.contactMethods || [
    {
      title: "Global Headquarters",
      primary: "Office-07, Madina Tenement",
      secondary: "Jamnakund Chowk, Bhavnagar - 364001, India",
      type: "address",
    },
    {
      title: "Direct Support",
      primary: "+91 88661 14549 (IND)",
      secondary: "+971 52 491 8899 (UAE)",
      type: "phone",
    },
    {
      title: "Direct Correspondence",
      primary: "anas@deltaimpex.co",
      secondary: "Anas Malek (Owner)",
      type: "email",
    },
    {
      title: "Service Reach",
      primary: "150+ Major Ports",
      secondary: "Marine & Industrial Supply",
      type: "globe",
    },
  ];

  const supportFeatures = initialData?.supportFeatures || [
    { title: "Quality Check", desc: "Every part is inspected before we send it." },
    { title: "Worldwide Delivery", desc: "We deliver to 150+ major ports around the world." },
    { title: "Fast Response", desc: "We send price quotes within one working day." },
  ];

  const getIcon = (type: string) => {
    switch (type) {
        case 'address': return MapPin;
        case 'phone': return Phone;
        case 'email': return Mail;
        default: return Globe;
    }
  };

  const getFeatureIcon = (title: string) => {
    if (title.includes("Quality")) return ShieldCheck;
    if (title.includes("Delivery")) return Globe;
    return Clock;
  };

  const getAccent = (type: string) => {
    switch (type) {
        case 'phone': return "text-green-500";
        case 'globe': return "text-orange-500";
        default: return "text-accent";
    }
  };

  function validateForm() {
    const nextErrors: { name?: string; email?: string; company?: string; message?: string } = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Valid email required.";
    if (!formData.message.trim()) nextErrors.message = "Message is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus("loading");
    const subject = `Inquiry from ${formData.name} (${formData.company || "General"})`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:${initialData?.contactEmail || SITE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("idle"), 5000);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* 01. CONTACT HERO (Dark Contrast) */}
      <section className="bg-primary pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} 
        />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 skew-x-12 translate-x-1/2 pointer-events-none" />
        
        <div className="section-container relative z-10 text-center">
          <FadeInOnScroll>
            <p className="label-tech text-accent mb-6 uppercase tracking-[0.4em]">Global Connectivity</p>
            <h1 className="heading-display text-white !leading-[0.9] uppercase tracking-tighter max-w-4xl mx-auto">
              {initialData?.title || (
                <>Consult Our <br /><span className="text-accent italic font-medium">Engineering</span> Experts.</>
              )}
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

      {/* 02. CONTACT METHODS (Grid Showcase) */}
      <section className="relative z-20 -mt-12 mb-24">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 shadow-2xl border border-border">
            {contactMethods.map((method: any, index: number) => {
              const Icon = getIcon(method.type);
              const accent = getAccent(method.type);
              return (
                <div key={index} className="bg-white p-10 group hover:bg-slate-50 transition-all duration-500">
                  <div className={`w-12 h-12 bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                     <Icon size={20} />
                  </div>
                  <h3 className={`font-tech text-[10px] font-bold uppercase tracking-[0.3em] ${accent} mb-4`}>{method.title}</h3>
                  <p className="font-display text-lg font-bold text-primary mb-2 leading-tight group-hover:text-accent transition-colors">
                    {method.primary}
                  </p>
                  <p className="text-xs text-slate-400 font-sans tracking-tight">
                    {method.secondary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. CONTACT FORM & INFO */}
      <section className="pb-32">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left Side: Editorial Content */}
            <div className="space-y-12">
              <FadeInOnScroll>
                <div>
                  <h2 className="heading-display text-primary mb-8 uppercase tracking-tighter">How We <br />Can Help.</h2>
                  <p className="body-premium text-slate-600 border-l-4 border-accent pl-8 py-2">
                    {initialData?.description || "We provide reliable spare parts and fast support for ships and industries worldwide."}
                  </p>
                </div>
                
                <div className="space-y-6 pt-12">
                  {supportFeatures.map((item: any, i: number) => {
                    const Icon = getFeatureIcon(item.title);
                    return (
                      <div key={i} className="flex gap-6 group">
                        <div className="w-12 h-12 shrink-0 bg-slate-50 border border-slate-100 flex items-center justify-center text-accent group-hover:bg-primary group-hover:text-white transition-all">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="font-tech text-[11px] font-bold uppercase tracking-widest text-primary mb-1">{item.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-12 border-t border-slate-100">
                  <div className="relative overflow-hidden p-8 bg-primary text-white shadow-2xl group transition-all duration-700">
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
                    <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/20 blur-[60px] group-hover:bg-accent/40 transition-all duration-700" />
                    
                    <div className="relative z-10">
                      <p className="font-tech text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">{initialData?.ownerCardLabel || "Direct Contact"}</p>
                      <h3 className="font-display text-2xl font-bold mb-2">{initialData?.ownerCardTitle || "Anas Malek"}</h3>
                      <p className="text-[10px] font-tech font-bold uppercase tracking-widest text-white/60 mb-6">{initialData?.ownerCardRole || "Managing Director & Owner"}</p>
                      
                      <Link 
                        href={`https://wa.me/91${SITE_INFO.whatsappNumber}`} 
                        target="_blank"
                        className="inline-flex items-center gap-3 text-[10px] font-tech font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors"
                      >
                        Contact Owner via WhatsApp <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
            </div>

            {/* Right Side: High-End Form */}
            <FadeInOnScroll delay={0.2}>
              <div className="bg-slate-50 border border-slate-100 p-10 md:p-16 shadow-2xl relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl" />
                
                <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <label className="font-tech text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b border-slate-200 py-3 text-primary focus:outline-none focus:border-accent transition-all font-sans"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="font-tech text-[10px] font-bold uppercase tracking-widest text-slate-400">Professional Email</label>
                      <input
                        type="email"
                        className="w-full bg-transparent border-b border-slate-200 py-3 text-primary focus:outline-none focus:border-accent transition-all font-sans"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="font-tech text-[10px] font-bold uppercase tracking-widest text-slate-400">Company / Vessel Name</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-slate-200 py-3 text-primary focus:outline-none focus:border-accent transition-all font-sans"
                      placeholder="Shipping Co. / MV Delta"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="font-tech text-[10px] font-bold uppercase tracking-widest text-slate-400">Your Technical Requirement</label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b border-slate-200 py-3 text-primary focus:outline-none focus:border-accent transition-all font-sans resize-none"
                      placeholder="List part numbers or specifications..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="w-full bg-primary text-white py-6 font-display font-bold uppercase text-xs tracking-[0.3em] hover:bg-accent transition-all shadow-xl flex items-center justify-center gap-3 group"
                  >
                    {submitStatus === "loading" ? "Processing..." : "Send Technical Inquiry"}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-4 bg-green-50 text-green-600 font-tech text-[10px] font-bold uppercase tracking-widest text-center"
                    >
                      Your inquiry has been processed. Opening email draft...
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* 04. LOCATION REDIRECT SECTION */}
      <section className="pb-32">
        <div className="section-container">
          <div className="relative overflow-hidden bg-white border border-slate-100 shadow-2xl p-10 md:p-16 text-center max-w-4xl mx-auto">
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
            
            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 flex items-center justify-center text-accent mb-2">
                <MapPin size={24} />
              </div>
              
              <div>
                <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-accent mb-3">{initialData?.officeLabel || "Head Office"}</p>
                <h3 className="font-display text-3xl font-bold text-primary mb-4">{initialData?.officeTitle || "Bhavnagar Operations"}</h3>
                <p className="text-base text-slate-600 leading-relaxed font-sans max-w-lg mx-auto">
                  {initialData?.address || SITE_INFO.fullAddress}
                </p>
              </div>

              <a
                href={SITE_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-white font-display font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-accent transition-all shadow-xl group"
              >
                Open in Google Maps 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection data={footerData} />
    </main>
  );
}
