
import React, { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/hooks/use-toast';
import ProductDetailModal from './ProductDetailModal';
import ProductReviewModal from './ProductReviewModal';
import { Heart, Star } from 'lucide-react';
import { translateText } from '@/utils/translation';

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
  showWishlistButton = true,  
  productStocks = {}, 
  updateStock
}: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<{[key: number]: boolean}>({});
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [productReviews, setProductReviews] = useState<Record<number, { name: string, rating: number, comment: string }[]>>({});
  const { toast } = useToast();
  const [currentLanguage, setCurrentLanguage] = useState('english');
  

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    // Check if the product is already in the wishlist when the component mounts
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
    
    // Load saved reviews
    const savedReviews = localStorage.getItem('productReviews');
    if (savedReviews) {
      try {
        setProductReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Error parsing product reviews:', error);
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
        description: translateText(`${product.name} removed from wishlist`, currentLanguage),
      });
    } else {
      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
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
        description: translateText(`${product.name} added to wishlist`, currentLanguage),
      });
    }
  };

  const getProductPrice = (product: Product) => {
    let price = product.price;
    
    // Add accessory prices to the product price if there are selected accessories
    if (product.accessories) {
      price += product.accessories.filter(acc => acc.selected).reduce((sum, acc) => sum + acc.price, 0);
    }
    
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
  
  const handleReviewClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setReviewProduct(product);
    setIsReviewModalOpen(true);
  };
  
  const handleReviewSubmit = (name: string, rating: number, comment: string) => {
    if (!reviewProduct) return;
    
    const updatedReviews = { ...productReviews };
    if (!updatedReviews[reviewProduct.id]) {
      updatedReviews[reviewProduct.id] = [];
    }
    
    updatedReviews[reviewProduct.id].push({
      name,
      rating,
      comment
    });
    
    setProductReviews(updatedReviews);
    localStorage.setItem('productReviews', JSON.stringify(updatedReviews));
    
    toast({
      description: translateText("Thank you for your review!", currentLanguage),
    });
    
    setIsReviewModalOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountPercentage = getDiscountPercentage(product);
        const hasDiscount = discountPercentage > 0;
        const isInWishlist = wishlist[product.id] || false;
        const stock = productStocks[product.id] || 0;
        const finalPrice = getProductPrice(product);
        const reviews = productReviews[product.id] || [];

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
                className="product-image w-full h-48 object-contain"
              />
              
              {showWishlistButton && (
                <button 
                  onClick={(e) => toggleWishlist(e, product)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-card/80 rounded-full text-muted-foreground hover:text-destructive z-10"
                  aria-label={isInWishlist ? translateText("Remove from wishlist", currentLanguage) : translateText("Add to wishlist", currentLanguage)}
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
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
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
                  {product.brand}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {translateText("In Stock", currentLanguage)}: {stock}
                </div>
                <div className="text-sm px-2 py-1 bg-muted rounded-md">
                  {translateText("Quantity", currentLanguage)}: {product.quantity || 0}
                </div>
              </div>
              
              {/* Review button in bottom right */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={(e) => handleReviewClick(e, product)}
                  className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground"
                >
                  <Star size={14} />
                  <span>{reviews.length > 0 ? `${reviews.length} ${translateText("reviews", currentLanguage)}` : translateText("Write a review", currentLanguage)}</span>
                </button>
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
          reviews={productReviews[selectedProduct.id] || []}
        />
      )}
      
      {reviewProduct && (
        <ProductReviewModal
          productId={reviewProduct.id}
          productName={reviewProduct.name}
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
      
      {products.length === 0 && (
        <div className="col-span-full py-12 text-center">
          <h3 className="text-xl font-semibold mb-2">{translateText("No products found", currentLanguage)}</h3>
          <p className="text-muted-foreground">{translateText("Try adjusting your filters or search query", currentLanguage)}</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
