
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import ProductReviewModal from './ProductReviewModal';

interface ProductReviewButtonProps {
  productId: number;
  productName: string;
}

const ProductReviewButton = ({ productId, productName }: ProductReviewButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewSubmit = (name: string, rating: number, comment: string) => {
    // Here we would typically save the review to a database
    console.log('Review submitted:', { productId, name, rating, comment });
    
    // Store review in localStorage for now
    const storedReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    if (!storedReviews[productId]) {
      storedReviews[productId] = [];
    }
    
    storedReviews[productId].push({
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date().toISOString()
    });
    
    localStorage.setItem('productReviews', JSON.stringify(storedReviews));
    
    setIsModalOpen(false);
  };

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <Star className="h-4 w-4" />
        Write a Review
      </Button>
      
      <ProductReviewModal
        productId={productId}
        productName={productName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
};

export default ProductReviewButton;
