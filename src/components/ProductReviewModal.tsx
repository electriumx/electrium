
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

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
  const [hoverRating, setHoverRating] = useState(0);
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

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const renderStarRating = () => {
    const activeRating = hoverRating || rating;
    const maxStars = 5;
    const starsArray = [];
    
    for (let i = 1; i <= maxStars; i++) {
      // For each star, we'll create two half-star clickable areas
      for (let half = 0; half < 2; half++) {
        const starValue = i - 0.5 + half * 0.5;
        const isFilled = activeRating >= starValue;
        
        starsArray.push(
          <div 
            key={`star-${i}-${half}`}
            className="inline-block cursor-pointer relative"
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            title={`${starValue.toFixed(1)} stars`}
          >
            <Star 
              className={`h-6 w-6 ${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              style={{ 
                clipPath: half === 0 ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'
              }}
            />
          </div>
        );
      }
    }
    
    return (
      <div className="flex items-center">
        {starsArray}
        <span className="ml-2 text-sm">({activeRating.toFixed(1)})</span>
      </div>
    );
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
            <Label>Rating (0.5-5 stars)</Label>
            {renderStarRating()}
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
