import React from "react"
import type { Metadata } from 'next'
import { Outfit, Syne, Space_Mono, Syncopate } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
  metadataBase: new URL('https://www.deltaimpex.co'),
  title: {
    default: "Delta Impex | Marine Parts & RO Water Treatment",
    template: "%s | Delta Impex",
  },
  description: "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions for industrial and nautical applications.",
  keywords: ["marine spare parts", "engine overhaul", "RO water treatment", "desalination", "shipyard supplies", "industrial machinery", "Delta Impex", "water purification"],
  authors: [{ name: "Delta Impex" }],
  creator: "Delta Impex",
  publisher: "Delta Impex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Delta Impex | Marine Parts & RO Water Treatment",
    description: "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.",
    url: 'https://www.deltaimpex.co',
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
    description: 'Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.',
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
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

import { Providers } from "@/components/providers"
import { SmoothScroll } from "@/components/smooth-scroll"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Delta Impex",
    "url": "https://www.deltaimpex.co",
    "logo": "https://www.deltaimpex.co/icon-light-32x32.png",
    "description": "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "areaServed": "Global",
      "availableLanguage": "English"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/hero-poster.png" />
      </head>
      <body className={`${outfit.variable} ${syne.variable} ${spaceMono.variable} ${syncopate.variable} font-sans antialiased text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Providers>
            {children}
          </Providers>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
