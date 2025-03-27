
import { Product } from '@/types/product';
import { generateProductId, randomPrice, randomRating, randomReviews } from './helpers';

// Generate Smartphone products for various subcategories
export const generateSmartphoneProducts = (): Product[] => {
  const subcategories = ["Android", "Foldable", "Budget", "Premium", "Camera-focused", "Battery-focused"];
  const brands = ["Samsung", "Xiaomi", "Google", "OnePlus", "Motorola", "Sony", "LG", "Huawei", "Nokia", "ASUS"];
  const products: Product[] = [];

  subcategories.forEach(subcategory => {
    brands.forEach((brand, index) => {
      const priceRange = 
        subcategory === "Budget" ? [99, 299] :
        subcategory === "Premium" ? [899, 1499] :
        subcategory === "Foldable" ? [1299, 1999] :
        [349, 799];

      const name = 
        subcategory === "Android" ? `${brand} Android Pro ${index + 1}` :
        subcategory === "Foldable" ? `${brand} Fold ${index + 1}` :
        subcategory === "Budget" ? `${brand} Essential ${index + 1}` :
        subcategory === "Premium" ? `${brand} Ultra ${index + 1}` :
        subcategory === "Camera-focused" ? `${brand} Zoom ${index + 1}` :
        `${brand} Power ${index + 1}`;

      const description = 
        subcategory === "Android" ? `${brand} flagship Android smartphone with premium features` :
        subcategory === "Foldable" ? `${brand} innovative foldable smartphone with dual screens` :
        subcategory === "Budget" ? `${brand} affordable smartphone with essential features` :
        subcategory === "Premium" ? `${brand} premium smartphone with top-tier performance and features` :
        subcategory === "Camera-focused" ? `${brand} smartphone with exceptional camera capabilities and zoom` :
        `${brand} smartphone with extended battery life for multi-day usage`;

      let imageUrl = "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png";
      
      if (brand === "Samsung") {
        imageUrl = "/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png";
      } else if (brand === "Google") {
        imageUrl = "/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png";
      }

      products.push({
        id: generateProductId(),
        name,
        brand,
        category: "Phone",
        subcategory,
        price: randomPrice(priceRange[0], priceRange[1]),
        discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0,
        quantity: 0,
        imageUrl,
        colors: ["Black", "Silver", "Blue", "Red", "White"],
        description,
        rating: randomRating(),
        reviews: randomReviews()
      });
    });
  });

  return products;
};

