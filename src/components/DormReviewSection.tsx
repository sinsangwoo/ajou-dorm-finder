'use client';
/**
 * DormReviewSection.tsx — Phase 2
 *
 * 기숙사별 익명 후기 시스템.
 * - 항목별 별점 (\uc18c\uc74c, \uccad\uacb0, Wi-Fi, \ud3b8\uc758\uc2dc\uc124, \ubcf4\uc548, \uc885\ud569)
 * - 바 차트로 평균 시각화
 * - 후기 작성 폼
 */

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, PenLine, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { DormReview } from '@/app/api/reviews/route';

const RATING_LABELS: Record<string, string> = {
  noise:       '\uc18c\uc74c',
  cleanliness: '\uccad\uacb0',
  wifi:        'Wi-Fi',
  facilities:  '\ud3b8\uc758\uc2dc\uc124',
  security:    '\ubcf4\uc548',
  overall:     '\uc885\ud569',
};

function StarRating({ value, onChange, readOnly }: { value: number; onChange?: (v: number) => void; readOnly?: boolean }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={cn('transition-colors', readOnly ? 'cursor-default' : 'cursor-pointer')}
        >
          <Star
            className={cn(
              'w-4 h-4',
              (hover || value) >= star
                ? 'fill-amber-400 text-amber-400'
                : 'fill-muted text-muted-foreground/30'
            )}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-14 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/70 rounded-full transition-all duration-500"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-foreground w-6 text-right">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function ReviewWriteForm({ dormId, onSubmit }: { dormId: string; onSubmit: (review: Partial<DormReview>) => void }) {
  const [ratings, setRatings] = useState({ noise: 3, cleanliness: 3, wifi: 3, facilities: 3, security: 3, overall: 3 });
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim() || comment.length < 10) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dormId, ratings, comment }),
      });
      if (res.ok) {
        const { review } = await res.json();
        onSubmit(review);
        setDone(true);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return (
    <div className="text-center py-6 text-sm text-muted-foreground">
      \ud6c4\uae30\uac00 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \uac10\uc0ac\ud569\ub2c8\ub2e4! ✨
    </div>
  );

  return (
    <div className="glass-card-strong rounded-2xl p-5 space-y-4">
      <h4 className="font-semibold text-sm">\ud6c4\uae30 \uc791\uc131</h4>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(ratings).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{RATING_LABELS[key]}</span>
            <StarRating value={val} onChange={v => setRatings(p => ({ ...p, [key]: v }))} />
          </div>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="\uae30\uc219\uc0ac \uc0dd\ud65c \uacbd\ud5d8\uc744 \uc775\uba85\uc73c\ub85c \uacf5\uc720\ud574\uc8fc\uc138\uc694 (10\uc790 \uc774\uc0c1)"
        className="w-full rounded-xl border border-border bg-background/50 px-3 py-2.5 text-sm resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/30"
        maxLength={500}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/50">{comment.length}/500</span>
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={submitting || comment.length < 10}
          className="gap-1.5 text-xs"
        >
          <PenLine className="w-3.5 h-3.5" />
          {submitting ? '\ub4f1\ub85d \uc911...' : '\ud6c4\uae30 \ub4f1\ub85d'}
        </Button>
      </div>
    </div>
  );
}

interface DormReviewSectionProps {
  dormId: string;
}

export default function DormReviewSection({ dormId }: DormReviewSectionProps) {
  const [reviews, setReviews] = useState<DormReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/reviews?dormId=${dormId}`)
      .then(r => r.json())
      .then(d => setReviews(d.reviews ?? []))
      .finally(() => setLoading(false));
  }, [dormId]);

  const avgRatings = reviews.length > 0
    ? Object.keys(RATING_LABELS).reduce((acc, key) => {
        acc[key] = reviews.reduce((s, r) => s + (r.ratings as Record<string, number>)[key], 0) / reviews.length;
        return acc;
      }, {} as Record<string, number>)
    : null;

  const handleNewReview = (review: Partial<DormReview>) => {
    setReviews(prev => [review as DormReview, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      {/* \ud5e4\ub354 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg tracking-tight">\uc7ac\ud559\uc0dd \ud6c4\uae30</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {reviews.length > 0 ? `${reviews.length}\ub9c8\uc758 \uc775\uba85 \ud6c4\uae30` : '\uccab \ud6c4\uae30\ub97c \uc791\uc131\ud574\ubcf4\uc138\uc694'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(v => !v)}
          className="gap-1.5 text-xs"
        >
          <PenLine className="w-3.5 h-3.5" />
          {showForm ? '\uc811\uae30' : '\ud6c4\uae30 \uc4f0\uae30'}
        </Button>
      </div>

      {/* \ud6c4\uae30 \uc791\uc131 \ud3fc */}
      {showForm && <ReviewWriteForm dormId={dormId} onSubmit={handleNewReview} />}

      {/* \ud3c9\uade0 \ud3c9\uc810 \ubc14 \ucc28\ud2b8 */}
      {avgRatings && (
        <div className="glass-card-strong rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-extrabold text-foreground tabular-nums">
              {avgRatings.overall.toFixed(1)}
            </span>
            <div>
              <StarRating value={Math.round(avgRatings.overall)} readOnly />
              <p className="text-xs text-muted-foreground mt-0.5">{reviews.length}\ub9c8\uc758 \ud6c4\uae30</p>
            </div>
          </div>
          <div className="space-y-2">
            {Object.entries(RATING_LABELS).filter(([k]) => k !== 'overall').map(([key, label]) => (
              <RatingBar key={key} label={label} value={avgRatings[key]} />
            ))}
          </div>
        </div>
      )}

      {/* \ud6c4\uae30 \ubaa9\ub85d */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="glass-card-strong rounded-2xl p-4 animate-pulse">
              <div className="h-3 bg-muted rounded w-1/3 mb-3" />
              <div className="h-4 bg-muted rounded w-full mb-2" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground/60 text-sm">
          \uc544\uc9c1 \ub4f1\ub85d\ub41c \ud6c4\uae30\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.<br />
          \uccab \ubc88\uc9f8 \ud6c4\uae30\ub97c \uc791\uc131\ud574\ubcf4\uc138\uc694!
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map(review => (
            <div key={review.id} className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                    {review.nickname[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.nickname}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.year}\ub144 {review.semester}\ud559\uae30 \b7 {review.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <StarRating value={review.ratings.overall} readOnly />
                  <span className="text-xs text-muted-foreground">{review.ratings.overall}.0</span>
                </div>
              </div>

              <p className={cn('text-sm text-muted-foreground leading-relaxed', !expanded?.includes(review.id) && 'line-clamp-3')}>
                {review.comment}
              </p>
              {review.comment.length > 100 && (
                <button
                  onClick={() => setExpanded(v => v === review.id ? null : review.id)}
                  className="text-xs text-primary mt-1 flex items-center gap-0.5"
                >
                  {expanded === review.id
                    ? <><ChevronUp className="w-3 h-3" /> \uc811\uae30</>
                    : <><ChevronDown className="w-3 h-3" /> \ub354\ubcf4\uae30</>}
                </button>
              )}

              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {review.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1 mt-3">
                <button className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-primary transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {review.helpful}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
