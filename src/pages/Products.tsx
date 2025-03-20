
import { useState, useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';
import FloatingActions from '../components/FloatingActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/use-products';
import { translateText } from '@/utils/translation';
import SpinWheelSection from '@/components/products/SpinWheelSection';
import ActiveDiscounts from '@/components/products/ActiveDiscounts';
import { useProductStock } from '@/hooks/use-product-stock';
import { useProductFilters } from '@/hooks/use-product-filters';
import { useCartManagement } from '@/hooks/use-cart-management';
import { useDiscountManagement } from '@/hooks/use-discount-management';

const Products = () => {
  const { products: allProducts } = useProducts();
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const location = useLocation();
  const navigate = useNavigate();
  const maxPrice = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 2000;

  // Custom hooks for different features
  const { productStocks, updateStock } = useProductStock(allProducts);
  const { cart, handleQuantityChange, cartItemCount } = useCartManagement();
  const { discounts, handleSpinWin } = useDiscountManagement();
  const { 
    selectedBrands,
    selectedSubcategories,
    priceRange,
    handleFilterChange,
    handleSubCategoryChange,
    handlePriceRangeChange,
    handleSearch,
    getFilteredProducts 
  } = useProductFilters(allProducts, maxPrice);

  // Function to capitalize first letter of each word and remove underscores
  const formatText = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    window.scrollTo(0, 0);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  // Extended version to handle quantity change and manage product stock
  const handleDetailQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0 && !cart.find(p => p.id === id)) {
      const product = allProducts.find(p => p.id === id);
      if (product) {
        const updatedCart = [...cart, { ...product, quantity }];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        const event = new CustomEvent('cartUpdate', { detail: updatedCart });
        window.dispatchEvent(event);
      }
    } else {
      handleQuantityChange(id, quantity);
    }
    
    // Update stock based on quantity change
    const product = allProducts.find(p => p.id === id);
    if (product) {
      const oldQuantity = product.quantity || 0;
      const quantityDiff = quantity - oldQuantity;
      
      if (quantityDiff !== 0) {
        const currentStock = productStocks[id] || 0;
        const newStock = Math.max(0, currentStock - quantityDiff);
        updateStock(id, newStock);
      }
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-foreground">
        {formatText(translateText("our_products", currentLanguage) || "Our Products")}
      </h1>
      
      <SpinWheelSection 
        showSpinWheel={showSpinWheel} 
        setShowSpinWheel={setShowSpinWheel} 
        onWin={handleSpinWin}
        currentLanguage={currentLanguage}
      />
      
      <ActiveDiscounts 
        discounts={discounts}
        currentLanguage={currentLanguage}
      />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <ProductFilters 
            onFilterChange={handleFilterChange} 
            selectedBrands={selectedBrands} 
            priceRange={priceRange} 
            onPriceRangeChange={handlePriceRangeChange} 
            maxPrice={maxPrice} 
            onSearch={handleSearch}
            onSubCategoryChange={handleSubCategoryChange}
          />
        </div>
        
        <div className="lg:w-3/4">
          <ProductGrid 
            products={filteredProducts} 
            onQuantityChange={handleDetailQuantityChange} 
            discounts={discounts} 
            showWishlistButton={true}
            productStocks={productStocks}
            updateStock={updateStock}
          />
        </div>
      </div>
      
      <CartSummary cart={cart} />
      
      <FloatingActions 
        showCheckout={true} 
        cartItemCount={cartItemCount} 
      />
    </div>
  );
};

export default Products;
