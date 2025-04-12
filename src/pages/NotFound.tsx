
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-9xl font-bold text-primary/30">404</div>
        <h1 className="text-2xl font-bold mt-4 mb-6">Page Not Found</h1>
        <p className="text-muted-foreground text-center max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/dashboard">
          <Button>
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}

export default NotFound;
