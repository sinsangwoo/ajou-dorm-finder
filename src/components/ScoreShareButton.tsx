/**
 * ScoreShareButton.tsx — Phase 1: 점수 계산 결과 공유
 *
 * 내 점수를 URL 파라미터 또는 클립보드로 공유하는 기능.
 * Web Share API가 지원되는 모바일에서는 네이티브 공유 시트를 띄움.
 */

import { useState } from "react";
import { Share2, Check, Copy, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScoreShareButtonProps {
  totalScore: number;
  gpa: number;
  isFinancial: boolean;
  levelLabel: string;
  className?: string;
}

export default function ScoreShareButton({
  totalScore,
  gpa,
  isFinancial,
  levelLabel,
  className,
}: ScoreShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `아주대 기숙사 배정 예상 점수: ${totalScore}점 (${levelLabel})
학점: ${gpa.toFixed(2)} | 유형: ${isFinancial ? "가계곤란" : "일반학생"}
자세히 계산해보기 → https://ajou-dorm-finder.vercel.app/calculator`;

  const handleShare = async () => {
    // 네이티브 Web Share API (모바일에서 지원)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "아주대 기숙사 점수 계산 결과",
          text: shareText,
          url: `${window.location.origin}/calculator?score=${totalScore}&gpa=${gpa.toFixed(2)}&mode=${isFinancial ? "financial" : "general"}`,
        });
        return;
      } catch {
        // 사용자가 취소한 경우 fallback
      }
    }

    // 클립보드 복사 fallback
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 접근 실패 시 무시
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/calculator?score=${totalScore}&gpa=${gpa.toFixed(2)}&mode=${isFinancial ? "financial" : "general"}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 무시
    }
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="flex-1 gap-2 text-xs"
      >
        {copied ? (
          <><Check className="w-3.5 h-3.5 text-green-500" /> 복사 완료!</>
        ) : (
          <><Share2 className="w-3.5 h-3.5" /> 결과 공유하기</>
        )}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyLink}
        className="gap-1.5 text-xs px-3"
        title="링크 복사"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Link2 className="w-3.5 h-3.5" />}
        <Copy className="w-3 h-3" />
      </Button>
    </div>
  );
}
