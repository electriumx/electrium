
import { useState, useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';
import SpinWheel from '../components/SpinWheel';
import AIChat from '../components/AIChat';
import FloatingActions from '../components/FloatingActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../data/productData';
import { useProducts } from '../hooks/use-products';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const { products: allProducts } = useProducts(); // Use our new hook for products
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Record<string, {
    value: number;
    expiresAt: number;
  }>>({});
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const maxPrice = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 2000;
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [productStocks, setProductStocks] = useState<Record<number, number>>({});
  const { toast } = useToast();

  // Function to set all product stocks to 100
  const resetStocks = () => {
    const stockMap: Record<number, number> = {};
    allProducts.forEach(product => {
      stockMap[product.id] = 100; // Set stock to 100 for each product
    });
    setProductStocks(stockMap);
    localStorage.setItem('productStocks', JSON.stringify(stockMap));
    localStorage.setItem('lastStockReset', Date.now().toString());
    
    toast({
      title: "Stock Reset",
      description: "All product stocks have been reset to 100 units.",
    });
  };

  // Check if stock needs to be reset (every 12 hours)
  const checkStockReset = () => {
    const lastReset = localStorage.getItem('lastStockReset');
    const now = Date.now();
    
    if (!lastReset || (now - parseInt(lastReset)) > 12 * 60 * 60 * 1000) { // 12 hours in milliseconds
      resetStocks();
    }
  };

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
        const formattedDiscounts: Record<string, {
          value: number;
          expiresAt: number;
        }> = {};
        
        Object.entries(parsedDiscounts).forEach(([brand, value]) => {
          if (typeof value === 'number') {
            formattedDiscounts[brand] = {
              value,
              expiresAt: Date.now() + 48 * 60 * 60 * 1000
            };
          } else if (typeof value === 'object' && value !== null && 'value' in value && 'expiresAt' in value) {
            formattedDiscounts[brand] = value as {
              value: number;
              expiresAt: number;
            };
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
    
    // Load product stocks from localStorage or reset them
    const savedStocks = localStorage.getItem('productStocks');
    if (savedStocks) {
      try {
        setProductStocks(JSON.parse(savedStocks));
        // Check if stocks need to be reset
        checkStockReset();
      } catch (error) {
        console.error('Error parsing product stocks:', error);
        resetStocks();
      }
    } else {
      // No stocks exist, reset them
      resetStocks();
    }
    
    // Set up interval to check for stock reset every hour
    const stockResetInterval = setInterval(checkStockReset, 60 * 60 * 1000); // Check every hour
    
    window.scrollTo(0, 0);
    
    return () => {
      clearInterval(stockResetInterval);
    };
  }, [allProducts.length]);

  // Listen for cart update events
  useEffect(() => {
    const handleCartUpdate = (e: CustomEvent) => {
      setCart(e.detail || []);
    };
    
    window.addEventListener('cartUpdate', handleCartUpdate as EventListener);
    return () => window.removeEventListener('cartUpdate', handleCartUpdate as EventListener);
  }, []);

  // When the number of products changes, make sure all have stock assigned
  useEffect(() => {
    if (allProducts.length > 0) {
      const updatedStocks = { ...productStocks };
      let needsUpdate = false;
      
      allProducts.forEach(product => {
        if (updatedStocks[product.id] === undefined) {
          updatedStocks[product.id] = 100;
          needsUpdate = true;
        }
      });
      
      if (needsUpdate) {
        setProductStocks(updatedStocks);
        localStorage.setItem('productStocks', JSON.stringify(updatedStocks));
      }
    }
  }, [allProducts, productStocks]);

  const handleFilterChange = (brands: string[]) => {
    setSelectedBrands(brands);
  };
  
  const handleSubCategoryChange = (subcategories: string[]) => {
    setSelectedSubcategories(subcategories);
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
      const product = allProducts.find(p => p.id === id);
      if (product) {
        updatedCart.push({
          ...product,
          quantity
        });
      }
    }
    
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Dispatch custom event to notify other components
    const event = new CustomEvent('cartUpdate', {
      detail: updatedCart
    });
    window.dispatchEvent(event);
  };

  const handleSpinWin = (brand: string, discount: number, expiresAt: number) => {
    // Ensure discount is valid and less than original price
    if (discount <= 0 || discount > 100) {
      toast({
        variant: "destructive",
        title: "Invalid Discount",
        description: "The discount must be between 1% and 100%.",
      });
      return;
    }

    const newDiscounts = {
      ...discounts,
      [brand]: {
        value: discount,
        expiresAt
      }
    };
    
    setDiscounts(newDiscounts);
    localStorage.setItem('discounts', JSON.stringify(newDiscounts));
    
    toast({
      title: "Discount Applied!",
      description: `You've won a ${discount}% discount on all ${brand} products.`,
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Update stock for a product
  const updateStock = (id: number, newStock: number) => {
    const updatedStocks = {
      ...productStocks,
      [id]: newStock
    };
    setProductStocks(updatedStocks);
    localStorage.setItem('productStocks', JSON.stringify(updatedStocks));
  };

  // Filter products based on all criteria
  let filteredProducts = allProducts;
  
  // Filter by brand/category
  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(product => selectedBrands.includes(product.brand) || selectedBrands.includes(product.category));
  }
  
  // Filter by subcategory
  if (selectedSubcategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const productText = `${product.name} ${product.description}`.toLowerCase();
      return selectedSubcategories.some(subcategory => 
        productText.includes(subcategory.toLowerCase())
      );
    });
  }
  
  // Filter by price
  if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
  }
  
  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.brand.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }

  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  // Get active discounts sorted by value (highest first)
  const activeDiscounts = Object.entries(discounts)
    .filter(([_, discount]) => discount.value > 0 && discount.expiresAt > Date.now())
    .sort((a, b) => b[1].value - a[1].value);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-foreground">Our Products</h1>
      
      <div className="mb-6 flex justify-center">
        <button onClick={() => setShowSpinWheel(!showSpinWheel)} className="px-4 py-2 bg-card text-foreground rounded-md border border-border hover:bg-accent transition-colors">
          {showSpinWheel ? 'Hide Spin Wheel' : 'Try Your Luck with Daily Spin!'}
        </button>
      </div>
      
      {showSpinWheel && (
        <div className="mb-4 text-center">
          <SpinWheel onWin={handleSpinWin} />
        </div>
      )}
      
      {/* Active Discounts Bar */}
      <div className="mb-6 p-4 bg-card rounded-lg border border-border">
        <h2 className="text-lg font-semibold mb-2 text-center">Active Discounts</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {activeDiscounts.length > 0 ? (
            activeDiscounts.map(([brand, discount]) => {
              const now = Date.now();
              const timeRemaining = discount.expiresAt - now;
              const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
              return (
                <span key={brand} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-destructive text-white">
                  {brand}: {discount.value}% off ({hoursRemaining}h left)
                </span>
              );
            })
          ) : (
            <p className="text-muted-foreground">No active discounts. Spin the wheel to win discounts!</p>
          )}
        </div>
      </div>
      
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
            onQuantityChange={handleQuantityChange} 
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
        toggleChat={toggleChat} 
      />
      
      {isChatOpen && <AIChat onClose={toggleChat} />}
    </div>
  );
};

export default Products;
