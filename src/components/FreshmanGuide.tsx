import { GraduationCap, MapPin, FileText } from "lucide-react";
import { distanceRegions } from "@/data/dormitoryData";

const FreshmanGuide = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            신입생 선발 안내
          </h2>
          <p className="text-muted-foreground">신입생은 아래 우선순위에 따라 선발됩니다</p>
        </div>

        {/* Priority Steps */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1순위",
                icon: GraduationCap,
                title: "입학성적우수장학금",
                desc: "입학 시 성적우수 장학금 수혜자가 최우선 선발됩니다.",
              },
              {
                step: "2순위",
                icon: MapPin,
                title: "거리 점수",
                desc: "거주지에서 학교까지의 거리에 따라 점수가 부여됩니다.",
              },
              {
                step: "3순위",
                icon: FileText,
                title: "수능 점수",
                desc: "거리 점수가 동일한 경우 수능 점수로 선발됩니다.",
              },
            ].map((item, i) => (
              <div key={i} className="glass-card-strong rounded-2xl p-6 text-center relative hover-lift">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-bold px-3.5 py-1 rounded-full shadow-sm">
                  {item.step}
                </div>
                <item.icon className="w-9 h-9 text-primary mx-auto mb-3 mt-3" />
                <h3 className="font-bold text-foreground mb-2 tracking-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distance Table */}
        <div className="max-w-2xl mx-auto glass-card-strong rounded-2xl p-6 md:p-8">
          <h3 className="font-bold text-lg text-foreground mb-6 text-center tracking-tight">
            거리 점수 기준표
          </h3>
          <div className="space-y-3">
            {distanceRegions.map((group, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-primary/[0.08] flex items-center justify-center">
                  <span className="text-xl font-extrabold text-primary tabular-nums">{group.points}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1 tracking-tight">
                    {group.category}
                  </p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">
                    {group.regions.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreshmanGuide;
