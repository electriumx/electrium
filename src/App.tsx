
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import Donation from "./pages/Donation";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import Navigation from "./components/Navigation";
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import SocialButtons from "./components/SocialButtons";
import PaymentSuccess from "./components/PaymentSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import CookieConsent from "./components/CookieConsent";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// Admin key handler component
const AdminKeyHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        
        // Store current location or restore previous location
        const prevPage = sessionStorage.getItem('prevPageBeforeAdmin');
        
        if (location.pathname === '/admin') {
          // If currently on admin page, go back to previous page
          if (prevPage) {
            navigate(prevPage);
          } else {
            navigate('/');
          }
        } else {
          // Store current page and go to admin
          sessionStorage.setItem('prevPageBeforeAdmin', location.pathname);
          navigate('/admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname]);
  
  return null;
};

const App = () => {
  const [themeChangeAllowed, setThemeChangeAllowed] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    return localStorage.getItem('cookieConsent') !== 'accepted';
  });

  // Load theme from admin settings
  useEffect(() => {
    const adminSettings = localStorage.getItem('adminSettings');
    if (adminSettings) {
      try {
        const settings = JSON.parse(adminSettings);
        if (settings.darkMode !== undefined) {
          if (settings.darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      } catch (e) {
        console.error('Error parsing admin settings:', e);
      }
    }
  }, []);

  // Add this effect to handle the theme change cooldown
  useEffect(() => {
    const handleThemeChange = () => {
      if (themeChangeAllowed) {
        setThemeChangeAllowed(false);
        setTimeout(() => {
          setThemeChangeAllowed(true);
        }, 2000); // 2-second cooldown
      }
    };

    // Listen for theme changes
    window.addEventListener('themechange', handleThemeChange);

    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, [themeChangeAllowed]);

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <BrowserRouter>
            <AuthProvider>
              <AdminKeyHandler />
              <Toaster />
              <Sonner />
              <TopNavigation />
              <Navigation />
              <div className="pt-16">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/donation" element={<Donation />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <SocialButtons />
              <Footer />
              {showCookieConsent && <CookieConsent onAccept={handleCookieAccept} />}
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
