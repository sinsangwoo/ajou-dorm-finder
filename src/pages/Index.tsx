import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import EligibilityResult from "@/components/EligibilityResult";
import ScoreCalculator from "@/components/ScoreCalculator";
import FreshmanGuide from "@/components/FreshmanGuide";
import DormitoryCards from "@/components/DormitoryCards";
import NoticeSection from "@/components/NoticeSection";
import { Gender, StudentType } from "@/data/dormitoryData";
import { DORM_HOMEPAGE, DORM_NOTICE_PAGE } from "@/data/dormInfo";
import { ExternalLink } from "lucide-react";

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

      {/* Footer */}
      <footer className="gradient-ajou py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* 공식 홈페이지 링크 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <a
                href={DORM_HOMEPAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                생활관 공식 홈페이지
              </a>
              <a
                href={DORM_NOTICE_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                공지사항 바로가기
              </a>
            </div>

            {/* 사이트 정보 */}
            <div className="text-center text-white/80 border-t border-white/10 pt-8">
              <p className="font-bold text-lg mb-2">아주대 긱사 어디가</p>
              <p className="text-sm text-white/60 mb-4">
                본 사이트는 비공식 정보 제공 목적이며, 정확한 정보는 아주대학교 생활관 공식 홈페이지를 참고하세요.
              </p>
              <p className="text-xs text-white/40">
                © 2026 아주대 긱사 어디가. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
