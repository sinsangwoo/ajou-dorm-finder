/**
 * src/app/loading.tsx — Home Route Loading Skeleton (RSC)
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendered by Next.js while the home page RSC is streaming.
 * Matches the visual shape of the real content to eliminate CLS.
 */

export default function HomeLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[520px] bg-gradient-to-br from-[#002855]/20 via-[#002855]/10 to-transparent" />

      {/* Card grid skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-muted rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-muted h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}
