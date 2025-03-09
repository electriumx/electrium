
import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  onQuantityChange: (id: number, quantity: number) => void;
}

const ProductCard = ({ id, name, price, image, brand, onQuantityChange }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Load initial quantity from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        const cartItem = parsedCart.find((item: any) => item.id === id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, [id]);

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
    <>
      <div className="bg-card rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md border border-border">
        <div 
          className="relative aspect-square overflow-hidden rounded-lg mb-4 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="text-white text-sm font-medium py-1 px-3 bg-black/60 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              View Details
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium text-lg text-foreground">{name}</h3>
          <p className="text-muted-foreground">${price.toFixed(2)}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                disabled={quantity === 0}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-200 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-5 h-5 text-foreground" />
              </button>
              <span className="text-sm text-muted-foreground">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-200"
              >
                <Plus className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailModal 
        product={modalOpen ? { id, name, price, image, brand } : null}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
