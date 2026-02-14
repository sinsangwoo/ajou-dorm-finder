import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import EligibilityResult from "@/components/EligibilityResult";
import ScoreCalculator from "@/components/ScoreCalculator";
import FreshmanGuide from "@/components/FreshmanGuide";
import DormitoryCards from "@/components/DormitoryCards";
import NoticeSection from "@/components/NoticeSection";
import { Gender, StudentType } from "@/data/dormitoryData";

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
      <footer className="gradient-ajou py-8">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          <p className="font-semibold text-white/80 mb-1">아주대 긱사 어디가</p>
          <p>본 사이트는 비공식 정보 제공 목적이며, 정확한 정보는 아주대학교 공식 홈페이지를 참고하세요.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
