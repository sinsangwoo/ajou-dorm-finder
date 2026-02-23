/**
 * src/config/tenants/ajou.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Ajou University tenant configuration.
 *
 * All Ajou-specific constants that were previously scattered across
 * components, pages, and data files are consolidated here.
 *
 * Score engine: injected from src/lib/calc/scoreEngine.ts.
 * This keeps the platform layer decoupled from Ajou's specific formula.
 */

import type { TenantConfig } from '@/config/tenant';
import {
  calcTotalScore,
  getScoreLevelInfo,
} from '@/lib/calc/scoreEngine';

export const ajouTenant: TenantConfig = {
  id: 'ajou',
  universityName: '아주대학교',
  serviceName: '아주대 긱사 어디가',
  universityNameEn: 'Ajou',

  // ── Brand ──────────────────────────────────────────────────────────────────
  // Source: Ajou University Brand Identity Guidelines
  //   Primary Navy  : Pantone 2955 C → #002855
  //   Primary Blue  : Pantone 2945 C → #0057B7
  //   Accent Gold   : Pantone 124 C  → #C5A028
  brand: {
    colorPrimary:      '#002855',   // Ajou Navy
    colorAccent:       '#C5A028',   // Ajou Gold
    colorPrimaryLight: '#EBF1FA',   // Navy 50 tint
    gradientClass:     'bg-gradient-to-br from-[#002855] via-[#0057B7] to-[#003d7a]',
  },

  // ── Scoring (dependency injection) ────────────────────────────────────────
  // scoreEngine functions are wrapped 1-for-1; additional university-level
  // validation or clamping can be added here without touching the engine.
  scoring: {
    calcTotalScore,
    getScoreLevelInfo,
    formulaDescription:
      '일반학생: 성적(60) + 지역·사생(30) + 봉사(5) + 법정교육(5) = 100점 만점\n'
      + '가계곤란: 가계곤란(60) + 성적(30) + 봉사(5) + 법정교육(5) = 100점 만점',
    maxScore: 100,
  },

  // ── SEO ────────────────────────────────────────────────────────────────────
  seo: {
    titleSuffix:  '아주대 긱사 어디가',
    description:
      '아주대학교 기숙사 6개 동의 정보를 한눈에 비교하고, '
      + '기숙사 배정 점수를 미리 계산해 보세요. '
      + '공식 선발 기준(2026-1학기) 기반.',
    keywords: [
      '아주대학교', '기숙사', '일신관', '용지관', '남제관',
      '광교관', '화홍관', '국제학사', '기숙사 점수', '기숙사 배정',
      '아주대', 'ajou', 'dorm', '입사 신청',
    ],
    ogSiteName:  '아주대 긱사 어디가',
    siteUrl:     process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajou-dorm-finder.vercel.app',
  },

  // ── External links ────────────────────────────────────────────────────────
  links: {
    dormHomepage:   'https://dorm.ajou.ac.kr/dorm/index.do',
    noticeBoard:    'https://dorm.ajou.ac.kr/dorm/community/notice.do',
    applicationUrl: 'https://dorm.ajou.ac.kr/dorm/index.do',
  },

  // ── Semester ──────────────────────────────────────────────────────────────
  semester: {
    current:              '2026-1학기',
    officialCriteriaLabel: '아주대학교 기숙사 입주 선발 공식 기준(2025/26)',
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  navLinks: [
    { href: '/',           label: '홈' },
    { href: '/dorms',      label: '기숙사' },
    { href: '/calculator', label: '점수 계산기' },
  ],

  useSupabase: true,
};
