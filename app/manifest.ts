import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site.config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.author,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/imgs/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/imgs/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
