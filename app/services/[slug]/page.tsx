import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { getServiceKeywordPage, SERVICE_KEYWORD_PAGES } from "@/lib/service-keywords";

export function generateStaticParams() {
  return SERVICE_KEYWORD_PAGES.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getServiceKeywordPage(params.slug);
  if (!page) {
    return {};
  }

  const url = `https://deltaimpex.co/services/${page.slug}`;
  const title = `${page.title} | Delta Impex`;

  return {
    title,
    description: page.intro,
    keywords: ["Delta Impex", "Delta Impex Bhavnagar", page.keyword, "marine and industrial supplier"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: page.intro,
      url,
      type: "article",
      siteName: "Delta Impex",
    },
  };
}

export default function ServiceKeywordPage({ params }: { params: { slug: string } }) {
  const page = getServiceKeywordPage(params.slug);
  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="section-container pt-28 pb-10 md:pt-32 md:pb-12">
        <p className="label-tech mb-3">{page.keyword}</p>
        <h1 className="heading-display mb-5 text-foreground">{page.title}</h1>
        <p className="body-text max-w-3xl !text-foreground/80">{page.intro}</p>
      </section>

      <section className="section-container pb-16 md:pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <article className="rounded-3xl border border-border/70 bg-muted/20 p-6 md:p-8 lg:col-span-8">
            <h2 className="heading-section mb-4 text-foreground">Why Choose Delta Impex</h2>
            <p className="body-text !text-foreground/80 mb-6">{page.summary}</p>
            <ul className="space-y-3">
              {page.points.map((point) => (
                <li key={point} className="text-sm text-foreground/80">
                  - {point}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-3xl border border-border/70 bg-muted/20 p-6 md:p-8 lg:col-span-4">
            <h3 className="heading-sub mb-4 text-foreground">Explore More</h3>
            <div className="space-y-3">
              {SERVICE_KEYWORD_PAGES.filter((item) => item.slug !== page.slug).map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="block text-sm text-primary hover:underline">
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <Link href="/contact" className="text-sm font-semibold text-primary hover:underline">
                Request Technical Quote
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
