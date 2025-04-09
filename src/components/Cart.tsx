
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
interface CartProps {
  total: number;
  itemCount: number;
}
const Cart = ({
  total,
  itemCount
}: CartProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuthenticated
  } = useAuth();
  const {
    toast
  } = useToast();
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please Sign In To Proceed With Checkout"
      });
      navigate('/login', {
        state: {
          from: location
        }
      });
      return;
    }
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/checkout');
  };

  // Function to capitalize first letter of each word and remove underscores
  const capitalizeWords = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  // Helper function to check if a product has color selection capability
  const hasColorSelection = (product: any) => {
    // Products that typically have color options
    const colorSelectableCategories = ['Smartphones', 'Laptops', 'Gaming Consoles', 'Headphones', 'Tablets'];
    return colorSelectableCategories.includes(product.category);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleCheckout}
          className="flex items-center space-x-2 bg-sage-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-sage-600 transition-colors"
        >
          <span className="text-xl">🛒</span>
          <span className="font-semibold">{itemCount} Items - ${total.toFixed(2)}</span>
        </button>
      </motion.div>
    </div>
  );
};
export default Cart;
