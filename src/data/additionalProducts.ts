
import { Product } from './productData';
import { getCategoryImage, getGameImage } from '../utils/productImageUtils';

// Generate a random price between min and max
const randomPrice = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Generate a random rating between 3.5 and 5.0
const randomRating = (): number => {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
};

// Generate a random number of reviews between 10 and 300
const randomReviews = (): number => {
  return Math.floor(Math.random() * 300) + 10;
};

// Function to generate products for a specific category and brand
const generateProducts = (
  category: string,
  brand: string,
  baseId: number,
  count: number,
  namePrefix: string,
  descriptionFormat: string,
  priceRange: [number, number]
): Product[] => {
  // For microwaves, limit the count to avoid generating models numbered 20-100
  // For other categories, we'll limit the count to avoid too many products
  const actualCount = category === "Microwaves" ? Math.min(count, 19) : Math.min(count, 19);
  
  return Array.from({ length: actualCount }, (_, i) => {
    const productName = `${namePrefix} ${i + 1}`;
    
    // Choose appropriate image based on category and name
    let imageUrl = getCategoryImage(category, brand);
    
    // Special case for games
    if (category.toLowerCase() === 'games') {
      imageUrl = getGameImage(productName);
    }
    
    // Add FPS subcategory to appropriate games
    let subcategory = undefined;
    if (category === "Games") {
      if (productName.toLowerCase().includes("call of duty") || 
          productName.toLowerCase().includes("rainbow six") ||
          productName.toLowerCase().includes("battlefield") ||
          productName.toLowerCase().includes("counter-strike")) {
        subcategory = "FPS Games";
      }
    }
    
    // Skip numbers 20-100
    if (i + 1 >= 20) {
      return null;
    }
    
    return {
      id: baseId + i,
      name: productName,
      price: randomPrice(priceRange[0], priceRange[1]),
      category,
      brand,
      description: descriptionFormat.replace('{i}', (i + 1).toString()),
      imageUrl: imageUrl,
      quantity: 0,
      rating: randomRating(),
      reviews: randomReviews(),
      subcategory
    };
  }).filter(Boolean) as Product[]; // Filter out null products (the ones we skipped)
};

