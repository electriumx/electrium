
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
    setRating(parseFloat(value.toFixed(1)));
  };

  const renderStarRating = () => {
    const activeRating = hoverRating || rating;
    const maxStars = 5;
    const starsArray = [];
    
    for (let i = 0; i < 50; i++) {
      // Each segment represents 0.1 stars
      const currentValue = (i + 1) / 10;
      const isFilled = activeRating >= currentValue;
      
      // Determine if this is the start of a new star
      const isNewStar = i % 10 === 0;
      
      // Calculate which star this segment belongs to (1-5)
      const starNumber = Math.floor(i / 10) + 1;
      
      starsArray.push(
        <div 
          key={i}
          className={`inline-block w-[2.5px] h-5 cursor-pointer ${isFilled ? 'bg-yellow-400' : 'bg-gray-300'} ${isNewStar ? 'rounded-l' : i % 10 === 9 ? 'rounded-r' : ''}`}
          onClick={() => handleStarClick(currentValue)}
          onMouseEnter={() => handleStarHover(currentValue)}
          onMouseLeave={() => setHoverRating(0)}
          title={`${currentValue.toFixed(1)} stars`}
        />
      );
    }
    
    return (
      <div className="flex">
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
            <Label>Rating (1-5 stars, precise to 0.1)</Label>
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
