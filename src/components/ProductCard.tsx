
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  discountedPrice?: number;
  discount?: number;
  onQuantityChange: (id: number, quantity: number) => void;
  onProductClick?: () => void;
  stock?: number;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  brand, 
  discountedPrice, 
  discount = 0, 
  onQuantityChange,
  onProductClick,
  stock = Math.floor(Math.random() * 50) + 1 // Default random stock if not provided
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the product is already in the wishlist when the component mounts
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = existingWishlist.some((item: any) => item.id === id);
    setWishlist(isInWishlist);
  }, [id]);
  
  const handleAddToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
      onQuantityChange(id, 1);
      toast({
        description: `${name} added to cart`,
      });
    }
  };
  
  const handleUpdateQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
    
    if (newQuantity === 0) {
      toast({
        description: `${name} removed from cart`,
      });
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Get existing wishlist from localStorage
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlist) {
      // Remove from wishlist
      const updatedWishlist = existingWishlist.filter((item: any) => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        description: `${name} removed from wishlist`,
      });
    } else {
      // Add to wishlist
      const productToAdd = {
        id,
        name,
        price,
        image,
        brand,
        discount
      };
      
      const updatedWishlist = [...existingWishlist, productToAdd];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({
        description: `${name} added to wishlist`,
      });
    }
    
    setWishlist(!wishlist);
  };

  const handleImageClick = () => {
    if (onProductClick) {
      onProductClick();
    }
  };
  
  return (
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-contain p-4 cursor-pointer"
          onClick={handleImageClick}
        />
        <button 
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-card/80 rounded-full text-muted-foreground hover:text-destructive"
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={wishlist ? "fill-destructive text-destructive" : ""} size={18} />
        </button>
        
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-medium py-1 px-2 rounded-full">
            {discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 
            className="font-medium text-foreground truncate cursor-pointer hover:text-primary"
            onClick={handleImageClick}
          >
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">{brand}</p>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            {discount > 0 ? (
              <>
                <span className="text-destructive font-semibold">${discountedPrice?.toFixed(2)}</span>
                <span className="text-muted-foreground text-sm line-through ml-1">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold">${price.toFixed(2)}</span>
            )}
            <span className="text-xs text-muted-foreground block">In Stock: {stock}</span>
          </div>
          
          {quantity === 0 ? (
            <Button 
              onClick={handleAddToCart} 
              variant="default" 
              size="sm"
            >
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center border border-input rounded-md">
              <button
                onClick={() => handleUpdateQuantity(Math.max(0, quantity - 1))}
                className="px-2 py-1 text-muted-foreground hover:text-foreground"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(quantity + 1)}
                className="px-2 py-1 text-muted-foreground hover:text-foreground"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
