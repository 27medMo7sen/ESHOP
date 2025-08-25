import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Moon, Sun, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="gradient-primary p-2 rounded-xl shadow-glow group-hover:shadow-elegant transition-spring">
                <Store className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                ESHOP
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`font-medium transition-smooth hover:text-primary ${
                  location.pathname === "/"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className={`font-medium transition-smooth hover:text-primary ${
                  location.pathname === "/categories" ||
                  location.pathname.startsWith("/category/")
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className={`font-medium transition-smooth hover:text-primary ${
                  location.pathname === "/about"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                About
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="transition-spring hover:shadow-card"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="relative transition-spring hover:shadow-card"
              >
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 gradient-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-elegant">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 ModernShop. Built with modern design principles.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
