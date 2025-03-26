
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
import { Slider } from '@/components/ui/slider';

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
  }, [currentUser, isOpen]);

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

  const handleRatingChange = (values: number[]) => {
    setRating(values[0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md" data-product-id={productId}>
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
            <Label>Rating ({rating.toFixed(1)} out of 5 stars)</Label>
            <div className="py-4 px-1">
              <Slider 
                defaultValue={[5]} 
                value={[rating]}
                min={0.5}
                max={5} 
                step={0.1} 
                onValueChange={handleRatingChange}
              />
            </div>
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    star <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                  onClick={() => setRating(star)}
                />
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
