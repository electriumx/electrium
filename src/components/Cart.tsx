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
  return;
};
export default Cart;