// Generate additional products for various categories
export const generateAdditionalProducts = (): Product[] => {
  let products: Product[] = [];
  let nextId = 5000;
  
  // Smartphones - Limit products per brand
  const smartphoneBrands = ["Apple", "Samsung", "Google", "Xiaomi"];
  smartphoneBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Apple" ? "iPhone" : 
                        brand === "Samsung" ? "Galaxy S" :
                        brand === "Google" ? "Pixel" : "Redmi";
                        
    products = products.concat(
      generateProducts(
        "Phone",
        brand,
        nextId + (index * 100), // Increase the space between brand IDs
        19, // Limit products per brand to 19 (excludes 20-100)
        brandPrefix,
        `${brand} flagship smartphone with advanced camera system, version {i}`,
        [399, 1299]
      )
    );
  });
  
  nextId += 500; // Increase ID gap between categories
  
  // Laptops - Limit products per brand
  const laptopBrands = ["Apple", "Microsoft", "Sony", "LG"];
  laptopBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Apple" ? "MacBook Pro" : 
                        brand === "Microsoft" ? "Surface Laptop" :
                        brand === "Sony" ? "VAIO" : "Gram";
                        
    products = products.concat(
      generateProducts(
        "Laptop",
        brand,
        nextId + (index * 100),
        19, // Limit products per brand to 19 (excludes 20-100)
        brandPrefix,
        `${brand} premium laptop with high-performance processor, model {i}`,
        [699, 2499]
      )
    );
  });
  
  nextId += 500;
  
  // Gaming consoles - Limit products per brand
  const consoleBrands = ["Sony", "Microsoft", "Nintendo"];
  consoleBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Sony" ? "PlayStation" : 
                        brand === "Microsoft" ? "Xbox" : "Switch";
                        
    products = products.concat(
      generateProducts(
        "Gaming Consoles",
        brand,
        nextId + (index * 100),
        19, // Limit products per brand to 19 (excludes 20-100)
        brandPrefix,
        `${brand} gaming console with immersive gameplay experience, generation {i}`,
        [249, 599]
      )
    );
  });
  
  nextId += 500;
  
  // TVs - Ensure 100 products per brand
  const tvBrands = ["Samsung", "Sony", "LG", "Panasonic"];
  tvBrands.forEach((brand, index) => {
    const brandPrefix = `${brand} Smart TV`;
                        
    products = products.concat(
      generateProducts(
        "TVs",
        brand,
        nextId + (index * 100),
        100, // Generate 100 products per brand
        brandPrefix,
        `${brand} 4K Smart TV with crystal clear display, model {i}`,
        [399, 2999]
      )
    );
  });
  
  nextId += 500;
  
  // Headphones - Ensure 100 products per brand
  const headphoneBrands = ["Sony", "Bose", "Apple", "Samsung"];
  headphoneBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Apple" ? "AirPods" : 
                        brand === "Sony" ? "WH-1000XM" :
                        brand === "Bose" ? "QuietComfort" : "Galaxy Buds";
                        
    products = products.concat(
      generateProducts(
        "Headphones",
        brand,
        nextId + (index * 100),
        100, // Generate 100 products per brand
        brandPrefix,
        `${brand} premium noise-cancelling headphones, version {i}`,
        [99, 399]
      )
    );
  });
  
  nextId += 500;
  
  // Games - Ensure 100 products per brand
  const gameBrands = ["PC Games", "PlayStation", "Microsoft"];
  gameBrands.forEach((brand, index) => {
    const brandPrefix = `${brand} Title`;
                        
    products = products.concat(
      generateProducts(
        "Games",
        brand,
        nextId + (index * 100),
        100, // Generate 100 products per brand
        brandPrefix,
        `Exciting ${brand === "PC Games" ? "PC" : brand} game with stunning graphics, edition {i}`,
        [29.99, 69.99]
      )
    );
  });
  
  // Add more categories to ensure every category has 100+ products
  
  // PC Accessories - Ensure 100 products per brand
  nextId += 500;
  const accessoryBrands = ["Logitech", "Razer", "Corsair", "SteelSeries"];
  accessoryBrands.forEach((brand, index) => {
    const brandPrefix = `${brand} Gaming`;
                        
    products = products.concat(
      generateProducts(
        "PC Accessories",
        brand,
        nextId + (index * 100),
        100, // Generate 100 products per brand
        brandPrefix,
        `${brand} high-performance gaming peripheral, model {i}`,
        [49.99, 199.99]
      )
    );
  });
  
  // Tablets - Ensure 100 products per brand
  nextId += 500;
  const tabletBrands = ["Apple", "Samsung", "Microsoft", "Amazon"];
  tabletBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Apple" ? "iPad" : 
                       brand === "Samsung" ? "Galaxy Tab" :
                       brand === "Microsoft" ? "Surface" : "Fire";
                        
    products = products.concat(
      generateProducts(
        "Tablets",
        brand,
        nextId + (index * 100),
        100, // Generate 100 products per brand
        brandPrefix,
        `${brand} tablet with stunning display and powerful performance, generation {i}`,
        [149.99, 999.99]
      )
    );
  });
  
  // Appliance categories - Ensure 100 products per brand
  
  // Microwaves - Modified to ensure numbering stops at 22
  nextId += 500;
  const microwaveBrands = ["Samsung", "LG", "Whirlpool", "Panasonic"];
  microwaveBrands.forEach((brand, index) => {
    products = products.concat(
      generateProducts(
        "Microwaves",
        brand,
        nextId + (index * 100),
        22, // Generate max 22 products per brand to avoid having models 23-100
        `${brand} Microwave`,
        `${brand} microwave with multiple cooking modes and smart features, model {i}`,
        [89.99, 399.99]
      )
    );
  });
  
  // Washing Machines
  nextId += 500;
  const washingMachineBrands = ["Samsung", "LG", "Whirlpool", "Bosch"];
  washingMachineBrands.forEach((brand, index) => {
    products = products.concat(
      generateProducts(
        "Washing Machines",
        brand,
        nextId + (index * 100),
        100,
        `${brand} Washing Machine`,
        `${brand} washing machine with energy-efficient technology, model {i}`,
        [299.99, 1299.99]
      )
    );
  });
  
  // Refrigerators
  nextId += 500;
  const refrigeratorBrands = ["Samsung", "LG", "Whirlpool", "GE"];
  refrigeratorBrands.forEach((brand, index) => {
    products = products.concat(
      generateProducts(
        "Refrigerators",
        brand,
        nextId + (index * 100),
        100,
        `${brand} Refrigerator`,
        `${brand} refrigerator with smart cooling system, model {i}`,
        [599.99, 2499.99]
      )
    );
  });
  
  // Air Conditioners
  nextId += 500;
  const acBrands = ["LG", "Samsung", "Daikin", "Carrier"];
  acBrands.forEach((brand, index) => {
    products = products.concat(
      generateProducts(
        "Air Conditioners",
        brand,
        nextId + (index * 100),
        100,
        `${brand} Air Conditioner`,
        `${brand} air conditioner with energy-saving technology, model {i}`,
        [299.99, 999.99]
      )
    );
  });
  
  // Vacuum Cleaners
  nextId += 500;
  const vacuumBrands = ["Dyson", "Shark", "iRobot", "Miele"];
  vacuumBrands.forEach((brand, index) => {
    products = products.concat(
      generateProducts(
        "Vacuum Cleaners",
        brand,
        nextId + (index * 100),
        100,
        `${brand} Vacuum`,
        `${brand} vacuum cleaner with powerful suction and advanced filtration, model {i}`,
        [149.99, 699.99]
      )
    );
  });
  
  // Smart Screens
  nextId += 500;
  const smartScreenBrands = ["Google", "Amazon", "Facebook", "Samsung"];
  smartScreenBrands.forEach((brand, index) => {
    products = products.concat(
      generateProducts(
        "Smart Screens",
        brand,
        nextId + (index * 100),
        100,
        `${brand} Smart Screen`,
        `${brand} smart display with voice assistant and video calling features, model {i}`,
        [99.99, 349.99]
      )
    );
  });
  
  // Add FPS games to the list
  nextId += 500;
  const fpsGameNames = [
    "Counter-Strike", "Battlefield", "Rainbow Six Siege", "Call of Duty: Modern Warfare", 
    "Call of Duty: Vanguard", "Call of Duty: Black Ops", "Doom Eternal", "Halo Infinite"
  ];
  
  fpsGameNames.forEach((gameName, index) => {
    products = products.concat(
      generateProducts(
        "Games",
        "PC Games",
        nextId + (index * 20), // Smaller gap since we have fewer games per brand
        5, // Generate 5 variants per game
        gameName,
        `${gameName} - action-packed first-person shooter with immersive gameplay, version {i}`,
        [29.99, 69.99]
      ).map(game => ({
        ...game,
        subcategory: "FPS Games",
        // Use Rainbow Six image for Rainbow Six games
        imageUrl: game.name.toLowerCase().includes("rainbow six") 
          ? "/lovable-uploads/e697f6f9-1a87-4501-9265-09ba16f3af26.png" 
          : game.imageUrl
      }))
    );
  });
  
  // Add specific Rainbow Six Siege games with the uploaded image
  nextId += 1000;
  products = products.concat([
    {
      id: nextId + 1,
      name: "Rainbow Six Siege Standard Edition",
      price: 29.99,
      category: "Games",
      brand: "PC Games",
      description: "Tom Clancy's Rainbow Six Siege Standard Edition - tactical first-person shooter with destructible environments and team-based gameplay",
      imageUrl: "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png", // New Rainbow Six image
      quantity: 0,
      rating: randomRating(),
      reviews: randomReviews(),
      subcategory: "FPS Games"
    },
    {
      id: nextId + 2,
      name: "Rainbow Six Siege Deluxe Edition",
      price: 39.99,
      category: "Games",
      brand: "PC Games",
      description: "Tom Clancy's Rainbow Six Siege Deluxe Edition - includes the base game and Year 1 operators for intense tactical shooter experience",
      imageUrl: "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png", // New Rainbow Six image
      quantity: 0,
      rating: randomRating(),
      reviews: randomReviews(),
      subcategory: "FPS Games"
    },
    {
      id: nextId + 3,
      name: "Rainbow Six Siege Gold Edition",
      price: 49.99,
      category: "Games",
      brand: "PC Games",
      description: "Tom Clancy's Rainbow Six Siege Gold Edition - includes the base game, Year 1 operators, and latest season pass",
      imageUrl: "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png", // New Rainbow Six image
      quantity: 0,
      rating: randomRating(),
      reviews: randomReviews(),
      subcategory: "FPS Games"
    }
  ]);
  
  // Add Call of Duty Black Ops games 1-6
  nextId += 1000;
  for (let i = 1; i <= 6; i++) {
    products = products.concat([
      {
        id: nextId + i,
        name: `Call of Duty: Black Ops ${i}`,
        price: 59.99,
        category: "Games",
        brand: "PC Games",
        description: `Call of Duty: Black Ops ${i} - intense first-person shooter with epic campaign and multiplayer modes`,
        imageUrl: "/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png", // Keep COD image
        quantity: 0,
        rating: randomRating(),
        reviews: randomReviews(),
        subcategory: "FPS Games"
      }
    ]);
  }
  
  return products;
};
