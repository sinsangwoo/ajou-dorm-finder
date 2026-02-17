import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, ExternalLink, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { DORM_HOMEPAGE } from "@/data/dormInfo";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/dorms", label: "기숙사" },
  { href: "/calculator", label: "점수 계산기" },
];

export default function Navbar() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();

  // ── Scroll-aware visibility ──────────────────────
  const [isHidden, setIsHidden] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastScrollY.current;

      // Hide navbar when scrolling down past 120px, show on scroll up
      if (scrollingDown && currentY > 120) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // Switch navbar style: transparent on hero, opaque after
      setIsOnHero(currentY < 60);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset isOnHero when route changes (sub-pages don't have a hero)
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsOnHero(false);
    } else {
      setIsOnHero(window.scrollY < 60);
    }
  }, [location.pathname]);

  // ── Mobile menu ──────────────────────────────────
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav
        className={cn(
          "navbar",
          isHidden && "hidden-up",
          isOnHero && location.pathname === "/" && "on-hero"
        )}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "font-extrabold text-base tracking-tight transition-colors duration-200",
              isOnHero && location.pathname === "/"
                ? "text-white"
                : "text-foreground"
            )}
          >
            아주대 긱사 어디가
            <span
              className={cn(
                "ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
                isOnHero && location.pathname === "/"
                  ? "bg-white/20 text-white/80"
                  : "bg-primary/10 text-primary"
              )}
            >
              Beta
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive =
                href === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  to={href}
                  className={cn(
                    "nav-link px-3 py-1.5 rounded-lg",
                    isActive && "active",
                    isOnHero && location.pathname === "/"
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "hover:bg-muted"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="테마 전환"
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200",
                isOnHero && location.pathname === "/"
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Official site CTA — desktop only */}
            <a
              href={DORM_HOMEPAGE}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg transition-all duration-200",
                isOnHero && location.pathname === "/"
                  ? "bg-white/[0.12] text-white/80 hover:bg-white/[0.2] hover:text-white border border-white/20"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md"
              )}
            >
              <ExternalLink className="w-3 h-3" />
              공식 홈페이지
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="메뉴 열기"
              className={cn(
                "md:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200",
                isOnHero && location.pathname === "/"
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="absolute top-[var(--nav-height)] left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  href === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    to={href}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/[0.08] text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
              <a
                href={DORM_HOMEPAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                공식 홈페이지 바로가기
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
