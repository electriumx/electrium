
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const handleModalChange = (open: boolean) => {
    if (!open) onClose();
  };

  // Calculate discounted price if there's a discount
  const discountedPrice = product.discount && product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <Dialog open={isOpen} onOpenChange={handleModalChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="overflow-hidden rounded-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain"
            />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
