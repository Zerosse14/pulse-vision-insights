
import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Menu, User, Bell } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top navigation */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="container px-4 h-14 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </Button>
          <div className="md:hidden">
            <h1 className="text-lg font-semibold gradient-text">SocialPulse</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar for desktop */}
        <DashboardSidebar />

        {/* Mobile sidebar */}
        <div 
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden",
            sidebarOpen ? "block" : "hidden"
          )}
          onClick={() => setSidebarOpen(false)}
        >
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-background border-r border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <DashboardSidebar />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6 px-4 md:px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
