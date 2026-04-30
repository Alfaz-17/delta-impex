import Link from "next/link";

export function SeoContentSection() {
  return (
    <section className="py-24 md:py-32 border-t border-border bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <article className="group relative overflow-hidden rounded-none border border-slate-100 bg-slate-50/50 p-8 md:p-12 shadow-sm transition-all duration-500 hover:border-accent/30 hover:shadow-xl">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-accent/30" />
                <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-accent">Delta Impex</p>
              </div>
              <h2 className="heading-section text-primary mb-6 group-hover:text-accent transition-colors uppercase tracking-tighter">Delta Impex Marine & <br className="hidden md:block" /> <span className="text-accent italic font-medium">RO Solutions.</span></h2>
              <p className="body-text text-slate-600 max-w-lg leading-relaxed">
                Delta Impex is a trusted supplier of marine engine spare parts, industrial machinery components, and RO water treatment systems.
                We support global clients with reliable sourcing, quality checks, and timely delivery.
              </p>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-none border border-slate-100 bg-slate-50/50 p-8 md:p-12 shadow-sm transition-all duration-500 hover:border-accent/30 hover:shadow-xl">
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-accent/30" />
                <p className="font-tech text-[10px] font-bold uppercase tracking-widest text-accent">Head Office</p>
              </div>
              <h2 className="heading-section text-primary mb-6 group-hover:text-accent transition-colors uppercase tracking-tighter">Strategically Located in <br className="hidden md:block" /> <span className="text-accent italic font-medium">Bhavnagar, Gujarat.</span></h2>
              <p className="body-text text-slate-600 max-w-lg leading-relaxed">
                Delta Impex Bhavnagar serves marine and industrial buyers worldwide from Gujarat, India. 
                For quotations and technical support, visit our <Link href="/contact" className="text-accent font-semibold hover:underline">contact page</Link> or explore our <Link href="/products" className="text-accent font-semibold hover:underline">product catalog</Link>.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
