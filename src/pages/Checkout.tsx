import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { translateText } from '@/utils/translation';
import { Product } from '../data/productData';
import { calculateProductTotal } from '@/utils/cartUtils';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Record<string, { value: number; expiresAt: number; }>>({});
  const [showOutOfStockAlert, setShowOutOfStockAlert] = useState(false);
  const [outOfStockItem, setOutOfStockItem] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState("english");
  const { toast } = useToast();
  
  useEffect(() => {
    // Get language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    // Load cart data
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartData(JSON.parse(cart));
    }
    
    // Load discounts
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      try {
        const parsedDiscounts = JSON.parse(savedDiscounts);
        const currentTime = Date.now();
        
        // Keep only valid discounts
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
    
    // Add auto-scroll to top when page loads
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  // Function to format product name (capitalize each word and remove underscores)
  const formatProductName = (name: string) => {
    return name
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const purchasedItems = cartData.filter(item => item.quantity > 0);
  const total = purchasedItems.reduce((sum, item) => sum + calculateProductTotal(item, discounts), 0);
  
  const purchaseDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleProceedToPayment = () => {
    // Check stock availability for all items
    let stockIssue = false;
    
    // Get product stocks from localStorage
    const productStocks = JSON.parse(localStorage.getItem('productStocks') || '{}');
    
    // Check each item
    for (const item of purchasedItems) {
      const currentStock = productStocks[item.id] || 0;
      
      // If not enough stock
      if (currentStock < item.quantity) {
        stockIssue = true;
        setOutOfStockItem(item.name);
        setShowOutOfStockAlert(true);
        return;
      }
    }
    
    if (!stockIssue) {
      // Update stock for each item
      for (const item of purchasedItems) {
        const currentStock = productStocks[item.id] || 0;
        productStocks[item.id] = Math.max(0, currentStock - item.quantity);
      }
      
      // Save updated stocks
      localStorage.setItem('productStocks', JSON.stringify(productStocks));
      
      // Proceed to payment
      navigate('/payment');
    }
  };

  const handleClearItems = () => {
    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    setCartData([]);
    
    toast({
      title: translateText("cart_cleared", currentLanguage) || "Cart cleared",
      description: translateText("all_items_removed", currentLanguage) || "All items have been removed from your cart.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-8 border border-border"
        >
          <h1 className="text-3xl font-medium text-foreground mb-8">
            {translateText("order_summary", currentLanguage) || "Order Summary"}
          </h1>
          
          {purchasedItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {translateText("cart_empty", currentLanguage) || "Your cart is empty"}
              </p>
              <button
                onClick={() => navigate('/products')}
                className="mt-4 text-sage-600 hover:text-sage-700 dark:text-sage-400 dark:hover:text-sage-300 font-medium"
              >
                {translateText("continue_shopping", currentLanguage) || "Continue Shopping"}
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {purchasedItems.map((item: Product) => {
                  const itemTotal = calculateProductTotal(item, discounts);
                  const selectedAccessories = item.accessories?.filter(acc => acc.selected) || [];
                  
                  return (
                    <div key={item.id} className="flex gap-4 items-center p-4 border rounded-lg border-border">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">
                          {translateText(item.name, currentLanguage) ? 
                            formatProductName(translateText(item.name, currentLanguage)) : 
                            formatProductName(item.name)}
                          {item.selectedColor && (
                            <span className="ml-2 text-sm text-muted-foreground">({item.selectedColor})</span>
                          )}
                        </h3>
                        <p className="text-muted-foreground">
                          {translateText("quantity", currentLanguage) || "Quantity"}: {item.quantity}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {translateText("purchase_date", currentLanguage) || "Purchase Date"}: {purchaseDate}
                        </p>
                        
                        {selectedAccessories.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              {translateText("with", currentLanguage) || "With"}:
                            </p>
                            <ul className="text-sm text-muted-foreground list-disc ml-5">
                              {selectedAccessories.map((acc, index) => (
                                <li key={index}>
                                  {translateText(acc.name, currentLanguage) ? 
                                    formatProductName(translateText(acc.name, currentLanguage)) : 
                                    formatProductName(acc.name)} (+${acc.price.toFixed(2)})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sage-600 dark:text-sage-400">
                          {translateText("item_total", currentLanguage) || "Item Total"}: ${itemTotal.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} {translateText("each", currentLanguage) || "each"}
                        </p>
                        {item.brand && discounts[item.brand] && (
                          <p className="text-sm text-destructive">
                            -{discounts[item.brand].value}% {translateText("off", currentLanguage) || "off"}
                          </p>
                        )}
                        {selectedAccessories.length > 0 && (
                          <p className="text-sm text-muted-foreground">
                            +${selectedAccessories.reduce((sum, acc) => sum + acc.price, 0).toFixed(2)} {translateText("accessories", currentLanguage) || "accessories"}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-lg font-medium">
                  <span className="text-foreground">{translateText("total", currentLanguage) || "Total"}</span>
                  <span className="text-sage-600 dark:text-sage-400">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-sage-500 text-white py-3 px-6 rounded-lg font-medium 
                           transition-all duration-200 hover:bg-sage-600"
                >
                  {translateText("proceed_to_payment", currentLanguage) || "Proceed to Payment"}
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="w-full bg-card text-sage-600 dark:text-sage-400 py-3 px-6 rounded-lg font-medium 
                           border border-sage-200 dark:border-sage-800
                           transition-all duration-200 hover:bg-sage-50 dark:hover:bg-sage-900/30"
                >
                  {translateText("continue_shopping", currentLanguage) || "Continue Shopping"}
                </button>
                <button
                  onClick={handleClearItems}
                  className="w-full bg-card text-destructive py-3 px-6 rounded-lg font-medium 
                           border border-destructive/20
                           transition-all duration-200 hover:bg-destructive/10"
                >
                  {translateText("clear_all_items", currentLanguage) || "Clear All Items"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
      
      <AlertDialog open={showOutOfStockAlert} onOpenChange={setShowOutOfStockAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{translateText("out_of_stock", currentLanguage) || "Out of Stock"}</AlertDialogTitle>
            <AlertDialogDescription>
              {translateText("desired_item_not_in_stock", currentLanguage) || "The desired item"} "{formatProductName(outOfStockItem)}" {translateText("is_not_in_stock", currentLanguage) || "is currently not in stock"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowOutOfStockAlert(false)}>
              {translateText("ok", currentLanguage) || "OK"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Checkout;
