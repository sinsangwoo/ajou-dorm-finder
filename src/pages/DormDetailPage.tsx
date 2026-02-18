import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building, Users, DoorOpen, Calendar, Coins, MapPin } from "lucide-react";
import { dormitories } from "@/data/dormitoryData";
import { dormCapacities, dormCosts, dormFacilities, getRoomTypePercentage } from "@/data/dormInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

const COLORS = ["hsl(213, 100%, 30%)", "hsl(152, 60%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 84%, 60%)"];

export default function DormDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dorm = dormitories.find((d) => d.id === id);

  if (!dorm) {
    return (
      <div className="min-h-screen page-top flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">기숙사를 찾을 수 없습니다</h1>
          <Link to="/dorms" className="text-primary hover:underline">기숙사 목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const capacity = dormCapacities[dorm.id];
  const cost = dormCosts[dorm.id];
  const facilities = dormFacilities[dorm.id] || [];
  const roomPercent = getRoomTypePercentage(dorm.id);

  const chartData = Object.entries(roomPercent)
    .filter(([_, v]) => v && v > 0)
    .map(([k, v]) => ({
      name: k === "single" ? "1인실" : k === "double" ? "2인실" : k === "triple" ? "3인실" : "4인실",
      value: v,
    }));

  return (
    <div className="min-h-screen page-top bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 py-6">
          <Link to="/dorms" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            기숙사 목록으로
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
                {dorm.name}
              </h1>
              <p className="text-muted-foreground text-sm mb-3">{dorm.nameEn}</p>
              <div className="flex flex-wrap gap-2">
                {dorm.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
                {dorm.competitionBadge && (
                  <Badge variant="destructive" className="text-xs">{dorm.competitionBadge}</Badge>
                )}
              </div>
            </div>
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Building className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column: Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="glass-card-strong rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-3 tracking-tight">기숙사 소개</h2>
              <p className="text-muted-foreground leading-relaxed">{dorm.description}</p>
            </div>

            {/* Room breakdown chart */}
            {chartData.length > 0 && (
              <div className="glass-card-strong rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 tracking-tight">방 유형 구성</h2>
                <div className="flex items-center gap-8">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={(entry) => `${entry.value}%`}
                      >
                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {chartData.map((item, i) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-sm font-medium text-foreground">{item.name}</span>
                        <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Facilities */}
            <div className="glass-card-strong rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-4 tracking-tight">편의시설</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {facilities.map((f) => (
                  <div
                    key={f.label}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-xl border",
                      f.available ? "bg-background/50 border-border/50" : "bg-muted/30 border-border/30 opacity-50"
                    )}
                  >
                    <span className="text-xl">{f.icon}</span>
                    <span className={cn("text-sm font-medium", f.available ? "text-foreground" : "text-muted-foreground")}>
                      {f.label}
                    </span>
                    {!f.available && <span className="text-xs text-destructive ml-auto">✕</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {dorm.features.length > 0 && (
              <div className="glass-card-strong rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 tracking-tight">주요 특징</h2>
                <ul className="space-y-2">
                  {dorm.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notices */}
            {dorm.notices && dorm.notices.length > 0 && (
              <div className="glass-card-strong rounded-2xl p-6 border-warning/30">
                <h2 className="font-bold text-lg mb-4 tracking-tight text-warning">유의사항</h2>
                <ul className="space-y-2">
                  {dorm.notices.map((n, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed">{n}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right column: Quick Info */}
          <div className="space-y-6">

            {/* Capacity */}
            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">수용 인원</h3>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{capacity?.capacity || dorm.capacity}</p>
              {capacity?.note && <p className="text-xs text-muted-foreground">{capacity.note}</p>}
            </div>

            {/* Room Type */}
            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <DoorOpen className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">방 유형</h3>
              </div>
              <p className="text-sm text-foreground">{dorm.roomType}</p>
            </div>

            {/* Cost */}
            {cost && (
              <div className="glass-card-strong rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Coins className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">비용 (참고)</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground/60">학기 기숙사비</p>
                    <p className="text-base font-bold text-foreground">{cost.semester}</p>
                  </div>
                  {cost.meal && (
                    <div>
                      <p className="text-xs text-muted-foreground/60">식비 (선택)</p>
                      <p className="text-sm font-semibold text-foreground">{cost.meal}</p>
                      {cost.mealNote && <p className="text-xs text-muted-foreground/60">{cost.mealNote}</p>}
                    </div>
                  )}
                  {cost.note && <p className="text-xs text-muted-foreground/60 mt-2">{cost.note}</p>}
                </div>
              </div>
            )}

            {/* Construction year (placeholder) */}
            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">건축 정보</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {dorm.id === "namje" ? "1992년 준공 (리모델링 예정)" :
                 dorm.id === "gwanggyo" || dorm.id === "ilsin" || dorm.id === "international" ? "신축 건물" :
                 "1990년대 후반 건축"}
              </p>
            </div>

            {/* Map placeholder */}
            <div className="glass-card-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-sm">위치</h3>
              </div>
              <div className="w-full h-32 bg-muted/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                (지도 추후 추가)
              </div>
            </div>

            {/* CTA */}
            <Button asChild className="w-full">
              <a href="https://dorm.ajou.ac.kr/dorm/index.do" target="_blank" rel="noopener noreferrer">
                공식 홈페이지에서 신청하기
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
