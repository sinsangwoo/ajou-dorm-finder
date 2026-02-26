'use client';
/**
 * src/app/error.tsx — Root Error Boundary (Client Component)
 * ─────────────────────────────────────────────────────────────────────────────
 * Next.js 15 catches any uncaught Error thrown in the route segment and
 * renders this component instead of crashing the entire page.
 *
 * WHEN THIS FIRES
 *   - Supabase query throws (network timeout, 5xx)
 *   - RSC async component rejects
 *   - Any unhandled JS Error within the layout/page subtree
 *
 * WHAT WE SHOW
 *   - Friendly Korean message explaining the situation
 *   - Error digest (for Vercel log correlation — not the raw message)
 *   - Two CTAs: retry current route, or go home
 *
 * WHAT WE DON'T SHOW
 *   - Raw error.message (could leak internal details)
 *   - Stack traces in production
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  // Report to console in dev; in prod this goes to Vercel Log Drains
  useEffect(() => {
    console.error('[RootError boundary]', error);
  }, [error]);

  const handleRetry = () => {
    // reset() re-renders the route segment from scratch
    // router.refresh() invalidates the RSC cache for fresh data
    reset();
    router.refresh();
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>

      {/* Headline */}
      <h1 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight">
        잠깐, 문제가 생겼어요
      </h1>

      {/* Explanation */}
      <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-2">
        페이지를 불러오는 중 오류가 발생했습니다.{' '}
        일시적인 네트워크 문제일 수 있으니 잠시 후 다시 시도해 주세요.
      </p>

      {/* Trust signal: we know about it */}
      <p className="text-xs text-muted-foreground/50 mb-8">
        기숙사 점수·자격 데이터는 안전하게 보관되어 있습니다.
        {error.digest && (
          <span className="ml-1 font-mono opacity-40">({error.digest})</span>
        )}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button onClick={handleRetry} className="gap-2 rounded-full px-6">
          <RefreshCw className="w-4 h-4" />
          다시 시도하기
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/')}
          className="gap-2 rounded-full px-6"
        >
          <Home className="w-4 h-4" />
          홈으로
        </Button>
      </div>
    </div>
  );
}
