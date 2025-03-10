
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  discount?: number;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  reviews?: Review[];
}

const ProductDetailModal = ({ product, isOpen, onClose, reviews = [] }: ProductDetailModalProps) => {
  const { name, price, image, brand, discount = 0 } = product;
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
  
  const handleImageClick = () => {
    // Open image in full screen
    const img = new Image();
    img.src = image;
    img.style.maxHeight = '90vh';
    img.style.maxWidth = '90vw';
    img.style.objectFit = 'contain';
    
    const viewer = document.createElement('div');
    viewer.style.position = 'fixed';
    viewer.style.top = '0';
    viewer.style.left = '0';
    viewer.style.width = '100vw';
    viewer.style.height = '100vh';
    viewer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    viewer.style.display = 'flex';
    viewer.style.justifyContent = 'center';
    viewer.style.alignItems = 'center';
    viewer.style.zIndex = '9999';
    viewer.style.cursor = 'zoom-out';
    
    viewer.onclick = () => {
      document.body.removeChild(viewer);
    };
    
    viewer.appendChild(img);
    document.body.appendChild(viewer);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div 
            className="rounded-lg overflow-hidden cursor-zoom-in"
            onClick={handleImageClick}
          >
            <img 
              src={image} 
              alt={name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <p className="text-lg font-semibold">
              {discount > 0 ? (
                <>
                  <span className="line-through text-muted-foreground mr-2">${price.toFixed(2)}</span>
                  <span className="text-destructive">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-xs bg-destructive text-white px-2 py-1 rounded-full">
                    {discount}% OFF
                  </span>
                </>
              ) : (
                <span>${price.toFixed(2)}</span>
              )}
            </p>
            <p className="text-muted-foreground">Brand: {brand}</p>
          </div>
          
          {/* Reviews section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Reviews ({reviews.length})</h3>
            
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium">{review.name}</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg 
                            key={star}
                            xmlns="http://www.w3.org/2000/svg" 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill={star <= review.rating ? "gold" : "none"} 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className="text-yellow-500"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
