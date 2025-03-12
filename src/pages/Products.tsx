
import { useState, useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';
import SpinWheel from '../components/SpinWheel';
import AIChat from '../components/AIChat';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product, products } from '../data/productData';

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Record<string, { value: number, expiresAt: number }>>({});
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const maxPrice = Math.max(...products.map(p => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
    
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      try {
        const parsedDiscounts = JSON.parse(savedDiscounts);
        
        const formattedDiscounts: Record<string, { value: number, expiresAt: number }> = {};
        
        Object.entries(parsedDiscounts).forEach(([brand, value]) => {
          if (typeof value === 'number') {
            formattedDiscounts[brand] = {
              value,
              expiresAt: Date.now() + (48 * 60 * 60 * 1000)
            };
          } else if (typeof value === 'object' && value !== null && 'value' in value && 'expiresAt' in value) {
            formattedDiscounts[brand] = value as { value: number, expiresAt: number };
          }
        });
        
        const currentTime = Date.now();
        Object.keys(formattedDiscounts).forEach(brand => {
          if (formattedDiscounts[brand].expiresAt < currentTime || formattedDiscounts[brand].value === 0) {
            delete formattedDiscounts[brand];
          }
        });
        
        setDiscounts(formattedDiscounts);
        
        localStorage.setItem('discounts', JSON.stringify(formattedDiscounts));
      } catch (error) {
        console.error('Error parsing discounts from localStorage:', error);
      }
    }
    
    window.scrollTo(0, 0);
  }, []);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = (e: CustomEvent) => {
      setCart(e.detail || []);
    };

    window.addEventListener('cartUpdate', handleCartUpdate as EventListener);
    return () => window.removeEventListener('cartUpdate', handleCartUpdate as EventListener);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        e.preventDefault();
        
        // Store current location or restore previous location
        const prevPage = sessionStorage.getItem('prevPageBeforeAdmin');
        
        if (location.pathname === '/admin') {
          // If currently on admin page, go back to previous page
          if (prevPage) {
            navigate(prevPage);
          } else {
            navigate('/');
          }
        } else {
          // Store current page and go to admin
          sessionStorage.setItem('prevPageBeforeAdmin', location.pathname);
          navigate('/admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname]);

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
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
      if (quantity === 0) {
        updatedCart.splice(existingItemIndex, 1);
      } else {
        updatedCart[existingItemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      const product = products.find(p => p.id === id);
      if (product) {
        updatedCart.push({
          ...product,
          quantity
        });
      }
    }
    
    setCart(updatedCart);
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
        <div className="mb-8 text-center">
          <SpinWheel onWin={handleSpinWin} />
          <button
            className="mt-4 px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Spin
          </button>
        </div>
      )}
      
      {Object.keys(discounts).length > 0 && (
        <div className="mb-6 p-4 bg-card rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-2">Active Discounts</h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(discounts).map(([brand, discount]) => {
              if (discount.value <= 0) return null;
              
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
      
      <button
        onClick={toggleChat}
        className="fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-transform hover:scale-105"
        aria-label="Chat with Electrium Assistant"
      >
        <span className="text-xs font-medium">Chat</span>
      </button>
      
      {isChatOpen && <AIChat onClose={toggleChat} />}
    </div>
  );
};

export default Products;
