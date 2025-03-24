
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Wishlist from "./pages/Wishlist";
import Navigation from "./components/Navigation";
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import SocialButtons from "./components/SocialButtons";
import PaymentSuccess from "./components/PaymentSuccess";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import CookieConsent from "./components/CookieConsent";
import AIChat from "./components/AIChat";
import RouteTracker from "./components/RouteTracker";
import BackButton from "./components/BackButton";

const queryClient = new QueryClient();

// Protected route component for Admin
const AdminRoute = () => {
  const { currentUser } = useAuth();
  const isAdminUser = currentUser?.username === "Omar Tarek" && currentUser?.password === "otdk1234";
  
  return isAdminUser ? <Admin /> : <Navigate to="/" replace />;
};

// Protected route component for payment page
const ProtectedPaymentRoute = () => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? <Payment /> : <Navigate to="/login" replace />;
};

// Admin key handler component
const AdminKeyHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loginAsAdmin } = useAuth();
  
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
          
          // Check if user is Omar Tarek
          if (currentUser?.username === "Omar Tarek" && currentUser?.password === "otdk1234") {
            navigate('/admin');
          } else if (currentUser?.username === "Omar Tarek") {
            loginAsAdmin();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname, currentUser, loginAsAdmin]);
  
  return null;
};

// Page wrapper component that includes BackButton for all pages except home
const PageWithBackButton = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showBackButton = location.pathname !== '/';
  
  return (
    <div className="relative">
      {showBackButton && <BackButton />}
      {children}
    </div>
  );
};

// Main app wrapper that uses the auth context
const AppWithAuth = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Check if cookie consent has been shown to this account
    if (isAuthenticated && currentUser) {
      const cookieConsent = localStorage.getItem(`cookieConsent_${currentUser.username}`);
      setShowCookieConsent(!cookieConsent);
    } else if (!isAuthenticated) {
      // For non-authenticated users, use a generic key
      const cookieConsent = localStorage.getItem('cookieConsent_guest');
      setShowCookieConsent(!cookieConsent);
    }
  }, [isAuthenticated, currentUser]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleCookieAccept = () => {
    if (isAuthenticated && currentUser) {
      localStorage.setItem(`cookieConsent_${currentUser.username}`, 'accepted');
    } else {
      localStorage.setItem('cookieConsent_guest', 'accepted');
    }
    setShowCookieConsent(false);
  };

  return (
    <>
      <AdminKeyHandler />
      <RouteTracker />
      <Toaster />
      <Sonner />
      <TopNavigation toggleChat={toggleChat} />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<PageWithBackButton><Products /></PageWithBackButton>} />
          <Route path="/about" element={<PageWithBackButton><About /></PageWithBackButton>} />
          <Route path="/checkout" element={<PageWithBackButton><Checkout /></PageWithBackButton>} />
          <Route path="/payment" element={<PageWithBackButton><ProtectedPaymentRoute /></PageWithBackButton>} />
          <Route path="/payment-success" element={<PageWithBackButton><PaymentSuccess /></PageWithBackButton>} />
          <Route path="/login" element={<PageWithBackButton><Login /></PageWithBackButton>} />
          <Route path="/register" element={<PageWithBackButton><Register /></PageWithBackButton>} />
          <Route path="/thank-you" element={<PageWithBackButton><ThankYou /></PageWithBackButton>} />
          <Route path="/donation" element={<PageWithBackButton><Donation /></PageWithBackButton>} />
          <Route path="/settings" element={<PageWithBackButton><Settings /></PageWithBackButton>} />
          <Route path="/wishlist" element={<PageWithBackButton><Wishlist /></PageWithBackButton>} />
          <Route path="/admin" element={<PageWithBackButton><AdminRoute /></PageWithBackButton>} />
          <Route path="*" element={<PageWithBackButton><NotFound /></PageWithBackButton>} />
        </Routes>
      </div>
      
      {isChatOpen && <AIChat onClose={toggleChat} />}
      
      <SocialButtons />
      <Footer />
      {showCookieConsent && <CookieConsent onAccept={handleCookieAccept} />}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          forcedTheme="dark"
        >
          <BrowserRouter>
            <AuthProvider>
              <AppWithAuth />
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
