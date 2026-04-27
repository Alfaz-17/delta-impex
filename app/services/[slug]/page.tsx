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
          <article className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-dark-card p-6 md:p-10 lg:col-span-8 shadow-lg">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.5) 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-accent-glow/15 blur-[80px]" />
            <div className="relative z-10">
              <h2 className="heading-section mb-4 text-white">Why Choose Delta Impex</h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-300/90 mb-6">{page.summary}</p>
              <ul className="space-y-3">
                {page.points.map((point) => (
                  <li key={point} className="flex items-start text-sm leading-relaxed text-slate-300/80">
                    <span className="mr-3 mt-[7px] h-1 w-1 rounded-full bg-accent-blue shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-dark-card p-6 md:p-8 lg:col-span-4 shadow-lg">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(91,155,213,0.5) 1px, transparent 0)', backgroundSize: '2rem 2rem' }} />
            <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-accent-glow/15 blur-[60px]" />
            <div className="relative z-10">
              <h3 className="heading-sub mb-4 text-white">Explore More</h3>
              <div className="space-y-3">
                {/* {SERVICE_KEYWORD_PAGES.filter((item) => item.slug !== page.slug).map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`} className="block text-sm text-accent-blue hover:underline">
                    {item.title}
                  </Link>
                ))} */}
              </div>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <Link href="/contact" className="text-sm font-semibold text-accent-blue hover:underline">
                  Request Technical Quote
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
