import { CheckCircle2, XCircle, ArrowLeft, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gender,
  StudentType,
  studentTypes,
  dormitories,
  getEligibleDormitories,
} from "@/data/dormitoryData";
import { DORM_HOMEPAGE, getRoomTypePercentage } from "@/data/dormInfo";

interface EligibilityResultProps {
  gender: Gender;
  studentType: StudentType;
  onBack: () => void;
  onCalculate: () => void;
}

const EligibilityResult = ({
  gender,
  studentType,
  onBack,
  onCalculate,
}: EligibilityResultProps) => {
  const eligible = getEligibleDormitories(gender, studentType);
  const genderLabel = gender === "male" ? "남학생" : "여학생";
  const typeLabel = studentTypes.find((s) => s.type === studentType)?.label ?? "";

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> 다시 선택하기
          </Button>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            지원 가능 기숙사
          </h2>
          <p className="text-muted-foreground">
            <span className="font-semibold text-primary">{genderLabel} · {typeLabel}</span> 기준 결과입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dormitories.map((dorm) => {
            const isEligible = eligible.includes(dorm.id);
            const roomPercentages = getRoomTypePercentage(dorm.id);
            const hasOldFacility = dorm.id === "namje";
            const isNewFacility = dorm.id === "ilsin" || dorm.id === "international";

            return (
              <div
                key={dorm.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  isEligible
                    ? `glass-card-strong border-primary/30 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                        hasOldFacility ? "border-l-4 border-l-orange-400" : ""
                      } ${isNewFacility ? "border-l-4 border-l-green-400" : ""}`
                    : "bg-muted/50 opacity-50 grayscale"
                }`}
              >
                {/* Status Icon */}
                <div className="absolute top-4 right-4">
                  {isEligible ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                {/* Competition Badge */}
                {dorm.competitionBadge && isEligible && (
                  <Badge variant="destructive" className="absolute top-4 left-4 text-xs">
                    {dorm.competitionBadge}
                  </Badge>
                )}

                <h3 className="text-xl font-bold text-foreground mt-4 mb-1">{dorm.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{dorm.nameEn}</p>
                <p className="text-sm text-muted-foreground mb-4">{dorm.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {dorm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Room Type Breakdown Chart */}
                {isEligible && Object.keys(roomPercentages).length > 0 && (
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

                {/* Notices */}
                {isEligible && dorm.notices && dorm.notices.length > 0 && (
                  <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                    {dorm.notices.map((notice, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-orange-800 dark:text-orange-200 mb-1 last:mb-0">
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>{notice}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Info */}
                <div className="text-xs text-muted-foreground space-y-1 mb-4">
                  <p>
                    정원: {dorm.capacity}
                    {dorm.capacityNote && (
                      <span className="ml-1 text-[10px]">{dorm.capacityNote}</span>
                    )}
                  </p>
                  <p>방 유형: {dorm.roomType}</p>
                </div>

                {/* Features */}
                {isEligible && (
                  <div className="mb-4 pt-4 border-t border-border">
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {dorm.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-success mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 공식 홈페이지 버튼 */}
                {isEligible && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => window.open(DORM_HOMEPAGE, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    공식 홈페이지 바로가기
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigate to calculator */}
        {(studentType === "enrolled") && (
          <div className="text-center mt-12">
            <Button onClick={onCalculate} size="lg" className="rounded-full px-8">
              점수 계산하기 →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EligibilityResult;
