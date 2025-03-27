
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

  // Handle precise decimal ratings
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    const starRect = e.currentTarget.getBoundingClientRect();
    const starWidth = starRect.width;
    const offsetX = e.clientX - starRect.left;
    
    // Calculate the precise position (0 to 1) within the star
    const position = Math.max(0, Math.min(1, offsetX / starWidth));
    
    // Calculate rating with one decimal place (e.g., 3.7)
    const preciseRating = Math.round((starIndex - 1 + position) * 10) / 10;
    setHoverRating(preciseRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleStarClick = () => {
    if (hoverRating > 0) {
      setRating(hoverRating);
    }
  };

  // Get the filled percentage for each star
  const getStarFill = (starIndex: number) => {
    const displayRating = hoverRating > 0 ? hoverRating : rating;
    
    if (starIndex <= Math.floor(displayRating)) {
      return 100; // Fully filled
    } else if (starIndex - 1 < displayRating && starIndex > displayRating) {
      // Partially filled
      return (displayRating - Math.floor(displayRating)) * 100;
    }
    return 0; // Not filled
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
            <Label>Rating ({rating.toFixed(1)}/5)</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <div
                  key={starIndex}
                  className="relative cursor-pointer"
                  onMouseMove={(e) => handleMouseMove(e, starIndex)}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleStarClick}
                >
                  {/* Background star (empty) */}
                  <Star 
                    size={24} 
                    className="text-gray-300" 
                  />
                  
                  {/* Foreground star (filled) with clip-path for partial filling */}
                  <div 
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: `${getStarFill(starIndex)}%` }}
                  >
                    <Star 
                      size={24} 
                      className="text-yellow-500" 
                      fill="currentColor"
                    />
                  </div>
                </div>
              ))}
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
