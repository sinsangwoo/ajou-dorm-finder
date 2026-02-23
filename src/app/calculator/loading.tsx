/**
 * src/app/calculator/loading.tsx — Calculator Loading Skeleton (RSC)
 */

export default function CalculatorLoading() {
  return (
    <div className="min-h-screen page-top animate-pulse">
      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-muted rounded-lg mb-2" />
            <div className="h-4 w-64 bg-muted/60 rounded" />
          </div>
          <div className="h-7 w-36 rounded-full bg-muted" />
        </div>

        {/* Score ring placeholder */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 rounded-full bg-muted" />
        </div>

        {/* Input sliders skeleton */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-muted h-20 mb-4" />
        ))}

        {/* Result card placeholder */}
        <div className="rounded-2xl bg-muted h-48 mt-6" />
      </div>
    </div>
  );
}
