import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
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
import { useEffect } from "react";
import AIChat from "./components/AIChat";

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

// Main app wrapper that uses the auth context
const AppWithAuth = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    return localStorage.getItem('cookieConsent') !== 'accepted';
  });
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieConsent(false);
  };

  return (
    <>
      <AdminKeyHandler />
      <Toaster />
      <Sonner />
      <TopNavigation toggleChat={toggleChat} />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<ProtectedPaymentRoute />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="*" element={<NotFound />} />
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
