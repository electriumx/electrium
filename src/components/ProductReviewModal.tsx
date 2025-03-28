
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Star, StarHalf } from 'lucide-react';

interface ProductReviewModalProps {
  productId: number;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, rating: number, comment: string) => void;
}

const ProductReviewModal = ({ 
  productId, 
  productName, 
  isOpen, 
  onClose, 
  onSubmit 
}: ProductReviewModalProps) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({ name: false, comment: false });
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Pre-fill name if user is authenticated
  useEffect(() => {
    if (currentUser?.displayName) {
      setName(currentUser.displayName);
    }
  }, [currentUser]);

  const handleSubmit = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to submit a review"
      });
      onClose();
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    
    // Basic validation
    const newErrors = {
      name: name.trim() === '',
      comment: comment.trim() === ''
    };
    
    setErrors(newErrors);
    
    if (!newErrors.name && !newErrors.comment) {
      onSubmit(name, rating, comment);
      setName(currentUser?.displayName || '');
      setRating(5);
      setComment('');
    }
  };

  // Function to handle precise decimal star ratings
  const handleStarClick = (index: number, half: boolean = false) => {
    const newRating = half ? index + 0.5 : index + 1;
    setRating(newRating);
  };

  // Render stars based on current rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <div key={`star-${i}`} className="flex items-center">
            <button
              type="button"
              onClick={() => handleStarClick(i, false)}
              className="focus:outline-none mr-1"
            >
              <Star 
                fill="gold" 
                className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform"
              />
            </button>
            <button
              type="button"
              onClick={() => handleStarClick(i, true)}
              className="focus:outline-none -ml-4"
            >
              <StarHalf 
                fill="gold" 
                className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform"
              />
            </button>
          </div>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <div key={`star-${i}`} className="flex items-center">
            <button
              type="button"
              onClick={() => handleStarClick(i, false)}
              className="focus:outline-none mr-1"
            >
              <Star 
                fill="none" 
                className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform"
              />
            </button>
            <button
              type="button"
              onClick={() => handleStarClick(i, true)}
              className="focus:outline-none -ml-4"
            >
              <StarHalf 
                fill="gold" 
                className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform"
              />
            </button>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <div key={`star-${i}`} className="flex items-center">
            <button
              type="button"
              onClick={() => handleStarClick(i, false)}
              className="focus:outline-none mr-1"
            >
              <Star 
                fill="none" 
                className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform"
              />
            </button>
            <button
              type="button"
              onClick={() => handleStarClick(i, true)}
              className="focus:outline-none -ml-4"
            >
              <StarHalf 
                className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform"
                fill="none"
              />
            </button>
          </div>
        );
      }
    }
    return stars;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review for {productName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-destructive text-xs">Name is required</p>}
          </div>
          
          <div className="space-y-2">
            <Label>Rating: {rating.toFixed(1)} stars</Label>
            <div className="flex gap-1 justify-center">
              {renderStars()}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className={errors.comment ? "border-destructive" : ""}
            />
            {errors.comment && <p className="text-destructive text-xs">Review comment is required</p>}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductReviewModal;
