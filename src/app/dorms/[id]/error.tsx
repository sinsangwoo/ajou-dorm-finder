'use client';
/**
 * src/app/dorms/[id]/error.tsx — Dorm Detail Error Boundary (Client Component)
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DormDetailError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('[DormDetailError boundary]', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-md">
      <p className="text-4xl mb-6">🏠</p>
      <h2 className="text-xl font-extrabold text-foreground mb-2">
        기숙사 상세 정보를 불러오지 못했어요
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-8">
        잠시 후 다시 시도하거나, 목록 페이지로 돌아가 다른 기숙사를 확인해 보세요.
        {error.digest && (
          <span className="block text-xs opacity-30 mt-1 font-mono">{error.digest}</span>
        )}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          onClick={() => { reset(); router.refresh(); }}
          className="gap-2 rounded-full"
        >
          <RefreshCw className="w-4 h-4" />
          다시 시도
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push('/dorms')}
          className="gap-2 rounded-full"
        >
          <ArrowLeft className="w-4 h-4" />
          기숙사 목록
        </Button>
      </div>
    </div>
  );
}
