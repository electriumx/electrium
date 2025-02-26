
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

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
    navigate('/checkout');
  };

  if (itemCount === 0) return null;

  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur-md p-6 mt-8 border-t dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-foreground">Items in cart: {itemCount}</span>
          <span className="text-lg font-medium text-foreground">Total: ${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-sage-500 text-white py-3 px-6 rounded-lg font-medium 
                   transition-all duration-200 hover:bg-sage-600 disabled:opacity-50 
                   disabled:cursor-not-allowed"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
