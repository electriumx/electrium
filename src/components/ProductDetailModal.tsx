
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Minus, Plus, Star } from 'lucide-react';
import { Product } from '../data/productData';
import { useToast } from '@/hooks/use-toast';
import ProductReviewModal from './ProductReviewModal';
import { ensureReviewsArray } from '../utils/cartUtils';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onQuantityChange: (id: number, quantity: number, selectedColor?: string) => void;
  discount?: number;
  stock?: number;
}

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onQuantityChange,
  discount = 0,
  stock = 100
}: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(product.quantity || 0);
  const [selectedColor, setSelectedColor] = useState(product.selectedColor || 'Blue');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentStock, setCurrentStock] = useState(stock);
  const [selectedAccessories, setSelectedAccessories] = useState<{id: string | number, selected: boolean}[]>([]);
  const [accessoriesConfirmed, setAccessoriesConfirmed] = useState(false);
  const { toast } = useToast();

  // Available product colors
  const productColors = ['Blue', 'White', 'Titanium', 'Black'];
  
  useEffect(() => {
    setQuantity(product.quantity || 0);
    setSelectedColor(product.selectedColor || 'Blue');
    setCurrentStock(stock);
    
    // Initialize accessories state from product
    if (product.accessories) {
      setSelectedAccessories(
        product.accessories.map(acc => ({ id: acc.id, selected: acc.selected || false }))
      );
    } else {
      setSelectedAccessories([]);
    }
    
    setAccessoriesConfirmed(false);
  }, [product, stock]);
  
  const calculateDiscountedPrice = () => {
    if (discount > 0) {
      return product.price * (1 - discount / 100);
    }
    return product.price;
  };
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, quantity + change);
    
    // Check if there's enough stock
    if (change > 0 && change > currentStock) {
      toast({
        variant: "destructive",
        title: "Out of Stock",
        description: "Sorry, this item is out of stock"
      });
      return;
    }
    
    setQuantity(newQuantity);
    
    // Update quantity in parent component/cart
    if (accessoriesConfirmed) {
      onQuantityChange(product.id, newQuantity, selectedColor);
    }
  };
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    
    if (quantity > 0 && accessoriesConfirmed) {
      onQuantityChange(product.id, quantity, color);
      
      toast({
        description: `Updated color to ${color}`,
      });
    }
  };
  
  const handleAccessoryToggle = (id: string | number) => {
    const updatedAccessories = selectedAccessories.map(acc => 
      acc.id === id ? { ...acc, selected: !acc.selected } : acc
    );
    
    setSelectedAccessories(updatedAccessories);
    setAccessoriesConfirmed(false); // Reset confirmation when accessories are changed
  };
  
  const handleConfirmAccessories = () => {
    setAccessoriesConfirmed(true);
    
    // Update product in cart if already added
    if (quantity > 0) {
      onQuantityChange(product.id, quantity, selectedColor);
      
      toast({
        description: "Accessories confirmed and applied to product",
      });
    } else {
      toast({
        description: "Accessories confirmed. Add product to cart to apply",
      });
    }
  };
  
  const formatText = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };
  
  // Calculate total price with accessories
  const calculateTotalPrice = () => {
    let total = calculateDiscountedPrice();
    
    if (product.accessories && accessoriesConfirmed) {
      const accessoriesPrice = product.accessories
        .filter((acc, index) => selectedAccessories[index]?.selected)
        .reduce((sum, acc) => sum + acc.price, 0);
      
      total += accessoriesPrice;
    }
    
    return total;
  };
  
  const handleAddReview = (name: string, rating: number, comment: string) => {
    // Create a deep copy of the product to avoid modifying the original
    const updatedProduct = ensureReviewsArray(product);
    
    // Here we would typically make an API call to add the review
    // For now, we'll just show a toast notification
    toast({
      title: "Review Submitted",
      description: `Thank you for your ${rating.toFixed(1)}-star review!`
    });
    setReviewModalOpen(false);
  };
  
  // Format current date for reviews
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Ensure reviews is an array
  const safeProduct = ensureReviewsArray(product);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{formatText(product.name)}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full object-contain rounded-lg h-64"
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Select Color</h3>
                <div className="flex space-x-4">
                  {productColors.map(color => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-gray-300'
                      }`}
                      style={{ 
                        backgroundColor: color.toLowerCase() === 'blue' ? '#1e90ff' : 
                                        color.toLowerCase() === 'white' ? '#ffffff' :
                                        color.toLowerCase() === 'titanium' ? '#878681' : '#000000'
                      }}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
              
              {product.accessories && product.accessories.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Accessories</h3>
                  <div className="space-y-2">
                    {product.accessories.map((accessory, index) => (
                      <div key={accessory.id} className="flex items-center justify-between bg-muted/50 p-2 rounded">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleAccessoryToggle(accessory.id)}
                            className={`w-6 h-6 rounded-md flex items-center justify-center ${
                              selectedAccessories[index]?.selected 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-background border border-input'
                            }`}
                          >
                            {selectedAccessories[index]?.selected && <Check size={16} />}
                          </button>
                          <span className="ml-3">{accessory.name}</span>
                        </div>
                        <span className="font-medium">${accessory.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <Button 
                      onClick={handleConfirmAccessories}
                      className="w-full mt-2"
                      disabled={accessoriesConfirmed}
                    >
                      {accessoriesConfirmed ? 'Accessories Confirmed' : 'Confirm Accessories'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {discount > 0 ? (
                        <>
                          <span className="text-destructive">${calculateDiscountedPrice().toFixed(2)}</span>
                          <span className="text-muted-foreground line-through text-lg ml-2">${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                    </h2>
                    {discount > 0 && (
                      <span className="bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.rating.toFixed(1)} ({Array.isArray(safeProduct.reviews) ? safeProduct.reviews.length : 0} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="mt-1 text-sm text-muted-foreground">In Stock: {currentStock}</div>
              </div>
              
              <div className="prose prose-sm max-w-none dark:prose-invert mb-6">
                <p>{product.description}</p>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="font-medium">Brand: {product.brand}</div>
                <div className="font-medium">Category: {product.category}</div>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={quantity <= 0}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={currentStock <= 0}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <div className="text-xl font-bold">
                  Total: ${(calculateTotalPrice() * quantity || 0).toFixed(2)}
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  if (quantity > 0) {
                    onQuantityChange(product.id, quantity, selectedColor);
                    toast({
                      description: `${quantity} ${product.name} added to cart`,
                    });
                  } else {
                    toast({
                      variant: "destructive",
                      description: "Please select a quantity greater than 0",
                    });
                  }
                }}
                className="w-full"
                disabled={quantity <= 0 || !accessoriesConfirmed && product.accessories?.length > 0}
              >
                {quantity > 0 ? 'Update Cart' : 'Add to Cart'}
              </Button>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
                
                <Button 
                  variant="outline" 
                  onClick={() => setReviewModalOpen(true)}
                  className="mb-4"
                >
                  Write a Review
                </Button>
                
                {Array.isArray(safeProduct.reviews) && safeProduct.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {safeProduct.reviews.map((review, index) => (
                      <div key={index} className="border-b border-border pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">{review.userName}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              fill={i < Math.floor(review.rating) ? "gold" : "none"}
                              className="text-yellow-500"
                            />
                          ))}
                          <span className="ml-2 text-sm">{review.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 border border-dashed rounded-md">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ProductReviewModal
        productId={product.id}
        productName={product.name}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleAddReview}
      />
    </>
  );
};

export default ProductDetailModal;
