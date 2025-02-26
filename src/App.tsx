
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Navigation from "./components/Navigation";
import TopNavigation from "./components/TopNavigation";
import Footer from "./components/Footer";
import SocialButtons from "./components/SocialButtons";
import PaymentSuccess from "./components/PaymentSuccess";
import { AuthProvider } from "./contexts/AuthContext";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <BrowserRouter>
          <AuthProvider>
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <SocialButtons />
            <Footer />
            <CookieConsent />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
