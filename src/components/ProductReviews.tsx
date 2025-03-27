
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { ProductReview } from '@/types/product';

interface ProductReviewsProps {
  productId: number;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  
  useEffect(() => {
    // Fetch reviews from localStorage
    const storedReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    const productReviews = storedReviews[productId] || [];
    setReviews(productReviews);
    
    // Calculate average rating
    if (productReviews.length > 0) {
      const totalRating = productReviews.reduce((sum: number, review: ProductReview) => sum + review.rating, 0);
      setAverageRating(parseFloat((totalRating / productReviews.length).toFixed(1)));
    }
  }, [productId]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Render stars based on rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative">
            {/* Background star (empty) */}
            <Star size={16} className="text-gray-300" />
            
            {/* Foreground star (filled) with clip-path for partial filling */}
            <div 
              className="absolute top-0 left-0 overflow-hidden"
              style={{ 
                width: `${Math.max(0, Math.min(100, (rating - (star - 1)) * 100))}%` 
              }}
            >
              <Star size={16} className="text-yellow-500" fill="currentColor" />
            </div>
          </div>
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  if (reviews.length === 0) {
    return (
      <div className="mt-6 p-4 border border-border rounded-md">
        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        <p className="text-muted-foreground">No reviews yet for {productName}.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6 p-4 border border-border rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Reviews ({reviews.length})</h3>
        <div className="flex items-center">
          <p className="text-sm mr-2">Average Rating:</p>
          {renderStars(averageRating)}
        </div>
      </div>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="pb-4 border-b border-border last:border-0">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{review.name}</p>
                {renderStars(review.rating)}
              </div>
              <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
            </div>
            <p className="mt-2 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
