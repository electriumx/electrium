
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

// Generate PC Accessories products
export const generatePCAccessoriesProducts = (): Product[] => {
  const subcategories = ["Keyboards", "Mice", "Monitors", "Webcams", "Microphones", "Speakers"];
  const products: Product[] = [];
  
  // Define brands for each subcategory
  const keyboards = ["Logitech", "Corsair", "Razer", "HyperX", "SteelSeries", "Ducky", "ASUS", "Keychron", "Microsoft", "Das Keyboard"];
  const mice = ["Logitech", "Razer", "SteelSeries", "Corsair", "Glorious", "HyperX", "ASUS", "Microsoft", "Zowie", "Cooler Master"];
  const monitors = ["Samsung", "LG", "ASUS", "Dell", "BenQ", "Acer", "ViewSonic", "AOC", "MSI", "HP"];
  const webcams = ["Logitech", "Razer", "Microsoft", "ASUS", "AverMedia", "Creative", "Elgato", "Ausdom", "NexiGo", "AnkerWork"];
  const microphones = ["Blue", "HyperX", "Razer", "Audio-Technica", "Shure", "Rode", "Elgato", "AKG", "Samson", "Beyerdynamic"];
  const speakers = ["Logitech", "Creative", "JBL", "Bose", "Edifier", "Audioengine", "Klipsch", "Harman Kardon", "Razer", "PreSonus"];
  
  // Descriptions for each subcategory
  const descriptions = {
    "Keyboards": (brand: string) => `${brand} premium keyboard with responsive keys and customizable features for enhanced typing and gaming`,
    "Mice": (brand: string) => `${brand} precision mouse with ergonomic design and advanced sensor for optimal tracking and comfort`,
    "Monitors": (brand: string) => `${brand} high-resolution display with vibrant colors and fast refresh rate for immersive viewing experience`,
    "Webcams": (brand: string) => `${brand} HD webcam with crystal-clear video quality and built-in microphone for professional video calls`,
    "Microphones": (brand: string) => `${brand} professional-grade microphone with exceptional sound clarity for streaming, podcasting, and recording`,
    "Speakers": (brand: string) => `${brand} premium speakers delivering rich, room-filling sound with deep bass and clear highs`
  };
  
  // Name patterns for each subcategory
  const namePatterns = {
    "Keyboards": ["Mechanical RGB", "Pro Gaming", "Silent", "Wireless", "Ergonomic", "Compact", "TKL", "Low Profile", "Gaming", "Premium"],
    "Mice": ["Pro Wireless", "Ultralight", "Precision", "Gaming", "Ergonomic", "Programmable", "MMO", "FPS", "Ambidextrous", "Vertical"],
    "Monitors": ["UltraSharp", "ProArt", "Gaming", "UltraWide", "Curved", "4K", "HDR", "IPS", "Professional", "LED"],
    "Webcams": ["StreamCam", "HD Pro", "4K Ultra", "Conference", "Streaming", "Pro", "Ultra HD", "Wide-angle", "Smart", "Auto-focus"],
    "Microphones": ["Condenser", "Dynamic", "Streaming", "Podcast", "Studio", "USB", "Cardioid", "Pro", "Desktop", "Gaming"],
    "Speakers": ["Bookshelf", "Desktop", "Gaming", "Multimedia", "Bluetooth", "2.1", "5.1", "Studio", "RGB", "Premium"]
  };
  
  // Price ranges for each subcategory
  const priceRanges = {
    "Keyboards": [59, 199],
    "Mice": [29, 149],
    "Monitors": [149, 699],
    "Webcams": [39, 199],
    "Microphones": [49, 299],
    "Speakers": [59, 349]
  };
  
  // Image URLs for each subcategory
  const imageUrls = {
    "Keyboards": "/lovable-uploads/72ebffff-bdd7-4309-b67c-3142e2a52726.png",
    "Mice": "/lovable-uploads/2f84a28b-83f8-4c69-96f8-ed61e49e631b.png",
    "Monitors": "/lovable-uploads/f36c4267-74e8-4514-8f6d-ba947eea3a13.png",
    "Webcams": "/lovable-uploads/ce523ec7-d793-4a5d-b548-b1f7a0193bf1.png",
    "Microphones": "/lovable-uploads/55a7c5a8-4ffa-4448-8ada-7591813f3755.png",
    "Speakers": "/lovable-uploads/4d754bb4-c77a-436a-8470-ef066e888a5d.png"
  };
  
  // Generate products for each subcategory
  subcategories.forEach(subcategory => {
    const brandList = 
      subcategory === "Keyboards" ? keyboards :
      subcategory === "Mice" ? mice :
      subcategory === "Monitors" ? monitors :
      subcategory === "Webcams" ? webcams :
      subcategory === "Microphones" ? microphones : speakers;
      
    const nameList = namePatterns[subcategory];
    const priceRange = priceRanges[subcategory];
    const descriptionTemplate = descriptions[subcategory];
    const imageUrl = imageUrls[subcategory];
    
    brandList.forEach((brand, index) => {
      products.push({
        id: generateProductId(),
        name: `${brand} ${nameList[index]} ${subcategory.slice(0, -1)}`,
        brand,
        category: "PC Accessories",
        subcategory,
        price: randomPrice(priceRange[0], priceRange[1]),
        discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0,
        quantity: 0,
        imageUrl,
        colors: ["Black", "White", "Silver", "Gray"],
        description: descriptionTemplate(brand),
        rating: randomRating(),
        reviews: randomReviews()
      });
    });
  });
  
  return products;
};

