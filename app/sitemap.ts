import type { MetadataRoute } from 'next'
import { getAllSorted } from '@/lib/cms'

const BASE = 'https://dean-yoo.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.8 },
    ...getAllSorted().map(p => ({
      url: `${BASE}/work/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]
}
