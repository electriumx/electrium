import React, { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/hooks/use-toast';
import ProductDetailModal from './ProductDetailModal';
import { Heart } from 'lucide-react';
import { getHeadphoneImage, getCategoryImage, getGameImage } from '@/utils/productImageUtils';

interface ProductGridProps {
  products: Product[];
  onQuantityChange: (id: number, quantity: number, selectedColor?: string) => void;
  discounts: Record<string, {
    value: number;
    expiresAt: number;
  }>;
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
  const [wishlist, setWishlist] = useState<{
    [key: number]: boolean;
  }>({});
  const {
    toast
  } = useToast();

  const formatText = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        const wishlistMap: {
          [key: number]: boolean;
        } = {};
        wishlistItems.forEach((item: any) => {
          wishlistMap[item.id] = true;
        });
        setWishlist(wishlistMap);
      } catch (error) {
        console.error('Error parsing wishlist:', error);
      }
    }
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
        description: `${product.name} removed from wishlist`
      });
    } else {
      const productToAdd = {
        ...product,
        quantity: 0
      };
      const updatedWishlist = [...existingWishlist, productToAdd];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(prev => ({
        ...prev,
        [product.id]: true
      }));
      toast({
        description: `${product.name} added to wishlist`
      });
    }
  };

  const getProductPrice = (product: Product) => {
    return product.price;
  };

  const getDiscountPercentage = (product: Product) => {
    if (discounts[product.brand] && discounts[product.brand].expiresAt > Date.now()) {
      return discounts[product.brand].value;
    }
    
    if (discounts['All'] && discounts['All'].expiresAt > Date.now()) {
      return discounts['All'].value;
    }
    
    if (product.category && discounts[product.category] && discounts[product.category].expiresAt > Date.now()) {
      return discounts[product.category].value;
    }
    
    if (product.subcategory && discounts[product.subcategory] && discounts[product.subcategory].expiresAt > Date.now()) {
      return discounts[product.subcategory].value;
    }
    
    return 0;
  };

  const handleDetailQuantityChange = (id: number, quantity: number, selectedColor?: string) => {
    onQuantityChange(id, quantity, selectedColor);
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

  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => {
      const discountPercentage = getDiscountPercentage(product);
      const hasDiscount = discountPercentage > 0;
      const isInWishlist = wishlist[product.id] || false;
      const stock = productStocks[product.id] || 0;
      const finalPrice = hasDiscount 
        ? parseFloat((product.price * (1 - discountPercentage / 100)).toFixed(2))
        : product.price;
      
      // Use safe access for properties and add null checks
      let imageUrl = product.imageUrl || '';
      const productName = product.name || '';
      const productBrand = product.brand || '';
      const productCategory = product.category || '';
      const productNameLower = productName.toLowerCase();
      const productBrandLower = productBrand.toLowerCase();
      const productCategoryLower = productCategory.toLowerCase();
      
      // Handle headphones with dedicated function
      if (productCategory === 'Headphones') {
        imageUrl = getHeadphoneImage(productName, productBrand);
      } 
      // Handle games with dedicated function
      else if (productCategory === 'PC Games' || productCategory === 'Games' || productCategory === 'Gaming') {
        imageUrl = getGameImage(productName);
      }
      // Handle other categories with dedicated function
      else {
        const subcategory = product.subcategory || '';
        imageUrl = getCategoryImage(productCategory, productBrand, productName);
      }

      return <div key={product.id} onClick={() => handleProductClick(product)} className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={imageUrl} alt={productName} className="product-image w-full h-48 object-contain" />
              
              {showWishlistButton && <button onClick={e => toggleWishlist(e, product)} className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-card/80 rounded-full text-muted-foreground hover:text-destructive z-10" aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
                  <Heart className={isInWishlist ? "fill-destructive text-destructive" : ""} size={18} />
                </button>}
              
              {hasDiscount && <div className="absolute top-2 left-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </div>}
              
              {product.subcategory && <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                  {product.subcategory}
                </div>}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">{formatText(productName)}</h3>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className="font-bold text-lg">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {hasDiscount && <span className="text-muted-foreground line-through text-sm ml-2">
                      ${product.price.toFixed(2)}
                    </span>}
                </div>
                <span className="text-sm text-muted-foreground">
                  {productBrand}
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
          </div>;
    })}
      
      {selectedProduct && <ProductDetailModal product={selectedProduct} isOpen={isDetailModalOpen} onClose={closeModal} onQuantityChange={handleDetailQuantityChange} discount={getDiscountPercentage(selectedProduct)} stock={productStocks[selectedProduct.id] || 0} />}
      
      {products.length === 0 && <div className="col-span-full py-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
        </div>}
    </div>;
};

export default ProductGrid;
