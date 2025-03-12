
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, List } from 'lucide-react';

interface FloatingActionsProps {
  showCheckout?: boolean;
  cartItemCount?: number;
  toggleChat: () => void;
}

const FloatingActions = ({ showCheckout = true, cartItemCount = 0, toggleChat }: FloatingActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-40">
      {/* Wishlist Button */}
      <button
        onClick={() => navigate('/wishlist')}
        className="bg-[#0a4d68] text-white p-3 rounded-full hover:bg-[#085e80] transition-colors flex items-center justify-center"
        aria-label="View wishlist"
      >
        <List size={20} />
      </button>
      
      {/* AI Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-[#0a4d68] text-white p-3 rounded-full hover:bg-[#085e80] transition-colors flex items-center justify-center"
        aria-label="Open AI chat"
      >
        <span className="font-bold">AI</span>
      </button>
    </div>
  );
};

export default FloatingActions;
