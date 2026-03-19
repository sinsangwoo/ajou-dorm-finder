'use client';
/**
 * DormReviewSection.tsx — Phase 2
 * 기숙사 상세 페이지의 재학생 익명 후기 시스템
 * - 소음 / 청결 / Wi-Fi / 시설 / 커뮤니티 항목별 별점
 * - 평규 표시 + 후기 작성 폼
 */

import { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, PenLine, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DormReview } from '@/app/api/reviews/route';

const CATEGORIES = [
  { key: 'noise',       label: '소음',    emoji: '🔇' },
  { key: 'cleanliness', label: '청결',    emoji: '✨' },
  { key: 'wifi',        label: 'Wi-Fi',   emoji: '📶' },
  { key: 'facility',    label: '시설',    emoji: '🏗️' },
  { key: 'community',   label: '커뮤니티', emoji: '👥' },
] as const;

type CategoryKey = typeof CATEGORIES[number]['key'];

function StarRow({
  label, emoji, value, onChange,
}: { label: string; emoji: string; value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
        <span>{emoji}</span>{label}
      </span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((v) => (
          <button
            key={v}
            type={onChange ? 'button' : undefined}
            onClick={() => onChange?.(v)}
            className={cn(
              'w-5 h-5 transition-colors',
              onChange ? 'cursor-pointer hover:scale-110' : 'cursor-default',
            )}
            aria-label={onChange ? `${label} ${v}점` : undefined}
          >
            <Star
              className={cn(
                'w-full h-full',
                v <= value ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

interface ReviewStats {
  count: number;
  avgNoise: number;
  avgCleanliness: number;
  avgWifi: number;
  avgFacility: number;
  avgCommunity: number;
  avgOverall: number;
}

export default function DormReviewSection({ dormId }: { dormId: string }) {
  const [reviews, setReviews] = useState<DormReview[]>([]);
  const [stats, setStats]     = useState<ReviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 폼 상태
  const [form, setForm] = useState<Record<CategoryKey, number>>({
    noise: 3, cleanliness: 3, wifi: 3, facility: 3, community: 3,
  });
  const [overall, setOverall]   = useState(3);
  const [comment, setComment]   = useState('');
  const [semester, setSemester] = useState('2025-2');

  useEffect(() => {
    fetch(`/api/reviews?dormId=${dormId}`)
      .then((r) => r.json())
      .then((d) => { setReviews(d.reviews ?? []); setStats(d.stats ?? null); })
      .finally(() => setLoading(false));
  }, [dormId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim().length < 10) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dormId, ...form, overall, comment: comment.trim(), semester }),
      });
      if (res.ok) {
        const data = await res.json();
        setReviews((prev) => [data.review, ...prev]);
        setSubmitSuccess(true);
        setShowForm(false);
        setComment('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const visibleReviews = expanded ? reviews : reviews.slice(0, 3);

  return (
    <div className="glass-card-strong rounded-2xl p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-lg tracking-tight">재학생 후기</h2>
          {stats && (
            <span className="text-xs text-muted-foreground/60">({stats.count}개)</span>
          )}
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <PenLine className="w-3.5 h-3.5" />
          {showForm ? '취소' : '후기 작성'}
        </button>
      </div>

      {/* 평규 요약 */}
      {stats && stats.count > 0 && (
        <div className="bg-muted/30 rounded-xl p-4 mb-5 space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-xl tabular-nums">{stats.avgOverall.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">/ 5.0</span>
          </div>
          {CATEGORIES.map(({ key, label, emoji }) => (
            <StarRow
              key={key}
              label={label}
              emoji={emoji}
              value={Math.round(stats[`avg${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof ReviewStats] as number)}
            />
          ))}
        </div>
      )}

      {/* 후기 작성 폼 */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-5 p-4 rounded-xl border border-primary/20 bg-primary/[0.02] space-y-4">
          <p className="text-xs text-muted-foreground">익명으로 작성됩니다. 허위 정보는 삭제될 수 있습니다.</p>

          {/* ?스터 학기 */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">입주 학기</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {['2026-1', '2025-2', '2025-1', '2024-2', '2024-1'].map((s) => (
                <option key={s} value={s}>{s.replace('-', '년 ')}학기</option>
              ))}
            </select>
          </div>

          {/* 동적 별점 입력 */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground block">항목별 평가</label>
            {CATEGORIES.map(({ key, label, emoji }) => (
              <StarRow
                key={key}
                label={label}
                emoji={emoji}
                value={form[key]}
                onChange={(v) => setForm((prev) => ({ ...prev, [key]: v }))}
              />
            ))}
            <div className="pt-1 border-t border-border/40">
              <StarRow label="종합" emoji="⭐" value={overall} onChange={setOverall} />
            </div>
          </div>

          {/* 후기 본문 */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">후기 내용 <span className="text-destructive">*</span></label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="거주하면서 느낌 점을 자유롭게 작성해주세요 (10자 이상)"
              className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
            <p className="text-[10px] text-muted-foreground/60 text-right mt-0.5">{comment.length}/500</p>
          </div>

          <button
            type="submit"
            disabled={submitting || comment.trim().length < 10}
            className="w-full py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '제출 중...' : '후기 등록'}
          </button>
        </form>
      )}

      {submitSuccess && (
        <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/60 text-sm text-green-700 dark:text-green-400">
          후기가 등록되었습니다. 감사합니다! ✅
        </div>
      )}

      {/* 후기 목록 */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-muted/40 animate-pulse" />)}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          아직 후기가 없습니다. 첫 번째 후기를 작성해보세요!
        </p>
      ) : (
        <>
          <ul className="space-y-3">
            {visibleReviews.map((r) => (
              <li key={r.id} className="p-4 rounded-xl bg-muted/20 border border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map((v) => (
                        <Star key={v} className={cn('w-3.5 h-3.5', v <= r.overall ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted')} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{r.semester.replace('-', '년 ')}학기</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{r.helpful}</span>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{r.comment}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  {CATEGORIES.map(({ key, label, emoji }) => (
                    <span key={key} className="text-[10px] text-muted-foreground/60">
                      {emoji} {label} {r[key]}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          {reviews.length > 3 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {expanded ? <><ChevronUp className="w-3.5 h-3.5" /> 접기</> : <><ChevronDown className="w-3.5 h-3.5" /> 후기 더 보기 ({reviews.length - 3}개)</>}
            </button>
          )}
        </>
      )}
    </div>
  );
}
