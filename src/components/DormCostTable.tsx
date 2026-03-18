/**
 * DormCostTable.tsx — Phase 1: 기숙사 비용 상세 테이블
 *
 * 기숙사비, 식비, 보증금 등 비용 정보를 항목별로 명확하게 표시.
 * 방 유형별 비용 차이도 함께 보여줌.
 */

import { Coins, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CostRow {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}

interface DormCostTableData {
  rows: CostRow[];
  disclaimer: string;
}

// 기숙사별 비용 상세 데이터 (2026-1학기 참고용)
const COST_DETAIL: Record<string, DormCostTableData> = {
  namje: {
    rows: [
      { label: "기숙사비 (4인실)", value: "약 680,000원", highlight: true },
      { label: "기숙사비 (2인실)", value: "약 780,000원" },
      { label: "식비 (조·석식, 선택)", value: "약 480,000원" },
      { label: "보증금", value: "없음" },
      { label: "인터넷", value: "포함" },
      { label: "냉난방비", value: "포함 (중앙냉난방)" },
    ],
    disclaimer: "위 금액은 참고용이며 학기마다 변동될 수 있습니다. 정확한 금액은 아주대 생활관 공식 홈페이지를 확인하세요.",
  },
  yongji: {
    rows: [
      { label: "기숙사비 (2인실)", value: "약 720,000원", highlight: true },
      { label: "기숙사비 (4인실)", value: "약 620,000원" },
      { label: "식비 (조·석식, 선택)", value: "약 480,000원" },
      { label: "보증금", value: "없음" },
      { label: "인터넷", value: "포함" },
      { label: "냉난방비", value: "포함" },
    ],
    disclaimer: "위 금액은 참고용이며 학기마다 변동될 수 있습니다.",
  },
  hwahong: {
    rows: [
      { label: "기숙사비 (2인실)", value: "약 720,000원", highlight: true },
      { label: "기숙사비 (1인실)", value: "약 900,000원" },
      { label: "기숙사비 (4인실)", value: "약 620,000원" },
      { label: "식비 (선택)", value: "약 480,000원" },
      { label: "보증금", value: "없음" },
      { label: "인터넷", value: "포함" },
    ],
    disclaimer: "외국인 학생 전용. 위 금액은 참고용이며 변동될 수 있습니다.",
  },
  gwanggyo: {
    rows: [
      { label: "기숙사비 (2인실)", value: "약 750,000원", highlight: true },
      { label: "기숙사비 (4인실)", value: "약 650,000원" },
      { label: "식비 (조·석식, 선택)", value: "약 480,000원" },
      { label: "보증금", value: "없음" },
      { label: "인터넷", value: "포함" },
      { label: "냉난방비", value: "포함 (신축 개별)" },
    ],
    disclaimer: "신축 건물 기준. 위 금액은 참고용이며 변동될 수 있습니다.",
  },
  international: {
    rows: [
      { label: "기숙사비 (2인실)", value: "약 850,000원", highlight: true },
      { label: "식비 (조·석식, 선택)", value: "약 480,000원" },
      { label: "보증금", value: "없음" },
      { label: "인터넷", value: "포함" },
      { label: "냉난방비", value: "포함" },
      { label: "헬스장 이용", value: "포함" },
    ],
    disclaimer: "국제학사는 경쟁률이 높습니다. 위 금액은 참고용.",
  },
  ilsin: {
    rows: [
      { label: "기숙사비 (1인실)", value: "약 1,100,000원", highlight: true },
      { label: "기숙사비 (2인실)", value: "약 950,000원", highlight: true },
      { label: "기숙사비 (3인실)", value: "약 820,000원" },
      { label: "기숙사비 (4인실)", value: "약 720,000원" },
      { label: "식비 (조·석식, 선택)", value: "약 480,000원" },
      { label: "보증금", value: "없음" },
      { label: "인터넷", value: "포함" },
      { label: "냉난방비", value: "포함" },
      { label: "헬스장 이용", value: "포함" },
    ],
    disclaimer: "신축 건물로 방 유형별 금액 차이가 있습니다. 정확한 금액은 공식 홈페이지를 확인하세요.",
  },
};

interface DormCostTableProps {
  dormId: string;
}

export default function DormCostTable({ dormId }: DormCostTableProps) {
  const data = COST_DETAIL[dormId];
  if (!data) return null;

  return (
    <div className="glass-card-strong rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Coins className="w-4 h-4 text-primary" />
        <h2 className="font-bold text-lg tracking-tight">비용 상세</h2>
        <span className="text-xs text-muted-foreground/60 ml-auto">2026-1학기 참고</span>
      </div>

      <div className="rounded-xl overflow-hidden border border-border/50">
        <table className="w-full text-sm">
          <tbody>
            {data.rows.map((row, idx) => (
              <tr
                key={idx}
                className={cn(
                  "border-b border-border/30 last:border-0",
                  idx % 2 === 0 ? "bg-background/40" : "bg-muted/20",
                  row.highlight && "bg-primary/5"
                )}
              >
                <td className="px-4 py-3 text-muted-foreground font-medium">
                  {row.label}
                </td>
                <td className={cn(
                  "px-4 py-3 text-right font-semibold",
                  row.highlight ? "text-primary" : "text-foreground"
                )}>
                  {row.value}
                  {row.note && (
                    <span className="block text-[10px] font-normal text-muted-foreground/60">
                      {row.note}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-2 mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
        <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          {data.disclaimer}
        </p>
      </div>
    </div>
  );
}
