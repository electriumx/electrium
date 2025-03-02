
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
  const purchasedItems = cartData.filter((item: Product) => item.quantity > 0);
  const total = purchasedItems.reduce((sum: number, item: Product) => sum + (item.price * item.quantity), 0);
  const purchaseDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Add auto-scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-8"
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
                {purchasedItems.map((item: Product) => (
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
                        Item Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-lg font-medium">
                  <span className="text-foreground">Total</span>
                  <span className="text-sage-600 dark:text-sage-400">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <button
                  onClick={() => navigate('/payment')}
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
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
