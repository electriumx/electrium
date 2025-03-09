
import ProductCard from './ProductCard';
import { Product } from '../data/productData';

interface ProductGridProps {
  products: Product[];
  onQuantityChange: (id: number, quantity: number) => void;
}

const ProductGrid = ({ products, onQuantityChange }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
