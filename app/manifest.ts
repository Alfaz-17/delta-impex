import { MetadataRoute } from 'next'
import { SITE_INFO } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_INFO.name,
    short_name: SITE_INFO.name,
    description: 'Marine Engine Spares & RO Water Treatment Plants',
    start_url: '/',
    display: 'standalone',
    background_color: '#001a3d',
    theme_color: '#001a3d',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
