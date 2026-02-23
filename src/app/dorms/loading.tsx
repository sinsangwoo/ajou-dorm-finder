/**
 * src/app/dorms/loading.tsx — Dorms List Loading Skeleton (RSC)
 */

export default function DormsLoading() {
  return (
    <div className="min-h-screen page-top animate-pulse">
      {/* Section header skeleton */}
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="h-10 w-64 bg-muted rounded-lg mb-3" />
        <div className="h-4 w-80 bg-muted/60 rounded" />
      </div>

      {/* Card grid skeleton — mirrors 6-dorm layout */}
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-muted overflow-hidden">
              {/* Gradient strip */}
              <div className="h-2 bg-muted-foreground/20" />
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <div className="w-10 h-10 rounded-xl bg-muted-foreground/20" />
                  <div className="w-16 h-6 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="h-6 w-28 bg-muted-foreground/20 rounded" />
                <div className="h-4 w-20 bg-muted-foreground/10 rounded" />
                <div className="flex gap-2">
                  <div className="h-6 w-14 rounded-full bg-muted-foreground/10" />
                  <div className="h-6 w-14 rounded-full bg-muted-foreground/10" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-3 w-full bg-muted-foreground/10 rounded" />
                  <div className="h-3 w-5/6 bg-muted-foreground/10 rounded" />
                </div>
                {/* Room breakdown bar */}
                <div className="h-4 w-full rounded-full bg-muted-foreground/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
