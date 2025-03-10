
import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import ProductDetailModal from './ProductDetailModal';
import ProductReviewModal from './ProductReviewModal';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  onQuantityChange: (id: number, quantity: number) => void;
  discount?: number; // Optional discount percentage
  discountedPrice?: number; // Optional discounted price
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  brand, 
  onQuantityChange, 
  discount = 0,
  discountedPrice 
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Array<{name: string; rating: number; comment: string}>>([]);

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

    // Load reviews for this product
    const savedReviews = localStorage.getItem(`reviews-${id}`);
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Error parsing reviews from localStorage:', error);
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

  const handleImageClick = () => {
    setDetailModalOpen(true);
  };

  const handleAddReview = () => {
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (name: string, rating: number, comment: string) => {
    const newReview = { name, rating, comment };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    setReviewModalOpen(false);
  };

  // Calculate discounted price if not provided but there's a discount
  const finalDiscountedPrice = discountedPrice !== undefined 
    ? discountedPrice 
    : discount > 0 
      ? price * (1 - discount / 100) 
      : price;

  const averageRating = reviews.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <>
      <div className="bg-card rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md border border-border">
        <div 
          className="relative aspect-square overflow-hidden rounded-lg mb-4 cursor-pointer"
          onClick={handleImageClick}
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
          
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full px-2 py-1">
              -{discount}%
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="font-medium text-lg text-foreground">{name}</h3>
          <div>
            {discount > 0 ? (
              <div className="flex flex-col">
                <p className="text-muted-foreground line-through text-sm">${price.toFixed(2)}</p>
                <p className="text-destructive font-medium">${finalDiscountedPrice.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">${price.toFixed(2)}</p>
            )}
          </div>
          
          {/* Reviews summary */}
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star}
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill={star <= Math.round(averageRating) ? "gold" : "none"} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-yellow-500"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-xs ml-1">
              {reviews.length 
                ? `${averageRating.toFixed(1)} (${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})` 
                : 'No reviews yet'}
            </span>
          </div>
          
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
            
            <button
              onClick={handleAddReview}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Add Review
            </button>
          </div>
        </div>
      </div>

      {detailModalOpen && (
        <ProductDetailModal 
          product={{ id, name, price, image, brand, discount }}
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          reviews={reviews}
        />
      )}
      
      {reviewModalOpen && (
        <ProductReviewModal
          productId={id}
          productName={name}
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
};

export default ProductCard;
