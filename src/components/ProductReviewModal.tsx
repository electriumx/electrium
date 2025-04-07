
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
      
      // Save the review in local storage to persist across accounts
      saveReviewToLocalStorage(productId, name, rating, comment);
    }
  };

  // Function to save reviews to localStorage
  const saveReviewToLocalStorage = (
    productId: number, 
    name: string, 
    rating: number, 
    comment: string
  ) => {
    const allReviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    
    if (!allReviews[productId]) {
      allReviews[productId] = [];
    }
    
    // Add the new review
    allReviews[productId].push({
      name,
      rating,
      comment,
      date: new Date().toISOString()
    });
    
    localStorage.setItem('productReviews', JSON.stringify(allReviews));
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const renderStarRating = () => {
    const activeRating = hoverRating || rating;
    
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="relative">
            {/* Full star background (gray) */}
            <Star 
              className="h-6 w-6 text-gray-300"
            />
            
            {/* Filled overlay - full star */}
            {activeRating >= star && (
              <Star 
                className="absolute top-0 left-0 h-6 w-6 text-yellow-400 fill-yellow-400"
              />
            )}
            
            {/* Filled overlay - half star */}
            {activeRating > star - 1 && activeRating < star && (
              <div className="absolute top-0 left-0 h-6 w-3 overflow-hidden">
                <Star 
                  className="h-6 w-6 text-yellow-400 fill-yellow-400"
                />
              </div>
            )}
            
            {/* Interactive areas */}
            <div className="absolute top-0 left-0 w-3 h-6 cursor-pointer" 
                 onClick={() => handleStarClick(star - 0.5)}
                 onMouseEnter={() => handleStarHover(star - 0.5)}
                 onMouseLeave={() => setHoverRating(0)}
            />
            <div className="absolute top-0 right-0 w-3 h-6 cursor-pointer" 
                 onClick={() => handleStarClick(star)}
                 onMouseEnter={() => handleStarHover(star)}
                 onMouseLeave={() => setHoverRating(0)}
            />
          </div>
        ))}
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
