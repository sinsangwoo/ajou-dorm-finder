'use client';
/**
 * src/app/dorms/error.tsx — Dorms List Error Boundary (Client Component)
 * ─────────────────────────────────────────────────────────────────────────────
 * Supabase fetch 실패 등 기숙사 목록 페이지에서 발생하는 에러 전담 처리.
 * 정적 폴백 데이터가 있더라도 이 경계는 throw 시에만 렌더됨.
 * (getDormitories()는 내부적으로 폴백을 수행하므로 여기까지 오는 경우는 드뭄)
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DormsError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('[DormsError boundary]', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-md">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Building className="w-8 h-8 text-primary" />
      </div>

      <h2 className="text-xl font-extrabold text-foreground mb-2">
        기숙사 정보를 불러오지 못했어요
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-8">
        데이터 서버와 연결하는 도중 문제가 발생했습니다.{' '}
        기숙사 정보 자체는 안전하게 저장되어 있으니 잠시 후 다시 시도해 주세요.
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
          onClick={() => router.push('/')}
          className="gap-2 rounded-full"
        >
          <Home className="w-4 h-4" />
          홈으로
        </Button>
      </div>
    </div>
  );
}