// Generate Tablet products
export const generateTabletProducts = (): Product[] => {
  const subcategories = ["iOS", "Android", "Windows", "E-readers", "Budget", "Premium"];
  const products: Product[] = [];
  
  // Define brands for each subcategory
  const brands = {
    "iOS": ["Apple"],
    "Android": ["Samsung", "Xiaomi", "Lenovo", "Huawei", "Amazon", "Asus", "OnePlus", "Oppo", "Vivo", "TCL"],
    "Windows": ["Microsoft", "Lenovo", "HP", "Dell", "Asus", "Acer", "Samsung", "Huawei", "LG", "Chuwi"],
    "E-readers": ["Amazon", "Kobo", "PocketBook", "Onyx", "Barnes & Noble", "Tolino", "Bookeen", "Remarkable", "Sony", "Boyue"],
    "Budget": ["Amazon", "Lenovo", "Samsung", "Huawei", "Xiaomi", "TCL", "Nokia", "Alcatel", "Vankyo", "Alldocube"],
    "Premium": ["Apple", "Samsung", "Microsoft", "Huawei", "Lenovo", "Google", "Asus", "Sony", "HP", "Dell"]
  };
  
  // Names for each subcategory
  const nameTemplates = {
    "iOS": ["iPad Pro", "iPad Air", "iPad Mini", "iPad", "iPad Pro Max", "iPad Air Plus", "iPad Ultra", "iPad Studio", "iPad Elite", "iPad Pro S"],
    "Android": ["Galaxy Tab", "Mi Pad", "Tab M", "MatePad", "Fire HD", "ZenPad", "OnePlus Pad", "Pad Neo", "V-Pad", "Tab 10"],
    "Windows": ["Surface Pro", "Yoga Tab", "Elite x2", "XPS 13", "Transformer", "Switch Alpha", "Galaxy Book", "MateBook", "Gram Tab", "Hi13"],
    "E-readers": ["Kindle", "Clara HD", "Touch HD", "Boox Note", "Nook", "Vision", "Saga", "Paper", "Digital Paper", "Likebook"],
    "Budget": ["Fire", "Tab E", "Galaxy Tab A", "MatePad T", "Redmi Pad", "NxtPaper", "T10", "1T 10", "Cosmos", "U89"],
    "Premium": ["iPad Pro", "Galaxy Tab S", "Surface Pro", "MatePad Pro", "Yoga Tab Pro", "Pixel Slate", "ZenPad 3S", "Xperia Tab", "Elite x2", "Latitude 12"]
  };
  
  // Descriptions for each subcategory
  const descriptionTemplates = {
    "iOS": (brand: string) => `${brand} iOS tablet with powerful performance, sleek design, and seamless integration with the Apple ecosystem`,
    "Android": (brand: string) => `${brand} Android tablet offering versatility and customization with access to millions of apps from the Google Play Store`,
    "Windows": (brand: string) => `${brand} Windows tablet providing full desktop functionality in a portable form factor for productivity on the go`,
    "E-readers": (brand: string) => `${brand} e-reader with eye-friendly display technology and weeks of battery life for comfortable extended reading`,
    "Budget": (brand: string) => `${brand} affordable tablet with essential features for entertainment, browsing, and basic productivity tasks`,
    "Premium": (brand: string) => `${brand} premium tablet with high-end specifications, premium build quality, and advanced features for power users`
  };
  
  // Price ranges for each subcategory
  const priceRanges = {
    "iOS": [329, 1299],
    "Android": [199, 899],
    "Windows": [399, 1499],
    "E-readers": [79, 349],
    "Budget": [89, 199],
    "Premium": [499, 1299]
  };
  
  // Generate products for each requested subcategory (iOS, Windows, E-readers, Budget)
  ["iOS", "Windows", "E-readers", "Budget"].forEach(subcategory => {
    const subcategoryBrands = brands[subcategory];
    const nameOptions = nameTemplates[subcategory];
    const descriptionTemplate = descriptionTemplates[subcategory];
    const priceRange = priceRanges[subcategory];
    
    subcategoryBrands.forEach((brand, index) => {
      // Generate 10 products for each subcategory
      for (let i = 0; i < 10; i++) {
        const modelNumber = i + 1;
        const name = subcategory === "iOS" && brand === "Apple" ? 
          `${nameOptions[Math.min(i, nameOptions.length - 1)]} ${modelNumber}` : 
          `${brand} ${nameOptions[Math.min(index, nameOptions.length - 1)]} ${modelNumber}`;
          
        let imageUrl = "/lovable-uploads/332dd32d-b893-48bd-8da7-73aa4bc107bb.png";
        
        // Use specific images for different tablet types
        if (subcategory === "E-readers") {
          imageUrl = "/lovable-uploads/36503a17-78b8-4912-9fae-5e0b7d358857.png";
        } else if (brand === "Apple") {
          imageUrl = "/lovable-uploads/0043f050-6bed-4f97-bb85-96fb6a0dffcd.png";
        } else if (brand === "Microsoft") {
          imageUrl = "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png";
        }
        
        products.push({
          id: generateProductId(),
          name,
          brand,
          category: "Tablets",
          subcategory,
          price: randomPrice(priceRange[0], priceRange[1]),
          discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0,
          quantity: 0,
          imageUrl,
          colors: ["Silver", "Black", "Gold", "Space Gray", "Blue"],
          description: descriptionTemplate(brand),
          rating: randomRating(),
          reviews: randomReviews()
        });
      }
    });
  });
  
  return products;
};

