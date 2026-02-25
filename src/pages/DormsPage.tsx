/**
 * src/pages/DormsPage.tsx — Vite SPA 라우팅용 페이지
 * ─────────────────────────────────────────────────────────────────────────────
 * [TS Fix] DormsView required prop `dormitories` 누락:
 *   DormsView의 Props 인터페이스:
 *     interface DormsViewProps {
 *       dormitories: Dormitory[];   // required
 *       initialGender?: ...
 *       initialType?:   ...
 *     }
 *   Vite SPA 환경에서는 서버 데이터 페치가 없으므로
 *   빈 배열 [] 을 기본값으로 전달.
 *   (실제 데이터는 Next.js App Router의 src/app/dorms/page.tsx에서
 *   getDormitories() RSC fetch로 제공됨)
 */
import DormsView from '@/components/DormsView';
import Footer    from '@/components/Footer';
import { dormitories } from '@/data/dormitoryData';

export default function DormsPage() {
  return (
    <div className="min-h-screen page-top">
      {/* [TS Fix] dormitories prop 공급 — 정적 데이터 소스 사용 */}
      <DormsView dormitories={dormitories} />
      <Footer />
    </div>
  );
}
