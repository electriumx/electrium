
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onQuantityChange: (id: number, quantity: number) => void;
}

const ProductCard = ({ id, name, price, image, onQuantityChange }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1);
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-lg text-gray-900">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              disabled={quantity === 0}
              className="p-2 rounded-full bg-sage-50 hover:bg-sage-100 transition-colors duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-5 h-5 text-sage-600" />
            </button>
            <span className="text-sm text-gray-500">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-2 rounded-full bg-sage-50 hover:bg-sage-100 transition-colors duration-200"
            >
              <Plus className="w-5 h-5 text-sage-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
