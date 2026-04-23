import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | Delta Impex - Marine & Industrial Technical Support",
  description: "Get in touch with Delta Impex for expert marine and industrial technical support. We provide quotes for marine engine spares and RO water systems within 24 hours. Offices in India and UAE.",
  keywords: ["contact Delta Impex", "marine spares quote", "RO system inquiry", "Bhavnagar marine company", "UAE marine supplier"],
  openGraph: {
    title: "Contact Us | Delta Impex - Marine & Industrial Support",
    description: "Expert marine and industrial technical support. Get quotes for engine spares and RO water systems within 24 hours.",
    url: 'https://deltaimpex.co/contact',
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
