# Next.js 15 App Router Migration Guide

> 작성일: 2026-02-21 | Phase 4

## 왜 Next.js 15인가?

| 구조 | Vite CSR | Next.js 15 App Router |
|---|---|---|
| 예비 렌더링 | 없음(레이아웃 전유) | RSC + ISR + PPR 정적 생성 |
| LCP | 1.8~2.5s (CSR 하이드레이) | <1s (엉 CDN, 정적 HTML 즉시 제공) |
| SEO | JS 실행 전 콘텐츠 없음 | 정적 HTML + `<head>` 메타데이터 |
| 데이터 패치 | 클라이언트에서 `useEffect` | RSC `async/await` 서버측 fetch |
| 지역적 우선순위 | 없음 | `next/font`, `optimizePackageImports` |

## 아키텍쳍 원칙 (RSC vs Client)

```
src/app/
├── layout.tsx          → RSC   (쉽 없음, HTML 쿠키)
├── page.tsx            → RSC + PPR
├── calculator/
│   └── page.tsx        → RSC 쉘 + Client Island
├── dorms/
│   ├── page.tsx        → RSC (Supabase fetch)
│   └── [id]/page.tsx   → RSC + generateStaticParams (6개 정적)
src/components/
├── Providers.tsx       → 'use client' (단일 바운더리)
├── Navbar.tsx          → 'use client' (usePathname, useTheme)
├── DormsView.tsx       → 'use client' (useSearchParams, framer-motion)
├── DormRoomChart.tsx   → 'use client' (recharts — DOM 필요)
├── ScoreCalculator.tsx → 'use client' (인터랙티브)
└── OfficialDataBadge.tsx → RSC (pure HTML, 0 JS)
src/lib/supabase/
├── client.ts           → dual-client (browser + server)
├── database.types.ts   → TypeScript 스키마
├── dormitories.ts      → React.cache() 서버 패치어
└── schema.sql          → Supabase 초기화 DDL
```

## 전환 체크리스트

### 패키지 변경
- ❌ `vite`, `react-router-dom` 제거
- ✅ `next@15`, `next-themes` 추가
- ✅ `@supabase/supabase-js` 추가
- ✅ `framer-motion` 명시적 선언 (이전 Phase 2에서 사용되었으나 devDep에만 있었음)

### React-Router → Next.js 매핑

| react-router-dom | Next.js |
|---|---|
| `<BrowserRouter>` | App Router 내장 |
| `<Route path>` | `src/app/**` 파일 구조 |
| `<Link to>` | `<Link href>` (next/link) |
| `useLocation().pathname` | `usePathname()` (next/navigation) |
| `useNavigate()` | `useRouter().push()` |
| `useSearchParams()` | `useSearchParams()` (next/navigation) |
| `useParams()` | RSC `params` prop (Promise in Next.js 15) |

### 테마 시스템
- 커스텀 `useTheme` hook(localStorage) → `next-themes` `useTheme`
- `ThemeProvider` 확장자: `attribute="class"`, `enableSystem`, `disableTransitionOnChange`

## 성능 목표

| 메트릭 | 목표 | 처리 |
|---|---|---|
| LCP | < 1.0s | RSC 정적 HTML + CDN edge |
| FID / INP | < 100ms | 클라이언트 아일랜드 최소화 |
| CLS | < 0.1 | next/font 자체 호스팅, animate-pulse 스켈레튼 |
| SEO | Lighthouse 100 | `generateMetadata`, OG/Twitter 태그 |

## 정보 신뢰성 원칙

1. **단일 진실 소스**: `scoreEngine.ts`, `dormitoryData.ts`, `dormInfo.ts` 외의 원천에서 데이터를 가져오지 않습니다.
2. **에러 일엁(Fake Data 금지)**: 합격라인 추정, 가상 분포 데이터 일체 금지.
3. **보증문구**: 모든 결과 페이지에 `OfficialDataBadge` + 하단 disclaimer 필수 의무.
4. **Supabase 통합**: 정적 파일 없이 DB만 있는 실행 환경에서도 정적 파일 fallback으로 완전히 동작.

## 로컈 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env.local
# .env.local에 Supabase URL + anon key 입력 (선택 사항)

# 3. 개발 서버 시작
npm run dev    # http://localhost:3000

# 4. 프로덕션 빌드 테스트
npm run build
npm run start

# 5. 단위테스트
npm test
```

## Supabase 설정 (선택)

```sql
-- Supabase SQL Editor에서 실행
-- src/lib/supabase/schema.sql 전체 내용 포스트
```

### 온디맨드 재검증 (ISR)

```bash
curl -X POST https://your-site.vercel.app/api/revalidate \
  -H 'Authorization: Bearer $REVALIDATION_SECRET' \
  -d '{"path":"/"}'
```
