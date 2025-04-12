
import { Button } from "@/components/ui/button";
import { Calendar, LayoutDashboard, Plus, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function SiteHeader() {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">
              ProjectPilot
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-2">
            <Link to="/dashboard">
              <Button 
                variant={location.pathname === "/dashboard" ? "default" : "ghost"} 
                size="sm"
                className="text-sm font-medium"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/calendar">
              <Button 
                variant={location.pathname === "/calendar" ? "default" : "ghost"} 
                size="sm"
                className="text-sm font-medium"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
            </Link>
            <Link to="/new-project">
              <Button size="sm" className="ml-2">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="ml-1">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
