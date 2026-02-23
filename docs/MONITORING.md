# 모니터링 & 론치 체크리스트

> Phase 5 완료 기준

## Vercel Analytics 설정

### 1단계: 패키지 설치

```bash
npm install @vercel/analytics @vercel/speed-insights
```

### 2단계: `src/app/layout.tsx`에 컴포넌트 삽입

```tsx
import { VercelAnalytics } from '@/components/Analytics';

// <body> 난로 단 안에 삽입
<VercelAnalytics />
```

### 3단계: Vercel 대시보드

- `vercel.com/[team]/ajou-dorm-finder/analytics` → 페이지저/방문자
- `vercel.com/[team]/ajou-dorm-finder/speed-insights` → Core Web Vitals

---

## 목표 수치 (Production SLOs)

| 메트릭 | 목표 | 측정 도구 |
|---|---|---|
| LCP | < 1.0s | Vercel SpeedInsights |
| INP | < 100ms | Vercel SpeedInsights |
| CLS | < 0.05 | Vercel SpeedInsights |
| TTFB | < 200ms | Vercel Analytics |
| Lighthouse 성능 | ≥ 95 | Lighthouse CI |
| Lighthouse SEO | 100 | Lighthouse CI |
| Lighthouse 접근성 | ≥ 95 | Lighthouse CI |

---

## 보안 헤더 검증

```bash
# 모든 보안 헤더 확인
npx check-headers https://ajou-dorm-finder.vercel.app

# CSP 평가 (A~F 등급)
curl -s -D - https://ajou-dorm-finder.vercel.app | grep content-security-policy
```

### 목표 등급

| 도구 | 목표 |
|---|---|
| securityheaders.com | **A+** |
| SSL Labs | **A** |
| Mozilla Observatory | **A+** (타겟 점수 100) |

---

## E2E 테스트 실행

```bash
# 로컈 실행
npx playwright install --with-deps
npm run build && npx playwright test

# 특정 파일만
npx playwright test tests/e2e/core-flow.spec.ts

# UI 모드 (브라우저 실시간 확인)
npx playwright test --ui
```

---

## 본번 론치 체크리스트

### Pre-launch (PR 머지 전)

- [ ] `npm run build` 성공 (보두 없음)
- [ ] `npm test` 72개 단위테스트 통과
- [ ] Playwright E2E 전체 통과
- [ ] Chrome DevTools Lighthouse 로컈 실행 (LCP < 1s)
- [ ] `/sitemap.xml` 접근 확인
- [ ] `/robots.txt` Disallow: /api/ 확인
- [ ] OG 태그 미리보기: https://developers.facebook.com/tools/debug/ 입력 테스트
- [ ] KakaoTalk 공유 미리보기: https://developers.kakao.com/tool/debugger/sharing
- [ ] securityheaders.com A+ 등급 확인
- [ ] Supabase RLS 정상 동작 확인 (SELECT 공개, INSERT service-role 전용)
- [ ] Vercel preview URL 동작 전체 확인
- [ ] `.env.example` 모든 키 기재 여부

### Post-launch (배포 후)

- [ ] Vercel SpeedInsights LCP 수치 모니터링
- [ ] 네이버 서치어드바이저 sitemap 제출: searchadvisor.naver.com
- [ ] Google Search Console sitemap 등록
- [ ] 철약 30일후 Core Web Vitals 검토

---

## 철대일정 알림 (ISR)

Supabase notices 테이블 변경 후 자동 재검증:

```sql
-- Supabase SQL Editor
create or replace function notify_revalidate()
returns trigger language plpgsql as $$
begin
  perform net.http_post(
    url := current_setting('app.site_url') || '/api/revalidate',
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || current_setting('app.revalidation_secret')
    ),
    body := jsonb_build_object('path', '/')
  );
  return new;
end;
$$;

create trigger on_notice_change
  after insert or update on notices
  for each row execute procedure notify_revalidate();
```

```sql
-- Supabase Dashboard > Settings > Vault
set app.site_url = 'https://ajou-dorm-finder.vercel.app';
set app.revalidation_secret = '<your-secret>';
```
