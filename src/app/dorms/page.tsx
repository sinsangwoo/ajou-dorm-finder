/**
 * src/app/dorms/page.tsx  —  Dorms Listing Route  (React Server Component)
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendering strategy: RSC with Supabase data fetch
 *
 * Data flow:
 *   1. Server fetches dormitories from Supabase (cached, ISR revalidate=3600)
 *   2. Falls back to static dormitoryData.ts if Supabase unavailable
 *      (graceful degradation — app works without a DB connection)
 *   3. DormsView receives dormitories as props (Client Component for filter UX)
 *
 * NEXT.JS 15 BREAKING CHANGE: searchParams is now async (Promise)
 * ─────────────────────────────────────────────────────────────────────────────
 * In Next.js 14, `searchParams` was a plain object.
 * In Next.js 15, `searchParams` is `Promise<Record<string, string>>`.
 * Accessing `.gender` without await causes a TypeScript error:
 *   Property 'gender' does not exist on type 'Promise<...>'
 *
 * RESOLUTION: `const params = await searchParams;` before accessing props.
 * → COMPLIANT: line below awaits before destructuring.
 */

import type { Metadata }      from 'next';
import { getDormitories }     from '@/lib/supabase/dormitories';
import DormsView              from '@/components/DormsView';
import { OfficialDataBadge } from '@/components/OfficialDataBadge';
import Footer                 from '@/components/Footer';

export const metadata: Metadata = {
  title: '기숙사 목록',
  description:
    '아주대학교 기숙사 6동(일신관, 용지관, 남제관, 광교관, 화홍관, 국제학사) 선발 자격 및 주요 정보.',
  openGraph: {
    title:       '기숙사 목록 | 아주대 긱사 어디가',
    description: '2026-1학기 아주대 기숙사 6동 신청 자격 필터 및 비교',
  },
};

interface PageProps {
  searchParams: Promise<{ gender?: string; type?: string }>;
}

export default async function DormsPage({ searchParams }: PageProps) {
  // ✅ NEXT.JS 15 COMPLIANT: await before accessing properties
  const params = await searchParams;

  // ── Server-side data fetch (Supabase, cached) ───────────────────────────
  // Falls back to static file if env vars not configured
  const dormitories = await getDormitories();

  return (
    <div className="min-h-screen page-top bg-background">
      {/* RSC sticky header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-[64px] z-30">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">
              기숙사 목록
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              아주대학교 기숙사 6동 · 2026-1학기 기준
            </p>
          </div>
          <OfficialDataBadge />
        </div>
      </header>

      {/*
        DormsView: Client Component for filter UX.
        Receives dormitories as serialised props from RSC.
        Initial filter state derived from URL search params.
      */}
      <DormsView
        dormitories={dormitories}
        initialGender={params.gender as 'male' | 'female' | undefined}
        initialType={params.type as string | undefined}
      />

      <Footer />
    </div>
  );
}
