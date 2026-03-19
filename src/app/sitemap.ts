/**
 * src/app/sitemap.ts — Next.js Sitemap
 *
 * tenant import 제거: scoreEngine 등 부가 의존성이 런타임에 에러를 낼 수 있으므로
 * NEXT_PUBLIC_SITE_URL 환경변수를 직접 사용.
 */

import type { MetadataRoute } from 'next';
import { dormitories } from '@/data/dormitoryData';

export const revalidate = 3600;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajou-dorm-finder.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             BASE_URL,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        1.0,
      alternates: { languages: { ko: BASE_URL } },
    },
    {
      url:             `${BASE_URL}/dorms`,
      lastModified:    now,
      changeFrequency: 'weekly',
      priority:        0.9,
    },
    {
      url:             `${BASE_URL}/calculator`,
      lastModified:    now,
      changeFrequency: 'monthly',
      priority:        0.7,
    },
  ];

  const dormRoutes: MetadataRoute.Sitemap = dormitories.map((dorm) => ({
    url:             `${BASE_URL}/dorms/${dorm.id}`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }));

  return [...staticRoutes, ...dormRoutes];
}
