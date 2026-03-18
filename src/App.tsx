/**
 * src/App.tsx
 * Phase 1 업그레이드: MobileTabNav 추가
 */
import { Toaster }                              from '@/components/ui/toaster';
import { Toaster as Sonner }                    from '@/components/ui/sonner';
import { TooltipProvider }                      from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider }     from '@tanstack/react-query';
import { BrowserRouter, Routes, Route }         from 'react-router-dom';
import { Navbar }                               from '@/components/Navbar';
import MobileTabNav                             from '@/components/MobileTabNav';
import Index                                    from './pages/Index';
import DormsPage                                from './pages/DormsPage';
import DormDetailPage                           from './pages/DormDetailPage';
import CalculatorPage                           from './pages/CalculatorPage';
import NotFound                                 from './pages/NotFound';
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
      {/* 모바일 전용 하단 탭 */}
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
