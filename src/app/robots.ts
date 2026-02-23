/**
 * src/app/robots.ts  —  Next.js 15 Robots (RSC)
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates /robots.txt at build time.
 *
 * Policy:
 *  - Allow all major search bots to crawl all public pages.
 *  - Explicitly disallow the API routes (security boundary).
 *  - Point to sitemap for full URL discovery.
 */

import type { MetadataRoute } from 'next';
import { tenant } from '@/config';

export default function robots(): MetadataRoute.Robots {
  const base = tenant.seo.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/api/',        // Internal API routes (revalidation, etc.)
          '/_next/',      // Next.js internals (already blocked by default, explicit for safety)
        ],
      },
      // Let Googlebot + Bingbot crawl aggressively (Korean students use both)
      {
        userAgent: ['Googlebot', 'Bingbot'],
        allow: ['/'],
        disallow: ['/api/'],
        crawlDelay: 1,
      },
      // Naver search bot (dominant in Korea)
      {
        userAgent: 'Yeti',
        allow: ['/'],
        disallow: ['/api/'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host:    base,
  };
}