// Generate Games products for various subcategories
export const generateGamesProducts = (): Product[] => {
  const subcategories = ["Action", "RPG", "Strategy", "Sports", "Simulation", "Racing", "Puzzle", "FPS"];
  const products: Product[] = [];
  
  // Define game publishers/brands
  const publishers = ["Electronic Arts", "Ubisoft", "Activision", "2K Games", "Bethesda", "Square Enix", "Capcom", "Sony", "Microsoft", "Nintendo"];
  
  // Name templates for each subcategory
  const nameTemplates = {
    "Action": ["Assassin's Creed", "God of War", "Devil May Cry", "Star Wars Jedi", "Ghost of Tsushima", "Spider-Man", "Uncharted", "Tomb Raider", "Control", "Bayonetta"],
    "RPG": ["Elder Scrolls", "Dragon Age", "Final Fantasy", "Mass Effect", "Fallout", "Witcher", "Diablo", "Persona", "Elden Ring", "Kingdom Hearts"],
    "Strategy": ["Civilization", "Age of Empires", "StarCraft", "Total War", "XCOM", "Company of Heroes", "Command & Conquer", "Warcraft", "Anno", "Crusader Kings"],
    "Sports": ["FIFA", "NBA 2K", "Madden NFL", "PGA Tour", "MLB The Show", "NHL", "Tony Hawk's Pro Skater", "UFC", "Football Manager", "Tennis World Tour"],
    "Simulation": ["The Sims", "Flight Simulator", "Euro Truck Simulator", "Farming Simulator", "Cities: Skylines", "Planet Coaster", "Planet Zoo", "Two Point Hospital", "Jurassic World Evolution", "RollerCoaster Tycoon"],
    "Racing": ["Forza Horizon", "Gran Turismo", "Need for Speed", "F1", "Dirt Rally", "Assetto Corsa", "Project CARS", "Mario Kart", "The Crew", "Burnout"],
    "Puzzle": ["Portal", "Tetris", "Baba Is You", "The Witness", "Professor Layton", "Puyo Puyo", "The Talos Principle", "Lumines", "Inside", "Monument Valley"],
    "FPS": ["Call of Duty", "Battlefield", "Overwatch", "Doom", "Halo", "Counter-Strike", "Rainbow Six", "Destiny", "Borderlands", "Far Cry"]
  };
  
  // Descriptions for each subcategory
  const descriptionTemplates = {
    "Action": (game: string) => `${game} - Thrilling action-adventure game with intense combat and an engaging storyline`,
    "RPG": (game: string) => `${game} - Immersive role-playing game with deep character development and a vast open world to explore`,
    "Strategy": (game: string) => `${game} - Challenging strategy game that tests your tactical thinking and resource management skills`,
    "Sports": (game: string) => `${game} - Realistic sports simulation with authentic teams, players, and stadiums`,
    "Simulation": (game: string) => `${game} - Detailed simulation game that lets you build, manage, and control in a realistic setting`,
    "Racing": (game: string) => `${game} - High-octane racing game featuring stunning cars and tracks from around the world`,
    "Puzzle": (game: string) => `${game} - Mind-bending puzzle game that challenges your problem-solving skills and creativity`,
    "FPS": (game: string) => `${game} - Fast-paced first-person shooter with intense multiplayer action and strategic gameplay`
  };
  
  // Price ranges for each subcategory (all games similar price range)
  const priceRange = [39.99, 69.99];
  
  // Generate products for each subcategory
  subcategories.forEach(subcategory => {
    const gameNames = nameTemplates[subcategory];
    const descriptionTemplate = descriptionTemplates[subcategory];
    
    // Generate 10 products per subcategory
    for (let i = 0; i < 10; i++) {
      const publisherIndex = i % publishers.length;
      const gameNameIndex = i % gameNames.length;
      const publisher = publishers[publisherIndex];
      const gameName = gameNames[gameNameIndex];
      const edition = ["Standard", "Deluxe", "Ultimate", "Game of the Year", "Collector's", "Limited", "Premium", "Complete", "Digital", "Gold"][i % 10];
      const name = `${gameName} ${i+1} ${edition} Edition`;
      
      let imageUrl = "/lovable-uploads/d496c5e1-cf2a-4e3a-ad70-e121a939a763.png"; // Default game image
      
      // Specific images for FPS games
      if (subcategory === "FPS") {
        if (gameName.includes("Call of Duty")) {
          imageUrl = "/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png";
        } else if (gameName.includes("Battlefield")) {
          imageUrl = "/lovable-uploads/d496c5e1-cf2a-4e3a-ad70-e121a939a763.png";
        } else if (gameName.includes("Rainbow Six")) {
          imageUrl = "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png";
        }
      }
      // Specific images for other game types
      else if (subcategory === "Action" && gameName.includes("Assassin's Creed")) {
        imageUrl = "/lovable-uploads/9e75b39e-727b-45c3-83f0-144af9271dba.png";
      } else if (subcategory === "Racing") {
        if (i % 3 === 0) {
          imageUrl = "/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png";
        } else if (i % 3 === 1) {
          imageUrl = "/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png";
        } else {
          imageUrl = "/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png";
        }
      }
      
      products.push({
        id: generateProductId(),
        name,
        brand: publisher,
        category: "Games",
        subcategory,
        price: randomPrice(priceRange[0], priceRange[1]),
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0,
        quantity: 0,
        imageUrl,
        colors: ["N/A"],
        description: descriptionTemplate(gameName),
        rating: randomRating(),
        reviews: randomReviews()
      });
    }
  });
  
  return products;
};

