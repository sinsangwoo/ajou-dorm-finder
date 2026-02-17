import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2, XCircle, AlertCircle, Building,
  Users, DoorOpen, RotateCcw, ArrowRight, SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Gender,
  StudentType,
  studentTypes,
  dormitories,
  getEligibleDormitories,
} from "@/data/dormitoryData";
import { getRoomTypePercentage } from "@/data/dormInfo";
import { cn } from "@/lib/utils";

// ── Subcomponent: Room Breakdown Bar ──────────────
function RoomBreakdownBar({ dormId }: { dormId: string }) {
  const p = getRoomTypePercentage(dormId);
  if (!Object.keys(p).length) return null;

  const segments = [
    { key: "single", label: "1인", color: "bg-primary/80", value: p.single },
    { key: "double", label: "2인", color: "bg-success/70", value: p.double },
    { key: "triple", label: "3인", color: "bg-warning/70", value: p.triple },
    { key: "quad",   label: "4인", color: "bg-muted-foreground/40", value: p.quad },
  ].filter((s) => s.value !== undefined && s.value > 0);

  return (
    <div className="mb-4">
      <p className="text-xs text-muted-foreground/60 mb-1.5 font-medium">방 유형 구성</p>
      <div className="w-full h-4 bg-muted/50 rounded-full overflow-hidden flex">
        {segments.map((s) => (
          <div
            key={s.key}
            className={cn("flex items-center justify-center", s.color)}
            style={{ width: `${s.value}%` }}
            title={`${s.label}실 ${s.value}%`}
          >
            {(s.value ?? 0) >= 12 && (
              <span className="text-[8px] font-bold text-white leading-none">
                {s.label} {s.value}%
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center gap-1">
            <div className={cn("w-2 h-2 rounded-full", s.color)} />
            <span className="text-xs text-muted-foreground/60">
              {s.label}실 {s.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Subcomponent: Dorm Card ────────────────────────
interface DormCardProps {
  dorm: (typeof dormitories)[0];
  isEligible: boolean | null; // null = no filter active
}

function DormCard({ dorm, isEligible }: DormCardProps) {
  const isOld = dorm.id === "namje";
  const isNew = dorm.id === "ilsin" || dorm.id === "international";
  const filtered = isEligible !== null;

  return (
    <div
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300",
        "glass-card-strong hover-lift group",
        isOld && "border-l-4 border-l-orange-400",
        isNew && "border-l-4 border-l-emerald-400",
        // When filter is active, dim ineligible cards
        filtered && !isEligible && "opacity-40 grayscale pointer-events-none"
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
            isOld
              ? "bg-orange-100 dark:bg-orange-950/50 group-hover:bg-orange-200/80"
              : isNew
              ? "bg-emerald-100 dark:bg-emerald-950/50 group-hover:bg-emerald-200/80"
              : "bg-primary/[0.08] group-hover:bg-primary/[0.14]"
          )}
        >
          <Building
            className={cn(
              "w-5 h-5",
              isOld
                ? "text-orange-600 dark:text-orange-400"
                : isNew
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-primary"
            )}
          />
        </div>

        <div className="flex items-center gap-2">
          {dorm.competitionBadge && (
            <Badge variant="destructive" className="text-xs">
              {dorm.competitionBadge}
            </Badge>
          )}
          {filtered && isEligible && (
            <CheckCircle2 className="w-5 h-5 text-success" />
          )}
          {filtered && !isEligible && (
            <XCircle className="w-5 h-5 text-muted-foreground/40" />
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-foreground mb-0.5 tracking-tight">
        {dorm.name}
      </h3>
      <p className="text-xs text-muted-foreground/50 mb-3 font-medium">{dorm.nameEn}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {dorm.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full bg-primary/[0.07] text-primary font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {dorm.description}
      </p>

      {/* Room breakdown */}
      <RoomBreakdownBar dormId={dorm.id} />

      {/* Notices */}
      {dorm.notices && dorm.notices.length > 0 && (
        <div className="mb-4 p-3 bg-warning/[0.06] rounded-xl border border-warning/20">
          {dorm.notices.map((notice, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs mb-1 last:mb-0"
            >
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 text-warning shrink-0" />
              <span className="text-foreground/70">{notice}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-muted-foreground/50" />
          <span>
            {dorm.capacity}
            {dorm.capacityNote && (
              <span className="ml-1 text-muted-foreground/40 text-xs">
                {dorm.capacityNote}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <DoorOpen className="w-3.5 h-3.5 text-muted-foreground/50" />
          <span>{dorm.roomType}</span>
        </div>
      </div>

      {/* Features (only when eligible) */}
      {isEligible && (
        <div className="mt-4 pt-4 border-t border-border/40">
          <ul className="text-xs text-muted-foreground space-y-1.5">
            {dorm.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3 h-3 text-success mt-0.5 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────
export default function DormsView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const paramGender = searchParams.get("gender") as Gender | null;
  const paramType   = searchParams.get("type") as StudentType | null;
  const hasFilter   = Boolean(paramGender && paramType);

  const eligibleIds = hasFilter
    ? getEligibleDormitories(paramGender!, paramType!)
    : null;

  const genderLabel  = paramGender === "male" ? "남학생" : paramGender === "female" ? "여학생" : "";
  const typeLabel    = studentTypes.find((s) => s.type === paramType)?.label ?? "";

  const clearFilter = () => {
    setSearchParams({});
  };

  // ── Filter panel state (mobile toggle) ────────────
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [localGender, setLocalGender] = useState<Gender | null>(paramGender);
  const [localType,   setLocalType]   = useState<StudentType | null>(paramType);

  const applyFilter = () => {
    if (localGender && localType) {
      setSearchParams({ gender: localGender, type: localType });
      setShowFilterPanel(false);
    }
  };

  // Sort: eligible first when filter is active
  const sortedDorms = hasFilter
    ? [...dormitories].sort((a, b) => {
        const aE = eligibleIds!.includes(a.id) ? 0 : 1;
        const bE = eligibleIds!.includes(b.id) ? 0 : 1;
        return aE - bE;
      })
    : dormitories;

  return (
    <div>
      {/* ── Section Header ── */}
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-1">
              {hasFilter ? "지원 가능 기숙사" : "기숙사 한눈에 보기"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {hasFilter
                ? `${genderLabel} · ${typeLabel} 기준으로 필터링된 결과입니다`
                : "아주대학교 6개 기숙사의 주요 정보를 비교해 보세요"}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasFilter && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilter}
                className="gap-1.5 text-xs rounded-full"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                필터 초기화
              </Button>
            )}
            <Button
              variant={hasFilter ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilterPanel((v) => !v)}
              className="gap-1.5 text-xs rounded-full"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              조건 필터
            </Button>
          </div>
        </div>

        {/* Active filter badge */}
        {hasFilter && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-muted-foreground/60">필터:</span>
            <span className="filter-pill active text-xs">
              {genderLabel}
            </span>
            <span className="filter-pill active text-xs">
              {typeLabel}
            </span>
            <span className="text-xs text-muted-foreground/60">
              · {eligibleIds?.length ?? 0}개 기숙사 지원 가능
            </span>
          </div>
        )}
      </div>

      {/* ── Inline filter panel ── */}
      {showFilterPanel && (
        <div className="container mx-auto px-4 pb-6 animate-slide-up-fade">
          <div className="glass-card-strong rounded-2xl p-5 max-w-lg">
            <p className="text-sm font-semibold mb-4 text-foreground">조건 선택</p>

            {/* Gender */}
            <div className="mb-4">
              <p className="text-xs text-muted-foreground/60 mb-2 font-medium">성별</p>
              <div className="flex gap-2">
                {(["male", "female"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setLocalGender(g)}
                    className={cn(
                      "filter-pill",
                      localGender === g && "active"
                    )}
                  >
                    {g === "male" ? "남학생" : "여학생"}
                  </button>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="mb-5">
              <p className="text-xs text-muted-foreground/60 mb-2 font-medium">신분</p>
              <div className="flex flex-wrap gap-2">
                {studentTypes.map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() => setLocalType(type)}
                    className={cn(
                      "filter-pill",
                      localType === type && "active"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={applyFilter}
                disabled={!localGender || !localType}
                className="rounded-full px-5 text-xs"
              >
                필터 적용
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setLocalGender(null);
                  setLocalType(null);
                  clearFilter();
                  setShowFilterPanel(false);
                }}
                className="text-xs"
              >
                초기화
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Grid ── */}
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {sortedDorms.map((dorm) => (
            <DormCard
              key={dorm.id}
              dorm={dorm}
              isEligible={hasFilter ? (eligibleIds?.includes(dorm.id) ?? false) : null}
            />
          ))}
        </div>

        {/* CTA for enrolled students */}
        {hasFilter && paramType === "enrolled" && (
          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground mb-3">
              재학생이라면 점수 계산기로 배정 점수를 미리 확인하세요
            </p>
            <Button
              onClick={() => navigate("/calculator")}
              size="lg"
              className="rounded-full px-8 font-semibold"
            >
              점수 계산기로 이동
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
