import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Plus, Check, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product as ProductType, ProductAccessory } from '../data/productData';
import ProductReviewModal from "./ProductReviewModal";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailModalProps {
  product: ProductType;
  isOpen: boolean;
  onClose: () => void;
  onQuantityChange: (id: number, quantity: number) => void;
  discount: number;
  reviews?: any[];
  stock: number;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface Accessory {
  id: number;
  name: string;
  price: number;
  compatible: string[];
  image: string;
  selected?: boolean;
}

const ensureReviewsArray = (reviews: any): Review[] => {
  if (!reviews) return [];
  if (Array.isArray(reviews)) return reviews;
  return [];
};

const getTechSpecs = (productId: number, brand: string) => {
  const specs = {
    Apple: {
      ram: "8GB",
      storage: "256GB SSD",
      processor: "Apple M2 Chip",
      display: "13.3-inch Retina Display",
      battery: "Up to 18 hours",
      camera: "1080p FaceTime HD Camera",
      connectivity: "Wi-Fi 6, Bluetooth 5.0"
    },
    Samsung: {
      ram: "12GB",
      storage: "512GB",
      processor: "Snapdragon 8 Gen 2",
      display: "6.8-inch Dynamic AMOLED 2X",
      battery: "5000mAh",
      camera: "108MP main camera",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
    },
    Sony: {
      ram: "8GB",
      storage: "1TB SSD",
      processor: "AMD Ryzen 7",
      display: "15.6-inch 4K OLED",
      battery: "Up to 10 hours",
      camera: "HD Webcam",
      connectivity: "Wi-Fi 6, Bluetooth 5.1"
    },
    PlayStation: {
      processor: "Custom AMD Zen 2, 8 cores",
      gpu: "Custom RDNA 2, 10.28 TFLOPs",
      ram: "16GB GDDR6",
      storage: "825GB SSD",
      resolution: "Up to 4K at 120fps",
      audioOutput: "Tempest 3D AudioTech",
      connectivity: "Wi-Fi 6, Bluetooth 5.1, HDMI 2.1"
    },
    "PC Games": {
      minCpu: "Intel Core i5 or AMD Ryzen 5",
      recCpu: "Intel Core i7 or AMD Ryzen 7",
      minGpu: "NVIDIA GTX 1660 or AMD RX 5600 XT",
      recGpu: "NVIDIA RTX 3060 or AMD RX 6700 XT",
      minRam: "8GB RAM",
      recRam: "16GB RAM",
      storage: "70GB available space",
      os: "Windows 10 64-bit"
    },
    default: {
      ram: "6GB",
      storage: "128GB",
      processor: "Octa-core",
      display: "6.5-inch IPS LCD",
      battery: "4500mAh",
      camera: "64MP main camera",
      connectivity: "4G LTE, Wi-Fi 5, Bluetooth 5.0"
    }
  };

  return specs[brand as keyof typeof specs] || specs.default;
};

const accessories: Accessory[] = [
  { id: 101, name: "Premium Headphones", price: 99.99, compatible: ["Apple", "Samsung", "Sony"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 102, name: "Wireless Charger", price: 49.99, compatible: ["Apple", "Samsung"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 103, name: "Protective Case", price: 29.99, compatible: ["Apple", "Samsung", "Sony"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 104, name: "Screen Protector", price: 19.99, compatible: ["Apple", "Samsung", "Sony"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 105, name: "Extra Controller", price: 69.99, compatible: ["PlayStation"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 106, name: "Gaming Headset", price: 89.99, compatible: ["PlayStation", "PC Games"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 107, name: "Gaming Mouse", price: 59.99, compatible: ["PC Games"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 108, name: "Mechanical Keyboard", price: 129.99, compatible: ["PC Games"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 109, name: "Fast Charging Cable", price: 14.99, compatible: ["Apple", "Samsung", "Sony", "Google", "Xiaomi"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 110, name: "128GB Memory Card", price: 39.99, compatible: ["Samsung", "Sony"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 111, name: "256GB Memory Card", price: 59.99, compatible: ["Samsung", "Sony"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
  { id: 112, name: "Premium Earbuds", price: 79.99, compatible: ["Apple", "Samsung", "Sony", "Google"], image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" }
];

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onQuantityChange, 
  discount = 0, 
  reviews = [], 
  stock = 0 
}: ProductDetailModalProps) => {
  const { id, name, price, imageUrl, brand, category } = product;
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  const [confirmedAccessories, setConfirmedAccessories] = useState<Accessory[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(discountedPrice);
  const [selectedColor, setSelectedColor] = useState("Blue");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [productReviews, setProductReviews] = useState<Review[]>(ensureReviewsArray(reviews));
  const { toast } = useToast();

  const getAvailableColors = () => {
    const defaultColors = ["Blue", "White", "Black"];
    
    if (category === "Smartphones" || brand === "Apple" || brand === "Samsung" || category === "Tablets") {
      return ["Blue", "White", "Black", "Silver", "Gold", "Red", "Green", "Purple", "Titanium"];
    } else if (category === "Laptops") {
      return ["Silver", "Space Gray", "Black", "White", "Blue"];
    } else if (category === "Gaming Consoles") {
      return ["Black", "White", "Red", "Blue"];
    } else if (category.includes("Headphones") || category === "Audio") {
      return ["Black", "White", "Silver", "Blue", "Red", "Green"];
    }
    
    return defaultColors;
  };
  
  const availableColors = getAvailableColors();
  
  const showColorSelection = category === "Smartphones" || 
                             category === "Tablets" || 
                             category === "Laptops" || 
                             brand === "Apple" ||
                             brand === "Samsung" ||
                             category === "Gaming Consoles" ||
                             category.includes("Headphones") ||
                             category === "Audio";
  
  useEffect(() => {
    if (isOpen) {
      setQuantity(product.quantity || 1);
      
      if (product.accessories) {
        const productAccessories = product.accessories
          .filter(acc => acc.selected)
          .map(acc => ({
            id: Number(acc.id),
            name: acc.name,
            price: acc.price,
            selected: true,
            compatible: [] as string[],
            image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png"
          }));
        
        setSelectedAccessories(productAccessories);
        setConfirmedAccessories(productAccessories);
      } else {
        setSelectedAccessories([]);
        setConfirmedAccessories([]);
      }
      
      if (product.selectedColor) {
        setSelectedColor(product.selectedColor);
      } else {
        setSelectedColor(availableColors[0]);
      }
    }
  }, [isOpen, product]);
  
  useEffect(() => {
    let total = discount > 0 ? discountedPrice : price;
    
    const accessoriesTotal = confirmedAccessories.reduce((sum, acc) => sum + acc.price, 0);
    total += accessoriesTotal;
    
    setTotalPrice(total);
  }, [confirmedAccessories, price, discountedPrice, discount]);
  
  const specs = getTechSpecs(id, brand);
  
  const compatibleAccessories = accessories.filter(acc => 
    acc.compatible.includes(brand)
  );

  const accessoryCategories = {
    "Headphones": compatibleAccessories.filter(a => a.name.includes("Headphone") || a.name.includes("Headset") || a.name.includes("Earbuds")),
    "Cases": compatibleAccessories.filter(a => a.name.includes("Case")),
    "Chargers": compatibleAccessories.filter(a => a.name.includes("Charger")),
    "Screen Protectors": compatibleAccessories.filter(a => a.name.includes("Screen Protector")),
    "Cables": compatibleAccessories.filter(a => a.name.includes("Cable")),
    "Memory Cards": compatibleAccessories.filter(a => a.name.includes("Memory Card")),
    "Other": compatibleAccessories.filter(a => 
      !a.name.includes("Headphone") && !a.name.includes("Headset") && !a.name.includes("Earbuds") &&
      !a.name.includes("Case") && !a.name.includes("Charger") && !a.name.includes("Screen Protector") &&
      !a.name.includes("Cable") && !a.name.includes("Memory Card")
    )
  };
  
  const handleImageClick = () => {
    const img = new Image();
    img.src = imageUrl;
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

  const handleToggleAccessory = (accessory: Accessory) => {
    setSelectedAccessories(current => {
      const isSelected = current.some(a => a.id === accessory.id);
      if (isSelected) {
        return current.filter(a => a.id !== accessory.id);
      } else {
        return [...current, { ...accessory, selected: true }];
      }
    });
  };

  const handleConfirmAccessories = () => {
    setConfirmedAccessories([...selectedAccessories]);
    toast({
      title: "Accessories Confirmed",
      description: `${selectedAccessories.length} accessories added to your product`,
    });
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: quantity,
      selectedColor: selectedColor,
      accessories: confirmedAccessories.map(acc => ({
        id: String(acc.id),
        name: acc.name,
        price: acc.price,
        selected: true,
        category: 'accessory',
        image: acc.image
      }))
    };
    
    onQuantityChange(id, quantity);
    onClose();
  };
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleOpenReviewModal = () => {
    setReviewModalOpen(true);
  };
  
  const handleReviewSubmit = (name: string, rating: number, comment: string) => {
    const newReview = { name, rating, comment };
    setProductReviews(prev => [...prev, newReview]);
    setReviewModalOpen(false);
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg 
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="gold"
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-yellow-500"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative inline-block" style={{ width: "14px", height: "14px" }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-yellow-500 absolute"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="gold"
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-yellow-500 absolute"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg 
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none"
          stroke="currentColor" 
          strokeWidth="1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-yellow-500"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    }
    
    return (
      <div className="flex">
        {stars}
        <span className="ml-1 text-xs">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>
              Detailed information about {name} by {brand}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({productReviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div 
                className="rounded-lg overflow-hidden cursor-zoom-in"
                onClick={handleImageClick}
              >
                <img 
                  src={imageUrl} 
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
                {confirmedAccessories.length > 0 && (
                  <p className="text-sm mt-1">
                    With accessories: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </p>
                )}
                <p className="text-muted-foreground">Brand: {brand}</p>
                <p className="mt-4">
                  {name} is a premium device from {brand}, designed for optimal performance and user experience.
                  Click on the Specifications tab to see detailed technical information.
                </p>
                
                {showColorSelection && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">Available Colors:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map(color => (
                        <button
                          key={color}
                          onClick={() => handleColorSelect(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            selectedColor === color ? 'border-primary ring-2 ring-primary/30' : 'border-gray-300'
                          }`}
                          style={{ 
                            backgroundColor: 
                              color.toLowerCase() === 'blue' ? '#1e90ff' : 
                              color.toLowerCase() === 'white' ? '#ffffff' :
                              color.toLowerCase() === 'black' ? '#000000' :
                              color.toLowerCase() === 'silver' ? '#c0c0c0' :
                              color.toLowerCase() === 'gold' ? '#ffd700' :
                              color.toLowerCase() === 'red' ? '#ff0000' :
                              color.toLowerCase() === 'green' ? '#008000' :
                              color.toLowerCase() === 'purple' ? '#800080' :
                              color.toLowerCase() === 'space gray' ? '#88898b' :
                              color.toLowerCase() === 'titanium' ? '#878681' : '#cccccc',
                          }}
                          title={color}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Selected: {selectedColor}</p>
                  </div>
                )}
                
                <p className="mt-2 text-sm text-muted-foreground">
                  In Stock: {stock}
                </p>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1 bg-secondary rounded-l-md border-r border-border"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-secondary">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-3 py-1 bg-secondary rounded-r-md border-l border-border"
                    >
                      +
                    </button>
                  </div>
                  
                  <Button onClick={handleAddToCart} className="ml-4">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specs">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessories" className="space-y-4">
              <h3 className="text-lg font-medium">Compatible Accessories</h3>
              {compatibleAccessories.length === 0 ? (
                <p className="text-muted-foreground">No compatible accessories found for this product.</p>
              ) : (
                <div>
                  {Object.entries(accessoryCategories).map(([category, items]) => 
                    items.length > 0 && (
                      <div key={category} className="mb-6">
                        <h4 className="font-medium text-sm uppercase text-muted-foreground mb-2">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {items.map((accessory) => {
                            const isSelected = selectedAccessories.some(a => a.id === accessory.id);
                            return (
                              <div 
                                key={accessory.id} 
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                  isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => handleToggleAccessory(accessory)}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h4 className="font-medium">{accessory.name}</h4>
                                    <p className="text-sm text-muted-foreground">${accessory.price.toFixed(2)}</p>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                  }`}>
                                    {isSelected ? <Check size={14} /> : <Plus size={14} />}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                  
                  <div className="mt-4 flex justify-center">
                    <Button 
                      onClick={handleConfirmAccessories}
                      className="w-full"
                      disabled={selectedAccessories.length === 0}
                    >
                      Confirm Accessories
                    </Button>
                  </div>
                  
                  {confirmedAccessories.length > 0 && (
                    <div className="bg-card rounded-lg p-4 mt-4 border border-border">
                      <h4 className="font-medium mb-2">Selected Accessories</h4>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">Base price:</p>
                        <p className="text-sm">${(discount > 0 ? discountedPrice : price).toFixed(2)}</p>
                      </div>
                      <ul className="space-y-2 mb-2">
                        {confirmedAccessories.map(accessory => (
                          <li key={accessory.id} className="flex justify-between text-sm">
                            <span>{accessory.name}</span>
                            <span>${accessory.price.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <p className="font-medium">Total price:</p>
                        <p className="font-medium">${totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Customer Reviews ({productReviews.length})</h3>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex items-center"
                    onClick={handleOpenReviewModal}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Write a Review
                  </Button>
                </div>
                
                {productReviews.length === 0 ? (
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map((review, index) => (
                      <div key={index} className="border-b pb-3 last:border-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-medium">{review.name}</p>
                          {renderStarRating(review.rating)}
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <ProductReviewModal
        productId={id}
        productName={name}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
};

export default ProductDetailModal;
