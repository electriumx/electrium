
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FloatingActionsProps {
  showCheckout?: boolean;
  cartItemCount?: number;
}

const FloatingActions = ({
  showCheckout = true,
  cartItemCount = 0
}: FloatingActionsProps) => {
  const navigate = useNavigate();
  return <>
      {/* Cart Button - Bottom Left */}
      {showCheckout && cartItemCount > 0 && <div className="fixed bottom-6 left-6 z-40">
          <Button onClick={() => navigate('/checkout')} aria-label="View Cart" className="bg-green-600 hover:bg-green-700">
            <ShoppingCart className="mr-2" />
            <span>Your Cart ({cartItemCount})</span>
          </Button>
        </div>}
    </>;
};

export default FloatingActions;

