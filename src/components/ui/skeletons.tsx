/**
 * skeletons.tsx  —  React Server Component skeletons
 * ─────────────────────────────────────────────────────────────────────────────
 * Skeleton placeholders shown via <Suspense> while async RSC data loads.
 * Pure HTML with Tailwind — no JS, no hydration, renders immediately.
 */

export function NoticeSkeleton() {
  return (
    <section className="section-padding gradient-ajou-subtle">
      <div className="container mx-auto px-4">
        {/* Section header skeleton */}
        <div className="text-center mb-10">
          <div className="h-4 w-24 bg-muted/60 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-8 w-48 bg-muted/60 rounded-xl mx-auto mb-2 animate-pulse" />
          <div className="h-4 w-64 bg-muted/40 rounded-full mx-auto animate-pulse" />
        </div>
        {/* Notice cards skeleton (3 cards) */}
        <div className="max-w-3xl mx-auto space-y-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-muted/40 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function DormCardSkeleton() {
  return (
    <div className="glass-card-strong rounded-2xl p-6 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="w-10 h-10 bg-muted/60 rounded-xl" />
        <div className="w-16 h-5 bg-muted/40 rounded-full" />
      </div>
      <div className="h-5 w-24 bg-muted/60 rounded mb-1" />
      <div className="h-3 w-20 bg-muted/40 rounded mb-4" />
      <div className="flex gap-1.5 mb-4">
        <div className="h-5 w-16 bg-muted/40 rounded-full" />
        <div className="h-5 w-20 bg-muted/40 rounded-full" />
      </div>
      <div className="space-y-1.5 mb-4">
        <div className="h-3 bg-muted/40 rounded w-full" />
        <div className="h-3 bg-muted/40 rounded w-4/5" />
      </div>
      <div className="h-4 bg-muted/30 rounded-full w-full" />
    </div>
  );
}
