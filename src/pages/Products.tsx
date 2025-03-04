
import { useState, useEffect } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import CartSummary from '../components/CartSummary';
import { useLocation } from 'react-router-dom';
import { Product, products } from '../data/productData';

const Products = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
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

  // Filter products based on selected brands
  const filteredProducts = selectedBrands.length > 0
    ? products.filter(product => selectedBrands.includes(product.brand))
    : products;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-foreground">Our Products</h1>
      
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
          />
        </div>
      </div>
      
      <CartSummary cart={cart} />
    </div>
  );
};

export default Products;
