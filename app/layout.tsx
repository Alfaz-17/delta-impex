import React from "react"
import type { Metadata } from 'next'
import { Outfit, Syne, Space_Mono, Syncopate } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SITE_INFO } from "@/lib/site"

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: '--font-outfit',
  display: 'swap',
});

const syne = Syne({ 
  subsets: ["latin"], 
  variable: '--font-syne',
  display: 'swap',
});

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ["latin"], 
  variable: '--font-mono',
  display: 'swap',
});

const syncopate = Syncopate({ 
  weight: ['400', '700'],
  subsets: ["latin"], 
  variable: '--font-syncopate',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://deltaimpex.co'),
  title: {
    default: "Delta Impex | Marine Engine Spares & RO Water Treatment Plants",
    template: "%s | Delta Impex",
  },
  description: "Delta Impex is a global leader in supplying high-quality marine engine spare parts, industrial machinery, and advanced RO water treatment solutions. Serving maritime fleets and industrial plants worldwide.",
  keywords: [
    "marine spare parts", 
    "engine overhaul", 
    "RO water treatment", 
    "desalination plants", 
    "shipyard supplies", 
    "industrial machinery", 
    "Delta Impex", 
    "water purification systems",
    "marine engine parts supplier",
    "RO plant components",
    "ship machinery spares",
    "Bhavnagar marine export"
  ],
  authors: [{ name: "Delta Impex" }],
  creator: "Delta Impex",
  publisher: "Delta Impex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://deltaimpex.co",
  },
  openGraph: {
    title: "Delta Impex | Marine Spares & RO Water Treatment Systems",
    description: "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions. Reliability delivered globally.",
    url: 'https://deltaimpex.co',
    siteName: 'Delta Impex',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Delta Impex Marine and RO Systems',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delta Impex | Marine Parts & RO Systems',
    description: 'Specialized marine engine spare parts and advanced RO water treatment solutions for industrial and nautical applications.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest',
}

export const viewport = {
  themeColor: '#001a3d',
  width: 'device-width',
  initialScale: 1,
}

import { Providers } from "@/components/providers"
import { WhatsAppButton } from "@/components/common/whatsapp-button"
import StructuredData from "@/components/seo/structured-data"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${outfit.variable} ${syne.variable} ${spaceMono.variable} ${syncopate.variable} font-sans antialiased text-foreground`}>
        <StructuredData />
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
