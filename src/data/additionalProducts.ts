
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
  return Array.from({ length: count }, (_, i) => {
    const productName = `${namePrefix} ${i + 1}`;
    
    // Choose appropriate image based on category and name
    let imageUrl = getCategoryImage(category, brand);
    
    // Special case for games
    if (category.toLowerCase() === 'games') {
      imageUrl = getGameImage(productName);
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
      reviews: randomReviews()
    };
  });
};

// Generate additional products for various categories
export const generateAdditionalProducts = (): Product[] => {
  let products: Product[] = [];
  let nextId = 5000;
  
  // Smartphones - Ensure 100 products per brand
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
        100, // Generate 100 products per brand
        brandPrefix,
        `${brand} flagship smartphone with advanced camera system, version {i}`,
        [399, 1299]
      )
    );
  });
  
  nextId += 500; // Increase ID gap between categories
  
  // Laptops - Ensure 100 products per brand
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
        100, // Generate 100 products per brand
        brandPrefix,
        `${brand} premium laptop with high-performance processor, model {i}`,
        [699, 2499]
      )
    );
  });
  
  nextId += 500;
  
  // Gaming consoles - Ensure 100 products per brand
  const consoleBrands = ["Sony", "Microsoft", "Nintendo"];
  consoleBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Sony" ? "PlayStation" : 
                        brand === "Microsoft" ? "Xbox" : "Switch";
                        
    products = products.concat(
      generateProducts(
        "Gaming Consoles",
        brand,
        nextId + (index * 100),
        100, // Generate 100 products per brand
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
  
  // Microwaves
  nextId += 500;
  const microwaveBrands = ["Samsung", "LG", "Whirlpool", "Panasonic"];
  microwaveBrands.forEach((brand, index) => {
    products = products.concat(
      generateProducts(
        "Microwaves",
        brand,
        nextId + (index * 100),
        100,
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
  
  return products;
};
