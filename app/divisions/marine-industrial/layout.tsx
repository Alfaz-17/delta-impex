import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Marine & Industrial Spare Parts | Delta Impex",
  description: "Browse our inventory of high-quality marine engine spare parts including crankshafts, liners, pistons, and turbochargers. Technical sourcing for global fleets.",
  keywords: ["marine engine parts", "ship spares", "industrial machinery", "engine overhaul components", "marine engineering supplies"],
  openGraph: {
    title: "Marine & Industrial Spare Parts | Delta Impex",
    description: "High-quality marine engine spare parts and industrial machinery. Technical sourcing for global fleets.",
    url: 'https://www.deltaimpex.co/divisions/marine-industrial',
  }
}

export default function MarinePartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
