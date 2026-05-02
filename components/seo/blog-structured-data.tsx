import React from 'react';
import { SITE_INFO } from "@/lib/site";

type BlogStructuredDataProps = {
  blog: {
    title: string;
    excerpt: string;
    image: string;
    date: string;
    author?: string;
  };
  slug: string;
};

export default function BlogStructuredData({ blog, slug }: BlogStructuredDataProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": [blog.image],
    "datePublished": blog.date,
    "author": [{
        "@type": "Organization",
        "name": SITE_INFO.name,
        "url": SITE_INFO.domain
      }],
    "publisher": {
      "@type": "Organization",
      "name": SITE_INFO.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_INFO.domain}/logo.png`
      }
    },
    "description": blog.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_INFO.domain}/blog/${slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}
