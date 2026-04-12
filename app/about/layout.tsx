import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Our Legacy | Delta Impex History & Values",
  description: "Learn about the foundation of Delta Impex. Unwavering commitment to quality, timely delivery, and long-term trust in marine and industrial engineering.",
  openGraph: {
    title: "Our Legacy | Delta Impex",
    description: "Learn about the foundation of Delta Impex. Unwavering commitment to quality, timely delivery, and long-term trust in marine and industrial engineering.",
    url: 'https://www.deltaimpex.co/about',
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
