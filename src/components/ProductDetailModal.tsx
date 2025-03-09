
import React from 'react';
import { X, Star, StarHalf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductDetailModalProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  if (!product) return null;

  // Mock reviews data - in a real app, this would come from a database
  const reviews: Review[] = [
    {
      id: 1,
      user: "Alex Thompson",
      rating: 4.5,
      comment: "Great product, exactly what I needed. The quality is excellent and it works perfectly.",
      date: "2023-10-15"
    },
    {
      id: 2,
      user: "Jamie Wilson",
      rating: 5,
      comment: "Absolutely love it! Fast shipping and the product exceeds expectations.",
      date: "2023-09-30"
    },
    {
      id: 3,
      user: "Morgan Lee",
      rating: 4,
      comment: "Good value for money. Works as advertised, though the setup instructions could be clearer.",
      date: "2023-11-05"
    }
  ];

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="text-yellow-400 fill-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="text-yellow-400 fill-yellow-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-card rounded-xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 text-foreground hover:bg-background"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="md:w-1/2 p-4 flex items-center justify-center bg-black">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-foreground">{product.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(averageRating)}
                </div>
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </div>
              <p className="text-xl font-medium text-foreground mb-6">${product.price.toFixed(2)}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-foreground">Product Details</h3>
                <p className="text-muted-foreground">
                  This premium {product.brand} product offers exceptional quality and performance.
                  Perfect for those who demand the best in technology and design.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3 text-foreground">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-foreground">{review.user}</span>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
