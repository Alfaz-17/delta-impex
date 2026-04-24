import Link from "next/link";

export function SeoContentSection() {
  return (
    <section className="bg-background py-8 md:py-10 lg:py-12 border-t border-border/40">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <article className="rounded-3xl border border-border/60 bg-muted/20 p-6 md:p-8">
            <p className="label-tech mb-3">Delta Impex</p>
            <h2 className="heading-section text-foreground mb-4">Delta Impex Marine & RO Solutions</h2>
            <p className="body-text !text-foreground/80">
              Delta Impex is a trusted supplier of marine engine spare parts, industrial machinery components, and RO water treatment systems.
              We support global clients with reliable sourcing, quality checks, and timely delivery.
            </p>
          </article>

          <article className="rounded-3xl border border-border/60 bg-muted/20 p-6 md:p-8">
            <p className="label-tech mb-3">Delta Impex Bhavnagar</p>
            <h2 className="heading-section text-foreground mb-4">Head Office in Bhavnagar, Gujarat</h2>
            <p className="body-text !text-foreground/80">
              Delta Impex Bhavnagar serves marine and industrial buyers worldwide from Gujarat, India. 
              For quotations and technical support, visit our <Link href="/contact" className="text-primary font-semibold">contact page</Link> or explore our <Link href="/products" className="text-primary font-semibold">product catalog</Link>.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
