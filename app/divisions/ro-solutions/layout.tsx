import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "RO Systems & Water Treatment Solutions | Delta Impex",
  description: "Advanced Reverse Osmosis (RO) plants and water treatment equipment for marine and industrial applications. Offering membranes, filtration systems, and maintenance.",
  keywords: ["RO water systems", "desalination plants", "reverse osmosis membranes", "water treatment equipment", "industrial filtration", "marine RO plants"],
  openGraph: {
    title: "RO Systems & Water Treatment Solutions | Delta Impex",
    description: "Advanced Reverse Osmosis (RO) plants and water treatment equipment for marine and industrial applications.",
    url: 'https://deltaimpex.co/divisions/ro-solutions',
  }
}

export default function ROSystemsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
