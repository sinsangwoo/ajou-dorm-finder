/**
 * src/App.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Vite SPA 진입점 — Next.js 마이그레이션 완료 전까지 유지.
 *
 * [TS Fix] Navbar named import:
 *   Navbar.tsx 는 `export function Navbar()` (named export) 이므로
 *   `import { Navbar }` 로 가져와야 한다.
 *   이전: `import Navbar from '@/components/Navbar'`  ← default import (잘못됨)
 *   수정: `import { Navbar } from '@/components/Navbar'`
 *
 * NOTE: react-router-dom 기반 라우팅은 src/App.tsx / src/pages/ 전용.
 *       Next.js 빌드 대상(src/app/)에서는 절대 사용하지 않는다.
 */
import { Toaster }                              from '@/components/ui/toaster';
import { Toaster as Sonner }                    from '@/components/ui/sonner';
import { TooltipProvider }                      from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider }     from '@tanstack/react-query';
import { BrowserRouter, Routes, Route }         from 'react-router-dom';
import { Navbar }                               from '@/components/Navbar';   // named export
import Index                                    from './pages/Index';
import DormsPage                                from './pages/DormsPage';
import DormDetailPage                           from './pages/DormDetailPage';
import CalculatorPage                           from './pages/CalculatorPage';
import NotFound                                 from './pages/NotFound';
import { useTheme }                             from '@/hooks/useTheme';

const queryClient = new QueryClient();

// Inner wrapper — useLocation 사용을 위해 BrowserRouter 내부에 위치
function AppShell() {
  useTheme();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Index />} />
        <Route path="/dorms"      element={<DormsPage />} />
        <Route path="/dorms/:id"  element={<DormDetailPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
