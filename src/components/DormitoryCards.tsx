/**
 * DormitoryCards.tsx  ─  Phase 2: Visual Redesign
 * ──────────────────────────────────────────────────────────────────────────────
 * UX improvements:
 *  - Ajou-branded gradient accent strip per dorm (design token driven)
 *  - Gold border highlight for newest/flagship dorms (ilsin, international)
 *  - Staggered framer-motion entrance animation
 *  - Better information hierarchy: name > tags > stats > features
 *  - Room type bar improved: shows percentage text even for narrow segments
 *  - Facility age badge (NEW / RENOVATED / CLASSIC)
 *  - Link to /dorms/:id detail page
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { dormitories } from "@/data/dormitoryData";
import { Badge } from "@/components/ui/badge";
import { Building, Users, DoorOpen, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { getRoomTypePercentage } from "@/data/dormInfo";
import { cn } from "@/lib/utils";

// ── Per-dorm visual identity ────────────────────────────────────────────

const DORM_THEMES: Record<string, {
  gradient: string;
  iconBg: string;
  iconColor: string;
  accentBorder: string;
  badge?: { label: string; variant: "default" | "secondary" | "outline" };
}> = {
  namje: {
    gradient:     "from-orange-400 via-orange-500 to-red-500",
    iconBg:       "bg-orange-100 dark:bg-orange-950/50",
    iconColor:    "text-orange-600 dark:text-orange-400",
    accentBorder: "border-l-orange-400",
    badge:        { label: "클래식", variant: "outline" },
  },
  yongji: {
    gradient:     "from-blue-400 via-[#0057B7] to-indigo-600",
    iconBg:       "bg-blue-100 dark:bg-blue-950/50",
    iconColor:    "text-blue-600 dark:text-blue-400",
    accentBorder: "border-l-blue-500",
  },
  hwahong: {
    gradient:     "from-purple-400 via-purple-500 to-pink-500",
    iconBg:       "bg-purple-100 dark:bg-purple-950/50",
    iconColor:    "text-purple-600 dark:text-purple-400",
    accentBorder: "border-l-purple-400",
  },
  gwanggyo: {
    gradient:     "from-emerald-400 via-emerald-500 to-teal-500",
    iconBg:       "bg-emerald-100 dark:bg-emerald-950/50",
    iconColor:    "text-emerald-600 dark:text-emerald-400",
    accentBorder: "border-l-emerald-400",
  },
  international: {
    gradient:     "from-cyan-400 via-cyan-500 to-blue-500",
    iconBg:       "bg-cyan-100 dark:bg-cyan-950/50",
    iconColor:    "text-cyan-600 dark:text-cyan-400",
    accentBorder: "border-l-cyan-400",
    badge:        { label: "NEW", variant: "default" },
  },
  ilsin: {
    gradient:     "from-[#002855] via-[#0057B7] to-[#002F6C]",
    iconBg:       "bg-primary/10",
    iconColor:    "text-primary",
    accentBorder: "border-l-[#C5A028]",  // Gold accent — flagship
    badge:        { label: "신축", variant: "default" },
  },
};

// ── Room type bar ───────────────────────────────────────────────────────────────

function RoomBar({ dormId }: { dormId: string }) {
  const p = getRoomTypePercentage(dormId);
  if (!Object.keys(p).length) return null;

  const segments = [
    { key: "single", label: "1인", color: "bg-[#002855]",  value: p.single },
    { key: "double", label: "2인", color: "bg-[#0057B7]",  value: p.double },
    { key: "triple", label: "3인", color: "bg-[#C5A028]",  value: p.triple },
    { key: "quad",   label: "4인", color: "bg-gray-400",   value: p.quad   },
  ].filter((s) => (s.value ?? 0) > 0);

  return (
    <div className="mb-4">
      <p className="text-[10px] text-muted-foreground/60 mb-1.5 font-semibold tracking-wide uppercase">주실 구성</p>
      <div className="w-full h-4 bg-muted/50 rounded-full overflow-hidden flex gap-px">
        {segments.map((s) => (
          <div
            key={s.key}
            className={cn("flex items-center justify-center transition-all", s.color)}
            style={{ width: `${s.value}%` }}
            title={`${s.label}실 ${s.value}%`}
          >
            {(s.value ?? 0) >= 14 && (
              <span className="text-[9px] font-bold text-white leading-none">
                {s.label} {s.value}%
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-1 flex-wrap">
        {segments.map((s) => (
          <div key={s.key} className="flex items-center gap-1">
            <div className={cn("w-1.5 h-1.5 rounded-full", s.color)} />
            <span className="text-[10px] text-muted-foreground/60">{s.label}실 {s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Single card ───────────────────────────────────────────────────────────────────────

interface DormCardProps {
  dorm: (typeof dormitories)[0];
  index: number;
}

function DormCard({ dorm, index }: DormCardProps) {
  const theme = DORM_THEMES[dorm.id] ?? DORM_THEMES.yongji;
  const isFlagship = dorm.id === "ilsin" || dorm.id === "international";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.52, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/dorms/${dorm.id}`} className="block h-full">
        <div
          className={cn(
            "relative h-full rounded-2xl overflow-hidden border-l-4",
            "glass-card-strong hover-lift group cursor-pointer",
            theme.accentBorder,
            // Gold ring for flagship dorms
            isFlagship && "ring-1 ring-[#C5A028]/30"
          )}
        >
          {/* Gradient accent strip (top) */}
          <div className={cn("h-1.5 w-full bg-gradient-to-r", theme.gradient)} />

          <div className="p-5 md:p-6">

            {/* Header row */}
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                "transition-transform group-hover:scale-105",
                theme.iconBg
              )}>
                {isFlagship
                  ? <Sparkles className={cn("w-5 h-5", theme.iconColor)} />
                  : <Building  className={cn("w-5 h-5", theme.iconColor)} />}
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-end">
                {/* Facility era badge */}
                {theme.badge && (
                  <Badge
                    variant={theme.badge.variant}
                    className={cn(
                      "text-[10px] font-bold tracking-wide",
                      dorm.id === "ilsin" && "bg-[#C5A028]/10 text-[#9A7C1E] border-[#C5A028]/40 dark:bg-[#C5A028]/20 dark:text-[#C5A028]"
                    )}
                  >
                    {theme.badge.label}
                  </Badge>
                )}
                {/* Competition badge */}
                {dorm.competitionBadge && (
                  <Badge variant="destructive" className="text-[10px]">
                    {dorm.competitionBadge}
                  </Badge>
                )}
              </div>
            </div>

            {/* Name + english */}
            <h3 className="text-lg font-bold text-foreground mb-0.5 tracking-tight group-hover:text-primary transition-colors">
              {dorm.name}
            </h3>
            <p className="text-[11px] text-muted-foreground/50 mb-3 font-medium">{dorm.nameEn}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {dorm.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary/[0.07] text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{dorm.description}</p>

            {/* Room bar */}
            <RoomBar dormId={dorm.id} />

            {/* Notices */}
            {dorm.notices && dorm.notices.length > 0 && (
              <div className="mb-4 p-3 bg-warning/[0.06] rounded-xl border border-warning/20">
                {dorm.notices.map((notice, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs mb-1 last:mb-0">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-warning" />
                    <span className="text-foreground/70">{notice}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Stats row */}
            <div className="flex items-center justify-between border-t border-border/40 pt-4">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-muted-foreground/50" />
                  <span>
                    {dorm.capacity}
                    {dorm.capacityNote && (
                      <span className="ml-1 text-[10px] text-muted-foreground/40">{dorm.capacityNote}</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DoorOpen className="w-3.5 h-3.5 text-muted-foreground/50" />
                  <span>{dorm.roomType}</span>
                </div>
              </div>

              {/* Detail CTA */}
              <span className={cn(
                "flex items-center gap-1 text-[11px] font-semibold transition-all",
                "text-muted-foreground/40 group-hover:text-primary group-hover:gap-1.5"
              )}>
                자세히 <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────────────────

const DormitoryCards = () => (
  <section className="section-padding gradient-ajou-subtle">
    <div className="container mx-auto px-4">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          {/* Ajou Gold accent bar */}
          <span className="inline-block w-8 h-0.5 rounded-full" style={{ background: "#C5A028" }} />
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            2026-1학기
          </span>
          <span className="inline-block w-8 h-0.5 rounded-full" style={{ background: "#C5A028" }} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
          기숙사 한눈에 보기
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed">
          아주대학교 6개 기숙사의 주요 정보를 비교해 보세요
        </p>
      </motion.div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {dormitories.map((dorm, index) => (
          <DormCard key={dorm.id} dorm={dorm} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default DormitoryCards;
