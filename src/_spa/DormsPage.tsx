/**
 * src/_spa/DormsPage.tsx — Vite SPA 라우팅용 페이지
 *
 * ⚠️  이 파일은 src/App.tsx (react-router-dom) 전용입니다.
 *    Next.js App Router 라우트는 src/app/dorms/page.tsx 를 사용합니다.
 *    폴더명 _spa 는 Next.js Pages Router 탐색에서 제외됩니다.
 */
import DormsView from '@/components/DormsView';
import Footer    from '@/components/Footer';
import { dormitories } from '@/data/dormitoryData';

export default function DormsPage() {
  return (
    <div className="min-h-screen page-top">
      <DormsView dormitories={dormitories} />
      <Footer />
    </div>
  );
}
