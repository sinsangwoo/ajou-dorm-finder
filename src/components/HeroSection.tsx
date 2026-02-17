import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Gender, StudentType, studentTypes } from "@/data/dormitoryData";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onCategorySelect?: (gender: Gender, type: StudentType) => void;
}

const HeroSection = ({ onCategorySelect }: HeroSectionProps) => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [hoveredType, setHoveredType] = useState<StudentType | null>(null);
  const navigate = useNavigate();

  const handleTypeSelect = (gender: Gender, type: StudentType) => {
    if (onCategorySelect) {
      onCategorySelect(gender, type);
    } else {
      // Navigate to dorms page with filter params
      navigate(`/dorms?gender=${gender}&type=${type}`);
    }
  };

  return (
    <section className="relative gradient-ajou overflow-hidden" style={{ minHeight: "calc(100svh - 0px)" }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.015] blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content — padded to account for fixed navbar */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-[inherit] py-24 pt-28">

        {/* ── Badge ── */}
        <div className="animate-fade-in-up opacity-0 stagger-1 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.14] text-white/80 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-white/60" />
            아주대 기숙사 정보 플랫폼 &nbsp;·&nbsp; 2026-1학기
          </div>
        </div>

        {/* ── Headline ── */}
        <div className="text-center mb-12 animate-fade-in-up opacity-0 stagger-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tighter leading-[1.05]">
            내 기숙사,
            <br />
            <span className="text-white/85">바로 찾아보세요</span>
          </h1>
          <p className="text-sm md:text-base text-white/50 max-w-sm mx-auto leading-relaxed font-light">
            성별과 신분을 선택하면 지원 가능한 기숙사를
            <br className="hidden md:block" />
            즉시 확인할 수 있어요
          </p>
        </div>

        {/* ── Finder card ── */}
        <div className="w-full max-w-lg animate-fade-in-up opacity-0 stagger-3">
          <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-6 md:p-8">

            {/* Step 1: Gender */}
            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-3">
                1단계 · 성별
              </p>
              <div className="grid grid-cols-2 gap-3">
                {(["male", "female"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    aria-pressed={selectedGender === g}
                    className={cn(
                      "group relative p-5 rounded-2xl transition-all duration-300 ease-spring text-center",
                      selectedGender === g
                        ? "bg-white text-primary shadow-[0_8px_24px_rgb(0,0,0,0.15)] scale-[1.02]"
                        : "bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.12] hover:border-white/[0.2] hover:scale-[1.01]"
                    )}
                  >
                    <Users
                      className={cn(
                        "w-6 h-6 mx-auto mb-2 transition-colors",
                        selectedGender === g
                          ? "text-primary"
                          : "text-white/50 group-hover:text-white/70"
                      )}
                    />
                    <span className="text-sm font-semibold">
                      {g === "male" ? "남학생" : "여학생"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Student type — shown after gender selection */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-spring",
                selectedGender
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              )}
            >
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-3">
                2단계 · 신분
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {studentTypes.map(({ type, label }) => (
                  <button
                    key={type}
                    onClick={() => selectedGender && handleTypeSelect(selectedGender, type)}
                    onMouseEnter={() => setHoveredType(type)}
                    onMouseLeave={() => setHoveredType(null)}
                    className={cn(
                      "group flex items-center justify-between px-4 py-3.5 rounded-xl",
                      "border border-white/[0.1] text-white text-left",
                      "transition-all duration-200 ease-spring",
                      hoveredType === type
                        ? "bg-white/[0.16] border-white/[0.25] scale-[1.02]"
                        : "bg-white/[0.05] hover:bg-white/[0.10]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors shrink-0" />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <ArrowRight
                      className={cn(
                        "w-3.5 h-3.5 text-white/30 transition-all duration-200",
                        hoveredType === type && "text-white/60 translate-x-0.5"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Placeholder when no gender selected */}
            {!selectedGender && (
              <div className="flex items-center justify-center gap-2 text-white/30 text-xs py-2">
                <span>성별을 먼저 선택해 주세요</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick action links */}
        <div className="mt-8 flex items-center gap-6 animate-fade-in-up opacity-0 stagger-4">
          <button
            onClick={() => navigate("/calculator")}
            className="text-white/50 hover:text-white/80 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>점수 계산기</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => navigate("/dorms")}
            className="text-white/50 hover:text-white/80 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <span>기숙사 전체 보기</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Scroll cue — hides once user has scrolled */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-white/25 animate-bounce pointer-events-none">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};

export default HeroSection;
