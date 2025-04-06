
import { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import ProductGrid from '../components/ProductGrid';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Function to capitalize first letter of each word and remove underscores
  const formatText = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };
  
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist:', error);
      }
    }
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedWishlist = [...wishlistItems];
    const existingItemIndex = updatedWishlist.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
      if (quantity === 0) {
        updatedWishlist.splice(existingItemIndex, 1);
        toast({
          title: "Item Removed",
          description: "Item removed from your wishlist"
        });
      } else {
        updatedWishlist[existingItemIndex].quantity = quantity;
      }
    }
    
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    // If quantity is greater than 0, add to cart
    if (quantity > 0) {
      const product = updatedWishlist[existingItemIndex];
      
      // Get current cart
      const savedCart = localStorage.getItem('cart');
      let cartItems: Product[] = [];
      
      if (savedCart) {
        try {
          cartItems = JSON.parse(savedCart);
        } catch (error) {
          console.error('Error parsing cart:', error);
        }
      }
      
      // Check if product is already in cart
      const cartItemIndex = cartItems.findIndex(item => item.id === id);
      
      if (cartItemIndex !== -1) {
        // Update quantity if already in cart
        cartItems[cartItemIndex].quantity = quantity;
      } else {
        // Add new product to cart
        cartItems.push({
          ...product,
          quantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Dispatch custom event to notify other components
      const event = new CustomEvent('cartUpdate', {
        detail: cartItems
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-foreground">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">Your Wishlist Is Empty</h2>
          <p className="text-muted-foreground mb-6">Add items to your wishlist by clicking the heart icon on products.</p>
          <Button onClick={() => navigate('/products')}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <ProductGrid 
            products={wishlistItems} 
            onQuantityChange={handleQuantityChange}
            discounts={{}}
            showWishlistButton={true}
          />
          
          <div className="mt-8 flex justify-center">
            <Button onClick={() => navigate('/products')}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
