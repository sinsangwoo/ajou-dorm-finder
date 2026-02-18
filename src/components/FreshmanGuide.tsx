import { GraduationCap, MapPin, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { distanceRegions, tieBreakRules } from "@/data/dormitoryData";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ── 신입생 선발 우선순위
// 출처: 아주대학교 생활관 선발기준 공식 문서
// (나) 신입생 선발은 다음의 순서대로 선발한다.
//   (1) 생활관 입사보장 장학생 우선 선발
//   (2) 거리 순 (원서접수 시 입력한 주소 기준)
//   (3) 입학성적순: 거리가 동일한 경우 적용 (예: 같은 아파트 등)

const selectionSteps = [
  {
    step: "1순위",
    icon: Trophy,
    title: "입사보장 장학생",
    desc: "생활관 입사보장 장학금 수혜자가 최우선으로 선발됩니다.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    border: "border-yellow-200 dark:border-yellow-800/50",
  },
  {
    step: "2순위",
    icon: MapPin,
    title: "거리 순",
    desc: "원서접수 시 입력한 주소를 기준으로 학교까지의 거리가 먼 학생부터 선발됩니다.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800/50",
  },
  {
    step: "3순위",
    icon: GraduationCap,
    title: "입학성적순",
    desc: "거리가 동일한 경우(예: 같은 아파트 등)에 한해 입학성적 순으로 선발됩니다.",
    color: "text-primary",
    bg: "bg-primary/[0.04]",
    border: "border-primary/20",
  },
];

// ── 접을 수 있는 추가 안내 박스
const additionalNotes = [
  {
    title: "거리 후순위 학생 안내",
    content:
      "거리 후순위 신입생은 원하는 생활관에 배정되지 않거나, 모집 정원에 따라 부득이 선발되지 않을 수 있습니다.",
  },
  {
    title: "호실 배정 방법",
    content:
      "신입생의 배정 인원을 우선 산정하며, 호실은 임의 배정됩니다. (호실 직접 선택 불가)",
  },
  {
    title: "연속사생 보장",
    content:
      "1학기 입사생이 2학기 연속사생신청을 할 경우 2학기 입사를 보장합니다. 단, 1학기 입사취소·중도퇴사 시 보장되지 않습니다.",
  },
];

export default function FreshmanGuide() {
  const [openNote, setOpenNote] = useState<number | null>(null);
  const [showAllRegions, setShowAllRegions] = useState(false);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">

        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            신입생 선발 안내
          </h2>
          <p className="text-muted-foreground text-sm">
            학부 신입생은 아래 우선순위에 따라 매년 1학기 입학처에서 선발합니다
          </p>
        </div>

        {/* ── 선발 우선순위 카드 ── */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {selectionSteps.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "relative rounded-2xl p-6 text-center border hover-lift",
                  item.bg,
                  item.border
                )}
              >
                <div
                  className={cn(
                    "absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3.5 py-1 rounded-full shadow-sm",
                    i === 0
                      ? "bg-yellow-500 text-white"
                      : i === 1
                      ? "bg-blue-500 text-white"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {item.step}
                </div>
                <item.icon
                  className={cn("w-8 h-8 mx-auto mb-3 mt-3", item.color)}
                />
                <h3 className="font-bold text-foreground mb-2 tracking-tight text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 추가 안내 아코디언 ── */}
        <div className="max-w-3xl mx-auto mb-14 space-y-2">
          {additionalNotes.map((note, i) => (
            <div
              key={i}
              className="glass-card-strong rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-5 py-3.5 text-left"
                onClick={() => setOpenNote(openNote === i ? null : i)}
              >
                <span className="text-sm font-semibold text-foreground">
                  {note.title}
                </span>
                {openNote === i ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
              </button>
              {openNote === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                  {note.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── 거리 점수 기준표 ── */}
        <div className="max-w-2xl mx-auto glass-card-strong rounded-2xl p-6 md:p-8">
          <h3 className="font-bold text-lg text-foreground mb-2 text-center tracking-tight">
            거리 점수 기준표
          </h3>
          <p className="text-xs text-muted-foreground/60 text-center mb-6">
            재학생 신규 입사 시 지역조건 점수 (30점 만점) · 직전 학기 사생은 사생점수 30점 적용
          </p>
          <div className="space-y-3">
            {distanceRegions.map((group, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-xl overflow-hidden border transition-colors",
                  i === 0
                    ? "border-primary/20 bg-primary/[0.03]"
                    : i === 1
                    ? "border-border/60 bg-muted/20"
                    : "border-border/40 bg-muted/10"
                )}
              >
                {/* Header row */}
                <div className="flex items-center gap-4 p-4">
                  <div
                    className={cn(
                      "shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center",
                      i === 0
                        ? "bg-primary/[0.10]"
                        : "bg-muted/50"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xl font-extrabold tabular-nums",
                        i === 0 ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {group.points}
                    </span>
                    <span className="text-xs text-muted-foreground/60 font-medium">점</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm mb-0.5 tracking-tight">
                      {group.category}
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Region tags */}
                <div className="px-4 pb-4">
                  <div
                    className={cn(
                      "flex flex-wrap gap-1.5 overflow-hidden transition-all",
                      !showAllRegions && group.regions.length > 8 && "max-h-12"
                    )}
                  >
                    {group.regions.map((region) => (
                      <span
                        key={region}
                        className="text-xs px-2 py-0.5 rounded-md bg-background/80 border border-border/50 text-muted-foreground"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 전체 지역 보기 토글 */}
          <button
            onClick={() => setShowAllRegions((v) => !v)}
            className="w-full mt-4 text-xs text-primary/70 hover:text-primary flex items-center justify-center gap-1.5 transition-colors py-2"
          >
            {showAllRegions ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                접기
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                전체 지역 보기
              </>
            )}
          </button>
        </div>

        {/* ── 동점자 처리 기준 ── */}
        <div className="max-w-2xl mx-auto mt-8 glass-card-strong rounded-2xl p-6 md:p-8">
          <h3 className="font-bold text-base text-foreground mb-5 tracking-tight">
            동점자 처리 기준
          </h3>
          <div className="flex flex-col gap-3">
            {tieBreakRules.map((rule) => (
              <div
                key={rule.order}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-muted/30"
              >
                <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{rule.order}</span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-foreground">{rule.label}</span>
                  <p className="text-xs text-muted-foreground">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
