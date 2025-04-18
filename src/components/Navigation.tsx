
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavigationMenu className="py-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/color-analysis" className={navigationMenuTriggerStyle()}>
                Color Analysis
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/transcript-analysis" className={navigationMenuTriggerStyle()}>
                Transcript Analysis
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/trend-analysis" className={navigationMenuTriggerStyle()}>
                Trend Analysis
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link to="/login">
              <UserCircle size={18} />
              Login
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
