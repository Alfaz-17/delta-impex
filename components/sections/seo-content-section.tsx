import Link from "next/link";

export function SeoContentSection() {
  return (
    <section className="py-8 md:py-10 lg:py-12 border-t border-white/[0.06] bg-dark-base">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <article className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-dark-card p-6 md:p-8 shadow-2xl transition-all duration-500 hover:border-accent-blue/30">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.5) 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-accent-blue/10 blur-[80px] group-hover:bg-accent-blue/20 transition-all" />
            <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-cyan-500/5 blur-[60px]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-accent-blue/30" />
                <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-accent-blue">Delta Impex</p>
              </div>
              <h2 className="heading-section text-white mb-4 group-hover:text-accent-blue/90 transition-colors">Delta Impex Marine & <br className="hidden md:block" /> <span className="text-accent-blue italic">RO Solutions.</span></h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-300/90 max-w-lg">
                Delta Impex is a trusted supplier of marine engine spare parts, industrial machinery components, and RO water treatment systems.
                We support global clients with reliable sourcing, quality checks, and timely delivery.
              </p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-dark-card p-6 md:p-8 shadow-2xl transition-all duration-500 hover:border-accent-blue/30">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.5) 1px, transparent 0)', backgroundSize: '1.5rem 1.5rem' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-accent-glow/10 blur-[80px] group-hover:bg-accent-glow/20 transition-all" />
            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-accent-blue/5 blur-[60px]" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-accent-blue/30" />
                <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-accent-blue">Head Office</p>
              </div>
              <h2 className="heading-section text-white mb-4 group-hover:text-accent-blue/90 transition-colors">Strategically Located in <br className="hidden md:block" /> <span className="text-accent-blue italic">Bhavnagar, Gujarat.</span></h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-300/90 max-w-lg">
                Delta Impex Bhavnagar serves marine and industrial buyers worldwide from Gujarat, India. 
                For quotations and technical support, visit our <Link href="/contact" className="text-accent-blue font-semibold hover:underline">contact page</Link> or explore our <Link href="/products" className="text-accent-blue font-semibold hover:underline">product catalog</Link>.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
