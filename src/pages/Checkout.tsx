
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [showOutOfStockAlert, setShowOutOfStockAlert] = useState(false);
  const [outOfStockItem, setOutOfStockItem] = useState<string>("");
  const { toast } = useToast();
  
  useEffect(() => {
    // Load cart data
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartData(JSON.parse(cart));
    }
    
    // Load discounts
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      setDiscounts(JSON.parse(savedDiscounts));
    }
    
    // Add auto-scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const getDiscountedPrice = (item: Product) => {
    if (!item.brand) return item.price;
    
    const discount = discounts[item.brand] || discounts['All'] || 0;
    if (discount === 0) return item.price;
    
    return item.price * (1 - discount / 100);
  };

  const calculateItemTotal = (item: Product) => {
    const discountedPrice = getDiscountedPrice(item);
    return discountedPrice * item.quantity;
  };

  const purchasedItems = cartData.filter(item => item.quantity > 0);
  const total = purchasedItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  
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
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
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
          <h1 className="text-3xl font-medium text-foreground mb-8">Order Summary</h1>
          
          {purchasedItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Your cart is empty</p>
              <button
                onClick={() => navigate('/products')}
                className="mt-4 text-sage-600 hover:text-sage-700 dark:text-sage-400 dark:hover:text-sage-300 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {purchasedItems.map((item: Product) => {
                  const hasDiscount = item.brand && (discounts[item.brand] || discounts['All']);
                  const discount = item.brand ? (discounts[item.brand] || discounts['All'] || 0) : 0;
                  const discountedPrice = getDiscountedPrice(item);
                  
                  return (
                    <div key={item.id} className="flex gap-4 items-center p-4 border rounded-lg border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                        <p className="text-muted-foreground text-sm">Purchase Date: {purchaseDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sage-600 dark:text-sage-400">
                          Item Total: ${calculateItemTotal(item).toFixed(2)}
                        </p>
                        {hasDiscount ? (
                          <div>
                            <p className="text-sm line-through text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                            <p className="text-sm text-destructive font-medium">
                              ${discountedPrice.toFixed(2)} each ({discount}% off)
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-lg font-medium">
                  <span className="text-foreground">Total</span>
                  <span className="text-sage-600 dark:text-sage-400">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-sage-500 text-white py-3 px-6 rounded-lg font-medium 
                           transition-all duration-200 hover:bg-sage-600"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => navigate('/products')}
                  className="w-full bg-card text-sage-600 dark:text-sage-400 py-3 px-6 rounded-lg font-medium 
                           border border-sage-200 dark:border-sage-800
                           transition-all duration-200 hover:bg-sage-50 dark:hover:bg-sage-900/30"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleClearItems}
                  className="w-full bg-card text-destructive py-3 px-6 rounded-lg font-medium 
                           border border-destructive/20
                           transition-all duration-200 hover:bg-destructive/10"
                >
                  Clear All Items
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
      
      <AlertDialog open={showOutOfStockAlert} onOpenChange={setShowOutOfStockAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Out of Stock</AlertDialogTitle>
            <AlertDialogDescription>
              The desired item "{outOfStockItem}" is currently not in stock.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowOutOfStockAlert(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Checkout;
