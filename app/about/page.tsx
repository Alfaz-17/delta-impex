import { Metadata } from 'next'
import AboutContent from './about-content'
import { SITE_INFO } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us | Delta Impex',
  description: 'Delta Impex is a global leader in supplying high-quality marine engine spare parts and advanced RO water treatment solutions. Learn about our legacy of technical excellence.',
  alternates: {
    canonical: `${SITE_INFO.domain}/about`,
  },
  openGraph: {
    title: 'About Delta Impex | Marine & Industrial Solutions',
    description: 'Our legacy of supporting maritime professionals with reliable engineering solutions and genuine spare parts.',
    url: `${SITE_INFO.domain}/about`,
  }
}

export default function AboutPage() {
  return <AboutContent />
}