// Generate Gaming Console products for various subcategories
export const generateGamingConsoleProducts = (): Product[] => {
  const subcategories = ["Home Console", "Portable", "Retro", "VR", "Accessories"];
  const products: Product[] = [];
  
  // Different brands for each subcategory
  const homeConsoleBrands = ["Sony", "Microsoft", "Nintendo", "Sega", "Atari", "SNK", "Intellivision", "Philips", "Panasonic", "Valve"];
  const portableBrands = ["Nintendo", "Sony", "Sega", "Atari", "SNK", "Bandai", "Nokia", "Tiger Electronics", "Razer", "Valve"];
  const retroBrands = ["Nintendo", "Sega", "Atari", "SNK", "Coleco", "Mattel", "Commodore", "Magnavox", "NEC", "Fairchild"];
  const vrBrands = ["Meta", "Sony", "Valve", "HTC", "HP", "Samsung", "Oculus", "Pimax", "Microsoft", "Pico"];
  const accessoryBrands = ["Microsoft", "Sony", "Nintendo", "Razer", "Logitech", "SteelSeries", "Turtle Beach", "Thrustmaster", "PowerA", "Mad Catz"];

  // Home Consoles
  homeConsoleBrands.forEach((brand, index) => {
    products.push({
      id: generateProductId(),
      name: `${brand} ${["Pro", "Elite", "Ultra", "Max", "Supreme", "Plus", "Advanced", "Next", "Master", "Ultimate"][index]} Console`,
      brand,
      category: "Gaming Consoles",
      subcategory: "Home Console",
      price: randomPrice(299, 599),
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 15) + 5 : 0,
      quantity: 0,
      imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png",
      colors: ["Black", "White", "Gray"],
      description: `${brand} high-performance home gaming console with immersive gameplay and stunning graphics`,
      rating: randomRating(),
      reviews: randomReviews()
    });
  });

  // Portable Consoles
  portableBrands.forEach((brand, index) => {
    products.push({
      id: generateProductId(),
      name: `${brand} ${["Handheld", "Pocket", "Go", "Mobile", "Travel", "Lite", "Portable", "Mini", "Micro", "Compact"][index]}`,
      brand,
      category: "Gaming Consoles",
      subcategory: "Portable",
      price: randomPrice(149, 349),
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 15) + 5 : 0,
      quantity: 0,
      imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png",
      colors: ["Black", "Blue", "Red", "Yellow", "Turquoise"],
      description: `${brand} portable gaming system with impressive battery life and a library of games on-the-go`,
      rating: randomRating(),
      reviews: randomReviews()
    });
  });

  // Retro Consoles
  retroBrands.forEach((brand, index) => {
    products.push({
      id: generateProductId(),
      name: `${brand} ${["Classic", "Mini", "Legacy", "Flashback", "Nostalgia", "Retro", "Heritage", "Vintage", "Anniversary", "Collector's"][index]} Edition`,
      brand,
      category: "Gaming Consoles",
      subcategory: "Retro",
      price: randomPrice(59, 129),
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0,
      quantity: 0,
      imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png",
      colors: ["Gray", "Black", "Original"],
      description: `${brand} classic gaming console with pre-loaded retro games from the golden era of gaming`,
      rating: randomRating(),
      reviews: randomReviews()
    });
  });

  // VR Consoles
  vrBrands.forEach((brand, index) => {
    products.push({
      id: generateProductId(),
      name: `${brand} ${["Reality", "VR", "Virtual", "Immersive", "Vision", "Experience", "Dimension", "Realm", "Universe", "Portal"][index]}`,
      brand,
      category: "Gaming Consoles",
      subcategory: "VR",
      price: randomPrice(299, 999),
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 15) + 5 : 0,
      quantity: 0,
      imageUrl: "/lovable-uploads/07224c91-e369-4205-a0c2-458050f508f3.png",
      colors: ["Black", "White"],
      description: `${brand} virtual reality headset offering immersive gaming experiences with advanced tracking and controllers`,
      rating: randomRating(),
      reviews: randomReviews()
    });
  });

  // Accessories
  accessoryBrands.forEach((brand, index) => {
    products.push({
      id: generateProductId(),
      name: `${brand} ${["Controller", "Gamepad", "Steering Wheel", "Arcade Stick", "Gun Controller", "Racing Wheel", "Flight Stick", "Guitar Controller", "Dance Pad", "Motion Controller"][index]}`,
      brand,
      category: "Gaming Consoles",
      subcategory: "Accessories",
      price: randomPrice(29, 149),
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 25) + 5 : 0,
      quantity: 0,
      imageUrl: "/lovable-uploads/6e559433-f480-42f6-9f32-9429e4b3b349.png",
      colors: ["Black", "White", "Red", "Blue"],
      description: `${brand} high-quality gaming accessory designed for precision control and enhanced gameplay`,
      rating: randomRating(),
      reviews: randomReviews()
    });
  });

  return products;
};

