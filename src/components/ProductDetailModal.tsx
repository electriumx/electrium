
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star, StarHalf } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: Date;
}

interface ProductDetailModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
    discount?: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const { toast } = useToast();
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviews, setReviews] = useState<Review[]>(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem(`product-${product.id}-reviews`);
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const handleModalChange = (open: boolean) => {
    if (!open) {
      setFullscreenImage(false);
      onClose();
    }
  };

  // Calculate discounted price if there's a discount
  const discountedPrice = product.discount && product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleReviewSubmit = () => {
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    const review: Review = {
      id: Date.now(),
      ...newReview,
      date: new Date(),
    };
    
    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    
    // Save to localStorage
    localStorage.setItem(`product-${product.id}-reviews`, JSON.stringify(updatedReviews));
    
    // Reset form
    setNewReview({ name: "", rating: 5, comment: "" });
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  const handleRatingChange = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalChange}>
      <DialogContent className={fullscreenImage ? "max-w-5xl h-[90vh]" : "max-w-md"}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>

        {fullscreenImage ? (
          <div className="h-full flex flex-col">
            <div className="flex-grow overflow-hidden flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <Button 
              onClick={() => setFullscreenImage(false)}
              className="mt-4"
            >
              Close Fullscreen
            </Button>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            <div 
              className="overflow-hidden rounded-md cursor-pointer"
              onClick={() => setFullscreenImage(true)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain"
              />
              <div className="text-center text-sm text-muted-foreground mt-2">
                Click image to view fullscreen
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground">Brand: {product.brand}</p>
              
              {product.discount && product.discount > 0 ? (
                <div className="space-y-1">
                  <p className="text-muted-foreground line-through">${product.price.toFixed(2)}</p>
                  <p className="text-destructive font-semibold text-lg">
                    ${discountedPrice.toFixed(2)} ({product.discount}% off)
                  </p>
                </div>
              ) : (
                <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
              )}
              
              <p className="text-muted-foreground text-sm mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Reviews section */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
              
              {reviews.length > 0 ? (
                <div className="space-y-4 max-h-60 overflow-y-auto mb-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-3">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(review.date), "MMM d, yyyy")}
                        </p>
                      </div>
                      <div className="flex my-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                            size={16}
                          />
                        ))}
                      </div>
                      <p className="text-sm mt-1">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review!</p>
              )}
              
              {/* Add review form */}
              <div className="space-y-3">
                <h4 className="font-medium">Write a Review</h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 border rounded"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  />
                  
                  <div className="flex items-center space-x-1">
                    <span className="mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`cursor-pointer ${
                          star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => handleRatingChange(star)}
                        size={20}
                      />
                    ))}
                  </div>
                  
                  <Textarea
                    placeholder="Your Review"
                    className="w-full"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />
                  
                  <Button onClick={handleReviewSubmit} className="w-full">
                    Submit Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
