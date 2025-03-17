
import React, { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/hooks/use-toast';
import ProductDetailModal from './ProductDetailModal';
import { Heart } from 'lucide-react';
import { translateText } from '@/utils/translation';

// Helper function to format display names
const formatDisplayName = (name: string, currentLanguage: string) => {
  const translated = translateText(name, currentLanguage);
  if (translated) return translated;
  
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

interface ProductGridProps {
  products: Product[];
  onQuantityChange: (id: number, quantity: number) => void;
  discounts: Record<string, { value: number, expiresAt: number }>;
  showWishlistButton?: boolean;
  productStocks?: Record<number, number>;
  updateStock?: (id: number, newStock: number) => void;
}

const ProductGrid = ({ 
  products, 
  onQuantityChange, 
  discounts,
  showWishlistButton = false,
  productStocks = {}, 
  updateStock
}: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<{[key: number]: boolean}>({});
  const [currentLanguage, setCurrentLanguage] = useState('english');
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
    
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        const wishlistMap: {[key: number]: boolean} = {};
        wishlistItems.forEach((item: any) => {
          wishlistMap[item.id] = true;
        });
        setWishlist(wishlistMap);
      } catch (error) {
        console.error('Error parsing wishlist:', error);
      }
    }
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [products]);

  const handleUpdateStock = (id: number, newStock: number) => {
    if (updateStock) {
      updateStock(id, newStock);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
  };
  
  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist[product.id] || false;
    
    if (isInWishlist) {
      const updatedWishlist = existingWishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      setWishlist(prev => ({
        ...prev,
        [product.id]: false
      }));
      
      toast({
        description: `${formatDisplayName(product.name, currentLanguage)} removed from wishlist`,
      });
    } else {
      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
        brand: product.brand,
        discount: product.discount || 0
      };
      
      const updatedWishlist = [...existingWishlist, productToAdd];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      setWishlist(prev => ({
        ...prev,
        [product.id]: true
      }));
      
      toast({
        description: `${formatDisplayName(product.name, currentLanguage)} added to wishlist`,
      });
    }
  };

  const getProductPrice = (product: Product) => {
    let price = product.price;
    
    // Apply brand discount if available
    const brandDiscount = discounts[product.brand];
    const allDiscount = discounts['All'];
    
    if (brandDiscount && brandDiscount.expiresAt > Date.now() && brandDiscount.value > 0) {
      price = price * (1 - brandDiscount.value / 100);
    } else if (allDiscount && allDiscount.expiresAt > Date.now() && allDiscount.value > 0) {
      price = price * (1 - allDiscount.value / 100);
    } else if (product.discount && product.discount > 0) {
      // Apply product-specific discount if no brand discount
      price = price * (1 - product.discount / 100);
    }
    
    // Make sure discounted price is less than original price
    return price < product.price ? price : price;
  };

  const getDiscountPercentage = (product: Product) => {
    // Product-specific discount
    if (product.discount && product.discount > 0) {
      return product.discount;
    }
    
    // Brand-specific discount
    if (discounts[product.brand]?.expiresAt > Date.now() && discounts[product.brand]?.value > 0) {
      return discounts[product.brand].value;
    }
    
    // Global discount
    if (discounts['All']?.expiresAt > Date.now() && discounts['All']?.value > 0) {
      return discounts['All'].value;
    }
    
    return 0;
  };

  const handleDetailQuantityChange = (id: number, quantity: number) => {
    onQuantityChange(id, quantity);
    
    // Update stock based on quantity change
    const product = products.find(p => p.id === id);
    if (product) {
      const oldQuantity = product.quantity || 0;
      const quantityDiff = quantity - oldQuantity;
      
      if (quantityDiff !== 0) {
        const currentStock = productStocks[id] || 0;
        const newStock = Math.max(0, currentStock - quantityDiff);
        handleUpdateStock(id, newStock);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountPercentage = getDiscountPercentage(product);
        const hasDiscount = discountPercentage > 0;
        const isInWishlist = wishlist[product.id] || false;
        const stock = productStocks[product.id] || 0;
        const finalPrice = getProductPrice(product);
        const displayName = formatDisplayName(product.name, currentLanguage);

        return (
          <div 
            key={product.id}
            onClick={() => handleProductClick(product)}
            className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={displayName} 
                className="product-image w-full h-48 object-contain"
              />
              
              {showWishlistButton && (
                <button 
                  onClick={(e) => toggleWishlist(e, product)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-card/80 rounded-full text-muted-foreground hover:text-destructive z-10"
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={isInWishlist ? "fill-destructive text-destructive" : ""} size={18} />
                </button>
              )}
              
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
                  {discountPercentage}% {translateText("off", currentLanguage)}
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className={`text-lg font-semibold mb-1 line-clamp-1 ${hasDiscount ? 'pl-2' : ''}`}>
                {displayName}
              </h3>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className={`font-bold text-lg ${hasDiscount ? 'text-destructive' : ''}`}>
                    ${finalPrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <span className="text-muted-foreground line-through text-sm ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {translateText(product.brand, currentLanguage) || product.brand}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {translateText("in_stock", currentLanguage) || "In Stock"}: {stock}
                </div>
                <div className="text-sm px-2 py-1 bg-muted rounded-md">
                  {translateText("qty", currentLanguage) || "Qty"}: {product.quantity || 0}
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
          onQuantityChange={handleDetailQuantityChange}
          discount={getDiscountPercentage(selectedProduct)}
          stock={productStocks[selectedProduct.id] || 0}
        />
      )}
      
      {products.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <h3 className="text-xl font-semibold mb-2">{translateText("no_products_found", currentLanguage) || "No products found"}</h3>
          <p className="text-muted-foreground">{translateText("adjust_filters", currentLanguage) || "Try adjusting your filters or search query."}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
