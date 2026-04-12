import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact Us | Delta Impex",
  description: "Get in touch with Delta Impex for high-quality marine engine spare parts and industrial RO water treatment solutions. Operating from India and UAE.",
  openGraph: {
    title: "Contact Us | Delta Impex",
    description: "Get in touch with Delta Impex for high-quality marine engine spare parts and industrial RO water treatment solutions.",
    url: 'https://www.deltaimpex.co/contact',
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
