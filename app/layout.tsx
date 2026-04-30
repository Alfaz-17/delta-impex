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
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

import { Providers } from "@/components/providers"
import { SmoothScroll } from "@/components/smooth-scroll"
import { WhatsAppButton } from "@/components/common/whatsapp-button"
import { CustomCursor } from "@/components/common/custom-cursor"
import { LoadingScreen } from "@/components/common/loading-screen"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_INFO.name,
      "url": SITE_INFO.domain,
      "logo": `${SITE_INFO.domain}/icon-light-32x32.png`,
      "image": `${SITE_INFO.domain}/og-image.png`,
      "description": "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_INFO.fullAddress,
        "addressLocality": "Bhavnagar",
        "postalCode": "364001",
        "addressRegion": "Gujarat",
        "addressCountry": "IN"
      },
      "email": SITE_INFO.email,
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-99259-99945",
          "contactType": "sales",
          "areaServed": "Global",
          "availableLanguage": ["English", "Hindi", "Gujarati"]
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_INFO.name,
      "url": SITE_INFO.domain,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_INFO.domain}/products?query={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": SITE_INFO.name,
      "url": SITE_INFO.domain,
      "image": `${SITE_INFO.domain}/og-image.png`,
      "telephone": "+91-99259-99945",
      "email": SITE_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SITE_INFO.fullAddress,
        "addressLocality": "Bhavnagar",
        "addressRegion": "Gujarat",
        "postalCode": "364001",
        "addressCountry": "IN"
      },
      "sameAs": [SITE_INFO.mapsUrl],
      "areaServed": "Global"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "Home",
          "url": SITE_INFO.domain
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "About Us",
          "url": `${SITE_INFO.domain}/about`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Marine & Industrial",
          "url": `${SITE_INFO.domain}/products?divisionSlug=marine-industrial`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 4,
          "name": "RO Solutions",
          "url": `${SITE_INFO.domain}/products?divisionSlug=ro-solutions`
        },
        {
          "@type": "SiteNavigationElement",
          "position": 5,
          "name": "Contact",
          "url": `${SITE_INFO.domain}/contact`
        }
      ]
    }
  ];

  return (
    <html lang="en">
      <head />
      <body className={`${outfit.variable} ${syne.variable} ${spaceMono.variable} ${syncopate.variable} font-sans antialiased text-foreground cursor-none`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <Providers>
            {children}
            <WhatsAppButton />
          </Providers>
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}
