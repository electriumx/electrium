
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart } from 'lucide-react';

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

  if (itemCount === 0) return null;

  return (
    <motion.div 
      className="fixed bottom-5 right-5 z-40"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={handleCheckout}
        className="bg-[#18a66e] text-white p-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#138a5a] transition-colors"
      >
        <ShoppingCart size={20} />
        <span className="font-medium">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </button>
    </motion.div>
  );
};

export default Cart;
