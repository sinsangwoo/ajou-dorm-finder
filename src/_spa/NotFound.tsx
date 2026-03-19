/**
 * src/_spa/NotFound.tsx — Vite SPA 라우팅용 404 페이지
 *
 * ⚠️  이 파일은 src/App.tsx (react-router-dom) 전용입니다.
 *    Next.js 404는 src/app/not-found.tsx 를 사용합니다.
 */
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-4">페이지를 찾을 수 없습니다</p>
      <Link to="/" className="text-primary hover:underline">홈으로 돌아가기</Link>
    </div>
  </div>
);

export default NotFound;
