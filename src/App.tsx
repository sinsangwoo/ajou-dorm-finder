/**
 * src/App.tsx — Vite SPA 진입점
 *
 * ⚠️  src/pages/ → src/_spa/ 로 이동:
 *    Next.js는 src/pages/ 폴더를 Pages Router로 인식합니다.
 *    파일명이 PascalCase라도 Next.js가 라우트로 등록하고
 *    react-router-dom 컴포넌트를 RouterContext 없이 SSR 하려다 crash 합니다.
 *    _spa 접두사 폴더는 Next.js 라우트 탐색에서 완전히 제외됩니다.
 */
import { Toaster }                              from '@/components/ui/toaster';
import { Toaster as Sonner }                    from '@/components/ui/sonner';
import { TooltipProvider }                      from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider }     from '@tanstack/react-query';
import { BrowserRouter, Routes, Route }         from 'react-router-dom';
import { Navbar }                               from '@/components/Navbar';
import MobileTabNav                             from '@/components/MobileTabNav';
import Index                                    from './_spa/Index';
import DormsPage                                from './_spa/DormsPage';
import DormDetailPage                           from './_spa/DormDetailPage';
import CalculatorPage                           from './_spa/CalculatorPage';
import NotFound                                 from './_spa/NotFound';
import { useTheme }                             from '@/hooks/useTheme';

const queryClient = new QueryClient();

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
      <MobileTabNav />
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
