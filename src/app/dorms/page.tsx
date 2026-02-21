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
 * Why RSC for the listing page?
 *   - Dorm data is stable (updates ~once per semester)
 *   - Static HTML is generated at build, served from CDN
 *   - DormsView (client) handles filter interactions without full page reload
 *
 * Search param handling:
 *   ?gender=male&type=freshman → forwarded to DormsView for initial filter state
 */

import type { Metadata }   from 'next';
import { getDormitories }  from '@/lib/supabase/dormitories';
import DormsView           from '@/components/DormsView';
import { OfficialDataBadge } from '@/components/OfficialDataBadge';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '기숙사 목록',
  description:
    '아주대학교 기숙사 6굳(일신관, 용지관, 남제관, 광교관, 화홍관, 국제학사) 선발 자격 및 주요 정보.',
  openGraph: {
    title: '기숙사 목록 | 아주대 기숙사 어디가',
    description: '2026-1학기 아주대 기숙사 6굳 신청 자격 필터 및 비교',
  },
};

// ISR: rebuild every hour, or on-demand via revalidatePath()
export const revalidate = 3600;

interface PageProps {
  searchParams: Promise<{ gender?: string; type?: string }>;
}

export default async function DormsPage({ searchParams }: PageProps) {
  // In Next.js 15 searchParams is async (Promise)
  const params = await searchParams;

  // ── Server-side data fetch (Supabase, cached) ──
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
              아주대학교 기숙사 6굳 · 2026-1학기 기준
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
