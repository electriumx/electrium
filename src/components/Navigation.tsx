
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const { isAuthenticated } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Initial cart count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    // Listen for cart updates
    const handleCartUpdate = (e: CustomEvent) => {
      const updatedCart = e.detail;
      setCartCount(updatedCart.length);
    };

    window.addEventListener('cartUpdate', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('cartUpdate', handleCartUpdate as EventListener);
    };
  }, []);

  return (
    <nav className="fixed top-0 right-0 p-4 z-50 flex items-center space-x-4">
      <Link to="/cart" className="relative">
        <ShoppingCart className="text-primary w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
      
      {!isAuthenticated && (
        <Link
          to="/login"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Log In
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
