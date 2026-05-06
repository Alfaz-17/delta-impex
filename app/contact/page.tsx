import { Metadata } from 'next'
import ContactContent from './contact-content'
import { SITE_INFO } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us | Delta Impex',
  description: 'Get in touch with Delta Impex for genuine marine spare parts and RO water treatment solutions. Our engineering experts are ready to assist you worldwide.',
  alternates: {
    canonical: `${SITE_INFO.domain}/contact`,
  },
  openGraph: {
    title: 'Contact Delta Impex | Global Engineering Support',
    description: 'Direct connectivity with our technical experts for marine and industrial machinery inquiries.',
    url: `${SITE_INFO.domain}/contact`,
  }
}

import { client } from '@/sanity/lib/client'

export const revalidate = 3600;

async function getContactPageData() {
  const query = `{
    "contact": *[_type == "contactPage"][0],
    "footer": *[_type == "footer"][0]
  }`
  return await client.fetch(query)
}

export default async function ContactPage() {
  const data = await getContactPageData()
  return <ContactContent initialData={data.contact} footerData={data.footer} />
}
