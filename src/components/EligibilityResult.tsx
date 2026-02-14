import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gender,
  StudentType,
  studentTypes,
  dormitories,
  getEligibleDormitories,
} from "@/data/dormitoryData";

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
            return (
              <div
                key={dorm.id}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  isEligible
                    ? "glass-card-strong border-primary/30 shadow-lg hover:shadow-xl hover:-translate-y-1"
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

                {/* Info */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>정원: {dorm.capacity}</p>
                  <p>방 유형: {dorm.roomType}</p>
                </div>

                {/* Features */}
                {isEligible && (
                  <div className="mt-4 pt-4 border-t border-border">
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
