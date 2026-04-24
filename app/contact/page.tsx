"use client";

import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import Image from "next/image";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Globe, Send, ChevronRight, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { SITE_INFO } from "@/lib/site";

const contactMethods = [
  {
    icon: MapPin,
    title: "Visit Us",
    primary: SITE_INFO.addressLine1,
    secondary: SITE_INFO.addressLine2,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    primary: `${SITE_INFO.phoneIndia} (IND)`,
    secondary: `${SITE_INFO.phoneUAE} (UAE)`,
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    primary: SITE_INFO.email,
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Globe,
    title: "Global Reach",
    primary: "150+ Ports Worldwide",
    secondary: "Serving marine & industrial clients",
    color: "bg-orange-500/10 text-orange-600",
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string; message?: string }>({});

  function validateForm() {
    const nextErrors: { name?: string; email?: string; company?: string; message?: string } = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const company = formData.company.trim();
    const message = formData.message.trim();

    if (!name) {
      nextErrors.name = "Name is required.";
    } else if (name.length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    } else if (name.length > 80) {
      nextErrors.name = "Name must be under 80 characters.";
    }

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (company.length > 120) {
      nextErrors.company = "Company/Vessel must be under 120 characters.";
    }

    if (!message) {
      nextErrors.message = "Message is required.";
    } else if (message.length < 15) {
      nextErrors.message = "Message should be at least 15 characters.";
    } else if (message.length > 1200) {
      nextErrors.message = "Message must be under 1200 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    try {
      setSubmitStatus("loading");

      const subjectParts = [
        formData.company.trim() || "Website Inquiry",
        formData.name.trim() ? `from ${formData.name.trim()}` : "",
      ].filter(Boolean);

      const subject = subjectParts.join(" ");
      const body = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Company / Vessel: ${formData.company || "-"}`,
        "",
        "Requirement:",
        formData.message,
      ].join("\n");

      window.location.href = `mailto:${SITE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

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
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 text-center px-6" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.5)" }}>
          <FadeInOnScroll>
            
            <h1 className="heading-display text-white !leading-[0.95] uppercase drop-shadow-2xl">
              Get in <span className="text-blue-400/70 italic">Touch.</span>
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

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

      <section className="section-container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-5">
            <FadeInOnScroll>
              <div className="space-y-10">
                <div>
                  <p className="label-tech text-primary mb-5">Global Operations</p>
                  <h2 className="heading-display text-foreground mb-8">Consult Our Experts.</h2>
                  <p className="body-text !leading-relaxed text-muted-foreground text-lg">
                    Whether you&apos;re managing a global shipping fleet or a localized industrial facility,
                    Delta Impex provides the technical support and logistical precision you need.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: Clock, title: "24h Response", desc: "Technical quotes within one business day." },
                    { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Rigorous inspection for every single part." },
                    { icon: Send, title: "Global Logistics", desc: "Express delivery to 100+ major world ports." },
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

          <div className="lg:col-span-7">
            <FadeInOnScroll delay={0.2}>
              <div className="bg-background border border-border/80 p-8 md:p-12 lg:p-16 rounded-[3rem] shadow-2xl shadow-foreground/5">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className={`label-tech text-[10px] transition-colors ${focusedField === "name" ? "text-primary" : "text-muted-foreground"}`}>Your Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-transparent border-b py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-sans ${errors.name ? "border-red-500" : "border-border"}`}
                        placeholder="Enter your name"
                        maxLength={80}
                        required
                      />
                      {errors.name ? <p className="text-xs text-red-600">{errors.name}</p> : null}
                    </div>
                    <div className="space-y-3">
                      <label className={`label-tech text-[10px] transition-colors ${focusedField === "email" ? "text-primary" : "text-muted-foreground"}`}>Professional Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-transparent border-b py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-sans ${errors.email ? "border-red-500" : "border-border"}`}
                        placeholder="your@company.com"
                        required
                      />
                      {errors.email ? <p className="text-xs text-red-600">{errors.email}</p> : null}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={`label-tech text-[10px] transition-colors ${focusedField === "company" ? "text-primary" : "text-muted-foreground"}`}>Company / Vessel Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => {
                        setFormData({ ...formData, company: e.target.value });
                        if (errors.company) setErrors((prev) => ({ ...prev, company: undefined }));
                      }}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-transparent border-b py-2 text-foreground focus:outline-none focus:border-primary transition-colors font-sans ${errors.company ? "border-red-500" : "border-border"}`}
                      placeholder="Ship name or company"
                      maxLength={120}
                    />
                    {errors.company ? <p className="text-xs text-red-600">{errors.company}</p> : null}
                  </div>

                  <div className="space-y-3">
                    <label className={`label-tech text-[10px] transition-colors ${focusedField === "message" ? "text-primary" : "text-muted-foreground"}`}>Your Message / Requirement</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-transparent border-b py-2 text-foreground focus:outline-none focus:border-primary transition-colors resize-none font-sans ${errors.message ? "border-red-500" : "border-border"}`}
                      placeholder="How can we assist you today?"
                      maxLength={1200}
                      required
                    />
                    {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : null}
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
                        Your email draft has been opened successfully.
                      </motion.div>
                    )}
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 font-sans text-sm flex items-center gap-3"
                      >
                        <AlertCircle size={18} />
                        We could not open your email app. Please email {SITE_INFO.email} directly.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="group relative w-full overflow-hidden bg-foreground text-background py-5 rounded-full font-tech text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary transition-all duration-700 disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {submitStatus === "loading" ? "Opening Email..." : "Send Inquiry"}
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                </form>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      <section className="section-container pb-12 md:pb-16 lg:pb-20">
        <div className="overflow-hidden rounded-3xl border border-border/70 bg-muted/20">
          <div className="flex flex-col gap-4 border-b border-border/60 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="label-tech mb-2">Local Presence</p>
              <h2 className="heading-sub !mb-0 text-foreground">Delta Impex Bhavnagar Office</h2>
              <p className="mt-2 text-sm text-muted-foreground">{SITE_INFO.fullAddress}</p>
            </div>
            <a
              href={SITE_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Open in Google Maps <ChevronRight size={14} />
            </a>
          </div>
          <iframe
            title="Delta Impex Bhavnagar Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(SITE_INFO.fullAddress)}&output=embed`}
            className="h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
