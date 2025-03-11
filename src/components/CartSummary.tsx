
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartSummary = ({ cart }: { cart: CartItem[] }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [initialized, setInitialized] = useState(false);

  // Load cart from localStorage on first render
  useEffect(() => {
    // Only save the cart to localStorage after initial render
    if (!initialized) {
      // Check if localStorage has items
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      setInitialized(true);
    } else {
      // Save cart to localStorage whenever it changes after initial load
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, initialized]);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to proceed to checkout",
      });
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    // Save cart to localStorage before navigating
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/checkout');
  };

  const handleClearCart = () => {
    // Clear the cart in localStorage
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Show toast notification
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
    
    // Don't refresh the page, just use window.dispatchEvent to trigger a cart update
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: [] }));
  };

  if (itemCount === 0) return null;

  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur-md p-6 mt-8 border-t dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-foreground">Items in cart: {itemCount}</span>
          <span className="text-lg font-medium text-foreground">Total: ${total.toFixed(2)}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleCheckout}
            className="w-full bg-sage-500 text-white py-3 px-6 rounded-lg font-medium 
                     transition-all duration-200 hover:bg-sage-600 disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Proceed to Checkout
          </Button>
          <Button
            onClick={handleClearCart}
            variant="destructive"
            className="w-full py-3 px-6 rounded-lg font-medium"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All Items
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
