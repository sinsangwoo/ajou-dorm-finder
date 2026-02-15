import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  gradeScoreMap, getGradeScore, distanceRegions, getDistanceScore,
} from "@/data/dormitoryData";

const chartData = gradeScoreMap.map((entry) => ({
  name: entry.label,
  score: entry.score,
}));

const ScoreCalculator = () => {
  const [gpa, setGpa] = useState(3.5);
  const [isPreviousResident, setIsPreviousResident] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [volunteer, setVolunteer] = useState(0);
  const [education, setEducation] = useState(0);

  const gradeScore = useMemo(() => getGradeScore(gpa), [gpa]);
  const distanceScore = useMemo(
    () => (isPreviousResident ? 30 : getDistanceScore(selectedRegion)),
    [isPreviousResident, selectedRegion]
  );
  const totalScore = gradeScore + distanceScore + volunteer + education;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <section id="calculator" className="section-padding gradient-ajou-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">재학생 전용</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            점수 계산기
          </h2>
          <p className="text-muted-foreground">나의 기숙사 배정 점수를 미리 확인하세요</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* GPA */}
            <div className="glass-card-strong rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-semibold tracking-tight">학점 (GPA)</Label>
                <Badge variant="secondary" className="text-lg font-bold px-3 tabular-nums">
                  {gpa.toFixed(2)}
                </Badge>
              </div>
              <Slider
                value={[gpa]}
                onValueChange={([v]) => setGpa(v)}
                min={0}
                max={4.5}
                step={0.01}
                className="mb-2"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground/60">
                <span>0.00</span>
                <span>4.50</span>
              </div>
              <p className="mt-3 text-sm">
                학점 점수:{" "}
                <span className="font-bold text-primary tabular-nums">{gradeScore}점</span>
                <span className="text-muted-foreground/60"> / 60점</span>
              </p>
            </div>

            {/* Distance / Dorm Point */}
            <div className="glass-card-strong rounded-2xl p-6">
              <Label className="text-base font-semibold mb-4 block tracking-tight">
                거리 / 기숙사 포인트
              </Label>
              <div className="flex items-center gap-3 mb-4">
                <Switch
                  checked={isPreviousResident}
                  onCheckedChange={setIsPreviousResident}
                />
                <span className="text-sm">기존 기숙사 거주자입니다</span>
              </div>
              {!isPreviousResident && (
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="거주 지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {distanceRegions.map((group) => (
                      <div key={group.category}>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
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
              <p className="mt-3 text-sm">
                거리/기숙사 점수:{" "}
                <span className="font-bold text-primary tabular-nums">{distanceScore}점</span>
                <span className="text-muted-foreground/60"> / 30점</span>
              </p>
            </div>

            {/* Volunteer & Education */}
            <div className="glass-card-strong rounded-2xl p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-semibold">봉사활동 포인트</Label>
                  <span className="text-sm font-bold text-primary tabular-nums">{volunteer}점</span>
                </div>
                <Slider
                  value={[volunteer]}
                  onValueChange={([v]) => setVolunteer(v)}
                  min={0}
                  max={5}
                  step={1}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-semibold">필수교육 포인트</Label>
                  <span className="text-sm font-bold text-primary tabular-nums">{education}점</span>
                </div>
                <Slider
                  value={[education]}
                  onValueChange={([v]) => setEducation(v)}
                  min={0}
                  max={5}
                  step={1}
                />
              </div>
            </div>
          </div>

          {/* Results & Chart */}
          <div className="space-y-6">
            {/* Total Score */}
            <div className="glass-card-strong rounded-2xl p-8 text-center premium-glow">
              <TrendingUp className="w-7 h-7 text-primary mx-auto mb-3" />
              <p className="text-xs text-muted-foreground/60 mb-2 uppercase tracking-widest font-medium">예상 총점</p>
              <p className={`text-6xl font-extrabold mb-1 tabular-nums tracking-tighter ${getScoreColor(totalScore)}`}>
                {totalScore}
              </p>
              <p className="text-muted-foreground/50 text-sm">/ 100점</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-left">
                {[
                  { label: "학점", value: gradeScore, max: 60 },
                  { label: "거리/기숙사", value: distanceScore, max: 30 },
                  { label: "봉사활동", value: volunteer, max: 5 },
                  { label: "필수교육", value: education, max: 5 },
                ].map((item) => (
                  <div key={item.label} className="bg-muted/40 rounded-xl p-3">
                    <p className="text-[11px] text-muted-foreground/60">{item.label}</p>
                    <p className="text-lg font-bold tabular-nums tracking-tight">{item.value}<span className="text-[11px] text-muted-foreground/40">/{item.max}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="glass-card-strong rounded-2xl p-6">
              <h3 className="text-sm font-semibold mb-4 tracking-tight">학점 ↔ 점수 매핑 차트</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(213 20% 92%)" />
                  <XAxis type="number" domain={[0, 60]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={80} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid hsl(213 15% 91%)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      fontSize: "13px",
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          entry.score === gradeScore
                            ? "hsl(213, 100%, 30%)"
                            : "hsl(213, 20%, 86%)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScoreCalculator;
