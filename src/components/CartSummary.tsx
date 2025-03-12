
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Product } from '@/data/productData';
import { useToast } from "@/components/ui/use-toast";

interface CartSummaryProps {
  cart: Product[];
}

const CartSummary = ({ cart }: CartSummaryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemBasePrice = item.discount && item.discount > 0
        ? item.price * (1 - item.discount / 100)
        : item.price;
        
      // Add the price of any accessories
      const accessoriesPrice = (item.accessories || []).reduce(
        (acc, accessory) => acc + accessory.price,
        0
      );
        
      return total + ((itemBasePrice + accessoriesPrice) * (item.quantity || 1));
    }, 0);
  };

  const clearCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Clear cart by dispatching a custom event that the Products component will listen for
    const cartEvent = new CustomEvent('cartUpdate', { detail: [] });
    window.dispatchEvent(cartEvent);
    
    // Also clear localStorage
    localStorage.removeItem('cart');
    
    toast({
      description: "Cart has been cleared",
    });
  };

  const cartCount = cart.reduce((count, item) => count + (item.quantity || 1), 0);
  
  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Button
          onClick={toggleCart}
          className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          variant="default"
        >
          <ShoppingBag className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-card z-50 shadow-xl border-l border-border overflow-auto"
          >
            <div className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-card z-10">
              <h2 className="text-lg font-bold flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" /> 
                Your Cart
              </h2>
              <button 
                onClick={toggleCart}
                className="rounded-full p-1 hover:bg-muted transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="px-4 py-2 border-b border-border flex justify-between items-center bg-muted/40">
              <span className="text-sm text-muted-foreground">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
              <button 
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-destructive"
              >
                Clear all
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Button 
                    onClick={toggleCart} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <>
                  {cart.map((item) => {
                    const itemBasePrice = item.discount && item.discount > 0
                      ? item.price * (1 - item.discount / 100)
                      : item.price;
                    
                    // Add the price of any accessories
                    const accessoriesPrice = (item.accessories || []).reduce(
                      (acc, accessory) => acc + accessory.price,
                      0
                    );
                    
                    const totalItemPrice = (itemBasePrice + accessoriesPrice) * (item.quantity || 1);
                    
                    return (
                      <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                        <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground mb-1">{item.brand}</p>
                          <div className="flex justify-between">
                            <span className="text-sm">
                              Qty: {item.quantity || 1} x ${(itemBasePrice + accessoriesPrice).toFixed(2)}
                            </span>
                            <span className="font-medium">
                              ${totalItemPrice.toFixed(2)}
                            </span>
                          </div>
                          
                          {item.accessories && item.accessories.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground mb-1">Accessories:</p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {item.accessories.map((acc) => (
                                  <li key={acc.id} className="flex justify-between">
                                    <span>{acc.name}</span>
                                    <span>${acc.price.toFixed(2)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                    <Link 
                      to="/checkout" 
                      className="block w-full bg-primary text-primary-foreground py-3 text-center rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      Proceed to Checkout
                    </Link>
                    <button 
                      onClick={toggleCart}
                      className="block w-full text-center py-3 text-muted-foreground hover:text-foreground mt-2"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleCart}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        />
      )}
    </>
  );
};

export default CartSummary;
