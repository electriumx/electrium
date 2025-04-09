
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

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

  // If no items, render nothing
  if (itemCount === 0) return null;

  // Removed the cart button rendering completely
  return null;
};

export default Cart;
