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
import Cart from "./components/Cart";

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
  const { isAuthenticated, currentUser } = useAuth();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

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

    // Load cart data for Cart component
    const loadCartData = () => {
      const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cartData);
      
      // Calculate total
      const total = cartData.reduce((sum: number, item: any) => {
        const itemPrice = item.price * (item.quantity || 1);
        return sum + itemPrice;
      }, 0);
      
      setCartTotal(total);
    };

    loadCartData();

    // Listen for cart updates
    const handleCartUpdate = (e: CustomEvent) => {
      const updatedCart = e.detail;
      setCartItems(updatedCart);
      
      // Recalculate total
      const total = updatedCart.reduce((sum: number, item: any) => {
        const itemPrice = item.price * (item.quantity || 1);
        return sum + itemPrice;
      }, 0);
      
      setCartTotal(total);
    };

    window.addEventListener('cartUpdate', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cartUpdate', handleCartUpdate as EventListener);
    };
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
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<ProtectedPaymentRoute />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
      {isChatOpen && <AIChat onClose={toggleChat} />}
      
      <Cart total={cartTotal} itemCount={cartItems.length} />
      
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
