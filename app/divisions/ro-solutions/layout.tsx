import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "RO Systems & Water Treatment | Delta Impex Catalog",
  description: "Explore our Reverse Osmosis and Water Treatment division. Offering premium desalination components, industrial RO plants, and municipal water solutions.",
  openGraph: {
    title: "RO Systems & Water Treatment | Delta Impex",
    description: "Explore our Reverse Osmosis and Water Treatment division. Premium desalination components.",
    url: 'https://www.deltaimpex.co/divisions/ro-systems',
  }
}

export default function ROSystemsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