// Generate Headphone products for various subcategories
export const generateHeadphoneProducts = (): Product[] => {
  const subcategories = ["Over-ear", "In-ear", "Wireless", "Noise-cancelling", "Gaming", "Sports"];
  const products: Product[] = [];
  
  // Brands for each subcategory
  const brands = {
    "Over-ear": ["Sony", "Bose", "Sennheiser", "Audio-Technica", "Beyerdynamic", "AKG", "JBL", "Philips", "Shure", "V-Moda"],
    "In-ear": ["Apple", "Samsung", "Sennheiser", "Sony", "Bose", "Jabra", "Anker", "1More", "Audio-Technica", "Shure"],
    "Wireless": ["Sony", "Bose", "Apple", "Samsung", "Jabra", "JBL", "Beats", "Sennheiser", "Anker", "Skullcandy"],
    "Noise-cancelling": ["Bose", "Sony", "Apple", "Sennheiser", "Samsung", "Shure", "Jabra", "Bowers & Wilkins", "Microsoft", "Anker"],
    "Gaming": ["SteelSeries", "HyperX", "Razer", "Logitech", "Corsair", "Turtle Beach", "Astro", "EPOS", "JBL", "ASUS"],
    "Sports": ["Beats", "Jaybird", "Bose", "JBL", "Jabra", "Under Armour", "Skullcandy", "Sony", "Adidas", "Anker"]
  };

  // Product name templates for each subcategory
  const nameTemplates = {
    "Over-ear": ["Studio", "Professional", "Premium", "Audiophile", "Reference", "Signature", "Elite", "Comfort", "Classic", "Monitor"],
    "In-ear": ["Buds", "Tips", "Micro", "Slim", "Core", "Ultra", "Mini", "Pro", "Clarity", "Focus"],
    "Wireless": ["Freedom", "Liberty", "Air", "Cloud", "Flow", "Pulse", "Connect", "Flex", "Dynamic", "Stream"],
    "Noise-cancelling": ["Quiet", "Silent", "Serenity", "Peace", "Calm", "Isolate", "Focus", "Tranquil", "Shield", "Bubble"],
    "Gaming": ["Commander", "Striker", "Viper", "Dominator", "Champion", "Tactical", "Rush", "Victory", "Arena", "Battle"],
    "Sports": ["Active", "Motion", "Endurance", "Power", "Athlete", "Runner", "Fitness", "Energy", "Stamina", "Vital"]
  };

  // Description templates for each subcategory
  const descriptionTemplates = {
    "Over-ear": (brand: string) => `${brand} premium over-ear headphones with exceptional sound quality and comfort for extended listening sessions`,
    "In-ear": (brand: string) => `${brand} in-ear headphones delivering crystal-clear audio in a compact, comfortable design`,
    "Wireless": (brand: string) => `${brand} wireless headphones with seamless Bluetooth connectivity and impressive battery life`,
    "Noise-cancelling": (brand: string) => `${brand} noise-cancelling headphones that create a peaceful listening environment by blocking out surrounding noise`,
    "Gaming": (brand: string) => `${brand} gaming headphones with precision audio, surround sound, and communication features for competitive gaming`,
    "Sports": (brand: string) => `${brand} sports headphones designed for active lifestyles with sweat resistance and secure fit`
  };

  // Price ranges for each subcategory
  const priceRanges = {
    "Over-ear": [149, 399],
    "In-ear": [59, 249],
    "Wireless": [99, 349],
    "Noise-cancelling": [199, 449],
    "Gaming": [79, 299],
    "Sports": [69, 199]
  };

  // Generate 10 products for each subcategory
  subcategories.forEach(subcategory => {
    const subcategoryBrands = brands[subcategory];
    const nameOptions = nameTemplates[subcategory];
    const descriptionTemplate = descriptionTemplates[subcategory];
    const priceRange = priceRanges[subcategory];

    subcategoryBrands.forEach((brand, index) => {
      let imageUrl = "/lovable-uploads/b48e7d14-29ab-4227-a09c-eb324e7620d7.png";
      
      if (subcategory === "Over-ear") {
        imageUrl = "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png";
      } else if (subcategory === "In-ear" || subcategory === "Wireless") {
        imageUrl = "/lovable-uploads/b716e87d-a752-4422-aafa-94b38c1dbff3.png";
      } else if (subcategory === "Sports") {
        imageUrl = "/lovable-uploads/bfd80abc-6761-4660-9b25-36864420ec27.png";
      } else if (brand === "Bose") {
        imageUrl = "/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png";
      }

      products.push({
        id: generateProductId(),
        name: `${brand} ${nameOptions[index]} ${subcategory}`,
        brand,
        category: "Headphones",
        subcategory,
        price: randomPrice(priceRange[0], priceRange[1]),
        discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0,
        quantity: 0,
        imageUrl,
        colors: ["Black", "White", "Silver", "Blue", "Red"],
        description: descriptionTemplate(brand),
        rating: randomRating(),
        reviews: randomReviews()
      });
    });
  });

  return products;
};
