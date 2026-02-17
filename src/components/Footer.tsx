import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { DORM_HOMEPAGE, DORM_NOTICE_PAGE } from "@/data/dormInfo";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/dorms", label: "기숙사 정보" },
  { href: "/calculator", label: "점수 계산기" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground/[0.02] dark:bg-white/[0.02] border-t border-border/40">
      {/* CTA strip */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-ajou opacity-95" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
              아주대학교 기숙사 공식 홈페이지
            </h2>
            <p className="text-white/50 text-sm md:text-base mb-8 leading-relaxed max-w-md mx-auto">
              입사 신청, 공지사항 확인, 생활관 규정 등
              <br />
              모든 공식 정보를 한곳에서 확인하세요
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={DORM_HOMEPAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 rounded-full px-7 py-3 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <ExternalLink className="w-4 h-4" />
                생활관 홈페이지 바로가기
                <ArrowRight className="w-4 h-4" />
              </a>
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

      {/* Bottom bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-bold text-foreground text-sm mb-1">
              아주대 긱사 어디가
            </p>
            <p className="text-xs text-muted-foreground/60 max-w-xs leading-relaxed">
              비공식 정보 제공 서비스입니다. 정확한 정보는 아주대학교
              생활관 공식 홈페이지를 참고하세요.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-border/30 mt-6 pt-6 text-center">
          <p className="text-xs text-muted-foreground/40">
            © 2026 아주대 긱사 어디가. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
