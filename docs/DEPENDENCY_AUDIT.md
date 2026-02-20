# Dependency Audit Report
**작성일**: 2026-02-21  
**대상**: `sinsangwoo/ajou-dorm-finder`  
**분석 범위**: `package.json` ↔ `src/` 전체 코드 교차 검증

---

## 제거 권장 패키지 (Unused / Bloat)

### npm 패키지 (dependencies)

| 패키지 | 설치됨 | 실제 사용 여부 | 예상 절감 |
|--------|--------|---------------|-----------|
| `embla-carousel-react` | ✅ | ❌ carousel 미사용 | ~18KB gz |
| `input-otp` | ✅ | ❌ OTP 기능 없음 | ~4KB gz |
| `vaul` | ✅ | ❌ Drawer 미사용 (vaul 기반) | ~6KB gz |
| `react-day-picker` | ✅ | ❌ 날짜 선택 UI 없음 | ~28KB gz |
| `@hookform/resolvers` | ✅ | ❌ Form validation 없음 | ~3KB gz |
| `react-hook-form` | ✅ | ❌ 폼 없음 | ~11KB gz |
| `zod` | ✅ | ❌ schema validation 없음 | ~12KB gz |
| `react-resizable-panels` | ✅ | ❌ resizable UI 없음 | ~5KB gz |
| `cmdk` | ✅ | ❌ Command palette 없음 | ~7KB gz |
| `date-fns` | ✅ | ❌ 날짜 처리 없음 | ~15KB gz |

**예상 총 번들 절감: ~109KB gzipped**

### Radix UI 패키지 (사용하지 않는 것)

| 패키지 | 대응 ui/ 컴포넌트 | 해당 컴포넌트 사용처 |
|--------|------------------|---------------------|
| `@radix-ui/react-context-menu` | `context-menu.tsx` | ❌ 미사용 |
| `@radix-ui/react-hover-card` | `hover-card.tsx` | ❌ 미사용 |
| `@radix-ui/react-menubar` | `menubar.tsx` | ❌ 미사용 |
| `@radix-ui/react-navigation-menu` | `navigation-menu.tsx` | ❌ 미사용 |
| `@radix-ui/react-aspect-ratio` | `aspect-ratio.tsx` | ❌ 미사용 |
| `@radix-ui/react-avatar` | `avatar.tsx` | ❌ 미사용 |
| `@radix-ui/react-checkbox` | `checkbox.tsx` | ❌ 미사용 |
| `@radix-ui/react-collapsible` | `collapsible.tsx` | ❌ 미사용 |
| `@radix-ui/react-radio-group` | `radio-group.tsx` | ❌ 미사용 |
| `@radix-ui/react-toggle` | `toggle.tsx` | ❌ 미사용 |
| `@radix-ui/react-toggle-group` | `toggle-group.tsx` | ❌ 미사용 |

**예상 Radix 절감: ~35KB gzipped**

---

## 실제 사용 중인 패키지 (유지)

| 패키지 | 사용처 |
|--------|--------|
| `react`, `react-dom` | 전체 |
| `react-router-dom` | App.tsx 라우팅 |
| `@tanstack/react-query` | App.tsx QueryClient (서버 연동 준비) |
| `lucide-react` | 전 컴포넌트 아이콘 |
| `recharts` | ScoreCalculator 차트 |
| `tailwind-merge`, `clsx`, `class-variance-authority` | cn() 유틸리티 |
| `tailwindcss-animate` | 애니메이션 |
| `next-themes` | useTheme 다크모드 |
| `sonner` | Toaster |
| `framer-motion` | DormsView 애니메이션 |
| `@radix-ui/react-select` | ScoreCalculator, DormsView |
| `@radix-ui/react-slider` | ScoreCalculator |
| `@radix-ui/react-switch` | ScoreCalculator |
| `@radix-ui/react-label` | ScoreCalculator |
| `@radix-ui/react-tooltip` | ScoreCalculator |
| `@radix-ui/react-dialog` | 추후 모달 용도 |
| `@radix-ui/react-badge` (badge.tsx) | 다수 컴포넌트 |
| `@radix-ui/react-scroll-area` | ComparisonPanel |
| `@radix-ui/react-tabs` | ComparisonPanel |
| `@radix-ui/react-progress` | EligibilityResult |
| `@radix-ui/react-accordion` | FreshmanGuide |
| `@radix-ui/react-separator` | Navbar |
| `@radix-ui/react-popover` | Navbar |
| `@radix-ui/react-dropdown-menu` | Navbar |
| `@radix-ui/react-toast` | App.tsx Toaster |

---

## 제거 실행 커맨드

```bash
# npm 패키지 제거
npm uninstall \
  embla-carousel-react \
  input-otp \
  vaul \
  react-day-picker \
  @hookform/resolvers \
  react-hook-form \
  zod \
  react-resizable-panels \
  cmdk \
  date-fns

# Radix UI 제거
npm uninstall \
  @radix-ui/react-context-menu \
  @radix-ui/react-hover-card \
  @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu \
  @radix-ui/react-aspect-ratio \
  @radix-ui/react-avatar \
  @radix-ui/react-checkbox \
  @radix-ui/react-collapsible \
  @radix-ui/react-radio-group \
  @radix-ui/react-toggle \
  @radix-ui/react-toggle-group
```

> **주의**: 패키지 제거 후 대응되는 `src/components/ui/` 파일도 함께 삭제해야 합니다.
> (`carousel.tsx`, `input-otp.tsx`, `drawer.tsx`, `calendar.tsx` 등)

---

## 전후 예상 번들 크기

| 구분 | Before | After (예상) |
|------|--------|-------------|
| Initial JS bundle | ~850KB gz | ~706KB gz |
| 절감률 | — | **약 17%** |

> 실제 수치는 `vite build --report` 후 rollup-plugin-visualizer로 확인 권장.

---

*이 문서는 [TD-3] 기술 부채 해결의 일환으로 작성되었습니다.*  
*실제 제거 PR은 별도 `chore/remove-unused-deps` 브랜치에서 진행 권장.*
