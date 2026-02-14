import { dormitories } from "@/data/dormitoryData";
import { Badge } from "@/components/ui/badge";
import { Building, Users, DoorOpen } from "lucide-react";

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
          {dormitories.map((dorm) => (
            <div
              key={dorm.id}
              className="glass-card-strong rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Building className="w-6 h-6 text-primary" />
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

              <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {dorm.capacity}
                </div>
                <div className="flex items-center gap-1">
                  <DoorOpen className="w-3.5 h-3.5" />
                  {dorm.roomType}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DormitoryCards;
