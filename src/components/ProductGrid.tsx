
import React, { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/components/ui/use-toast';
import ProductDetailModal from './ProductDetailModal';
import { Heart } from 'lucide-react';

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

  const toggleWishlist = (event: React.MouseEvent, productId: number) => {
    event.stopPropagation();
    
    let newWishlist: number[];
    if (wishlist.includes(productId)) {
      newWishlist = wishlist.filter(id => id !== productId);
      toast({
        description: "Product removed from wishlist",
      });
    } else {
      newWishlist = [...wishlist, productId];
      toast({
        description: "Product added to wishlist",
      });
    }
    
    setWishlist(newWishlist);
    
    // Save updated wishlist to localStorage
    const wishlistProducts = products.filter(product => newWishlist.includes(product.id));
    localStorage.setItem('wishlist', JSON.stringify(wishlistProducts));
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

  // Calculate discount percentage for a product
  const getDiscountPercentage = (product: Product) => {
    // Product-specific discount
    if (product.discount && product.discount > 0) {
      return product.discount;
    }
    
    // Brand-specific discount from discount wheel
    if (discounts[product.brand]?.expiresAt > Date.now() && discounts[product.brand]?.value > 0) {
      return discounts[product.brand].value;
    }
    
    // Global discount from discount wheel
    if (discounts['All']?.expiresAt > Date.now() && discounts['All']?.value > 0) {
      return discounts['All'].value;
    }
    
    return 0;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountPercentage = getDiscountPercentage(product);
        const hasDiscount = discountPercentage > 0;
        const isWishlisted = wishlist.includes(product.id);

        return (
          <div 
            key={product.id}
            className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative" onClick={() => handleProductClick(product)}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image"
              />
              
              {/* Wishlist Heart Icon */}
              <button 
                onClick={(e) => toggleWishlist(e, product.id)}
                className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-card/80 rounded-full text-muted-foreground hover:text-destructive"
              >
                <Heart className={isWishlisted ? "fill-destructive text-destructive" : ""} size={18} />
              </button>
              
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>
            <div className="p-4" onClick={() => handleProductClick(product)}>
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className={`font-bold text-lg ${hasDiscount ? 'text-destructive' : ''}`}>
                    ${getProductPrice(product).toFixed(2)}
                  </span>
                  {hasDiscount && (
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
          discount={getDiscountPercentage(selectedProduct)}
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
