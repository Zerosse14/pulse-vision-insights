
import React from 'react';
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
import VideoAnalysis from "./pages/VideoAnalysis";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ColorAnalysisDashboard from "./pages/dashboard/ColorAnalysisDashboard";
import TranscriptAnalysisDashboard from "./pages/dashboard/TranscriptAnalysisDashboard";
import TrendAnalysisDashboard from "./pages/dashboard/TrendAnalysisDashboard";
import SettingsDashboard from "./pages/dashboard/SettingsDashboard";
import TwitterDashboard from "./pages/dashboard/TwitterDashboard";
import InstagramDashboard from "./pages/dashboard/InstagramDashboard";

// Create QueryClient outside of the component
const queryClient = new QueryClient();

function App() {
  return (
    <React.Fragment>
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
              <Route path="/video-analysis" element={<><Navigation /><VideoAnalysis /></>} />
              <Route path="/login" element={<><Navigation /><Login /></>} />
              
              {/* Dashboard routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="color" element={<ColorAnalysisDashboard />} />
                <Route path="transcript" element={<TranscriptAnalysisDashboard />} />
                <Route path="trends" element={<TrendAnalysisDashboard />} />
                <Route path="settings" element={<SettingsDashboard />} />
                <Route path="platform/twitter" element={<TwitterDashboard />} />
                <Route path="platform/instagram" element={<InstagramDashboard />} />
                <Route path="platform/youtube" element={<div>YouTube Dashboard Coming Soon</div>} />
                <Route path="platform/facebook" element={<div>Facebook Dashboard Coming Soon</div>} />
                <Route path="*" element={<NotFound />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
