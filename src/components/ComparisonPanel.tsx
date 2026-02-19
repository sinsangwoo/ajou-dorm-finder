import { X, TrendingUp, Users, DoorOpen, Coins } from "lucide-react";
import { dormitories } from "@/data/dormitoryData";
import { dormCapacities, dormCosts } from "@/data/dormInfo";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ComparisonPanelProps {
  selectedIds: string[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

export default function ComparisonPanel({ selectedIds, onRemove, onClose }: ComparisonPanelProps) {
  if (selectedIds.length === 0) return null;

  const dorms = selectedIds.map((id) => dormitories.find((d) => d.id === id)!).filter(Boolean);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border shadow-2xl"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg tracking-tight">기숙사 비교</h3>
              <Badge variant="secondary" className="text-xs">{dorms.length}/3</Badge>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors" aria-label="비교 패널 닫기">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
            <div className="flex gap-4 md:grid md:gap-4" style={{ gridTemplateColumns: `repeat(${dorms.length}, minmax(240px, 1fr))` }}>
              {dorms.map((dorm, index) => {
                const capacity = dormCapacities[dorm.id];
                const cost = dormCosts[dorm.id];

                return (
                  <motion.div
                    key={dorm.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="glass-card-strong rounded-2xl p-5 relative min-w-[240px] md:min-w-0 flex-shrink-0"
                  >
                    <button onClick={() => onRemove(dorm.id)} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-muted hover:bg-destructive/10 flex items-center justify-center transition-colors" aria-label={`${dorm.name} 제거`}>
                      <X className="w-3 h-3" />
                    </button>

                    <Link to={`/dorms/${dorm.id}`} className="block mb-3 hover:text-primary transition-colors">
                      <h4 className="font-bold text-base tracking-tight">{dorm.name}</h4>
                      <p className="text-xs text-muted-foreground">{dorm.nameEn}</p>
                    </Link>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {dorm.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">{tag}</span>
                      ))}
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground/60">수용 인원</p>
                          <p className="font-semibold text-foreground">{capacity?.capacity || dorm.capacity}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <DoorOpen className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground/60">방 유형</p>
                          <p className="font-semibold text-foreground">{dorm.roomType}</p>
                        </div>
                      </div>

                      {cost && (
                        <div className="flex items-start gap-2">
                          <Coins className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground/60">학기 기숙사비</p>
                            <p className="font-semibold text-foreground">{cost.semester}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Link to={`/dorms/${dorm.id}`} className="mt-4 block text-center text-xs text-primary hover:underline">
                      상세 보기 →
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {dorms.length < 3 && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xs text-muted-foreground/60 text-center mt-4">
              최대 3개까지 비교할 수 있습니다 · 기숙사 카드의 체크박스로 추가하세요
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
