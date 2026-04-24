"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Globe, Send, ChevronRight, Clock, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

const contactMethods = [
  {
    icon: MapPin,
    title: "Visit Us",
    primary: "Office-07, Madina Tenement",
    secondary: "Jamnakund Chowk, Bhavnagar – 364001, India",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: Phone,
    title: "Call Us",
    primary: "+91 99259 99945 (IND)",
    secondary: "+971 52 491 8899 (UAE)",
    color: "bg-green-500/10 text-green-600"
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: "sales@deltaimpex.co",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Globe,
    title: "Global Reach",
    primary: "150+ Ports Worldwide",
    secondary: "Serving marine & industrial clients",
    color: "bg-orange-500/10 text-orange-600"
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitStatus("loading");
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus("success");
    setFormData({ name: "", email: "", company: "", message: "" });
    setTimeout(() => setSubmitStatus("idle"), 5000);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <Image
            src="/images/hero-clean.png"
            alt="Global logistics and communication"
            fill
            className="object-cover opacity-60 contrast-125 saturate-[0.8]"
            priority
          />
          {/* Legibility overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 text-center px-6" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)' }}>
          <FadeInOnScroll>
            <p className="label-tech text-white/80 mb-6 drop-shadow-xl uppercase tracking-[0.4em]">
              Connect With Us
            </p>
            <h1 className="heading-display text-white !leading-[0.95] uppercase drop-shadow-2xl">
              Get in <span className="text-primary italic">Touch.</span>
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="bg-background border-b border-border/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method, index) => (
            <FadeInOnScroll key={index} delay={index * 0.1}>
              <div className="h-full p-10 md:p-12 border-b sm:border-b-0 sm:border-r border-border/60 group hover:bg-muted/30 transition-all duration-500">
                <div className={`mb-8 h-14 w-14 flex items-center justify-center rounded-2xl ${method.color} group-hover:scale-110 transition-transform duration-500`}>
                  <method.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="font-tech text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4">{method.title}</h3>
                <p className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-500">
                  {method.primary}
                </p>
                <p className="body-text text-sm !leading-relaxed text-muted-foreground">
                  {method.secondary}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="section-container py-24 md:py-32 lg:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Info side */}
          <div className="lg:col-span-5">
            <FadeInOnScroll>
                <div className="space-y-10">
                    <div>
                        <p className="label-tech text-primary mb-5">Global Operations</p>
                        <h2 className="heading-display text-foreground mb-8">Consult Our Experts.</h2>
                        <p className="body-text !leading-relaxed text-muted-foreground text-lg">
                            Whether you're managing a global shipping fleet or a localized industrial facility, 
                            Delta Impex provides the technical support and logistical precision you need.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { icon: Clock, title: "24h Response", desc: "Technical quotes within one business day." },
                            { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Rigorous inspection for every single part." },
                            { icon: Send, title: "Global Logistics", desc: "Express delivery to 100+ major world ports." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <item.icon size={18} />
                                </div>
                                <div>
                                    <h4 className="font-tech text-xs uppercase tracking-widest font-bold text-foreground mb-1">{item.title}</h4>
                                    <p className="body-text text-xs">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-muted/40 rounded-[2.5rem] border border-border/50">
                        <p className="label-tech !mb-4">Urgent Inquiries</p>
                        <p className="font-display text-lg font-bold text-foreground mb-2">Available 24/7 for marine emergencies.</p>
                        <a href="tel:+919925999945" className="text-primary font-tech text-xs font-bold tracking-[0.2em] flex items-center gap-2 hover:underline">
                            Call Technical Support <ChevronRight size={14} />
                        </a>
                    </div>
                </div>
            </FadeInOnScroll>
          </div>

          {/* Right Form side */}
          <div className="lg:col-span-7">
            <FadeInOnScroll delay={0.2}>
              <div className="bg-background border border-border/80 p-8 md:p-12 lg:p-16 rounded-[3rem] shadow-2xl shadow-foreground/5">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className={`label-tech text-[10px] transition-colors ${focusedField === 'name' ? 'text-primary' : 'text-muted-foreground'}`}>Your Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="space-y-3">
                            <label className={`label-tech text-[10px] transition-colors ${focusedField === 'email' ? 'text-primary' : 'text-muted-foreground'}`}>Professional Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                                placeholder="your@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className={`label-tech text-[10px] transition-colors ${focusedField === 'company' ? 'text-primary' : 'text-muted-foreground'}`}>Company / Vessel Name</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-sans"
                            placeholder="Ship name or company"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className={`label-tech text-[10px] transition-colors ${focusedField === 'message' ? 'text-primary' : 'text-muted-foreground'}`}>Your Message / Requirement</label>
                        <textarea
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent border-b border-border py-2 text-foreground focus:outline-none focus:border-primary transition-colors resize-none font-sans"
                            placeholder="How can we assist you today?"
                            required
                        />
                    </div>

                    <AnimatePresence>
                        {submitStatus === "success" && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 font-sans text-sm flex items-center gap-3"
                            >
                                <ShieldCheck size={18} />
                                Request sent successfully. We'll be in touch soon.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className="group relative w-full overflow-hidden bg-foreground text-background py-5 rounded-full font-tech text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-700 disabled:opacity-50"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {submitStatus === "loading" ? "Processing..." : "Submit Inquiry"}
                            <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>
                </form>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
