/**
 * MobileTabNav.tsx — Phase 1: 모바일 하단 탭 네비게이션
 *
 * 모바일에서 md 미만 화면에만 표시됩니다.
 * md 이상에서는 기존 Navbar가 유지됩니다.
 */

import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "홈", icon: Home },
  { href: "/dorms", label: "기숙사", icon: Building2 },
  { href: "/calculator", label: "점수 계산기", icon: Calculator },
];

export default function MobileTabNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 safe-area-inset-bottom"
      role="navigation"
      aria-label="하단 탭 네비게이션"
    >
      <div className="flex items-stretch h-16">
        {TABS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(href);

          return (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all duration-200 active:scale-95",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div
                className={cn(
                  "w-10 h-6 rounded-full flex items-center justify-center transition-all duration-200",
                  isActive ? "bg-primary/10" : ""
                )}
              >
                <Icon className={cn("w-4.5 h-4.5", isActive && "text-primary")} />
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
