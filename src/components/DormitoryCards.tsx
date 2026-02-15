import { dormitories } from "@/data/dormitoryData";
import { Badge } from "@/components/ui/badge";
import { Building, Users, DoorOpen, AlertCircle } from "lucide-react";
import { getRoomTypePercentage } from "@/data/dormInfo";

const DormitoryCards = () => {
  return (
    <section className="section-padding gradient-ajou-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            기숙사 한눈에 보기
          </h2>
          <p className="text-muted-foreground">6개 기숙사의 주요 정보를 비교해 보세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dormitories.map((dorm) => {
            const roomPercentages = getRoomTypePercentage(dorm.id);
            const hasOldFacility = dorm.id === "namje";
            const isNewFacility = dorm.id === "ilsin" || dorm.id === "international";

            return (
              <div
                key={dorm.id}
                className={`glass-card-strong rounded-2xl p-6 hover-lift group ${
                  hasOldFacility ? "border-l-4 border-l-orange-400" : ""
                } ${isNewFacility ? "border-l-4 border-l-green-400" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    hasOldFacility ? "bg-orange-100 dark:bg-orange-950 group-hover:bg-orange-200" :
                    isNewFacility ? "bg-green-100 dark:bg-green-950 group-hover:bg-green-200" :
                    "bg-primary/[0.08] group-hover:bg-primary/[0.14]"
                  }`}>
                    <Building className={`w-5 h-5 ${
                      hasOldFacility ? "text-orange-600 dark:text-orange-400" :
                      isNewFacility ? "text-green-600 dark:text-green-400" :
                      "text-primary"
                    }`} />
                  </div>
                  {dorm.competitionBadge && (
                    <Badge variant="destructive" className="text-[10px]">
                      {dorm.competitionBadge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-0.5 tracking-tight">{dorm.name}</h3>
                <p className="text-[11px] text-muted-foreground/60 mb-3 font-medium">{dorm.nameEn}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dorm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-primary/[0.07] text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{dorm.description}</p>

                {/* Room Type Breakdown Chart */}
                {Object.keys(roomPercentages).length > 0 && (
                  <div className="mb-4">
                    <p className="text-[11px] text-muted-foreground/70 mb-2 font-medium">방 유형 구성</p>
                    <div className="w-full h-5 bg-muted/60 rounded-full overflow-hidden flex">
                      {roomPercentages.single && (
                        <div
                          className="bg-primary/80 flex items-center justify-center"
                          style={{ width: `${roomPercentages.single}%` }}
                          title={`1인실 ${roomPercentages.single}%`}
                        >
                          {roomPercentages.single >= 10 && (
                            <span className="text-[9px] font-bold text-primary-foreground">1인 {roomPercentages.single}%</span>
                          )}
                        </div>
                      )}
                      {roomPercentages.double && (
                        <div
                          className="bg-success/80 flex items-center justify-center"
                          style={{ width: `${roomPercentages.double}%` }}
                          title={`2인실 ${roomPercentages.double}%`}
                        >
                          {roomPercentages.double >= 10 && (
                            <span className="text-[9px] font-bold text-white">2인 {roomPercentages.double}%</span>
                          )}
                        </div>
                      )}
                      {roomPercentages.triple && (
                        <div
                          className="bg-warning/80 flex items-center justify-center"
                          style={{ width: `${roomPercentages.triple}%` }}
                          title={`3인실 ${roomPercentages.triple}%`}
                        >
                          {roomPercentages.triple >= 10 && (
                            <span className="text-[9px] font-bold text-white">3인 {roomPercentages.triple}%</span>
                          )}
                        </div>
                      )}
                      {roomPercentages.quad && (
                        <div
                          className="bg-accent-foreground/50 flex items-center justify-center"
                          style={{ width: `${roomPercentages.quad}%` }}
                          title={`4인실 ${roomPercentages.quad}%`}
                        >
                          {roomPercentages.quad >= 10 && (
                            <span className="text-[9px] font-bold text-white">4인 {roomPercentages.quad}%</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {dorm.notices && dorm.notices.length > 0 && (
                  <div className="mb-4 p-3 bg-warning/[0.06] rounded-xl border border-warning/20">
                    {dorm.notices.map((notice, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs mb-1 last:mb-0">
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-warning" />
                        <span className="text-foreground/70">{notice}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-muted-foreground/60" />
                    <span>
                      {dorm.capacity}
                      {dorm.capacityNote && (
                        <span className="ml-1 text-[10px] text-muted-foreground/50">{dorm.capacityNote}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DoorOpen className="w-3.5 h-3.5 text-muted-foreground/60" />
                    {dorm.roomType}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DormitoryCards;
