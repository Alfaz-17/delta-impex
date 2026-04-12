"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import type { Metadata } from 'next'

function FadeInOnScroll({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(60px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const contactMethods = [
  {
    icon: MapPin,
    title: "Visit Us",
    primary: "Office-07, Madina Tenement",
    secondary: "Jamnakund Chowk, Bhavnagar – 364001, India",
  },
  {
    icon: Phone,
    title: "Call Us",
    primary: "+91 9925999945 (India)",
    secondary: "+971 524918899 (UAE)",
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: "info@deltaimpex.com",
    secondary: "For quotes and inquiries",
  },
  {
    icon: Globe,
    title: "Global Reach",
    primary: "50+ Ports Worldwide",
    secondary: "Serving marine & industrial clients globally",
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", subject: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitStatus("loading");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus("success");
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.6)));
      setHeroScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-clean.png"
            alt="Global logistics and communication"
            fill
            className="object-cover contrast-[1.1] saturate-[1.1] opacity-60"
            style={{
              transform: `scale(${1 + heroScrollProgress * 0.15})`,
            }}
            priority
          />
        </div>

        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <div
          className="relative z-10 text-center px-6"
          style={{
            opacity: 1 - heroScrollProgress * 1.5,
            transform: `translateY(${heroScrollProgress * 80}px)`,
          }}
        >
          <p className="label-tech text-white/70 mb-6">
            Get in Touch
          </p>
          <h1 className="heading-display text-white text-5xl md:text-7xl lg:text-[8vw] !leading-[0.95] tracking-tighter">
            Contact Us.
          </h1>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="border-b border-border bg-background">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method, index) => (
            <FadeInOnScroll key={method.title} delay={index * 0.1}>
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border last:border-r-0 last:border-b-0 group hover:bg-muted transition-colors duration-500">
                <method.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors mb-6" />
                <h3 className="label-tech mb-4">{method.title}</h3>
                <p className="heading-sub !mb-1 !text-lg !font-bold tracking-tight">{method.primary}</p>
                <p className="font-sans text-sm text-muted-foreground">{method.secondary}</p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeInOnScroll>
            <div>
              <p className="label-tech mb-4">Send a Message</p>
              <h2 className="heading-section text-5xl lg:text-6xl mb-8">
                Let&apos;s Work Together.
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you need a single spare part or a complete machinery system, our team is ready to help.
                Fill out the form and we&apos;ll respond within 24 hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="font-sans text-sm text-muted-foreground">Average response time: 4 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="font-sans text-sm text-muted-foreground">Quote turnaround: 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
                  <span className="font-sans text-sm text-muted-foreground">Available 7 days a week</span>
                </div>
              </div>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.15}>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className={`label-tech !tracking-[0.15em] transition-colors duration-300 ${focusedField === "name" ? "text-foreground" : "text-muted-foreground"}`}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-border pb-3 pt-1 text-lg focus:outline-none focus:border-foreground transition-colors duration-300 font-sans"
                    placeholder="Your name"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className={`font-tech text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${focusedField === "email" ? "text-foreground" : "text-muted-foreground"}`}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-border pb-3 pt-1 text-lg focus:outline-none focus:border-foreground transition-colors duration-300 font-sans"
                    placeholder="your@email.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className={`font-tech text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${focusedField === "company" ? "text-foreground" : "text-muted-foreground"}`}>
                  Company / Vessel
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-border pb-3 pt-1 text-lg focus:outline-none focus:border-foreground transition-colors duration-300 font-sans"
                  placeholder="Company or vessel name"
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className={`font-tech text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${focusedField === "message" ? "text-foreground" : "text-muted-foreground"}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-border pb-3 pt-1 text-lg focus:outline-none focus:border-foreground transition-colors duration-300 resize-none font-sans"
                  placeholder="Tell us about your requirements..."
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-600 text-sm rounded-xl px-4 py-3 font-sans">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="group flex items-center gap-4 bg-foreground text-background px-8 py-4 rounded-full btn-text !text-lg hover:scale-105 transition-transform mt-4 disabled:opacity-50"
              >
                {submitStatus === "loading" ? "Sending..." : "Send Message"}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          </FadeInOnScroll>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
