import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import DormsPage from "./pages/DormsPage";
import DormDetailPage from "./pages/DormDetailPage";
import CalculatorPage from "./pages/CalculatorPage";
import NotFound from "./pages/NotFound";
import { useTheme } from "@/hooks/useTheme";

const queryClient = new QueryClient();

// Inner wrapper so Navbar can use useLocation (inside BrowserRouter)
function AppShell() {
  // Initialize theme on mount — side effect runs inside BrowserRouter
  useTheme();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Index />} />
        <Route path="/dorms"          element={<DormsPage />} />
        <Route path="/dorms/:id"      element={<DormDetailPage />} />
        <Route path="/calculator"     element={<CalculatorPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*"               element={<NotFound />} />
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
