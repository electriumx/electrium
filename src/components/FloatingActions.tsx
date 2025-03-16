
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
interface FloatingActionsProps {
  showCheckout?: boolean;
  cartItemCount?: number;
  toggleChat: () => void;
}
const FloatingActions = ({
  showCheckout = true,
  cartItemCount = 0,
  toggleChat
}: FloatingActionsProps) => {
  const navigate = useNavigate();
  return <>
      {/* Cart Button - Bottom Left */}
      {showCheckout && cartItemCount > 0 && <div className="fixed bottom-6 left-6 z-40">
          <button onClick={() => navigate('/checkout')} aria-label="View Cart" className="flex items-center justify-center bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors px-[12px] py-[12px] text-base">
            <ShoppingCart className="mr-2" />
            <span>Your Cart ({cartItemCount})</span>
          </button>
        </div>}
      
      {/* Wishlist Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => navigate('/wishlist')} 
          aria-label="View Wishlist" 
          className="flex items-center justify-center bg-rose-600 text-white p-3 rounded-full shadow-lg hover:bg-rose-700 transition-colors px-[12px] py-[12px] text-base"
        >
          <Heart className="mr-2" />
          <span>Wishlist</span>
        </button>
      </div>
    </>;
};
export default FloatingActions;
