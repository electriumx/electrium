import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/productData';
import { calculateProductTotal } from '@/utils/cartUtils';

interface CartSummaryProps {
  cart: Product[];
}

const CartSummary = ({
  cart
}: CartSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [discounts, setDiscounts] = useState<Record<string, {
    value: number;
    expiresAt: number;
  }>>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      try {
        const parsedDiscounts = JSON.parse(savedDiscounts);
        const currentTime = Date.now();
        const validDiscounts: Record<string, {
          value: number;
          expiresAt: number;
        }> = {};
        Object.entries(parsedDiscounts).forEach(([brand, value]) => {
          if (typeof value === 'object' && value !== null && 'value' in value && 'expiresAt' in value) {
            const typedValue = value as {
              value: number;
              expiresAt: number;
            };
            if (typedValue.expiresAt > currentTime) {
              validDiscounts[brand] = typedValue;
            }
          }
        });
        setDiscounts(validDiscounts);
      } catch (error) {
        console.error('Error parsing discounts:', error);
      }
    }
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const formatProductName = (name: string) => {
    return name.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + calculateProductTotal(item, discounts), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));
    const event = new CustomEvent('cartUpdate', {
      detail: []
    });
    window.dispatchEvent(event);
    toast({
      title: "Cart Cleared",
      description: "All Items Have Been Removed From Your Cart."
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) return null;

  return (
    <div className={`fixed bottom-0 right-0 z-40 transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3.5rem)]'}`}>
      <div className="bg-card rounded-tl-lg shadow-lg border border-border max-w-md w-full">
        <button 
          onClick={toggleCart} 
          className="w-full text-sm font-semibold py-2 bg-card border-b border-border flex items-center justify-center"
        >
          Order Summary ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items)
          <span className="ml-2">{isOpen ? '▼' : '▲'}</span>
        </button>
        <div className={`max-h-96 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {cart.map(item => {
                const itemTotal = calculateProductTotal(item, discounts);
                const hasAccessories = item.accessories && item.accessories.some(acc => acc.selected);
                
                // Calculate base price and accessories total
                const basePrice = item.price;
                const accessoriesTotal = item.accessories 
                  ? item.accessories.filter(acc => acc.selected).reduce((sum, acc) => sum + acc.price, 0)
                  : 0;
                
                return (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-border">
                    <div className="flex gap-3 items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-muted rounded overflow-hidden">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium ${item.discount && item.discount > 0 ? 'pl-2' : ''}`}>
                          {formatProductName(item.name)}
                          {item.selectedColor && <span className="ml-1 text-muted-foreground">({item.selectedColor})</span>}
                        </h4>
                        <div className="text-xs text-muted-foreground">
                          Quantity: {item.quantity}
                        </div>
                        {hasAccessories && (
                          <div className="text-xs text-muted-foreground">
                            With: {item.accessories.filter(acc => acc.selected).map(acc => formatProductName(acc.name)).join(', ')}
                          </div>
                        )}
                        {accessoriesTotal > 0 && (
                          <div className="text-xs text-muted-foreground">
                            ${basePrice.toFixed(2)} + ${accessoriesTotal.toFixed(2)} (accessories)
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      ${itemTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-border">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="w-full" onClick={handleCheckout}>
                Proceed To Payment
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear All Items
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
