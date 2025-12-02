
import { Link, useLocation } from "react-router-dom";
import { Home, Palette, FileText, TrendingUp, Settings, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const analysisItems: SidebarItem[] = [
  { icon: Palette, label: "Color Analysis", href: "/dashboard/color" },
  { icon: FileText, label: "Transcript Analysis", href: "/dashboard/transcript" },
  { icon: TrendingUp, label: "Trend Analysis", href: "/dashboard/trends" },
  { icon: Brain, label: "KNN Analysis", href: "/dashboard/knn" },
];

const SidebarNavItem = ({ item, isActive }: { item: SidebarItem; isActive: boolean }) => (
  <Link
    to={item.href}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
      isActive 
        ? "bg-accent text-accent-foreground" 
        : "text-gray-400 hover:bg-accent/50 hover:text-accent-foreground"
    )}
  >
    <item.icon size={20} />
    <span>{item.label}</span>
  </Link>
);

const DashboardSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-screen w-64 border-r border-white/10 bg-black/20 p-4 hidden md:block">
      <div className="flex items-center gap-2 mb-8">
        <Home size={24} className="text-primary" />
        <h2 className="text-xl font-semibold gradient-text">SocialPulse</h2>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="mb-2 text-lg font-medium text-white">Analysis Tools</h3>
          <nav className="space-y-1">
            {analysisItems.map((item) => (
              <SidebarNavItem 
                key={item.href} 
                item={item} 
                isActive={currentPath === item.href} 
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-4">
          <Link
            to="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-accent/50 hover:text-accent-foreground transition-all"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
