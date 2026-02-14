import { useState } from "react";
import { Building2, Users, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gender, StudentType, studentTypes } from "@/data/dormitoryData";

interface HeroSectionProps {
  onCategorySelect: (gender: Gender, type: StudentType) => void;
}

const HeroSection = ({ onCategorySelect }: HeroSectionProps) => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  return (
    <section className="relative min-h-screen gradient-ajou overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-white/3 blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>2025학년도 기숙사 배정 안내</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            어떤 기숙사에
            <br />
            지원하시나요?
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-lg mx-auto">
            아주대학교 기숙사 지원 자격을 확인하고
            <br className="hidden md:block" />
            배정 점수를 미리 계산해 보세요
          </p>
        </div>

        {/* Gender Selection */}
        <div className="w-full max-w-md mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-white/60 text-sm text-center mb-4">성별을 선택해 주세요</p>
          <div className="grid grid-cols-2 gap-4">
            {(["male", "female"] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`group relative p-6 rounded-2xl transition-all duration-300 ${
                  selectedGender === g
                    ? "bg-white text-primary shadow-2xl scale-105"
                    : "glass-card text-white hover:bg-white/20 hover:scale-102"
                }`}
              >
                <Users className={`w-8 h-8 mx-auto mb-2 ${selectedGender === g ? "text-primary" : ""}`} />
                <span className="text-lg font-semibold">{g === "male" ? "남학생" : "여학생"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Student Type Selection */}
        {selectedGender && (
          <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-white/60 text-sm text-center mb-4">신분을 선택해 주세요</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {studentTypes.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => onCategorySelect(selectedGender, type)}
                  className="group glass-card text-white p-4 rounded-xl hover:bg-white/25 hover:scale-105 transition-all duration-300 text-center"
                >
                  <Building2 className="w-5 h-5 mx-auto mb-2 opacity-70 group-hover:opacity-100" />
                  <span className="text-sm font-medium">{label}</span>
                  <ArrowRight className="w-4 h-4 mx-auto mt-2 opacity-0 group-hover:opacity-70 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40 animate-bounce">
          <span className="text-xs mb-1">아래로 스크롤</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 14l-5-5h10l-5 5z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