// Generate Microwave products for various subcategories
export const generateMicrowaveProducts = (): Product[] => {
  const subcategories = ["Countertop", "Built-in", "Convection"];
  const products: Product[] = [];
  
  // Define microwave brands
  const brands = ["Samsung", "LG", "Whirlpool", "Panasonic", "GE", "Toshiba", "Sharp", "KitchenAid", "Bosch", "Frigidaire"];
  
  // Name templates for each subcategory
  const nameTemplates = {
    "Countertop": ["QuickHeat", "Express", "SpaceSaver", "Compact", "Classic", "Digital", "Smart", "Family", "Deluxe", "Chef"],
    "Built-in": ["Integrated", "Premium", "Designer", "Custom", "Sleek", "Flush", "Cabinet", "Pro", "Elite", "Luxury"],
    "Convection": ["MultiCook", "DualHeat", "AirFry", "TotalBake", "UltraCook", "OvenPlus", "CombiChef", "GourmetPro", "SmartBake", "MasterOven"]
  };
  
  // Descriptions for each subcategory
  const descriptionTemplates = {
    "Countertop": (brand: string) => `${brand} countertop microwave with convenient features and compact design for easy placement in any kitchen`,
    "Built-in": (brand: string) => `${brand} built-in microwave with seamless integration into your kitchen cabinetry for a sophisticated look`,
    "Convection": (brand: string) => `${brand} convection microwave combining traditional microwave and convection oven technologies for versatile cooking options`
  };
  
  // Price ranges for each subcategory
  const priceRanges = {
    "Countertop": [79, 199],
    "Built-in": [249, 699],
    "Convection": [179, 399]
  };
  
  // Image URLs for each brand
  const brandImageUrls = {
    "Samsung": "/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png",
    "LG": "/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png",
    "Whirlpool": "/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png",
    "Panasonic": "/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png"
  };
  
  // Generate products for each subcategory
  subcategories.forEach(subcategory => {
    // Generate 10 products per subcategory
    for (let i = 0; i < 10; i++) {
      const brandIndex = i % brands.length;
      const nameIndex = i % nameTemplates[subcategory].length;
      const brand = brands[brandIndex];
      const modelName = nameTemplates[subcategory][nameIndex];
      const name = `${brand} ${modelName} ${subcategory} Microwave`;
      const priceRange = priceRanges[subcategory];
      const description = descriptionTemplates[subcategory](brand);
      
      // Default microwave image
      let imageUrl = "/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png";
      
      // Use brand-specific images if available
      if (brandImageUrls[brand]) {
        imageUrl = brandImageUrls[brand];
      }
      
      products.push({
        id: generateProductId(),
        name,
        brand,
        category: "Microwaves",
        subcategory,
        price: randomPrice(priceRange[0], priceRange[1]),
        discount: Math.random() > 0.8 ? Math.floor(Math.random() * 20) + 5 : 0,
        quantity: 0,
        imageUrl,
        colors: ["White", "Black", "Stainless Steel", "Silver"],
        description,
        rating: randomRating(),
        reviews: randomReviews()
      });
    }
  });
  
  return products;
};

