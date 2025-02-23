
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  itemCount: number;
  total: number;
}

const CartSummary = ({ itemCount, total }: CartSummaryProps) => {
  const navigate = useNavigate();

  if (itemCount === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 p-6 mt-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Items in cart: {itemCount}</span>
          <span className="text-lg font-medium">Total: ${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
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
