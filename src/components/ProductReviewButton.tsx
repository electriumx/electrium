
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useState } from 'react';
import ProductReviewModal from './ProductReviewModal';

interface ProductReviewButtonProps {
  productId: number;
  productName: string;
}

const ProductReviewButton = ({ productId, productName }: ProductReviewButtonProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleReviewSubmit = (name: string, rating: number, comment: string) => {
    // In a real app, this would send the review to an API
    console.log('Review submitted:', { productId, name, rating, comment });
    setIsReviewModalOpen(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={() => setIsReviewModalOpen(true)}
      >
        <Star className="h-4 w-4" />
        <span>Write Review</span>
      </Button>
      
      <ProductReviewModal
        productId={productId}
        productName={productName}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
};

export default ProductReviewButton;
