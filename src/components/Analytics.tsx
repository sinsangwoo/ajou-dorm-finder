/**
 * src/components/Analytics.tsx  —  Vercel Analytics + Speed Insights (RSC)
 * ─────────────────────────────────────────────────────────────────────────────
 * Conditionally renders Analytics and SpeedInsights only when
 * NEXT_PUBLIC_VERCEL_ENV is set (i.e. on Vercel deployments).
 *
 * This avoids polluting analytics with local dev traffic and
 * means the package can be omitted entirely in non-Vercel deployments
 * without any code changes.
 *
 * INSTALLATION (one-time, after PR is merged)
 *   npm install @vercel/analytics @vercel/speed-insights
 *
 * DASHBOARD
 *   vercel.com/[team]/[project]/analytics
 *   vercel.com/[team]/[project]/speed-insights
 *
 * WHAT WE TRACK
 *   Analytics:     Page views, unique visitors, top pages, referrers
 *   SpeedInsights: Core Web Vitals (LCP, CLS, FID/INP) per route
 *                  Segmented by device type and country
 *
 * PRIVACY
 *   Vercel Analytics is cookieless and GDPR-compliant out of the box.
 *   No personal data or PII is stored.
 *   Student IP addresses are never logged.
 */

import { Analytics }     from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Drop this into the root layout once the packages are installed.
 * It renders nothing on non-Vercel environments.
 */
export function VercelAnalytics() {
  // Only activate on Vercel production/preview deployments
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) return null;

  return (
    <>
      {/*
        Analytics: tracks page views and referrers.
        mode="auto" uses the best collection strategy for the environment.
      */}
      <Analytics mode="auto" />

      {/*
        SpeedInsights: collects Core Web Vitals from real users.
        Specifically useful for tracking LCP improvements per release.
      */}
      <SpeedInsights />
    </>
  );
}
