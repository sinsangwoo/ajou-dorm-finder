/**
 * src/app/robots.ts  —  Next.js Robots (RSC)
 *
 * 테스트 요구사항:
 *  - Allow: /
 *  - Disallow: /api/
 *  - Sitemap: 포함
 */

import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajou-dorm-finder.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:    ['/'],
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Twitterbot', 'facebookexternalhit'],
        allow:    ['/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Yeti',
        allow:    ['/'],
        disallow: ['/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host:    BASE_URL,
  };
}
