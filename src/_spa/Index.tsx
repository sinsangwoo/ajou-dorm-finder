import HeroSection from "@/components/HeroSection";
import FreshmanGuide from "@/components/FreshmanGuide";
import NoticeSection from "@/components/NoticeSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* Hero takes full viewport — no navbar offset needed (navbar is transparent on hero) */}
      <HeroSection />

      {/* Downstream sections below the fold */}
      <FreshmanGuide />
      <NoticeSection />
      <Footer />
    </main>
  );
};

export default Index;
