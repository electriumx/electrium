
import React, { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/components/ui/use-toast';
import { Heart } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';

interface ProductGridProps {
  products: Product[];
  onQuantityChange: (id: number, quantity: number) => void;
  discounts: Record<string, { value: number, expiresAt: number }>;
  showWishlistButton?: boolean;
}

const ProductGrid = ({ 
  products, 
  onQuantityChange, 
  discounts,
  showWishlistButton = true 
}: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        setWishlist(wishlistItems.map((item: Product) => item.id));
      } catch (error) {
        console.error('Error parsing wishlist:', error);
      }
    }
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
  };

  const addToWishlist = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Get current wishlist
    const savedWishlist = localStorage.getItem('wishlist');
    let wishlistItems: Product[] = [];
    
    if (savedWishlist) {
      try {
        wishlistItems = JSON.parse(savedWishlist);
      } catch (error) {
        console.error('Error parsing wishlist:', error);
      }
    }
    
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      // Remove from wishlist
      wishlistItems = wishlistItems.filter(item => item.id !== product.id);
      setWishlist(wishlist.filter(id => id !== product.id));
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`
      });
    } else {
      // Add to wishlist
      const productToAdd = {...product};
      if (!productToAdd.quantity) productToAdd.quantity = 1;
      wishlistItems.push(productToAdd);
      setWishlist([...wishlist, product.id]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`
      });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  };

  const getProductPrice = (product: Product) => {
    let price = product.price;
    
    // Add accessory prices if any
    if (product.accessories) {
      price += product.accessories
        .filter(acc => acc.selected)
        .reduce((sum, acc) => sum + acc.price, 0);
    }
    
    // Apply discount if available
    const brandDiscount = discounts[product.brand];
    const allDiscount = discounts['All'];
    
    if (brandDiscount && brandDiscount.expiresAt > Date.now() && brandDiscount.value > 0) {
      price = price * (1 - brandDiscount.value / 100);
    } else if (allDiscount && allDiscount.expiresAt > Date.now() && allDiscount.value > 0) {
      price = price * (1 - allDiscount.value / 100);
    }
    
    return price;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const isDiscounted = 
          (discounts[product.brand]?.expiresAt > Date.now() && discounts[product.brand]?.value > 0) ||
          (discounts['All']?.expiresAt > Date.now() && discounts['All']?.value > 0);

        return (
          <div 
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image"
              />
              {isDiscounted && (
                <div className="absolute top-2 right-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
                  SALE
                </div>
              )}
              {showWishlistButton && (
                <button
                  onClick={(e) => addToWishlist(product, e)}
                  className="absolute top-2 left-2 p-1 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
                >
                  <Heart 
                    size={20} 
                    className={wishlist.includes(product.id) ? 'fill-destructive text-destructive' : 'text-white'}
                  />
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className={`font-bold text-lg ${isDiscounted ? 'text-destructive' : ''}`}>
                    ${getProductPrice(product).toFixed(2)}
                  </span>
                  {isDiscounted && (
                    <span className="text-muted-foreground line-through text-sm ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.brand}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Click for details
                </div>
                <div className="text-sm px-2 py-1 bg-muted rounded-md">
                  Qty: {product.quantity || 0}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isDetailModalOpen}
          onClose={closeModal}
          onQuantityChange={onQuantityChange}
          discount={
            discounts[selectedProduct.brand]?.expiresAt > Date.now() && discounts[selectedProduct.brand]?.value > 0
              ? discounts[selectedProduct.brand].value
              : discounts['All']?.expiresAt > Date.now() && discounts['All']?.value > 0
                ? discounts['All'].value
                : 0
          }
        />
      )}
      
      {products.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
