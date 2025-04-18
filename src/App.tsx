
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import ColorAnalysis from "./pages/ColorAnalysis";
import TranscriptAnalysis from "./pages/TranscriptAnalysis";
import TrendAnalysis from "./pages/TrendAnalysis";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ColorAnalysisDashboard from "./pages/dashboard/ColorAnalysisDashboard";

// Create QueryClient outside of the component
const queryClient = new QueryClient();

// Wrap everything in a proper function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes with navigation */}
            <Route path="/" element={<><Navigation /><Index /></>} />
            <Route path="/color-analysis" element={<><Navigation /><ColorAnalysis /></>} />
            <Route path="/transcript-analysis" element={<><Navigation /><TranscriptAnalysis /></>} />
            <Route path="/trend-analysis" element={<><Navigation /><TrendAnalysis /></>} />
            <Route path="/login" element={<><Navigation /><Login /></>} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="color" element={<ColorAnalysisDashboard />} />
              {/* More dashboard routes will be added as needed */}
              <Route path="*" element={<NotFound />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
