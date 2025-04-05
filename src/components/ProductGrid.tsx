import React, { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/hooks/use-toast';
import ProductDetailModal from './ProductDetailModal';
import { Heart } from 'lucide-react';
import { getHeadphoneImage } from '@/utils/productImageUtils';

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
      
      let imageUrl = product.imageUrl;

      // Apply new image URLs based on product details
      if (product.brand.toLowerCase() === 'google' && product.name.toLowerCase().includes('chromebook')) {
        imageUrl = '/lovable-uploads/6b47797a-7950-4e45-9ec1-b49920bedce3.png';
      } else if (product.brand.toLowerCase() === 'xbox' || 
                (product.brand.toLowerCase() === 'microsoft' && product.category.toLowerCase() === 'gaming consoles') ||
                product.name.toLowerCase().includes('xbox')) {
        imageUrl = '/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png';
      } else if (product.name.toLowerCase() === 'playstation 5' || 
                (product.brand.toLowerCase() === 'playstation' && !product.name.toLowerCase().includes('digital')) ||
                product.name.toLowerCase().includes('playstation 5 digital') || 
                (product.name.toLowerCase().includes('playstation') && product.name.toLowerCase().includes('digital'))) {
        imageUrl = '/lovable-uploads/245080f6-be80-47c6-b153-72bc982b50ac.png';
      } else if (product.name.toLowerCase().includes('battlefield')) {
        imageUrl = '/lovable-uploads/ab3d21b8-041b-4137-865c-22fe07795d75.png';
      } else if (product.brand.toLowerCase() === 'nintendo' || product.name.toLowerCase().includes('nintendo') || product.name.toLowerCase().includes('switch')) {
        imageUrl = '/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png';
      } else if (product.brand.toLowerCase() === 'xiaomi' && product.category.toLowerCase() === 'smartphones') {
        imageUrl = '/lovable-uploads/19334ecf-42e6-4db9-8443-15db93e88166.png';
      } else if (product.name.toLowerCase().includes('speaker') || product.category.toLowerCase().includes('speaker')) {
        imageUrl = '/lovable-uploads/4d754bb4-c77a-436a-8470-ef066e888a5d.png';
      } else if (product.name.toLowerCase().includes('microphone') || product.category.toLowerCase().includes('microphone')) {
        imageUrl = '/lovable-uploads/55a7c5a8-4ffa-4448-8ada-7591813f3755.png';
      } else if (product.name.toLowerCase().includes('quietcomfort') && product.brand.toLowerCase() === 'bose') {
        imageUrl = '/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png';
      } else if (product.name.toLowerCase().includes('death stranding')) {
        imageUrl = '/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png';
      } else if (product.name.toLowerCase().includes('elden ring')) {
        imageUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg';
      } else if (product.name.toLowerCase().includes('call of duty')) {
        imageUrl = '/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png';
      } else if (product.name.toLowerCase().includes('rainbow six')) {
        imageUrl = '/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png';
      } else if (product.name.toLowerCase().includes('cyberpunk 2077')) {
        imageUrl = '/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png';
      } else if (product.name.toLowerCase().includes('horizon kings') && product.name.toLowerCase().includes('simulation')) {
        imageUrl = '/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png';
      } else if (product.name.toLowerCase().includes('world of warriors') && product.name.toLowerCase().includes('racing')) {
        imageUrl = '/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png';
      } else if (product.name.toLowerCase().includes('ultimate fantasy') && product.name.toLowerCase().includes('racing')) {
        imageUrl = '/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png';
      } else if (product.category === 'Washing Machines') {
        imageUrl = '/lovable-uploads/2ae5236f-4492-452a-b393-492c225380c1.png';
      } else if (product.category === 'Headphones') {
        imageUrl = getHeadphoneImage(product.name, product.brand);
      } else if (product.brand === 'Samsung') {
        if (product.name.toLowerCase().includes('interactive panel')) {
          imageUrl = '/lovable-uploads/83220acc-b41f-488f-996c-70c790349093.png';
        } else if (product.name.toLowerCase().includes('smart digital display')) {
          imageUrl = '/lovable-uploads/f4d18f61-e011-41e1-8945-0862b8e9cb22.png';
        } else if (product.name.toLowerCase().includes('digital signage')) {
          imageUrl = '/lovable-uploads/e4e5c805-99ee-44b2-bac6-a7549cd85562.png';
        } else if (product.category === 'Microwaves') {
          imageUrl = '/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png';
        }
      } else if (product.brand === 'LG' && product.category === 'Microwaves') {
        imageUrl = '/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png';
      } else if (product.brand === 'Whirlpool' && product.category === 'Microwaves') {
        imageUrl = '/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png';
      } else if (product.brand === 'Panasonic' && product.category === 'Microwaves') {
        imageUrl = '/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png';
      }

      return <div key={product.id} onClick={() => handleProductClick(product)} className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <div className="relative">
              <img src={imageUrl} alt={product.name} className="product-image w-full h-48 object-contain" />
              
              {showWishlistButton && <button onClick={e => toggleWishlist(e, product)} className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-card/80 rounded-full text-muted-foreground hover:text-destructive z-10" aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
                  <Heart className={isInWishlist ? "fill-destructive text-destructive" : ""} size={18} />
                </button>}
              
              {hasDiscount && <div className="absolute top-2 left-2 bg-destructive text-white text-xs font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </div>}
              
              {product.subcategory && <div className="subcategory-element">{product.subcategory}</div>}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">{formatText(product.name)}</h3>
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
