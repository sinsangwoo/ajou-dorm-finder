import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, ShieldCheck, RefreshCcw, AlertTriangle } from "lucide-react";

const notices = [
  {
    icon: ShieldCheck,
    title: "1년 거주 보장 안내",
    content:
      "1학기 기숙사 입사를 완료한 학생은 2학기에도 동일 기숙사에 거주할 수 있습니다. 단, 기숙사 생활 규정 위반 시 퇴사 조치될 수 있으니 유의하세요.",
  },
  {
    icon: RefreshCcw,
    title: "환불 정책 안내",
    content:
      "입사 후 4주 이내 퇴사 시 기숙사비의 75%가 환불됩니다. 4주~8주 이내는 50%, 8주 이후는 환불이 불가합니다. 식비는 잔여 일수에 따라 별도 정산됩니다.",
  },
  {
    icon: AlertTriangle,
    title: "선발 취소 사유",
    content:
      "허위 정보 기재, 기숙사비 미납, 입학 취소 등의 사유 발생 시 선발이 취소될 수 있습니다. 정확한 정보를 입력해 주세요.",
  },
  {
    icon: Info,
    title: "문의처 안내",
    content:
      "기숙사 관련 문의는 아주대학교 기숙사 관리팀으로 연락해 주세요. 운영시간: 평일 09:00~18:00 (점심시간 12:00~13:00 제외)",
  },
];

const NoticeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
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
                    <span className="font-semibold text-foreground">{notice.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-5">
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
