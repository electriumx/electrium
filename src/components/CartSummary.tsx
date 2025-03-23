import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/productData';
import { translateText } from '@/utils/translation';
import { calculateProductTotal } from '@/utils/cartUtils';

interface CartSummaryProps {
  cart: Product[];
}

const CartSummary = ({
  cart
}: CartSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [discounts, setDiscounts] = useState<Record<string, { value: number; expiresAt: number; }>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      try {
        const parsedDiscounts = JSON.parse(savedDiscounts);
        const currentTime = Date.now();
        
        const validDiscounts: Record<string, { value: number; expiresAt: number; }> = {};
        Object.entries(parsedDiscounts).forEach(([brand, value]) => {
          if (typeof value === 'object' && value !== null && 'value' in value && 'expiresAt' in value) {
            const typedValue = value as { value: number; expiresAt: number; };
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
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
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
      title: translateText("cart_cleared", currentLanguage) ? formatProductName(translateText("cart_cleared", currentLanguage)) : "Cart Cleared",
      description: translateText("all_items_removed", currentLanguage) ? formatProductName(translateText("all_items_removed", currentLanguage)) : "All Items Have Been Removed From Your Cart."
    });
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (cart.length === 0) return null;
  
  return (
    <div className={`fixed bottom-0 right-0 z-40 transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3.5rem)]'}`}>
      <div className="bg-card rounded-tl-lg shadow-lg border border-border max-w-md w-full">
        <div className="flex items-center justify-between p-3 cursor-pointer border-b border-border" onClick={toggleCart}>
          <span className="font-medium">Cart ({cart.reduce((sum, item) => sum + (item.quantity || 0), 0)} items)</span>
          <span className="text-sm">${calculateTotal().toFixed(2)}</span>
        </div>
        
        <div className={`max-h-96 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {cart.map(item => {
                const itemTotal = calculateProductTotal(item, discounts);
                const hasAccessories = item.accessories && item.accessories.some(acc => acc.selected);
                
                return (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-border">
                    <div className="flex gap-3 items-center">
                      <div className="flex-shrink-0 w-10 h-10 bg-muted rounded overflow-hidden">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium ${item.discount && item.discount > 0 ? 'pl-2' : ''}`}>
                          {translateText(item.name, currentLanguage) ? formatProductName(translateText(item.name, currentLanguage)) : formatProductName(item.name)}
                        </h4>
                        <div className="text-xs text-muted-foreground">
                          {formatProductName(translateText("quantity", currentLanguage) || "Quantity")}: {item.quantity}
                          {item.selectedColor && (
                            <span className="ml-1">({item.selectedColor})</span>
                          )}
                        </div>
                        {hasAccessories && (
                          <div className="text-xs text-muted-foreground">
                            {formatProductName(translateText("with", currentLanguage) || "With")}: {item.accessories.filter(acc => acc.selected).map(acc => translateText(acc.name, currentLanguage) ? formatProductName(translateText(acc.name, currentLanguage)) : formatProductName(acc.name)).join(', ')}
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
                <span>{formatProductName(translateText("subtotal", currentLanguage) || "Subtotal")}</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{formatProductName(translateText("tax", currentLanguage) || "Tax")} (8%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-border">
                <span>{formatProductName(translateText("total", currentLanguage) || "Total")}</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="w-full" onClick={handleCheckout}>
                {formatProductName(translateText("proceed_to_payment", currentLanguage) || "Proceed To Payment")}
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                {translateText("clear_all", currentLanguage) ? "Clear All Items" : "Clear All Items"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
