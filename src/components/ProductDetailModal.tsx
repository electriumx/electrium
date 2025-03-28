
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "../data/productData";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Star } from "lucide-react";
import { formatText } from "@/utils/textUtils";
import ProductReviewModal from "./ProductReviewModal";

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onQuantityChange: (id: number, quantity: number, selectedColor?: string) => void;
  discount: number;
  stock: number;
}

const ProductDetailModal = ({
  product,
  isOpen,
  onClose,
  onQuantityChange,
  discount,
  stock
}: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const [selectedColor, setSelectedColor] = useState<string>("Blue");
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const colors = ["Blue", "Black", "White", "Red", "Silver", "Gold", "Green", "Purple"];
  
  useEffect(() => {
    setQuantity(product.quantity || 0);
  }, [product]);

  const handleAddToCart = () => {
    onQuantityChange(product.id, quantity, selectedColor);
    onClose();
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const finalPrice = discount > 0
    ? product.price * (1 - discount / 100)
    : product.price;

  const handleReviewSubmit = (name: string, rating: number, comment: string) => {
    // In a real app, we would save this review to a backend
    console.log("Review submitted:", { name, rating, comment, productId: product.id });
    setShowReviewModal(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{formatText(product.name)}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="flex items-center justify-center bg-muted rounded-md p-4">
              <img 
                src={product.imageUrl || "https://placehold.co/300x300"} 
                alt={product.name} 
                className="w-full max-h-64 object-contain" 
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`text-2xl font-bold ${discount > 0 ? 'text-destructive' : ''}`}>
                    ${finalPrice.toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <div className="flex items-center ml-2">
                      <span className="text-muted-foreground line-through text-sm">
                        ${product.price.toFixed(2)}
                      </span>
                      <Badge variant="destructive" className="ml-2">
                        {discount}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Brand</h4>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Category</h4>
                <p className="text-muted-foreground">{product.category}</p>
                {product.subcategory && (
                  <span className="text-xs bg-secondary px-2 py-1 rounded-full ml-2">
                    {product.subcategory}
                  </span>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Color</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? 'ring-2 ring-primary' : 'opacity-70'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      aria-label={color}
                    />
                  ))}
                </div>
                <p className="text-sm mt-1">Selected: {selectedColor}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-muted-foreground text-sm">{product.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Availability</h4>
                <p className={`${stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                  {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < (product.rating || 4) ? "fill-yellow-400 text-yellow-400" : "text-muted"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating?.toFixed(1) || "4.0"} ({product.reviews || "0"} reviews)
                </span>
                <Button 
                  variant="link" 
                  size="sm"
                  onClick={() => setShowReviewModal(true)}
                  className="ml-auto"
                >
                  Write a Review
                </Button>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleDecrement}
                  disabled={quantity === 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleIncrement}
                  disabled={quantity >= stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              onClick={handleAddToCart} 
              disabled={quantity === 0 || stock === 0}
              className="w-full sm:w-auto"
            >
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ProductReviewModal
        productId={product.id}
        productName={product.name}
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
};

export default ProductDetailModal;
