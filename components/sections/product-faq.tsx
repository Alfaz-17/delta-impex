"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productName: string;
}

export function ProductFAQ({ productName }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: `Is the ${productName} genuine or reconditioned?`,
      answer: `We supply ${productName} in various conditions including brand new, genuine reconditioned, and high-quality second-hand (used) options. Every part is technically verified for performance and reliability.`
    },
    {
      question: `What is the shipping time for ${productName}?`,
      answer: `Shipping times vary based on your location and the urgency of the requirement. For standard stock items like ${productName}, we typically dispatch within 24-48 hours. We deliver to over 150+ major ports globally.`
    },
    {
      question: `Do you provide a warranty for ${productName}?`,
      answer: `Yes, we provide a standard technical guarantee on all our products, including ${productName}. The specific warranty period depends on whether the part is new or reconditioned. Please contact our sales team for exact warranty details.`
    },
    {
      question: `How do I request a formal quote for ${productName}?`,
      answer: `You can request a quote by clicking the "Request Technical Quote" button on this page, or you can reach out to us directly via WhatsApp for an immediate response. Please provide the part number or engine model for faster processing.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <p className="label-tech text-accent mb-4">Technical Q&A</p>
            <h2 className="heading-display text-primary text-3xl uppercase tracking-tighter">
              Common <span className="text-accent italic font-medium">Questions.</span>
            </h2>
            <p className="body-text text-slate-500 mt-6 max-w-sm">
              Find quick answers to technical inquiries regarding {productName} and our global supply services.
            </p>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border-b transition-all duration-500 ${openIndex === index ? "border-accent/30 bg-white shadow-sm" : "border-slate-100"}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-display font-bold text-sm md:text-base uppercase tracking-tight ${openIndex === index ? "text-accent" : "text-primary"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 ml-4 transition-transform duration-500 ${openIndex === index ? "rotate-180" : ""}`}>
                    {openIndex === index ? <Minus size={18} className="text-accent" /> : <Plus size={18} className="text-slate-300" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-8 text-sm text-slate-500 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
