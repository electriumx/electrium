
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Minus, Plus, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  discountedPrice?: number;
  discount?: number;
  onQuantityChange: (id: number, quantity: number, selectedColor?: string) => void;
  onProductClick?: () => void;
  stock?: number;
  updateStock?: (id: number, newStock: number) => void;
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
  stock = Math.floor(Math.random() * 50) + 1,
  updateStock
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [currentStock, setCurrentStock] = useState(stock);
  const [showOutOfStockAlert, setShowOutOfStockAlert] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Available product colors
  const productColors = ["Blue", "White", "Titanium", "Black"];
  
  useEffect(() => {
    // Check if the product is already in the wishlist when the component mounts
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = existingWishlist.some((item: any) => item.id === id);
    setWishlist(isInWishlist);
    
    // Update local stock if prop changes
    setCurrentStock(stock);

    // Check if the product is already in the cart and update the quantity and selected color
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = cart.find((item: any) => item.id === id);
    if (cartItem) {
      setQuantity(cartItem.quantity || 0);
      if (cartItem.selectedColor) {
        setSelectedColor(cartItem.selectedColor);
      }
    }
  }, [id, stock]);
  
  const handleAddToCart = () => {
    if (currentStock <= 0) {
      setShowOutOfStockAlert(true);
      return;
    }
    
    if (quantity === 0) {
      setQuantity(1);
      onQuantityChange(id, 1, selectedColor);
      
      // Update stock
      const newStock = currentStock - 1;
      setCurrentStock(newStock);
      if (updateStock) updateStock(id, newStock);
      
      toast({
        description: `${name} (${selectedColor}) added to cart`,
      });
    }
  };
  
  const handleUpdateQuantity = (newQuantity: number) => {
    // Calculate difference to update stock
    const diff = newQuantity - quantity;
    
    // Check if there's enough stock
    if (diff > 0 && diff > currentStock) {
      setShowOutOfStockAlert(true);
      return;
    }
    
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity, selectedColor);
    
    // Update stock
    const newStock = currentStock - diff;
    setCurrentStock(newStock);
    if (updateStock) updateStock(id, newStock);
    
    if (newQuantity === 0) {
      toast({
        description: `${name} removed from cart`,
      });
    }
  };

  const handleImageClick = () => {
    if (onProductClick) {
      onProductClick();
    }
  };

  const toggleWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlist) {
      // Remove from wishlist
      const updatedWishlist = existingWishlist.filter((item: any) => item.id !== id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(false);
      
      toast({
        description: `${name} removed from wishlist`,
      });
    } else {
      // Add to wishlist
      const productToAdd = {
        id,
        name,
        price,
        imageUrl: image,
        brand,
        discount: discount || 0
      };
      
      const updatedWishlist = [...existingWishlist, productToAdd];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setWishlist(true);
      
      toast({
        description: `${name} added to wishlist`,
      });
    }
  };
  
  // Function to capitalize first letter of each word and remove underscores
  const capitalizeWords = (text: string) => {
    return text
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (quantity > 0) {
      onQuantityChange(id, quantity, color);
      toast({
        description: `Updated ${name} color to ${color}`,
      });
    }
  };
  
  return (
    <>
      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-contain p-4 cursor-pointer"
            onClick={handleImageClick}
          />
          
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-medium py-1 px-2 rounded-full">
              {discount}% OFF
            </div>
          )}
          
          {/* Wishlist button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-card/80 rounded-full text-muted-foreground hover:text-destructive"
            aria-label={wishlist ? "Remove From Wishlist" : "Add To Wishlist"}
          >
            <Heart className={wishlist ? "fill-destructive text-destructive" : ""} size={18} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <h3 
              className="font-medium text-foreground truncate cursor-pointer hover:text-primary"
              onClick={handleImageClick}
            >
              {capitalizeWords(name)}
            </h3>
            <p className="text-sm text-muted-foreground">{brand}</p>
          </div>
          
          {/* Color selection buttons */}
          <div className="flex justify-center gap-2 mb-3">
            {productColors.map(color => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`w-6 h-6 rounded-full border ${
                  selectedColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-gray-300'
                }`}
                style={{ 
                  backgroundColor: color.toLowerCase() === 'blue' ? '#1e90ff' : 
                                  color.toLowerCase() === 'white' ? '#ffffff' :
                                  color.toLowerCase() === 'titanium' ? '#878681' : '#000000',
                  cursor: 'pointer'
                }}
                aria-label={`Select ${color} color`}
                title={color}
              />
            ))}
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
              <span className="text-xs text-muted-foreground block">In Stock: {currentStock}</span>
            </div>
            
            {quantity === 0 ? (
              <Button 
                onClick={handleAddToCart} 
                variant="default" 
                size="sm"
                disabled={currentStock <= 0}
              >
                {currentStock > 0 ? 'Add To Cart' : 'Out Of Stock'}
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
                  disabled={currentStock <= 0}
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showOutOfStockAlert} onOpenChange={setShowOutOfStockAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Out Of Stock</AlertDialogTitle>
            <AlertDialogDescription>
              The desired item is currently not in stock.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowOutOfStockAlert(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductCard;
