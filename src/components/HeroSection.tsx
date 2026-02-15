import { useState } from "react";
import { Building2, Users, ArrowRight, Sparkles } from "lucide-react";
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
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-white/[0.04] blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-white/[0.02] blur-2xl" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] text-white/80 text-sm mb-8 tracking-wide">
            <Sparkles className="w-4 h-4 text-white/60" />
            <span>아주대 기숙사 정보 플랫폼</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 tracking-tighter leading-[1.1]">
            어떤 기숙사에
            <br />
            <span className="text-white/90">지원하시나요?</span>
          </h1>
          <p className="text-base md:text-lg text-white/50 max-w-md mx-auto leading-relaxed font-light">
            아주대학교 기숙사 지원 자격을 확인하고
            <br className="hidden md:block" />
            배정 점수를 미리 계산해 보세요
          </p>
        </div>

        {/* Gender Selection */}
        <div className="w-full max-w-sm mb-10 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-white/40 text-xs text-center mb-4 uppercase tracking-widest font-medium">성별 선택</p>
          <div className="grid grid-cols-2 gap-4">
            {(["male", "female"] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`group relative p-6 rounded-2xl transition-all duration-300 ease-out ${
                  selectedGender === g
                    ? "bg-white text-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-[1.03]"
                    : "bg-white/[0.06] backdrop-blur-md border border-white/[0.1] text-white hover:bg-white/[0.12] hover:border-white/[0.2] hover:scale-[1.02]"
                }`}
              >
                <Users className={`w-7 h-7 mx-auto mb-2.5 transition-colors ${selectedGender === g ? "text-primary" : "text-white/60 group-hover:text-white/80"}`} />
                <span className="text-base font-semibold tracking-tight">{g === "male" ? "남학생" : "여학생"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Student Type Selection */}
        {selectedGender && (
          <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-white/40 text-xs text-center mb-4 uppercase tracking-widest font-medium">신분 선택</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {studentTypes.map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => onCategorySelect(selectedGender, type)}
                  className="group bg-white/[0.06] backdrop-blur-md border border-white/[0.1] text-white p-5 rounded-xl hover:bg-white/[0.14] hover:border-white/[0.2] hover:scale-[1.03] hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.1)] transition-all duration-300 ease-out text-center"
                >
                  <Building2 className="w-5 h-5 mx-auto mb-2 text-white/50 group-hover:text-white/80 transition-colors" />
                  <span className="text-sm font-medium tracking-tight">{label}</span>
                  <ArrowRight className="w-3.5 h-3.5 mx-auto mt-2.5 opacity-0 group-hover:opacity-60 transition-all duration-300 translate-x-0 group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center text-white/30 animate-bounce">
          <span className="text-[10px] mb-1 uppercase tracking-widest font-medium">스크롤</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 14l-5-5h10l-5 5z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
