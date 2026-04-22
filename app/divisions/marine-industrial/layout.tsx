import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Marine & Industrial Parts | Delta Impex Catalog",
  description: "Browse our comprehensive inventory of high-quality marine engine spare parts and industrial machinery. Sourced for precision and operational continuity.",
  openGraph: {
    title: "Marine & Industrial Parts | Delta Impex",
    description: "Browse our comprehensive inventory of high-quality marine engine spare parts and industrial machinery.",
    url: 'https://www.deltaimpex.co/divisions/marine-parts',
  }
}

export default function MarinePartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
