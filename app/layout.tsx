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
  title: "Delta Impex | Marine Parts & RO Water Treatment",
  description: "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions for industrial and nautical applications.",
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${syne.variable} ${spaceMono.variable} ${syncopate.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
