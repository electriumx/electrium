
import { useState, useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';
import SpinWheel from '../components/SpinWheel';
import AIChat from '../components/AIChat';
import { useLocation } from 'react-router-dom';
import { Product, products } from '../data/productData';

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Record<string, { value: number, expiresAt: number }>>({});
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  
  // Find max price for slider
  const maxPrice = Math.max(...products.map(p => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  
  // Add useEffect to load cart from localStorage
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
    
    // Load discounts from localStorage with expiration
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      try {
        const parsedDiscounts = JSON.parse(savedDiscounts);
        
        // Convert old format to new format if necessary
        const formattedDiscounts: Record<string, { value: number, expiresAt: number }> = {};
        
        Object.entries(parsedDiscounts).forEach(([brand, value]) => {
          // Check if it's the old format (just number) or new format (object with value and expiresAt)
          if (typeof value === 'number') {
            // Old format - give it 48 hours from now
            formattedDiscounts[brand] = {
              value,
              expiresAt: Date.now() + (48 * 60 * 60 * 1000)
            };
          } else if (typeof value === 'object' && value !== null && 'value' in value && 'expiresAt' in value) {
            // Already in new format
            formattedDiscounts[brand] = value as { value: number, expiresAt: number };
          }
        });
        
        // Filter out expired discounts
        const currentTime = Date.now();
        Object.keys(formattedDiscounts).forEach(brand => {
          if (formattedDiscounts[brand].expiresAt < currentTime || formattedDiscounts[brand].value === 0) {
            delete formattedDiscounts[brand];
          }
        });
        
        setDiscounts(formattedDiscounts);
        
        // Save the cleaned up discounts back to localStorage
        localStorage.setItem('discounts', JSON.stringify(formattedDiscounts));
      } catch (error) {
        console.error('Error parsing discounts from localStorage:', error);
      }
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Add keyboard shortcut handler for admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        window.location.href = '/admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFilterChange = (brands: string[]) => {
    setSelectedBrands(brands);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    // Create a new cart with the updated quantity
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
      // If item exists in cart, update quantity
      if (quantity === 0) {
        // Remove item if quantity is 0
        updatedCart.splice(existingItemIndex, 1);
      } else {
        // Update quantity
        updatedCart[existingItemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      // Item doesn't exist in cart and quantity > 0, add it
      const product = products.find(p => p.id === id);
      if (product) {
        updatedCart.push({
          ...product,
          quantity
        });
      }
    }
    
    // Update cart state
    setCart(updatedCart);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleSpinWin = (brand: string, discount: number, expiresAt: number) => {
    const newDiscounts = { 
      ...discounts, 
      [brand]: { value: discount, expiresAt } 
    };
    setDiscounts(newDiscounts);
    localStorage.setItem('discounts', JSON.stringify(newDiscounts));
    setShowSpinWheel(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Filter products based on selected brands, price range, and search
  let filteredProducts = products;
  
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      selectedBrands.includes(product.brand)
    );
  }
  
  if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.brand.toLowerCase().includes(query)
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-foreground">Our Products</h1>
      
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setShowSpinWheel(!showSpinWheel)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {showSpinWheel ? 'Hide Spin Wheel' : 'Try Your Luck with Daily Spin!'}
        </button>
      </div>
      
      {showSpinWheel && (
        <div className="mb-8">
          <SpinWheel onWin={handleSpinWin} />
        </div>
      )}
      
      {Object.keys(discounts).length > 0 && (
        <div className="mb-6 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-2">Active Discounts</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(discounts).map(([brand, discount]) => {
              // Only show discounts with value > 0
              if (discount.value <= 0) return null;
              
              // Calculate time remaining
              const now = Date.now();
              const timeRemaining = discount.expiresAt - now;
              const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
              
              return (
                <span key={brand} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
                  {brand}: {discount.value}% off ({hoursRemaining}h left)
                </span>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <ProductFilters
            onFilterChange={handleFilterChange}
            selectedBrands={selectedBrands}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
            maxPrice={maxPrice}
            onSearch={handleSearch}
          />
        </div>
        
        <div className="lg:w-3/4">
          <ProductGrid
            products={filteredProducts}
            onQuantityChange={handleQuantityChange}
            discounts={discounts}
          />
        </div>
      </div>
      
      <CartSummary cart={cart} />
      
      {/* AI Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 left-4 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
        </svg>
      </button>
      
      {isChatOpen && <AIChat onClose={toggleChat} />}
    </div>
  );
};

export default Products;
