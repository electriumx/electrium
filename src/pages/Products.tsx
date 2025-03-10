
import { useState, useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';
import SpinWheel from '../components/SpinWheel';
import { useLocation } from 'react-router-dom';
import { Product, products } from '../data/productData';

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const location = useLocation();
  
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
    
    // Load discounts from localStorage
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      try {
        setDiscounts(JSON.parse(savedDiscounts));
      } catch (error) {
        console.error('Error parsing discounts from localStorage:', error);
      }
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (brands: string[]) => {
    setSelectedBrands(brands);
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

  const handleSpinWin = (brand: string, discount: number) => {
    const newDiscounts = { ...discounts, [brand]: discount };
    setDiscounts(newDiscounts);
    localStorage.setItem('discounts', JSON.stringify(newDiscounts));
    setShowSpinWheel(false);
  };

  // Filter products based on selected brands
  const filteredProducts = selectedBrands.length > 0
    ? products.filter(product => selectedBrands.includes(product.brand))
    : products;

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
            {Object.entries(discounts).map(([brand, discount]) => (
              <span key={brand} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
                {brand}: {discount}% off
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <ProductFilters
            onFilterChange={handleFilterChange}
            selectedBrands={selectedBrands}
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
    </div>
  );
};

export default Products;
