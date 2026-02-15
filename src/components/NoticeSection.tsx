import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, ShieldCheck, RefreshCcw, AlertTriangle, Building2, Calendar } from "lucide-react";
import { getDaysUntilCompletion } from "@/data/dormInfo";
import { useEffect, useState } from "react";

const notices = [
  {
    icon: ShieldCheck,
    title: "1년 거주 보장 안내",
    content: "1학기 기숙사 입사를 완료한 학생은 2학기에도 동일 기숙사에 거주할 수 있습니다. 단, 기숙사 생활 규정 위반 시 퇴사 조치될 수 있으니 유의하세요.",
  },
  {
    icon: RefreshCcw,
    title: "환불 정책 안내",
    content: "입사 후 4주 이내 퇴사 시 기숙사비의 75%가 환불됩니다. 4주~8주 이내는 50%, 8주 이후는 환불이 불가합니다. 식비는 잔여 일수에 따라 별도 정산됩니다.",
  },
  {
    icon: AlertTriangle,
    title: "선발 취소 사유",
    content: "허위 정보 기재, 기숙사비 미납, 입학 취소 등의 사유 발생 시 선발이 취소될 수 있습니다. 정확한 정보를 입력해 주세요.",
  },
  {
    icon: Info,
    title: "문의처 안내",
    content: "기숙사 관련 문의는 아주대학교 기숙사 관리팀으로 연락해 주세요. 운영시간: 평일 09:00~18:00 (점심시간 12:00~13:00 제외)",
  },
];

const NoticeSection = () => {
  const [daysUntil, setDaysUntil] = useState<number>(getDaysUntilCompletion());

  useEffect(() => {
    setDaysUntil(getDaysUntilCompletion());
  }, []);

  const percentage = Math.max(0, Math.min(100, ((500 - daysUntil) / 500) * 100));

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* 행복기숙사 D-Day */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-card-strong rounded-2xl p-8 md:p-10 border border-primary/10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/[0.08] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1.5 tracking-tight">
                  행복기숙사 완공 예정
                </h3>
                <p className="text-muted-foreground text-sm">
                  새로운 최첨단 시설의 기숙사가 2027년 6월에 준공됩니다
                </p>
              </div>
            </div>

            <div className="bg-primary/[0.04] rounded-xl p-6 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-foreground text-sm">완공까지</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl md:text-4xl font-extrabold text-primary tabular-nums tracking-tighter">D-{daysUntil}</span>
                  <span className="text-muted-foreground/50 text-sm ml-1.5">일</span>
                </div>
              </div>

              <div className="relative w-full h-2.5 bg-muted/60 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-primary/80 transition-all duration-1000 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground/50 mt-2 text-right tabular-nums">
                {percentage.toFixed(1)}% 진행
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">예상 수용 인원</span>
                  <p className="text-muted-foreground/60 text-xs">기존 대비 약 30% 증가</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-foreground">최신 시설</span>
                  <p className="text-muted-foreground/60 text-xs">개인 냉난방, 세탁 시설 등</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 주요 공지사항 */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            주요 공지사항
          </h2>
          <p className="text-muted-foreground">입사 전 꼭 확인해야 할 사항들입니다</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="multiple" className="space-y-3">
            {notices.map((notice, i) => (
              <AccordionItem
                key={i}
                value={`notice-${i}`}
                className="glass-card-strong rounded-2xl border-none px-6"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3 text-left">
                    <notice.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-semibold text-foreground tracking-tight">{notice.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
                  {notice.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;
