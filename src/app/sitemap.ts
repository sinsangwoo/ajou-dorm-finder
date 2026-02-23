/**
 * src/app/sitemap.ts  —  Next.js 15 Sitemap (RSC)
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates /sitemap.xml at build time.
 *
 * URL priority strategy:
 *   1.0  → home (critical landing page)
 *   0.9  → dorms listing (main discovery surface)
 *   0.8  → each dorm detail (indexable, unique content per page)
 *   0.7  → calculator (utility page, high engagement)
 *
 * The sitemap is regenerated:
 *   - At every production build
 *   - Via ISR when dormitory data changes (Supabase trigger)
 *
 * Korean university students primarily find services through:
 *   - Google Korea  (requires XML sitemap)
 *   - Naver (requires sitemap submission at searchadvisor.naver.com)
 *   - 에브리타임 organic links (sitemap helps Google index those pages)
 */

import type { MetadataRoute } from 'next';
import { dormitories }        from '@/data/dormitoryData';
import { tenant }             from '@/config';

export const revalidate = 3600; // regenerate every hour

export default function sitemap(): MetadataRoute.Sitemap {
  const base = tenant.seo.siteUrl;
  const now  = new Date();

  // ── Static routes ─────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:              base,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         1.0,
      alternates: {
        languages: { ko: base },
      },
    },
    {
      url:              `${base}/dorms`,
      lastModified:     now,
      changeFrequency:  'weekly',
      priority:         0.9,
    },
    {
      url:              `${base}/calculator`,
      lastModified:     now,
      changeFrequency:  'monthly',
      priority:         0.7,
    },
  ];

  // ── Dynamic dorm detail routes ──────────────────────────────────────────
  const dormRoutes: MetadataRoute.Sitemap = dormitories.map((dorm) => ({
    url:             `${base}/dorms/${dorm.id}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }));

  return [...staticRoutes, ...dormRoutes];
}
