/**
 * OfficialDataBadge.tsx  —  React Server Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders a trust signal badge indicating data provenance.
 * Intentionally a SERVER component: renders as pure HTML, zero JS bundle cost.
 *
 * Information Reliability Principle:
 *  - Placed prominently on every data-bearing page (calculator, dorms, detail)
 *  - References the official 2025/26 selection criteria document
 *  - Reminds users the platform uses official data, not speculation
 */

import { ShieldCheck } from 'lucide-react';

export function OfficialDataBadge() {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                 bg-primary/[0.06] border border-primary/20 shrink-0"
      title="2026-1학기 아주대학교 기숙사 입주 선발 공식 기준 기반"
    >
      <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
      <span className="text-[11px] font-semibold text-primary leading-none">
        공식 기준 기반 &middot; 2026-1
      </span>
    </div>
  );
}
