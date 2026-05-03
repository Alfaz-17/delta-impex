import React from 'react';
import { SITE_INFO } from "@/lib/site";

export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_INFO.name,
    "url": SITE_INFO.domain,
    "logo": `${SITE_INFO.domain}/logo-optimized.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SITE_INFO.phoneIndia,
      "contactType": "sales",
      "areaServed": "Worldwide",
      "availableLanguage": ["en", "Hindi", "Gujarati"]
    },
    "sameAs": [
      "https://www.facebook.com/deltaimpex",
      "https://www.linkedin.com/company/delta-impex/"
    ]
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": SITE_INFO.name,
    "description": "Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.",
    "telephone": SITE_INFO.phoneIndia,
    "email": SITE_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office-07, Madina Tenement, Jamnakund Chowk",
      "addressLocality": "Bhavnagar",
      "addressRegion": "Gujarat",
      "postalCode": "364001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.7588,
      "longitude": 72.1528
    },
    "url": SITE_INFO.domain,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_INFO.name,
    "url": SITE_INFO.domain,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_INFO.domain}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_INFO.domain
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${SITE_INFO.domain}/products`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "About",
        "item": `${SITE_INFO.domain}/about`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": `${SITE_INFO.domain}/contact`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationData, localBusinessData, websiteData, breadcrumbData]) }}
    />
  );
}
