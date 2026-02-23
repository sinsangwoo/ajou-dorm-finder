/**
 * src/app/layout.tsx  —  Root Layout (Server Component)
 * ─────────────────────────────────────────────────────────────────────────────
 * This file is intentionally a React Server Component (no 'use client').
 * It defines the <html> / <body> shell, global metadata, and injects
 * the Client providers (Providers.tsx) via a single 'use client' boundary.
 *
 * Performance contract:
 *  - No JS hydration cost for this shell → browser renders <html> immediately
 *  - ThemeProvider runs client-side only (next-themes requires DOM)
 *  - Navbar is shared server layout; each route segment replaces children
 *
 * NEXT.JS 15 API NOTES (Breaking Change Audit — Phase 5 fix)
 * ─────────────────────────────────────────────────────────────────────────────
 * - `viewport` must be exported separately from `metadata` (Next.js 14.1+).
 *   Merging them into a single object causes a TypeScript error:
 *   Type 'Viewport' is not assignable to type 'Metadata'.
 *   → COMPLIANT: viewport exported as `export const viewport: Viewport`
 *
 * - `metadataBase` should be an absolute URL.
 *   → COMPLIANT: `new URL(process.env.NEXT_PUBLIC_SITE_URL ?? fallback)`
 *
 * - `themeColor` has moved to `Viewport` (Next.js 14+).
 *   → COMPLIANT: themeColor lives in `viewport` export
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Providers }  from '@/components/Providers';
import { Navbar }     from '@/components/Navbar';
import '../index.css';

// ── Font ───────────────────────────────────────────────────────────────────────────────
// Next.js downloads & self-hosts Inter from Google Fonts at build time;
// no external network request at runtime → Core Web Vitals safe.
const inter = Inter({
  subsets:  ['latin'],
  variable: '--font-inter',
  display:  'swap',
});

// ── Static Metadata ───────────────────────────────────────────────────────────────────
// Exported as `metadata` → Next.js injects <head> tags server-side (SEO).
// Individual routes can extend this with their own `generateMetadata`.
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ajou-dorm-finder.vercel.app'
  ),
  title: {
    default:  '아주대 기숙사 어디가 | Ajou Dorm Finder',
    template: '%s | 아주대 기숙사 어디가',
  },
  description:
    '아주대학교 기숙사 6동의 정보를 한눈에 비교하고, '
    + '기숙사 배정 점수를 미리 계산해 보세요. '
    + '2026-1학기 공식 데이터 기반.',
  keywords: [
    '아주대학교', '기숙사', '일신관', '용지관', '남제관', '광교관', '화홍관', '국제학사',
    '기숙사 점수 계산', '기숙사 배정', 'ajou', 'dorm',
  ],
  authors:   [{ name: 'AjouDormFinder Contributors' }],
  openGraph: {
    title:       '아주대 기숙사 어디가',
    description: '아주대학교 기숙사 6동 하이라이트 비교 + 배정점수 계산기',
    type:        'website',
    locale:      'ko_KR',
    url:         '/',
  },
  twitter: {
    card:        'summary_large_image',
    title:       '아주대 기숙사 어디가',
    description: '아주대 기숙사 정보 플랫폼 | 2026-1학기',
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },
};

// ── Viewport (separated from Metadata — Next.js 14.1+ requirement) ────────────────
// Mixing themeColor / viewport into `metadata` causes a TypeScript error
// in Next.js 14+ because `Viewport` is a distinct type.
export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#002855' },
    { media: '(prefers-color-scheme: dark)',  color: '#0057B7' },
  ],
};

// ── Layout ───────────────────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          {/* Navbar is shared across all routes */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
