"use client";

import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

const whyChooseUsPoints = [
  {
    title: "Extensive Stock",
    description: "One of the largest stockists globally with ready inventory of New, Reconditioned and Second-hand engine parts and ship machinery.",
  },
  {
    title: "Quality Certified",
    description: "Approved by class for all N.D. Tests with guaranteed test reports and class certificates from our stock pool.",
  },
  {
    title: "Technical Excellence",
    description: "Internationally recognized as technically competent suppliers with abundant experience since 1965.",
  },
  {
    title: "Global Reach",
    description: "Most reputed supplier from India to worldwide shipping industry and power plants with 5000+ successful deliveries.",
  },
];

function FeatureModule({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <FadeInOnScroll delay={index * 0.1}>
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-dark-card p-8 md:p-10 shadow-2xl transition-all duration-500 hover:border-accent-blue/30 h-full">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-tech text-accent-blue/60 border border-accent-blue/20 px-2 py-0.5 rounded uppercase tracking-widest">Core 0{index + 1}</span>
            <div className="h-px flex-grow bg-white/[0.08]" />
          </div>
          
          <h3 className="heading-sub text-white !mb-4 group-hover:text-accent-blue transition-colors">{title}</h3>
          
          <p className="text-slate-300 leading-relaxed text-sm md:text-base font-medium mt-auto group-hover:text-white transition-colors">
            {description}
          </p>
        </div>
      </div>
    </FadeInOnScroll>
  );
}

export function WhyChooseUsSection() {
  return (
    <section className="bg-white/[0.02] py-16 md:py-20 border-y border-white/[0.06]">
      <div className="section-container">
        <FadeInOnScroll>
          <div className="text-center mb-12">
            <p className="font-tech text-xs font-bold uppercase tracking-[0.4em] text-accent-blue mb-4">The Delta Impex Legacy</p>
            <h2 className="heading-display mb-6">
              Marine Expertise. <br />
              <span className="text-accent-blue italic">Industrial Reliability.</span>
            </h2>
            <p className="max-w-3xl mx-auto text-slate-600 text-sm leading-relaxed font-medium">
              Internationally recognized as the most technically competent supplier from India for New, Recondition and Second-hand Engine Parts and Machinery for Marine and Power plants.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll>
          <div className="p-8 md:p-12 rounded-2xl md:rounded-[2.5rem] bg-dark-card border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.4) 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {whyChooseUsPoints.map((point, index) => (
                  <div key={point.title} className="text-center">
                    <div className="w-12 h-12 bg-accent-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-accent-blue font-bold text-sm">0{index + 1}</span>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-2">{point.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{point.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/10 pt-8">
                <h3 className="heading-sub text-white !mb-4 text-center">Complete Engine & Machinery Solutions</h3>
                <p className="text-slate-200 leading-relaxed text-center max-w-4xl mx-auto mb-6 text-sm">
                  One of the largest stockiest globally with ready inventory of quality controlled genuine engine parts and ship machinery supplied with guaranteed test reports and class certificates.
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-3">
                  <span className="text-white font-tech text-[8px] uppercase tracking-widest px-3 py-1 border border-white/30 rounded-full bg-white/5">New</span>
                  <span className="text-white font-tech text-[8px] uppercase tracking-widest px-3 py-1 border border-white/30 rounded-full bg-white/5">Reconditioned</span>
                  <span className="text-white font-tech text-[8px] uppercase tracking-widest px-3 py-1 border border-white/30 rounded-full bg-white/5">Second-hand</span>
                  <span className="text-accent-blue font-tech text-[8px] uppercase tracking-widest px-3 py-1 border border-accent-blue/30 rounded-full bg-accent-blue/10">Class Certified</span>
                  <span className="text-accent-blue font-tech text-[8px] uppercase tracking-widest px-3 py-1 border border-accent-blue/30 rounded-full bg-accent-blue/10">Test Reports</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