// Generate Washing Machine products for various subcategories
export const generateWashingMachineProducts = (): Product[] => {
  const subcategories = ["Front Load", "Top Load", "Commercial"];
  const products: Product[] = [];
  
  // Define washing machine brands
  const brands = ["Samsung", "LG", "Whirlpool", "Maytag", "GE", "Bosch", "Electrolux", "Speed Queen", "Miele", "Frigidaire"];
  
  // Name templates for each subcategory
  const nameTemplates = {
    "Front Load": ["EcoDrive", "SteamFresh", "UltraClean", "PowerWash", "PrecisionWash", "SilentDrive", "SmartControl", "ActiveWash", "ProCare", "FlexWash"],
    "Top Load": ["SuperCapacity", "DeepClean", "ClassicWash", "HydroWave", "TurboWash", "PowerMotion", "EasyTop", "Agitator", "DirectDrive", "DualAction"],
    "Commercial": ["Industrial", "Professional", "Heavy-Duty", "MultiLoad", "SpeedWash", "UltraDurable", "HighCapacity", "CommercialGrade", "BusinessPro", "LaundryMaster"]
  };
  
  // Descriptions for each subcategory
  const descriptionTemplates = {
    "Front Load": (brand: string) => `${brand} front-loading washing machine with advanced features, energy efficiency, and gentle fabric care`,
    "Top Load": (brand: string) => `${brand} top-loading washing machine offering convenient access, large capacity, and powerful cleaning performance`,
    "Commercial": (brand: string) => `${brand} commercial washing machine designed for high-volume use with durable construction and advanced cleaning technology`
  };
  
  // Price ranges for each subcategory
  const priceRanges = {
    "Front Load": [599, 1299],
    "Top Load": [399, 999],
    "Commercial": [1299, 2999]
  };
  
  // Default washing machine image
  const defaultImageUrl = "/lovable-uploads/2ae5236f-4492-452a-b393-492c225380c1.png";
  
  // Generate products for each subcategory
  subcategories.forEach(subcategory => {
    // Generate 10 products per subcategory
    for (let i = 0; i < 10; i++) {
      const brandIndex = i % brands.length;
      const nameIndex = i % nameTemplates[subcategory].length;
      const brand = brands[brandIndex];
      const modelName = nameTemplates[subcategory][nameIndex];
      const name = `${brand} ${modelName} ${subcategory} Washer`;
      const priceRange = priceRanges[subcategory];
      const description = descriptionTemplates[subcategory](brand);
      
      products.push({
        id: generateProductId(),
        name,
        brand,
        category: "Washing Machines",
        subcategory,
        price: randomPrice(priceRange[0], priceRange[1]),
        discount: Math.random() > 0.8 ? Math.floor(Math.random() * 15) + 5 : 0,
        quantity: 0,
        imageUrl: defaultImageUrl,
        colors: ["White", "Black", "Stainless Steel", "Silver", "Graphite"],
        description,
        rating: randomRating(),
        reviews: randomReviews()
      });
    }
  });
  
  return products;
};

