import { Metadata } from 'next'
import HomeContent from './home-content'
import { SITE_INFO } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Delta Impex | Marine Engine Spares & RO Water Treatment Plants',
  description: 'Delta Impex is a global leader in supplying high-quality marine engine spare parts, industrial machinery, and advanced RO water treatment solutions.',
  alternates: {
    canonical: SITE_INFO.domain,
  },
  openGraph: {
    title: 'Delta Impex | Marine Spares & RO Water Systems',
    description: 'Global provider of high-quality marine engine spare parts and advanced RO water treatment solutions.',
    url: SITE_INFO.domain,
  }
}

export default function Home() {
  return <HomeContent />
}
