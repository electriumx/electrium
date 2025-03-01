import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        setCartItems([]);
      }
    }
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    toast({
      description: "Item removed from cart",
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty Cart",
        description: "Your cart is empty. Add some items before checkout."
      });
      return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg shadow-sm"
        >
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold text-foreground">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Link to="/products">
                <Button variant="outline">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center text-secondary-foreground">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    
                    <div className="w-24 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-muted/30 rounded-b-lg">
                <div className="flex justify-between text-lg font-medium mb-4">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/products" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button 
                    className="flex-1 bg-sage-500 hover:bg-sage-600" 
                    onClick={handleCheckout}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
