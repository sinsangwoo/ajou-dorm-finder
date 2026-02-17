import ScoreCalculator from "@/components/ScoreCalculator";
import FreshmanGuide from "@/components/FreshmanGuide";
import Footer from "@/components/Footer";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen page-top bg-background">
      {/* Page header */}
      <div className="border-b border-border/40 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-1">
            점수 계산기
          </h1>
          <p className="text-muted-foreground text-sm">
            재학생 전용 · 기숙사 배정 점수를 미리 계산해 보세요
          </p>
        </div>
      </div>

      {/* Calculator */}
      <ScoreCalculator />

      {/* Freshman guide is useful context alongside the calculator */}
      <div className="border-t border-border/40">
        <FreshmanGuide />
      </div>

      <Footer />
    </div>
  );
}
