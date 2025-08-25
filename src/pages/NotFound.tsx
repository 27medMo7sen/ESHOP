import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild size="lg" className="gradient-primary hover:shadow-glow transition-spring">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
