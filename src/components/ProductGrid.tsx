
import ProductCard from './ProductCard';
import { Product } from '../data/productData';
import { useEffect, useState } from 'react';

interface ProductGridProps {
  products: Product[];
  onQuantityChange: (id: number, quantity: number) => void;
  discounts?: Record<string, { value: number, expiresAt: number }>; // Updated discounts format
}

const ProductGrid = ({ products, onQuantityChange, discounts = {} }: ProductGridProps) => {
  const [activeDiscounts, setActiveDiscounts] = useState<Record<string, number>>({});
  
  // Check for expired discounts
  useEffect(() => {
    const currentTime = Date.now();
    const validDiscounts: Record<string, number> = {};
    
    Object.entries(discounts).forEach(([brand, discountInfo]) => {
      if (discountInfo.expiresAt > currentTime && discountInfo.value > 0) {
        validDiscounts[brand] = discountInfo.value;
      }
    });
    
    setActiveDiscounts(validDiscounts);
  }, [discounts]);

  // Calculate the discounted price for each product
  const getDiscountedPrice = (product: Product) => {
    const discount = activeDiscounts[product.brand] || activeDiscounts['All'] || 0;
    if (discount === 0) return product.price;
    
    return product.price * (1 - discount / 100);
  };

  // If no products, show a message
  if (products.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-lg text-muted-foreground">
          No products found matching your criteria.
        </p>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => {
        const discount = activeDiscounts[product.brand] || activeDiscounts['All'] || 0;
        const discountedPrice = getDiscountedPrice(product);
        
        // Skip showing 0% discounts
        const effectiveDiscount = discount > 0 ? discount : 0;
        
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            brand={product.brand}
            discount={effectiveDiscount}
            discountedPrice={discountedPrice}
            onQuantityChange={onQuantityChange}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
