
import ProductCard from './ProductCard';
import { Product } from '../data/productData';

interface ProductGridProps {
  products: Product[];
  onQuantityChange: (id: number, quantity: number) => void;
  discounts?: Record<string, number>; // Map of category/brand to discount percentage
}

const ProductGrid = ({ products, onQuantityChange, discounts = {} }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          brand={product.brand}
          onQuantityChange={onQuantityChange}
          discount={discounts[product.brand] || 0}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
