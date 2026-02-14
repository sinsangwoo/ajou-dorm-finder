import { dormitories } from "@/data/dormitoryData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Users, DoorOpen, AlertCircle, ExternalLink } from "lucide-react";
import { DORM_HOMEPAGE, getRoomTypePercentage } from "@/data/dormInfo";

const DormitoryCards = () => {
  return (
    <section className="py-16 md:py-24 gradient-ajou-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
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
                className={`glass-card-strong rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group ${
                  hasOldFacility ? "border-l-4 border-l-orange-400" : ""
                } ${isNewFacility ? "border-l-4 border-l-green-400" : ""}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors ${
                    hasOldFacility ? "bg-orange-100 dark:bg-orange-950" :
                    isNewFacility ? "bg-green-100 dark:bg-green-950" :
                    "bg-primary/10"
                  }`}>
                    <Building className={`w-6 h-6 ${
                      hasOldFacility ? "text-orange-600 dark:text-orange-400" :
                      isNewFacility ? "text-green-600 dark:text-green-400" :
                      "text-primary"
                    }`} />
                  </div>
                  {dorm.competitionBadge && (
                    <Badge variant="destructive" className="text-xs">
                      {dorm.competitionBadge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-0.5">{dorm.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{dorm.nameEn}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {dorm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-4">{dorm.description}</p>

                {/* Room Type Breakdown Chart */}
                {Object.keys(roomPercentages).length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2 font-medium">방 유형 구성</p>
                    <div className="w-full h-6 bg-muted rounded-full overflow-hidden flex">
                      {roomPercentages.single && (
                        <div 
                          className="bg-blue-500 flex items-center justify-center"
                          style={{ width: `${roomPercentages.single}%` }}
                          title={`1인실 ${roomPercentages.single}%`}
                        >
                          {roomPercentages.single >= 10 && (
                            <span className="text-[10px] font-bold text-white">1인 {roomPercentages.single}%</span>
                          )}
                        </div>
                      )}
                      {roomPercentages.double && (
                        <div 
                          className="bg-green-500 flex items-center justify-center"
                          style={{ width: `${roomPercentages.double}%` }}
                          title={`2인실 ${roomPercentages.double}%`}
                        >
                          {roomPercentages.double >= 10 && (
                            <span className="text-[10px] font-bold text-white">2인 {roomPercentages.double}%</span>
                          )}
                        </div>
                      )}
                      {roomPercentages.triple && (
                        <div 
                          className="bg-yellow-500 flex items-center justify-center"
                          style={{ width: `${roomPercentages.triple}%` }}
                          title={`3인실 ${roomPercentages.triple}%`}
                        >
                          {roomPercentages.triple >= 10 && (
                            <span className="text-[10px] font-bold text-white">3인 {roomPercentages.triple}%</span>
                          )}
                        </div>
                      )}
                      {roomPercentages.quad && (
                        <div 
                          className="bg-purple-500 flex items-center justify-center"
                          style={{ width: `${roomPercentages.quad}%` }}
                          title={`4인실 ${roomPercentages.quad}%`}
                        >
                          {roomPercentages.quad >= 10 && (
                            <span className="text-[10px] font-bold text-white">4인 {roomPercentages.quad}%</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {dorm.notices && dorm.notices.length > 0 && (
                  <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                    {dorm.notices.map((notice, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-orange-800 dark:text-orange-200">
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>{notice}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>
                      {dorm.capacity}
                      {dorm.capacityNote && (
                        <span className="ml-1 text-[10px]">{dorm.capacityNote}</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DoorOpen className="w-3.5 h-3.5" />
                    {dorm.roomType}
                  </div>
                </div>

                {/* 공식 홈페이지 바로가기 버튼 */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => window.open(DORM_HOMEPAGE, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  공식 홈페이지 바로가기
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DormitoryCards;
