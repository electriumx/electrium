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

const getTechSpecs = (productId: number, brand: string, name: string, category: string): Record<string, string> => {
  const defaultSpecs = {
    ram: "8GB",
    storage: "256GB SSD",
    processor: "Octa-core",
    display: "13.3-inch Retina Display",
    battery: "Up to 18 hours",
    camera: "1080p FaceTime HD Camera",
    connectivity: "Wi-Fi 6, Bluetooth 5.0"
  };
  
  if (name.toLowerCase().includes('iphone 13 pro')) {
    return {
      processor: "A15 Bionic chip",
      ram: "6GB",
      storage: "128GB/256GB/512GB/1TB",
      display: "6.1-inch Super Retina XDR with ProMotion",
      camera: "Pro 12MP camera system with Telephoto, Wide, and Ultra Wide",
      battery: "Up to 22 hours video playback",
      connectivity: "5G, Wi-Fi 6, Bluetooth 5.0, NFC"
    };
  } else if (name.toLowerCase().includes('galaxy s21')) {
    return {
      processor: "Snapdragon 888 or Exynos 2100",
      ram: "8GB",
      storage: "128GB/256GB",
      display: "6.2-inch Dynamic AMOLED 2X, 120Hz",
      camera: "12MP + 12MP + 64MP triple rear camera",
      battery: "4000mAh",
      connectivity: "5G, Wi-Fi 6, Bluetooth 5.0, NFC"
    };
  } else if (name.toLowerCase().includes('dell xps 15')) {
    return {
      processor: "11th Gen Intel Core i7-11800H",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: "15.6-inch 4K UHD+ (3840 x 2400)",
      graphics: "NVIDIA GeForce RTX 3050 Ti 4GB GDDR6",
      battery: "Up to 10 hours",
      connectivity: "Wi-Fi 6, Bluetooth 5.1, Thunderbolt 4"
    };
  } else if (name.toLowerCase().includes('sony wh-1000xm4')) {
    return {
      driver: "40mm, dome type (CCAW Voice coil)",
      frequency: "4Hz-40,000Hz",
      battery: "Up to 30 hours with noise canceling on",
      charging: "USB-C, 10 min charge for 5 hours playback",
      connectivity: "Bluetooth 5.0, NFC, 3.5mm audio cable",
      noise_cancellation: "HD Noise Canceling Processor QN1",
      additional: "Touch controls, speak-to-chat, multi-device pairing"
    };
  } else if (name.toLowerCase().includes('ipad pro')) {
    return {
      processor: "Apple M1 chip",
      ram: "8GB/16GB",
      storage: "128GB/256GB/512GB/1TB/2TB",
      display: "11-inch or 12.9-inch Liquid Retina XDR",
      camera: "12MP Wide + 10MP Ultra Wide + LiDAR Scanner",
      battery: "Up to 10 hours",
      connectivity: "5G, Wi-Fi 6, Bluetooth 5.0, USB-C"
    };
  } else if (name.toLowerCase().includes('playstation 5')) {
    return {
      cpu: "Custom AMD Zen 2, 8 cores at 3.5GHz",
      gpu: "Custom RDNA 2, 10.28 TFLOPs",
      ram: "16GB GDDR6",
      storage: "825GB SSD",
      resolution: "Up to 8K, 4K at 120fps",
      audio: "Tempest 3D AudioTech",
      connectivity: "Wi-Fi 6, Bluetooth 5.1, HDMI 2.1"
    };
  } else if (name.toLowerCase().includes('xbox series x')) {
    return {
      cpu: "Custom AMD Zen 2, 8 cores at 3.8GHz",
      gpu: "Custom RDNA 2, 12 TFLOPs",
      ram: "16GB GDDR6",
      storage: "1TB Custom NVMe SSD",
      resolution: "Up to 8K, 4K at 120fps",
      audio: "Dolby Atmos, DTS:X",
      connectivity: "Wi-Fi 6, Bluetooth 5.1, HDMI 2.1"
    };
  } else if (name.toLowerCase().includes('elden ring')) {
    return {
      developer: "FromSoftware",
      publisher: "Bandai Namco",
      genre: "Action RPG",
      release_date: "February 25, 2022",
      platforms: "PC, PS4, PS5, Xbox One, Xbox Series X/S",
      engine: "Custom engine",
      multiplayer: "Online co-op and PvP"
    };
  } else if (name.toLowerCase().includes('red dead redemption 2')) {
    return {
      developer: "Rockstar Games",
      publisher: "Rockstar Games",
      genre: "Action-Adventure",
      release_date: "October 26, 2018",
      platforms: "PC, PS4, Xbox One",
      engine: "RAGE",
      setting: "American Old West, 1899"
    };
  } else if (brand === "Apple" && category === "Audio") {
    return {
      driver: "Custom high-excursion Apple driver",
      chip: "H1 chip",
      battery: "Up to 4.5 hours listening time, 24 hours with charging case",
      charging: "Lightning connector, Qi-certified wireless charging",
      connectivity: "Bluetooth 5.0",
      features: "Active Noise Cancellation, Transparency mode, Adaptive EQ",
      resistance: "Sweat and water resistant (IPX4)"
    };
  }
  
  if (brand) {
    switch(brand.toLowerCase()) {
      case "apple":
        return {
          processor: "Apple Silicon",
          ram: "8GB",
          storage: "256GB SSD",
          display: "Retina Display",
          battery: "Up to 20 hours",
          camera: "12MP camera",
          connectivity: "Wi-Fi 6, Bluetooth 5.0"
        };
      case "samsung":
        return {
          processor: "Snapdragon or Exynos",
          ram: "8GB",
          storage: "128GB",
          display: "AMOLED Display",
          battery: "4500mAh",
          camera: "64MP main camera",
          connectivity: "5G, Wi-Fi 6, Bluetooth 5.1"
        };
      case "sony":
        return {
          processor: "Snapdragon 888",
          ram: "12GB",
          storage: "256GB",
          display: "4K HDR OLED",
          battery: "4500mAh",
          camera: "Zeiss optics, 108MP",
          connectivity: "5G, Wi-Fi 6, Bluetooth 5.2"
        };
      case "bose":
        return {
          driver: "TriPort acoustic headphone structure",
          battery: "Up to 20 hours",
          charging: "USB-C",
          connectivity: "Bluetooth 5.0, 3.5mm audio cable",
          noise_cancellation: "11 levels of noise cancellation",
          microphone: "Four-microphone system",
          features: "Voice assistants, touch controls"
        };
    }
  }
  
  if (category) {
    switch(category.toLowerCase()) {
      case "smartphones":
        return {
          processor: "Octa-core processor",
          ram: "6GB",
          storage: "128GB",
          display: "6.5-inch Full HD+",
          battery: "4500mAh",
          camera: "Quad camera setup",
          connectivity: "5G, Wi-Fi, Bluetooth 5.0"
        };
      case "laptops":
        return {
          processor: "Intel Core i7 or AMD Ryzen 7",
          ram: "16GB DDR4",
          storage: "512GB SSD",
          display: "15.6-inch Full HD",
          graphics: "Integrated or dedicated GPU",
          battery: "Up to 8 hours",
          connectivity: "Wi-Fi 6, Bluetooth 5.1, USB-C"
        };
      case "headphones":
        return {
          driver: "40mm dynamic driver",
          frequency: "20Hz-20,000Hz",
          battery: "Up to 30 hours",
          charging: "USB-C",
          connectivity: "Bluetooth 5.0, 3.5mm audio",
          features: "Noise cancellation, built-in mic",
          weight: "Approximately 250g"
        };
      case "tablets":
        return {
          processor: "Octa-core processor",
          ram: "4GB",
          storage: "64GB",
          display: "10.1-inch Full HD",
          battery: "7000mAh",
          camera: "8MP rear, 5MP front",
          connectivity: "Wi-Fi, Bluetooth 5.0"
        };
      case "gaming consoles":
        return {
          cpu: "Custom processor",
          gpu: "Custom graphics",
          ram: "16GB",
          storage: "1TB SSD",
          resolution: "4K gaming",
          features: "Ray tracing, HDR",
          connectivity: "Wi-Fi 6, Bluetooth 5.1"
        };
      case "pc games":
      case "gaming":
        return {
          developer: "Game studio",
          publisher: "Publishing company",
          genre: "Game genre",
          release_date: "Release year",
          platforms: "Available platforms",
          modes: "Single-player, Multiplayer",
          rating: "ESRB rating"
        };
    }
  }
  
  return defaultSpecs;
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
    
    setTotalPrice(total * quantity);
  }, [confirmedAccessories, price, discountedPrice, discount, quantity]);
  
  const specs = getTechSpecs(id, brand, name, category);
  
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
    
    const basePrice = discount > 0 ? discountedPrice : price;
    const accessoriesTotal = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
    const newTotal = (basePrice + accessoriesTotal) * quantity;
    setTotalPrice(newTotal);
    
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
                    <span className="text-xs ml-2 text-muted-foreground">
                      (Base: ${((discount > 0 ? discountedPrice : price) * quantity).toFixed(2)} + Accessories: $
                      {confirmedAccessories.reduce((sum, acc) => sum + acc.price, 0).toFixed(2)}) × {quantity}
                    </span>
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
                      onClick={() => {
                        const newQuantity = Math.max(1, quantity - 1);
                        setQuantity(newQuantity);
                        const basePrice = discount > 0 ? discountedPrice : price;
                        const accessoriesTotal = confirmedAccessories.reduce((sum, acc) => sum + acc.price, 0);
                        setTotalPrice((basePrice + accessoriesTotal) * newQuantity);
                      }}
                      className="px-3 py-1 bg-secondary rounded-l-md hover:bg-secondary/80 border-r"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-secondary">{quantity}</span>
                    <button 
                      onClick={() => {
                        const newQuantity = quantity + 1;
                        setQuantity(newQuantity);
                        const basePrice = discount > 0 ? discountedPrice : price;
                        const accessoriesTotal = confirmedAccessories.reduce((sum, acc) => sum + acc.price, 0);
                        setTotalPrice((basePrice + accessoriesTotal) * newQuantity);
                      }}
                      className="px-3 py-1 bg-secondary rounded-r-md hover:bg-secondary/80 border-l"
                    >
                      +
                    </button>
                  </div>
                  <Button onClick={handleAddToCart}>Add to Cart</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="border rounded-md p-3">
                    <p className="capitalize text-sm text-muted-foreground">{key.replace('_', ' ')}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accessories" className="space-y-4">
              {compatibleAccessories.length > 0 ? (
                <>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Compatible Accessories</h3>
                    <Button 
                      onClick={handleConfirmAccessories} 
                      variant="outline"
                      className="text-xs"
                    >
                      Confirm Accessories
                    </Button>
                  </div>
                  
                  {Object.entries(accessoryCategories).map(([category, items]) => 
                    items.length > 0 && (
                      <div key={category} className="space-y-2">
                        <h4 className="font-medium text-sm">{category}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {items.map(accessory => {
                            const isSelected = selectedAccessories.some(a => a.id === accessory.id);
                            return (
                              <div 
                                key={accessory.id}
                                className={`border rounded-md p-2 flex items-center gap-2 cursor-pointer transition-all ${
                                  isSelected ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'
                                }`}
                                onClick={() => handleToggleAccessory(accessory)}
                              >
                                <div className="w-10 h-10 relative flex-shrink-0">
                                  <img 
                                    src={accessory.image} 
                                    alt={accessory.name} 
                                    className="w-full h-full object-cover rounded"
                                  />
                                  {isSelected && (
                                    <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                                      <Check className="w-3 h-3" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{accessory.name}</p>
                                  <p className="text-muted-foreground text-xs">${accessory.price.toFixed(2)}</p>
                                </div>
                                <button 
                                  className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleAccessory(accessory);
                                  }}
                                >
                                  {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                  
                  {selectedAccessories.length > 0 && (
                    <div className="border-t pt-3 mt-3 flex justify-between items-center">
                      <span>
                        Selected: <span className="font-medium">{selectedAccessories.length} items</span>
                      </span>
                      <span>
                        Total: <span className="font-medium">
                          ${selectedAccessories.reduce((sum, acc) => sum + acc.price, 0).toFixed(2)}
                        </span>
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No compatible accessories found for this product</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button 
                  onClick={handleOpenReviewModal}
                  size="sm"
                  className="text-xs"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Write a Review
                </Button>
              </div>
              
              {productReviews.length > 0 ? (
                <div className="space-y-4">
                  {productReviews.map((review, index) => (
                    <div key={index} className="border rounded-md p-3 space-y-2">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{review.name}</h4>
                        {renderStarRating(review.rating)}
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
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
