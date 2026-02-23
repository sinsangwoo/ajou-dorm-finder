/**
 * src/app/dorms/[id]/loading.tsx — Dorm Detail Loading Skeleton (RSC)
 */

export default function DormDetailLoading() {
  return (
    <div className="min-h-screen page-top animate-pulse">
      {/* Sticky header */}
      <div className="border-b border-border/40 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-6 w-36 bg-muted rounded-full" />
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-border/40 py-8">
        <div className="container mx-auto px-4">
          <div className="h-10 w-56 bg-muted rounded-lg mb-2" />
          <div className="h-4 w-32 bg-muted/60 rounded mb-4" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl bg-muted h-36" />
            <div className="rounded-2xl bg-muted h-64" />
            <div className="rounded-2xl bg-muted h-48" />
          </div>
          {/* Right column */}
          <div className="space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-muted h-28" />
            ))}
            <div className="rounded-2xl bg-muted h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
