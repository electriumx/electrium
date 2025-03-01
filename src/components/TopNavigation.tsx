
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const TopNavigation = () => {
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-lg font-bold text-foreground">Electrium</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-b-2 hover:border-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/products' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-b-2 hover:border-primary'
              }`}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/about' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-b-2 hover:border-primary'
              }`}
            >
              About
            </Link>
            <Link
              to="/donation"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/donation' 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-b-2 hover:border-primary'
              }`}
            >
              Donation
            </Link>
            <a
              href="#"
              onClick={handleContactClick}
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:border-b-2 hover:border-primary"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link to="/settings">
                  <Button variant="outline" size="sm">
                    Settings
                  </Button>
                </Link>
                <Button variant="default" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/' 
                  ? 'text-primary border-l-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-l-2 hover:border-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/products' 
                  ? 'text-primary border-l-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-l-2 hover:border-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/about' 
                  ? 'text-primary border-l-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-l-2 hover:border-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/donation"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === '/donation' 
                  ? 'text-primary border-l-2 border-primary' 
                  : 'text-foreground hover:text-primary hover:border-l-2 hover:border-primary'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Donation
            </Link>
            <a
              href="#"
              onClick={(e) => {
                handleContactClick(e);
                setIsOpen(false);
              }}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:border-l-2 hover:border-primary"
            >
              Contact
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:border-l-2 hover:border-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:border-l-2 hover:border-primary"
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:border-l-2 hover:border-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:border-l-2 hover:border-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavigation;
