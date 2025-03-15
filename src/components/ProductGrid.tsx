import React, { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/hooks/use-toast';
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
  const [wishlist, setWishlist] = useState<{[key: number]: boolean}>({});
  const { toast } = useToast();
  const [productStock, setProductStock] = useState<{[key: number]: number}>({});

  useEffect(() => {
    // Load wishlist from localStorage
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

    // Load or generate product stocks
    const savedStocks = localStorage.getItem('productStocks');
    if (savedStocks) {
      try {
        setProductStock(JSON.parse(savedStocks));
      } catch (error) {
        console.error('Error parsing product stocks:', error);
        generateRandomStocks();
      }
    } else {
      generateRandomStocks();
    }
  }, [products]);

  const generateRandomStocks = () => {
    const stockMap: {[key: number]: number} = {};
    products.forEach(product => {
      stockMap[product.id] = Math.floor(Math.random() * 50) + 1; // Random stock between 1-50
    });
    setProductStock(stockMap);
    localStorage.setItem('productStocks', JSON.stringify(stockMap));
  };

  const updateStock = (id: number, newStock: number) => {
    setProductStock(prev => {
      const updated = { ...prev, [id]: newStock };
      localStorage.setItem('productStocks', JSON.stringify(updated));
      return updated;
    });
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
    
    // Get existing wishlist from localStorage
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist[product.id] || false;
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = existingWishlist.filter((item: any) => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      setWishlist(prev => ({
        ...prev,
        [product.id]: false
      }));
      
      toast({
        description: `${product.name} removed from wishlist`,
      });
    } else {
      // Add to wishlist
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
        description: `${product.name} added to wishlist`,
      });
    }
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

  // Handle quantity change with stock update
  const handleDetailQuantityChange = (id: number, quantity: number) => {
    onQuantityChange(id, quantity);
    
    // If we're adding to cart, update the stock
    const product = products.find(p => p.id === id);
    if (product) {
      const oldQuantity = product.quantity || 0;
      const quantityDiff = quantity - oldQuantity;
      
      if (quantityDiff !== 0) {
        const currentStock = productStock[id] || 0;
        const newStock = Math.max(0, currentStock - quantityDiff);
        updateStock(id, newStock);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const discountPercentage = getDiscountPercentage(product);
        const hasDiscount = discountPercentage > 0;
        const isInWishlist = wishlist[product.id] || false;
        const stock = productStock[product.id] || 0;

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
                  {discountPercentage}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
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
                  In Stock: {stock}
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
          onQuantityChange={handleDetailQuantityChange}
          discount={getDiscountPercentage(selectedProduct)}
          stock={productStock[selectedProduct.id] || 0}
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
