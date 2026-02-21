/**
 * src/app/calculator/page.tsx  —  Calculator Route
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendering strategy: FULLY CLIENT-SIDE (via 'use client' in ScoreCalculator)
 *
 * This page's RSC shell provides:
 *  1. Static metadata for SEO (score calculator page indexed properly)
 *  2. Page header (RSC, zero JS cost)
 *  3. ScoreCalculator component (client island — interactive, animated)
 *  4. OfficialDataBadge (RSC, renders data-sourced text server-side)
 *
 * The ScoreCalculator itself is wrapped with 'use client' and consumes:
 *   useScoreCalculator hook -> scoreEngine.ts (pure functions)
 *
 * Information Reliability contract:
 *  - All score logic originates from scoreEngine.ts which is annotated
 *    with the official 2026-1학기 criteria source
 *  - The page renders OfficialDataBadge (RSC) to signal data provenance
 *  - No speculative / fake cutline data is shown anywhere on this page
 */

import type { Metadata } from 'next';
import ScoreCalculator   from '@/components/ScoreCalculator';
import { OfficialDataBadge } from '@/components/OfficialDataBadge';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '기숙사 점수 계산기',
  description:
    '아주대학교 2026-1학기 기숙사 배정 점수를 미리 계산하세요. '
    + '일반학생 / 가계곤난 선발 기준을 지원합니다.',
  openGraph: {
    title: '기숙사 점수 계산기 | 아주대 기숙사 어디가',
    description: '2026-1학기 공식 선발 기준 기반 점수 시뮬레이터',
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen page-top bg-background">
      {/* RSC header — zero JS */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-[64px] z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-foreground tracking-tight">
              기숙사 점수 계산기
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              2026-1학기 공식 선발 기준 · 일반 / 가계곤난
            </p>
          </div>
          {/* Official data provenance badge — RSC rendered */}
          <OfficialDataBadge />
        </div>
      </header>

      {/* Client Island: interactive ScoreCalculator */}
      <ScoreCalculator />

      <Footer />
    </div>
  );
}
