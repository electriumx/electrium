
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { formatText } from '@/utils/helpers';
import ProductReviewButton from './ProductReviewButton';
import ProductReviews from './ProductReviews';

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
  const [quantity, setQuantity] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const hasDiscount = discount > 0;

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onQuantityChange(product.id, quantity, selectedColor || undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{formatText(product.name)}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="bg-background rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-64 object-contain"
            />
          </div>
          
          <div className="space-y-4">
            {/* Product Details */}
            <div>
              <h3 className="text-lg font-semibold">Details</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm text-muted-foreground">Brand:</div>
                <div className="text-sm">{product.brand}</div>
                
                <div className="text-sm text-muted-foreground">Category:</div>
                <div className="text-sm">{product.category}</div>
                
                {product.subcategory && (
                  <>
                    <div className="text-sm text-muted-foreground">Type:</div>
                    <div className="text-sm">{product.subcategory}</div>
                  </>
                )}
                
                <div className="text-sm text-muted-foreground">Price:</div>
                <div className="text-sm font-semibold">
                  {hasDiscount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-destructive">${(product.price * (1 - discount / 100)).toFixed(2)}</span>
                      <span className="text-muted-foreground line-through text-xs">${product.price.toFixed(2)}</span>
                      <span className="bg-destructive text-white text-xs px-1.5 py-0.5 rounded">
                        {discount}% OFF
                      </span>
                    </div>
                  ) : (
                    <>${product.price.toFixed(2)}</>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground">Available:</div>
                <div className="text-sm">{stock} in stock</div>
              </div>
            </div>
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && product.colors[0] !== "N/A" && (
              <div>
                <h3 className="text-lg font-semibold">Color</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color 
                          ? 'border-primary' 
                          : 'border-transparent'
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        boxShadow: selectedColor === color ? '0 0 0 2px rgba(0,0,0,0.1)' : 'none' 
                      }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Button 
              onClick={handleAddToCart}
              className="w-full"
              disabled={quantity === 0 || stock === 0}
            >
              {quantity === 0 ? 'Select Quantity' : 'Add to Cart'}
            </Button>
            
            {/* Review Button */}
            <ProductReviewButton productId={product.id} productName={product.name} />
          </div>
        </div>
        
        {/* Product Reviews Section */}
        <ProductReviews productId={product.id} productName={product.name} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
