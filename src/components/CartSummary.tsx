
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Product } from '../data/productData';
import { translateText } from '@/utils/translation';

interface CartSummaryProps {
  cart: Product[];
}

const CartSummary = ({
  cart
}: CartSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
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
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, []);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  // Function to format product name (capitalize each word and remove underscores)
  const formatProductName = (name: string) => {
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getItemPrice = (product: Product) => {
    let price = product.price;

    // Apply discount if available
    if (product.discount && product.discount > 0) {
      price = price * (1 - product.discount / 100);
    }

    // Add accessory prices
    if (product.accessories) {
      price += product.accessories.filter(acc => acc.selected).reduce((sum, acc) => sum + acc.price, 0);
    }
    return price;
  };

  const getItemTotal = (product: Product) => {
    return getItemPrice(product) * (product.quantity || 1);
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + getItemTotal(item), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));

    // Dispatch custom event to notify other components
    const event = new CustomEvent('cartUpdate', {
      detail: []
    });
    window.dispatchEvent(event);
    toast({
      title: translateText("cart_cleared", currentLanguage) || "Cart cleared",
      description: translateText("all_items_removed", currentLanguage) || "All items have been removed from your cart."
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) return null;
  
  return (
    <div className={`fixed bottom-0 right-0 z-40 transition-transform duration-300 transform ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-3.5rem)]'}`}>
      <div className="bg-card rounded-tl-lg shadow-lg border border-border max-w-md w-full">
        <div 
          className="flex justify-between items-center px-4 py-3 cursor-pointer"
          onClick={toggleCart}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">{translateText("cart", currentLanguage)}</span>
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
              {cart.length} {cart.length === 1 ? translateText("item", currentLanguage) : translateText("items", currentLanguage)}
            </span>
          </div>
          <div className="h-6 w-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20">
            <span className="transform transition-transform duration-200">
              {isOpen ? '-' : '+'}
            </span>
          </div>
        </div>
        
        <div className={`max-h-96 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-border">
                  <div className="flex gap-3 items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-muted rounded overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-medium ${item.discount && item.discount > 0 ? 'pl-2' : ''}`}>
                        {translateText(item.name, currentLanguage) ? 
                          formatProductName(translateText(item.name, currentLanguage)) : 
                          formatProductName(item.name)}
                      </h4>
                      <div className="text-xs text-muted-foreground">
                        {translateText("quantity", currentLanguage)}: {item.quantity} × ${getItemPrice(item).toFixed(2)}
                        {item.discount && item.discount > 0 && (
                          <span className="ml-1 text-destructive">
                            (-{item.discount}% {translateText("off", currentLanguage)})
                          </span>
                        )}
                      </div>
                      {item.accessories && item.accessories.filter(acc => acc.selected).length > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {translateText("with", currentLanguage)}: {item.accessories.filter(acc => acc.selected).map(acc => 
                            translateText(acc.name, currentLanguage) ? 
                              formatProductName(translateText(acc.name, currentLanguage)) : 
                              formatProductName(acc.name)
                          ).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    ${getItemTotal(item).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>{translateText("subtotal", currentLanguage)}</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{translateText("tax", currentLanguage)} (8%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-border">
                <span>{translateText("total", currentLanguage)}</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button className="w-full" onClick={handleCheckout}>
                {translateText("proceed_to_payment", currentLanguage)}
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                {translateText("clear_all", currentLanguage) || "Clear All Items"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
