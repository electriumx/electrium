
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface FloatingActionsProps {
  showCheckout?: boolean;
  cartItemCount?: number;
  toggleChat: () => void;
}

const FloatingActions = ({ showCheckout = true, cartItemCount = 0, toggleChat }: FloatingActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-40">
      {/* Chatbot Button */}
      <button
        onClick={toggleChat}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:scale-105 transition-transform"
        aria-label="Chat with Electrium Assistant"
      >
        <img 
          src="/lovable-uploads/332dd32d-b893-48bd-8da7-73aa4bc107bb.png" 
          alt="Electrium Logo" 
          className="w-full h-full"
        />
      </button>
      
      {/* Wishlist Button */}
      <button
        onClick={() => navigate('/wishlist')}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-card shadow-md hover:scale-105 transition-transform"
        aria-label="View Wishlist"
      >
        <Heart size={20} className="text-white" />
      </button>
      
      {/* Checkout Button (conditional) */}
      {showCheckout && cartItemCount > 0 && (
        <button
          onClick={() => navigate('/checkout')}
          className="bg-[#0a4d68] text-white px-4 py-2 rounded-md hover:bg-[#085e80] transition-colors flex items-center gap-2"
        >
          Proceed to Checkout
          {cartItemCount > 0 && (
            <span className="bg-white text-[#0a4d68] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default FloatingActions;
