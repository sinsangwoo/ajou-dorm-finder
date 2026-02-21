'use client';
/**
 * src/app/not-found.tsx  —  404 Page
 * Replaces src/pages/NotFound.tsx in App Router.
 * 'use client' because it uses useRouter for the back button.
 */

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen page-top flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Ajou-branded 404 number */}
        <div className="gradient-ajou rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-extrabold text-white">404</span>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
          시준에 맞는 공식 정보를 확인하세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dorms">
              <ArrowLeft className="w-4 h-4 mr-2" />
              기숙사 목록
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
