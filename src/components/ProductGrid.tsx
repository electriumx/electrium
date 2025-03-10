
import ProductCard from './ProductCard';
import { Product } from '../data/productData';

interface ProductGridProps {
  products: Product[];
  onQuantityChange: (id: number, quantity: number) => void;
  discounts?: Record<string, number>; // Map of category/brand to discount percentage
}

const ProductGrid = ({ products, onQuantityChange, discounts = {} }: ProductGridProps) => {
  // Calculate the discounted price for each product
  const getDiscountedPrice = (product: Product) => {
    const discount = discounts[product.brand] || discounts['All'] || 0;
    if (discount === 0) return product.price;
    
    return product.price * (1 - discount / 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => {
        const discount = discounts[product.brand] || discounts['All'] || 0;
        const discountedPrice = getDiscountedPrice(product);
        
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            brand={product.brand}
            discount={discount}
            discountedPrice={discountedPrice}
            onQuantityChange={onQuantityChange}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
