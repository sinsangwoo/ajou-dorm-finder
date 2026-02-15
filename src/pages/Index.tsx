import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import EligibilityResult from "@/components/EligibilityResult";
import ScoreCalculator from "@/components/ScoreCalculator";
import FreshmanGuide from "@/components/FreshmanGuide";
import DormitoryCards from "@/components/DormitoryCards";
import NoticeSection from "@/components/NoticeSection";
import { Gender, StudentType } from "@/data/dormitoryData";
import { DORM_HOMEPAGE, DORM_NOTICE_PAGE } from "@/data/dormInfo";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selection, setSelection] = useState<{
    gender: Gender;
    type: StudentType;
  } | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const calcRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (gender: Gender, type: StudentType) => {
    setSelection({ gender, type });
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleScrollToCalc = () => {
    calcRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <HeroSection onCategorySelect={handleCategorySelect} />

      {selection && (
        <div ref={resultRef}>
          <EligibilityResult
            gender={selection.gender}
            studentType={selection.type}
            onBack={() => setSelection(null)}
            onCalculate={handleScrollToCalc}
          />
        </div>
      )}

      <div ref={calcRef}>
        <ScoreCalculator />
      </div>

      <FreshmanGuide />
      <DormitoryCards />
      <NoticeSection />

      {/* 공식 홈페이지 통합 안내 CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-ajou opacity-95" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
              아주대학교 기숙사 공식 홈페이지
            </h2>
            <p className="text-white/50 text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto">
              입사 신청, 공지사항 확인, 생활관 규정 등<br />
              모든 공식 정보를 한곳에서 확인하세요
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_28px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02]"
              >
                <a href={DORM_HOMEPAGE} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  생활관 홈페이지 바로가기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <a
                href={DORM_NOTICE_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 text-sm font-medium transition-colors"
              >
                공지사항 보기
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/[0.03] border-t border-border/40 py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-foreground mb-2">아주대 긱사 어디가</p>
          <p className="text-xs text-muted-foreground/60 mb-3 max-w-md mx-auto leading-relaxed">
            본 사이트는 비공식 정보 제공 목적이며, 정확한 정보는 아주대학교 생활관 공식 홈페이지를 참고하세요.
          </p>
          <p className="text-[11px] text-muted-foreground/40">
            © 2026 아주대 긱사 어디가. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
