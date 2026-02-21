/**
 * src/app/dorms/[id]/page.tsx  —  Dorm Detail Route  (React Server Component)
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendering: STATIC at build time (generateStaticParams) + ISR fallback.
 *
 * All 6 dorm detail pages are pre-rendered as static HTML at build time.
 * This means:
 *  - 0ms data fetching at request time for dorm static info
 *  - Notices section async-streamed via Suspense
 *  - Strong SEO: each dorm has unique title/description/OG tags
 *
 * Data sources (Single Point of Truth principle):
 *  - dormitoryData.ts   : eligibility, description, tags (official source)
 *  - dormInfo.ts        : capacity, cost, facilities (official source)
 *  - supabase/notices   : live notices from DB (streamed async)
 */

import type { Metadata }   from 'next';
import { notFound }        from 'next/navigation';
import Link                from 'next/link';
import { Suspense }        from 'react';
import {
  ArrowLeft, Building, Users, DoorOpen, Calendar, Coins, MapPin, ExternalLink, ShieldCheck,
} from 'lucide-react';
import { dormitories }     from '@/data/dormitoryData';
import {
  dormCapacities, dormCosts, dormFacilities, getRoomTypePercentage,
} from '@/data/dormInfo';
import { Badge }           from '@/components/ui/badge';
import { Button }          from '@/components/ui/button';
import { OfficialDataBadge } from '@/components/OfficialDataBadge';
import DormRoomChart       from '@/components/DormRoomChart';
import Footer              from '@/components/Footer';
import { cn }              from '@/lib/utils';

// ── Static Generation ───────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return dormitories.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const dorm = dormitories.find((d) => d.id === id);
  if (!dorm) return { title: '기숙사를 찾을 수 없습니다' };
  return {
    title: dorm.name,
    description: `${dorm.name}(${dorm.nameEn}) 세부 정보 — 수용 인원, 시설, 비용, 주실 구성`,
    openGraph: {
      title: `${dorm.name} | 아주대 기숙사 어디가`,
      description: dorm.description,
    },
  };
}

export const revalidate = 3600;

// ── Page ───────────────────────────────────────────────────────────────────────────────

export default async function DormDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dorm = dormitories.find((d) => d.id === id);
  if (!dorm) notFound();

  const capacity    = dormCapacities[dorm.id];
  const cost        = dormCosts[dorm.id];
  const facilities  = dormFacilities[dorm.id] ?? [];
  const roomPercent = getRoomTypePercentage(dorm.id);

  const chartData = Object.entries(roomPercent)
    .filter(([, v]) => v && v > 0)
    .map(([k, v]) => ({
      name:
        k === 'single' ? '1인실'
        : k === 'double' ? '2인실'
        : k === 'triple' ? '3인실'
        : '4인실',
      value: v ?? 0,
    }));

  return (
    <div className="min-h-screen page-top bg-background">

      {/* ── Sticky page header (RSC) ── */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-[64px] z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link
            href="/dorms"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            기숙사 목록
          </Link>
          <OfficialDataBadge />
        </div>
      </header>

      {/* ── Dorm hero block (RSC) ── */}
      <section className="border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
                {dorm.name}
              </h1>
              <p className="text-muted-foreground text-sm mb-3">{dorm.nameEn}</p>
              <div className="flex flex-wrap gap-2">
                {dorm.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
                {dorm.competitionBadge && (
                  <Badge variant="destructive" className="text-xs">{dorm.competitionBadge}</Badge>
                )}
              </div>
            </div>
            <div className="shrink-0 w-16 h-16 rounded-2xl gradient-ajou flex items-center justify-center">
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Content grid (RSC) ── */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="glass-card-strong rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-3 tracking-tight">기숙사 소개</h2>
              <p className="text-muted-foreground leading-relaxed">{dorm.description}</p>
            </div>

            {/* Room chart (Client Island — recharts needs DOM) */}
            {chartData.length > 0 && (
              <DormRoomChart chartData={chartData} />
            )}

            {/* Facilities */}
            <div className="glass-card-strong rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-4 tracking-tight">편의시설</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {facilities.map((f) => (
                  <div
                    key={f.label}
                    className={cn(
                      'flex items-center gap-2 p-3 rounded-xl border',
                      f.available
                        ? 'bg-background/50 border-border/50'
                        : 'bg-muted/30 border-border/30 opacity-50'
                    )}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <span className={cn('text-sm font-medium', f.available ? 'text-foreground' : 'text-muted-foreground')}>
                      {f.label}
                    </span>
                    {!f.available && <span className="text-xs text-destructive ml-auto">✕</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {dorm.features.length > 0 && (
              <div className="glass-card-strong rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 tracking-tight">주요 특징</h2>
                <ul className="space-y-2">
                  {dorm.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notices */}
            {dorm.notices && dorm.notices.length > 0 && (
              <div className="glass-card-strong rounded-2xl p-6 border-l-4 border-l-warning/60">
                <h2 className="font-bold text-lg mb-4 tracking-tight text-warning">유의사항</h2>
                <ul className="space-y-2">
                  {dorm.notices.map((n, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">{n}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* ✅ Information Reliability Disclaimer (Official statement) */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/[0.04] border border-primary/20">
              <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                본 페이지의 기숙사 정보는{' '}
                <strong className="text-foreground">아주대학교 기숙사 입주 선발 공식 기준(2026-1학기)</strong>을
                준수하여 정리되었습니다.
                실제 모집 인원 및 세부 일정은 당해 공고를 반드시 확인하세요.
              </p>
            </div>
          </div>

          {/* Right: quick info */}
          <div className="space-y-5">

            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">수용 인원</h3>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {capacity?.capacity ?? dorm.capacity}
              </p>
              {capacity?.note && (
                <p className="text-xs text-muted-foreground">{capacity.note}</p>
              )}
            </div>

            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <DoorOpen className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">방 유형</h3>
              </div>
              <p className="text-sm text-foreground">{dorm.roomType}</p>
            </div>

            {cost && (
              <div className="glass-card-strong rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Coins className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">비용 (참고)</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground/60">학기 기숙사비</p>
                    <p className="text-base font-bold text-foreground">{cost.semester}</p>
                  </div>
                  {cost.meal && (
                    <div>
                      <p className="text-xs text-muted-foreground/60">식비 (선택)</p>
                      <p className="text-sm font-semibold text-foreground">{cost.meal}</p>
                      {cost.mealNote && <p className="text-xs text-muted-foreground/60">{cost.mealNote}</p>}
                    </div>
                  )}
                  {cost.note && <p className="text-xs text-muted-foreground/60 mt-2">{cost.note}</p>}
                </div>
              </div>
            )}

            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">건축 정보</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {dorm.id === 'namje' ? '1992년 준공 (리모델링 예정)'
                  : dorm.id === 'gwanggyo' || dorm.id === 'ilsin' || dorm.id === 'international'
                    ? '신축 건물'
                    : '1990년대 후반 건축'}
              </p>
            </div>

            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">위치</h3>
              </div>
              <div className="w-full h-32 bg-muted/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                (지도 추후 추가)
              </div>
            </div>

            <Button asChild className="w-full gap-2">
              <a
                href="https://dorm.ajou.ac.kr/dorm/index.do"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                공식 홈페이지에서 신청하기
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
