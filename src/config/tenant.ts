/**
 * src/config/tenant.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Multi-tenant architecture foundation.
 *
 * DESIGN INTENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Today the app serves only Ajou University. But the domain problem —
 * "help students find and apply for on-campus dormitories" — is identical
 * across every Korean university. This config layer lets us:
 *
 *   1. Extract every Ajou-specific constant from components/pages into one
 *      typed object (TenantConfig).
 *   2. Swap the entire personality of the app at boot time by changing a
 *      single env-var: NEXT_PUBLIC_TENANT_ID=snu
 *   3. Keep the shared platform code 100% university-agnostic.
 *
 * EXTENSION GUIDE (adding a new university)
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Create  src/config/tenants/<slug>.ts  implementing TenantConfig
 *   2. Register it in  src/config/index.ts  TENANT_REGISTRY
 *   3. Set    NEXT_PUBLIC_TENANT_ID=<slug>   in Vercel project env vars
 *   4. That's it — no component code changes required.
 *
 * SCORE ENGINE INJECTION
 * ─────────────────────────────────────────────────────────────────────────────
 * Each tenant supplies its own score calculation functions via the
 * `scoring` field. This allows different universities to have different
 * point systems without forking the platform code.
 */

import type { ScoreMode, CalcScoreInput, ScoreBreakdown, ScoreLevelInfo } from '@/lib/calc/scoreEngine';

// ── Brand ──────────────────────────────────────────────────────────────────────

export interface TenantBrand {
  /** Primary / darkest brand colour (hex). Used for navbar, CTAs. */
  colorPrimary: string;
  /** Accent / highlight colour (hex). Used for gold shimmer, badges. */
  colorAccent: string;
  /** Light variant of primary for backgrounds (hex or hsl). */
  colorPrimaryLight: string;
  /** Tailwind CSS class strings for gradient header strips on dorm cards. */
  gradientClass: string;
}

// ── Navigation ────────────────────────────────────────────────────────────────

export interface TenantNavLink {
  href: string;
  label: string;
}

// ── Scoring engine interface ──────────────────────────────────────────────────
// Each tenant injects its own implementation so the platform remains agnostic.

export interface TenantScoring {
  /**
   * Calculates the full score breakdown for a student.
   * Must match the signature of scoreEngine.calcTotalScore.
   */
  calcTotalScore(input: CalcScoreInput): ScoreBreakdown;

  /**
   * Maps a total score to a human-readable level + colour classes.
   * Must match the signature of scoreEngine.getScoreLevelInfo.
   */
  getScoreLevelInfo(totalScore: number): ScoreLevelInfo;

  /**
   * Human-readable description of the scoring formula.
   * Displayed in the calculator disclaimer.
   */
  formulaDescription: string;

  /**
   * Maximum possible total score (used for ring/spectrum bar scale).
   */
  maxScore: number;
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export interface TenantSeo {
  /** Default `<title>` (template: '{page} | {titleSuffix}'). */
  titleSuffix: string;
  /** Root meta description. */
  description: string;
  /** Keywords array for meta keywords tag. */
  keywords: string[];
  /** OG site name. */
  ogSiteName: string;
  /** Canonical base URL (must match NEXT_PUBLIC_SITE_URL). */
  siteUrl: string;
}

// ── External links ────────────────────────────────────────────────────────────

export interface TenantLinks {
  /** Main dormitory portal homepage. */
  dormHomepage: string;
  /** Notice board URL. */
  noticeBoard: string;
  /** Application system URL (may equal dormHomepage). */
  applicationUrl: string;
}

// ── Semester ──────────────────────────────────────────────────────────────────

export interface TenantSemester {
  /** Display label, e.g. "2026-1학기". */
  current: string;
  /**
   * Data source citation shown in disclaimers.
   * e.g. "아주대학교 기숙사 입주 선발 공식 기준(2025/26)"
   */
  officialCriteriaLabel: string;
}

// ── Root config ───────────────────────────────────────────────────────────────

export interface TenantConfig {
  /** Unique identifier. Must be URL-safe. e.g. 'ajou', 'snu', 'kaist'. */
  id: string;

  /** Full Korean name. e.g. '아주대학교'. */
  universityName: string;

  /** Short service name shown in Navbar. e.g. '아주대 긱사 어디가'. */
  serviceName: string;

  /** English abbreviation. e.g. 'Ajou'. */
  universityNameEn: string;

  brand: TenantBrand;
  scoring: TenantScoring;
  seo: TenantSeo;
  links: TenantLinks;
  semester: TenantSemester;

  /** Primary navigation links (ordered). */
  navLinks: TenantNavLink[];

  /**
   * Whether this tenant's dormitory data is managed via Supabase.
   * If false, the app falls back to static data files only.
   */
  useSupabase: boolean;
}
