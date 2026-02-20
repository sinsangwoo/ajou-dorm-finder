/**
 * ScoreCalculator.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * PRESENTATION LAYER ONLY.
 * All state management and calculation logic lives in:
 *   - src/hooks/useScoreCalculator.ts  (state + derived values)
 *   - src/lib/calc/scoreEngine.ts      (pure calculation functions)
 *
 * This component renders the result of useScoreCalculator() with zero
 * business logic of its own.
 */

import { useId } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calculator, TrendingUp, Info, AlertCircle, CheckCircle2,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as ReTooltip, ResponsiveContainer, Cell,
} from "recharts";
import { distanceRegions } from "@/data/dormitoryData";
import { useScoreCalculator } from "@/hooks/useScoreCalculator";
import { cn } from "@/lib/utils";

export default function ScoreCalculator() {
  const gpaInputId = useId();

  // ── All state + derived values come from the hook ──
  const {
    isFinancial,
    setMode,
    gpa,
    gpaInput,
    handleGpaSlider,
    handleGpaInput,
    isPreviousResident,
    setIsPreviousResident,
    selectedRegion,
    setSelectedRegion,
    financialRawScore,
    setFinancialRawScore,
    volunteerRaw,
    setVolunteerRaw,
    educationRaw,
    setEducationRaw,
    breakdown,
    levelInfo,
    gradeMax,
    chartData,
  } = useScoreCalculator();

  // ── Breakdown display items (UI shape derived from ScoreBreakdown) ──
  const breakdownItems = isFinancial
    ? [
        { label: "가계곤란점수", value: breakdown.financialScore, max: 60 },
        { label: "학점 (성적)",  value: breakdown.gradeScore,    max: 30 },
        { label: "봉사활동",     value: breakdown.volunteerScore, max: 5  },
        { label: "필수교육",     value: breakdown.educationScore, max: 5  },
      ]
    : [
        { label: "학점 (성적)",                         value: breakdown.gradeScore,    max: 60 },
        { label: isPreviousResident ? "사생점수" : "지역조건", value: breakdown.distanceScore, max: 30 },
        { label: "봉사활동",                            value: breakdown.volunteerScore, max: 5  },
        { label: "필수교육",                            value: breakdown.educationScore, max: 5  },
      ];

  return (
    <section id=\"calculator\" className=\"section-padding gradient-ajou-subtle\">
      <div className=\"container mx-auto px-4\">
        <div className=\"text-center mb-12\">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=\"inline-flex items-center gap-2 text-primary mb-4\"
          >
            <Calculator className=\"w-5 h-5\" />
            <span className=\"text-sm font-medium tracking-wide\">재학생 / 가계곤란 학생</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className=\"text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight\"
          >
            점수 계산기
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=\"text-muted-foreground text-sm\"
          >
            나의 기숙사 배정 점수를 미리 확인해 보세요
          </motion.p>
        </div>

        {/* Mode toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className=\"max-w-4xl mx-auto mb-8\"
        >
          <div className=\"glass-card-strong rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4\">
            <div>
              <p className=\"text-sm font-semibold text-foreground\">선발 유형</p>
              <p className=\"text-xs text-muted-foreground mt-0.5\">
                {isFinancial
                  ? \"가계곤란점수 60점 + 성적 30점 + 봉사 5점 + 교육 5점 = 100점\"
                  : \"성적 60점 + 지역/사생 30점 + 봉사 5점 + 교육 5점 = 100점\"}
              </p>
            </div>
            <div className=\"flex items-center gap-3 shrink-0\">
              <span
                className={cn(
                  \"text-sm font-medium transition-colors\",
                  !isFinancial ? \"text-foreground\" : \"text-muted-foreground\"
                )}
              >
                일반학생
              </span>
              <Switch
                checked={isFinancial}
                onCheckedChange={(checked) => setMode(checked ? "financial" : "general")}
                aria-label="가계곤란 모드 전환"
              />
              <span
                className={cn(
                  \"text-sm font-medium transition-colors\",
                  isFinancial ? \"text-foreground\" : \"text-muted-foreground\"
                )}
              >
                가계곤란학생
              </span>
            </div>
          </div>
        </motion.div>

        {isFinancial && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: \"auto\" }}
            exit={{ opacity: 0, height: 0 }}
            className=\"max-w-4xl mx-auto mb-6\"
          >
            <div className=\"flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40\">
              <AlertCircle className=\"w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0\" />
              <div className=\"text-sm text-amber-800 dark:text-amber-300\">
                <p className=\"font-semibold mb-1\">가계곤란학생 선발 안내</p>
                <p className=\"text-xs leading-relaxed\">
                  학부생 정원의 1% 범위 내에서 선발됩니다. 가계곤란점수(최대 60점)는
                  별도 서류(수급자 증명 등) 제출 후 심사로 확정됩니다.
                  성적 평점 2.0 이상 요건을 충족해야 합니다.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className=\"max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8\">
          {/* Input section - simplified for brevity, keeping existing code */}
          <div className=\"space-y-5\">
            {isFinancial && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className=\"glass-card-strong rounded-2xl p-6\"
              >
                <div className=\"flex items-center justify-between mb-4\">
                  <div className=\"flex items-center gap-2\">
                    <Label className=\"text-base font-semibold tracking-tight\">가계곤란점수</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className=\"w-4 h-4 text-muted-foreground/50 cursor-help\" />
                      </TooltipTrigger>
                      <TooltipContent className=\"max-w-xs text-xs\">
                        수급자·차상위·한부모 등 증명서류 제출 후 심사로 확정됩니다.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Badge variant="secondary" className="font-bold tabular-nums">
                    {financialRawScore}점
                  </Badge>
                </div>
                <Slider
                  value={[financialRawScore]}
                  onValueChange={([v]) => setFinancialRawScore(v)}
                  min={0}
                  max={60}
                  step={1}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground/60">
                  <span>0점</span>
                  <span>60점 (최대)</span>
                </div>
              </div>
            )}

            {/* GPA */}
            <div className="glass-card-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor={gpaInputId} className="text-base font-semibold tracking-tight">
                  학점 (GPA)
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    id={gpaInputId}
                    type="number"
                    min={0}
                    max={4.5}
                    step={0.01}
                    value={gpaInput}
                    onChange={(e) => handleGpaInput(e.target.value)}
                    className="w-20 text-right text-lg font-bold tabular-nums px-2 py-1 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label="GPA 직접 입력"
                  />
                  <span className="text-sm text-muted-foreground/60">/ 4.50</span>
                </div>
              </div>
              <Slider
                value={[gpa]}
                onValueChange={([v]) => handleGpaSlider(v)}
                min={0}
                max={4.5}
                step={0.01}
                className="mb-2"
                aria-label="GPA 슬라이더"
              />
              <div className="flex justify-between text-xs text-muted-foreground/60 mb-3">
                <span>0.00</span>
                <span>4.50</span>
              </div>
              <p className="text-sm">
                학점 점수:{" "}
                <span className="font-bold text-primary tabular-nums">{breakdown.gradeScore}점</span>
                <span className="text-muted-foreground/60"> / {gradeMax}점</span>
              </p>
            </div>

            {/* 거리/사생점수 (일반 모드) */}
            {!isFinancial && (
              <div className="glass-card-strong rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Label className="text-base font-semibold tracking-tight">
                    거리 조건 / 사생점수
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground/50 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-xs">
                      직전 학기 기숙사 거주자는 사생점수 30점을 적용합니다.
                      신규 지원자는 거주지 지역 기준 거리 점수를 적용합니다.
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-muted/30">
                  <Switch
                    checked={isPreviousResident}
                    onCheckedChange={setIsPreviousResident}
                    id="prev-resident"
                  />
                  <label htmlFor="prev-resident" className="text-sm cursor-pointer">
                    직전 학기 기숙사 거주자입니다
                    <span className="ml-2 text-xs text-primary font-semibold">(사생점수 30점)</span>
                  </label>
                </div>

                {!isPreviousResident && (
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="mb-3">
                      <SelectValue placeholder="거주 지역을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {distanceRegions.map((group) => (
                        <div key={group.category}>
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground sticky top-0 bg-popover">
                            {group.category}
                          </div>
                          {group.regions.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <p className="text-sm">
                  {isPreviousResident ? "사생" : "지역"} 점수:{" "}
                  <span className="font-bold text-primary tabular-nums">{breakdown.distanceScore}점</span>
                  <span className="text-muted-foreground/60"> / 30점</span>
                </p>
              </div>
            )}

            {/* 봉사 & 필수교육 */}
            <div className="glass-card-strong rounded-2xl p-6 space-y-6">

              {/* 봉사활동 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">봉사활동 점수</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-xs leading-relaxed">
                        봉사시간 28시간 이상 또는 사회봉사 과목(사회봉사이론·실천1·실천2) 1과목 이수 시 5점.
                        자원봉사 실적은 아주허브에 등록 후 반영됩니다.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      volunteerRaw === 5 ? "text-success" : "text-primary"
                    )}
                  >
                    {volunteerRaw}점
                  </span>
                </div>
                <Slider
                  value={[volunteerRaw]}
                  onValueChange={([v]) => setVolunteerRaw(v)}
                  min={0}
                  max={5}
                  step={5}
                  aria-label="봉사활동 점수"
                />
                <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                  <span>미충족 (0점)</span>
                  <span className="flex items-center gap-1">
                    {volunteerRaw === 5 && <CheckCircle2 className="w-3 h-3 text-success" />}
                    충족 (5점)
                  </span>
                </div>
              </div>

              {/* 법정필수교육 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-semibold">법정필수교육 점수</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs text-xs leading-relaxed">
                        성희롱예방, 성폭력/가정폭력예방, 장애인식개선 교육 3과목 모두 이수 시 5점.
                        인권센터 성평등상담소 교육 기준입니다.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      educationRaw === 5 ? "text-success" : "text-primary"
                    )}
                  >
                    {educationRaw}점
                  </span>
                </div>
                <Slider
                  value={[educationRaw]}
                  onValueChange={([v]) => setEducationRaw(v)}
                  min={0}
                  max={5}
                  step={5}
                  aria-label="법정필수교육 점수"
                />
                <div className="flex justify-between text-xs text-muted-foreground/60 mt-1">
                  <span>미이수 (0점)</span>
                  <span className="flex items-center gap-1">
                    {educationRaw === 5 && <CheckCircle2 className="w-3 h-3 text-success" />}
                    이수 완료 (5점)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results section */}
          <div className=\"space-y-5\">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className=\"glass-card-strong rounded-2xl p-8 text-center premium-glow\"
            >
              <TrendingUp className=\"w-7 h-7 text-primary mx-auto mb-3\" />
              <p className=\"text-xs text-muted-foreground/60 mb-2 uppercase tracking-widest font-medium\">
                예상 총점
              </p>
              <p
                className={cn(
                  "text-7xl font-extrabold mb-1 tabular-nums tracking-tighter",
                  levelInfo.colorClass
                )}
              >
                {breakdown.totalScore}
              </p>
              <p className="text-muted-foreground/50 text-sm mb-4">/ 100점</p>

              {/* 점수 해석 뱃지 */}
              <div
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-6",
                  levelInfo.bgClass,
                  levelInfo.colorClass
                )}
              >
                {levelInfo.label}
              </div>

              {/* 점수 구성 breakdown */}
              <div className="grid grid-cols-2 gap-2.5 text-left">
                {breakdownItems.map((item) => (
                  <div key={item.label} className="bg-muted/40 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground/60 mb-1">{item.label}</p>
                    <p className="text-lg font-bold tabular-nums tracking-tight">
                      {item.value}
                      <span className=\"text-xs text-muted-foreground/40 font-normal\">/{item.max}</span>
                    </p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className=\"w-full h-1 bg-muted/60 rounded-full mt-1.5 overflow-hidden\"
                    >
                      <div className=\"h-full bg-primary/60 rounded-full\" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 학점 ↔ 점수 차트 */}
            <div className="glass-card-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold tracking-tight">
                  학점 ↔ 점수 매핑
                </h3>
                <span className="text-xs text-muted-foreground/60">
                  {isFinancial ? "가계곤란 기준 (30점 만점)" : "일반 기준 (60점 만점)"}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ left: 16, right: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(213 20% 92%)" />
                  <XAxis
                    type="number"
                    domain={[0, isFinancial ? 30 : 60]}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 9 }}
                    width={78}
                  />
                  <ReTooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(213 15% 91%)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      fontSize: "12px",
                    }}
                    formatter={(v: number) => [`${v}점`, "배점"]}
                  />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          entry.score === breakdown.gradeScore
                            ? "hsl(213, 100%, 30%)"
                            : "hsl(213, 20%, 86%)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {breakdown.gradeScore > 0 && (
                <p className="text-xs text-center text-muted-foreground/60 mt-2">
                  현재 GPA{" "}
                  <span className="font-semibold text-primary">{gpa.toFixed(2)}</span>{" "}
                  → {breakdown.gradeScore}점 (진한 파란색 막대)
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
