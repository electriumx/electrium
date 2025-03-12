
import { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import ProductGrid from '../components/ProductGrid';
import { useToast } from '@/components/ui/use-toast';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();
  
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
          title: "Item removed",
          description: "Item removed from your wishlist"
        });
      } else {
        updatedWishlist[existingItemIndex].quantity = quantity;
      }
    }
    
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-foreground">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Add items to your wishlist by clicking the heart icon on products.</p>
        </div>
      ) : (
        <ProductGrid 
          products={wishlistItems} 
          onQuantityChange={handleQuantityChange}
          discounts={{}}
          showWishlistButton={false}
        />
      )}
    </div>
  );
};

export default Wishlist;
