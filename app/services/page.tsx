import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { SERVICE_KEYWORD_PAGES } from "@/lib/service-keywords";

export const metadata: Metadata = {
  title: "Services | Delta Impex",
  description:
    "Explore Delta Impex service expertise in marine engine spare parts, RO water treatment plants, and industrial machinery sourcing.",
  alternates: {
    canonical: "https://deltaimpex.co/services",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="section-container pt-28 pb-12 md:pt-32 md:pb-16">
        <p className="label-tech mb-3">Service Keywords</p>
        <h1 className="heading-display mb-6 text-foreground">Delta Impex Service Coverage</h1>
        <p className="body-text max-w-3xl !text-foreground/80">
          These SEO landing pages describe key service terms clients use when searching for marine, industrial, and water treatment sourcing support.
        </p>
      </section>

      <section className="section-container pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICE_KEYWORD_PAGES.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              className="rounded-3xl border border-border/70 bg-muted/20 p-6 transition-colors hover:bg-muted/35"
            >
              <p className="label-tech mb-2">{item.keyword}</p>
              <h2 className="heading-sub mb-3 text-foreground">{item.title}</h2>
              <p className="body-text !text-foreground/80">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
