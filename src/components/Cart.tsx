
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartProps {
  total: number;
  itemCount: number;
}

const Cart = ({ total, itemCount }: CartProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please Sign In To Proceed With Checkout"
      });
      navigate('/login', { state: { from: location } });
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/checkout');
  };

  // Function to capitalize first letter of each word and remove underscores
  const capitalizeWords = (text: string) => {
    return text
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 w-[90%] max-w-md border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Items In Cart: {itemCount}</span>
        <span className="text-lg font-medium">Total: ${total.toFixed(2)}</span>
      </div>
      <button
        onClick={handleCheckout}
        disabled={itemCount === 0}
        className="w-full bg-sage-500 text-white py-3 px-6 rounded-lg font-medium 
                 transition-all duration-200 hover:bg-sage-600 disabled:opacity-50 
                 disabled:cursor-not-allowed"
      >
        {isAuthenticated ? 'Proceed To Checkout' : 'Sign In To Checkout'}
      </button>
    </motion.div>
  );
};

export default Cart;
