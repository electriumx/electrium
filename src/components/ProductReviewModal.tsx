
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

  const handleStarClick = (index: number, portion: number) => {
    // 0 = left half, 1 = right half
    const newRating = index + (portion === 1 ? 1.0 : 0.5);
    setRating(newRating);
  };

  const handleStarHover = (index: number, portion: number) => {
    const newHoverRating = index + (portion === 1 ? 1.0 : 0.5);
    setHoverRating(newHoverRating);
  };

  const renderStars = () => {
    const stars = [];
    const activeRating = hoverRating || rating;
    
    for (let i = 0; i < 5; i++) {
      const leftFill = activeRating >= i + 0.5 ? "gold" : "none";
      const rightFill = activeRating >= i + 1 ? "gold" : "none";
      
      stars.push(
        <div key={i} className="relative inline-block" style={{ width: "24px", height: "24px" }}>
          <div 
            className="absolute left-0 top-0 w-1/2 h-full cursor-pointer overflow-hidden" 
            onClick={() => handleStarClick(i, 0)}
            onMouseEnter={() => handleStarHover(i, 0)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill={leftFill} 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-yellow-500 transition-colors"
              style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div 
            className="absolute left-1/2 top-0 w-1/2 h-full cursor-pointer overflow-hidden" 
            onClick={() => handleStarClick(i, 1)}
            onMouseEnter={() => handleStarHover(i, 1)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill={rightFill} 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-yellow-500 transition-colors"
              style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </div>
      );
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
            <Label>Rating ({rating.toFixed(1)} out of 5)</Label>
            <div className="flex gap-1">
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
