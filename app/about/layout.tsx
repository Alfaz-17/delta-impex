import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | Delta Impex - Global Marine & Industrial Supplier",
  description: "Discover the legacy of Delta Impex. Based in Bhavnagar, we are experts in sourcing marine engines, spare parts, and industrial equipment for shipowners and industrial plants worldwide.",
  keywords: ["Delta Impex history", "marine spare parts supplier", "industrial machine sourcing", "Bhavnagar ship spares", "about Delta Impex"],
  openGraph: {
    title: "About Us | Delta Impex - Global Marine & Industrial Supplier",
    description: "Discover the legacy of Delta Impex. Global experts in sourcing marine engines, spare parts, and industrial equipment.",
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