// Generate Refrigerator products for various subcategories
export const generateRefrigeratorProducts = (): Product[] => {
  const subcategories = ["French Door", "Side-by-Side", "Top Freezer", "Bottom Freezer", "Mini", "Smart"];
  const products: Product[] = [];
  
  // Define refrigerator brands
  const brands = ["Samsung", "LG", "Whirlpool", "GE", "Frigidaire", "KitchenAid", "Bosch", "Maytag", "Electrolux", "Kenmore"];
  
  // Name templates for each subcategory
  const nameTemplates = {
    "French Door": ["FreshView", "GourmetPro", "ChefCollection", "FamilyHub", "CoolSelect", "PremiumChill", "DualCool", "Signature", "GalleryCollection", "CulinaFlex"],
    "Side-by-Side": ["SpacePlus", "DualZone", "IceMaster", "CoolingPlus", "FrostFree", "FreshBalance", "SideFresh", "DualControl", "ClassicPlus", "TouchControl"],
    "Top Freezer": ["ClassicCool", "EssentialChill", "StandardPlus", "BasicPro", "TopFrost", "ValueCool", "EcoClassic", "SimpleFresh", "SpaceSaver", "CoolClassic"],
    "Bottom Freezer": ["FreshBase", "EasyAccess", "FlexOrganize", "BottomChill", "CrisperPlus", "DualDrawer", "ComfortCool", "AccessFresh", "NaturalCool", "PrecisionTemp"],
    "Mini": ["Compact", "CubeCool", "DormPro", "TravelChill", "OfficeRefresh", "PersonalCool", "SmallSpace", "GuestCool", "PortaChill", "MiniMax"],
    "Smart": ["SmartHub", "ConnectedCool", "IntelliChill", "WiFiCool", "SmartView", "TouchScreen", "VoiceControl", "AppControl", "SmartSense", "FutureHome"]
  };
  
  // Descriptions for each subcategory
  const descriptionTemplates = {
    "French Door": (brand: string) => `${brand} French door refrigerator with spacious interior, flexible storage options, and elegant design`,
    "Side-by-Side": (brand: string) => `${brand} side-by-side refrigerator with convenient access to both refrigerator and freezer compartments`,
    "Top Freezer": (brand: string) => `${brand} top freezer refrigerator with classic design, reliability, and efficient cooling performance`,
    "Bottom Freezer": (brand: string) => `${brand} bottom freezer refrigerator offering easy access to fresh foods at eye level`,
    "Mini": (brand: string) => `${brand} mini refrigerator perfect for dorms, offices, or as a secondary fridge for beverages`,
    "Smart": (brand: string) => `${brand} smart refrigerator with advanced connectivity features, touchscreen interface, and intelligent storage management`
  };
  
  // Price ranges for each subcategory
  const priceRanges = {
    "French Door": [1299, 3999],
    "Side-by-Side": [899, 2499],
    "Top Freezer": [599, 1299],
    "Bottom Freezer": [899, 1799],
    "Mini": [99, 349],
    "Smart": [1999, 4999]
  };
  
  // Default refrigerator image
  const defaultImageUrl = "/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png";
  
  // Generate products for each subcategory
  subcategories.forEach(subcategory => {
    // Generate 10 products per subcategory
    for (let i = 0; i < 10; i++) {
      const brandIndex = i % brands.length;
      const nameIndex = i % nameTemplates[subcategory].length;
      const brand = brands[brandIndex];
      const modelName = nameTemplates[subcategory][nameIndex];
      const name = `${brand} ${modelName} ${subcategory} Refrigerator`;
      const priceRange = priceRanges[subcategory];
      const description = descriptionTemplates[subcategory](brand);
      
      products.push({
        id: generateProductId(),
        name,
        brand,
        category: "Refrigerators",
        subcategory,
        price: randomPrice(priceRange[0], priceRange[1]),
        discount: Math.random() > 0.8 ? Math.floor(Math.random() * 15) + 5 : 0,
        quantity: 0,
        imageUrl: defaultImageUrl,
        colors: ["Stainless Steel", "Black Stainless", "White", "Black", "Silver"],
        description,
        rating: randomRating(),
        reviews: randomReviews()
      });
    }
  });
  
  return products;
};

// Now update the use-products.ts file to include all these new product generators
