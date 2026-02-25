/**
 * src/app/page.tsx  —  Home Route  (React Server Component)
 * ─────────────────────────────────────────────────────────────────────────────
 * [TS Fix] @ts-expect-error 제거:
 *   Next.js 16 canary에서 async React Server Component 타입이
 *   공식 지원되므로 @ts-expect-error 지시어가 더 이상 필요 없음.
 *   unused @ts-expect-error는 TS2578 에러를 발생시킴.
 *
 * Rendering strategy:
 *   - HeroSection, FreshmanGuide = STATIC (prerendered at build)
 *   - NoticeSection = Suspense 스트리밍
 *   - Footer = STATIC
 */

import { Suspense }       from 'react';
import HeroSection        from '@/components/HeroSection';
import FreshmanGuide      from '@/components/FreshmanGuide';
import NoticeSection      from '@/components/NoticeSection';
import Footer             from '@/components/Footer';
import { NoticeSkeleton } from '@/components/ui/skeletons';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── STATIC: rendered at build time, served from CDN edge ── */}
      <HeroSection />
      <FreshmanGuide />

      {/* ── DYNAMIC: streamed after static shell ── */}
      {/* [TS Fix] @ts-expect-error 제거 — Next.js 16에서 async RSC 타입 정상 지원 */}
      <Suspense fallback={<NoticeSkeleton />}>
        <NoticeSection />
      </Suspense>

      {/* ── STATIC footer ── */}
      <Footer />
    </main>
  );
}
