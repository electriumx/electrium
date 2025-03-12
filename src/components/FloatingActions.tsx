import { useNavigate } from 'react-router-dom';
import { ShoppingCart, List } from 'lucide-react';
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
  return <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-40">
      {/* Wishlist Button */}
      
      
      {/* AI Chat Button */}
      
    </div>;
};
export default FloatingActions;