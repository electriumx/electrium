
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import CookieConsent from './components/CookieConsent';
import Navigation from './components/Navigation';
import FloatingActions from './components/FloatingActions';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import RouteTracker from './components/RouteTracker';
import About from './pages/About';
import Cart from './components/Cart';
import PaymentSuccess from './components/PaymentSuccess';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import ThankYou from './pages/ThankYou';
import { AuthProvider } from './contexts/AuthContext';
import Trade from './pages/Trade';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteTracker />
        <Navigation />
        <FloatingActions />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Cart />
        <CookieConsent />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
