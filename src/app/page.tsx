/**
 * src/app/page.tsx  —  Home Route  (React Server Component)
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendering strategy:
 *   - Page shell (HeroSection, FreshmanGuide) = STATIC (prerendered at build)
 *   - NoticeSection = wrapped in <Suspense> for async Supabase data
 *   - Footer = STATIC
 *
 * This gives us:
 *   - Time to First Byte (TTFB) ≈ CDN edge latency (sub-100ms)
 *   - Largest Contentful Paint (LCP) < 1s (hero painted before JS loads)
 *   - Notices stream in without blocking hero paint
 */

import { Suspense }       from 'react';
import HeroSection        from '@/components/HeroSection';
import FreshmanGuide      from '@/components/FreshmanGuide';
import NoticeSection      from '@/components/NoticeSection';
import Footer             from '@/components/Footer';
import { NoticeSkeleton } from '@/components/ui/skeletons';

// Enable Partial Pre-Rendering for this route (Next.js 15 PPR)
export const experimental_ppr = true;

// Revalidate static content every 1 hour (ISR)
export const revalidate = 3600;

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── STATIC: rendered at build time, served from CDN edge ── */}
      <HeroSection />
      <FreshmanGuide />

      {/* ── DYNAMIC: streamed from server after static shell is sent ── */}
      {/* Suspense boundary shows skeleton until async notices load */}
      <Suspense fallback={<NoticeSkeleton />}>
        {/* @ts-expect-error Server Component with async is valid in Next.js 15 */}
        <NoticeSection />
      </Suspense>

      {/* ── STATIC footer ── */}
      <Footer />
    </main>
  );
}
