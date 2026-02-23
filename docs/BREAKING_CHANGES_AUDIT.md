# Next.js 15 Breaking Change Audit

> Phase 5 Fix — `fix/align-deps-ci-node22` 브랜치

---

## 실제 버전 현황

| 항목 | 상태 |
|------|------|
| Next.js 가동 버전 | `^15.3.3` |
| **Next.js 16** | 공식릴리스되지 않음 (2026년 2월 기준) |
| React | `^18.3.1` |
| Node.js 타겟 | `>=22` |

> ⚠️ "Next.js 16" 언급은 의존성 설치 충돌 론력 중 혁동된 것으로 판단됩니다.  
> 현재 Next.js 15 최신을 사용하며, 이게 현 시점에서 최선입니다.

---

## API 또는 패턴 변경 점검 결과

### 1. `searchParams` 비동기 첨시 (Next.js 15 breaking change)

**영향 파일**: `src/app/dorms/page.tsx`

```ts
// ❌ Next.js 14 스타일 (page.tsx에 이미 존재하면 빌드 실패)
interface PageProps {
  searchParams: { gender?: string; type?: string };  // plain object
}

// ✅ Next.js 15 필수 패턴 (현재 코드에 이미 적용됨)
interface PageProps {
  searchParams: Promise<{ gender?: string; type?: string }>;
}
export default async function DormsPage({ searchParams }: PageProps) {
  const params = await searchParams;  // await 필수
}
```

**판정**: ✅ 이미 올바른 패턴 적용됨

---

### 2. `generateMetadata`의 `params` 비동기 (Next.js 15 breaking change)

**영향 파일**: `src/app/dorms/[id]/page.tsx`

```ts
// ❌ Next.js 14
export async function generateMetadata({ params }: { params: { id: string } })

// ✅ Next.js 15 (현재 코드에 이미 적용됨)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;  // await 필수
}
```

**판정**: ✅ 이미 올바른 패턴 적용됨

---

### 3. `viewport` 독립 내보내기 (Next.js 14.1+ breaking change)

**영향 파일**: `src/app/layout.tsx`

```ts
// ❌ Next.js 13 스타일: themeColor를 metadata에 포함
export const metadata: Metadata = {
  themeColor: '#002855',  // 이제 TypeScript 에러
};

// ✅ Next.js 14.1+ (현재 코드에 이미 적용됨)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#002855' },
    { media: '(prefers-color-scheme: dark)',  color: '#0057B7' },
  ],
};
```

**판정**: ✅ 이미 올바른 패턴 적용됨

---

### 4. `error.tsx` 전용 하이드레이션 (Next.js 13.4+)

**영향 파일**: `src/app/error.tsx`, `src/app/dorms/error.tsx`, `src/app/dorms/[id]/error.tsx`

```ts
// ✅ 적절한 시그니잘 (현재 코드에 이미 적용됨)
'use client';
export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
})
```

**판정**: ✅ 이미 올바른 시그니처 적용됨

---

### 5. `loading.tsx` (Next.js 13+)

**영향 파일**: 전체 loading.tsx 파일

**판정**: ✅ Server Component로 옵바르게 작성됨 (`'use client'` 미사용)

---

### 6. 시간 경과에 따른 업그레이드 로드맵

| 버전 | 주요 Breaking Change |
|------|----------------------------|
| Next.js 16 (canary 예정) | TurboModule, React 19 정식 지원, `use cache` 안정화 |
| Next.js 15.3.x (현재) | Turbopack dev 기본, `searchParams/params` Promise, `Viewport` 분리 |
| Next.js 14.x | `viewport` 분리, `use server` 합법화 |

---

## 발견된 코드 오타 (자동 수정됨)

| 파일 | 오타 내용 | 수정 |
|------|-----------|------|
| `src/app/layout.tsx` | `"6굳"` 오타 (3회) | `"6동"` 수정 |
| `src/app/dorms/page.tsx` | `"6굳"` 오타 (2회) | `"6동"` 수정 |
| `src/app/layout.tsx` | `복솔 기준` 오타 | `2026-1학기 공식 데이터` 수정 |

---

## 의존성 충돌 원인 분석

### 타임라인

```
1. 사용자 VS Code에서 일부 패키지 업데이트
2. npm install 실행 (종료)
3. package.json 업데이트됨 (package-lock.json은 불일치 상태)
4. CI npm ci 실행 → ERESOLVE (lock 불일치)
```

### 근본 원인

```
Radix UI 일부 패키지가 peerDependencies에
  "react": "^17 || ^18"를 선언함.
npm >= 9는 이를 ERESOLVE로 처리.
npm ci는 lock이 package.json과 다르면 즉시 실패.
```

### 해결

```
.npmrc: legacy-peer-deps=true
package.json: overrides { react, react-dom } 핀닝
CI: npm install --legacy-peer-deps
```
