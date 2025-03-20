
import { Product } from './productData';

// Generate a random price between min and max
const randomPrice = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Generate a random rating between 3.5 and 5.0
const randomRating = (): number => {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
};

// Generate a random number of reviews between 10 and
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
  return Array.from({ length: count }, (_, i) => ({
    id: baseId + i,
    name: `${namePrefix} ${i + 1}`,
    price: randomPrice(priceRange[0], priceRange[1]),
    category,
    brand,
    description: descriptionFormat.replace('{i}', (i + 1).toString()),
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: randomRating(),
    reviews: randomReviews()
  }));
};

// Generate additional products for various categories
export const generateAdditionalProducts = (): Product[] => {
  let products: Product[] = [];
  let nextId = 5000;
  
  // Smartphones
  const smartphoneBrands = ["Apple", "Samsung", "Google", "Xiaomi"];
  smartphoneBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Apple" ? "iPhone" : 
                        brand === "Samsung" ? "Galaxy S" :
                        brand === "Google" ? "Pixel" : "Redmi";
                        
    products = products.concat(
      generateProducts(
        "Phone",
        brand,
        nextId + (index * 25),
        25,
        brandPrefix,
        `${brand} flagship smartphone with advanced camera system, version {i}`,
        [399, 1299]
      )
    );
  });
  
  nextId += 100;
  
  // Laptops
  const laptopBrands = ["Apple", "Microsoft", "Sony", "LG"];
  laptopBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Apple" ? "MacBook Pro" : 
                        brand === "Microsoft" ? "Surface Laptop" :
                        brand === "Sony" ? "VAIO" : "Gram";
                        
    products = products.concat(
      generateProducts(
        "Laptop",
        brand,
        nextId + (index * 25),
        25,
        brandPrefix,
        `${brand} premium laptop with high-performance processor, model {i}`,
        [699, 2499]
      )
    );
  });
  
  nextId += 100;
  
  // Gaming consoles
  const consoleBrands = ["Sony", "Microsoft", "Nintendo"];
  consoleBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Sony" ? "PlayStation" : 
                        brand === "Microsoft" ? "Xbox" : "Switch";
                        
    products = products.concat(
      generateProducts(
        "Gaming Consoles",
        brand,
        nextId + (index * 25),
        25,
        brandPrefix,
        `${brand} gaming console with immersive gameplay experience, generation {i}`,
        [249, 599]
      )
    );
  });
  
  nextId += 100;
  
  // TVs
  const tvBrands = ["Samsung", "Sony", "LG", "Panasonic"];
  tvBrands.forEach((brand, index) => {
    const brandPrefix = `${brand} Smart TV`;
                        
    products = products.concat(
      generateProducts(
        "TVs",
        brand,
        nextId + (index * 25),
        25,
        brandPrefix,
        `${brand} 4K Smart TV with crystal clear display, model {i}`,
        [399, 2999]
      )
    );
  });
  
  nextId += 100;
  
  // Headphones
  const headphoneBrands = ["Sony", "Bose", "Apple", "Samsung"];
  headphoneBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Apple" ? "AirPods" : 
                        brand === "Sony" ? "WH-1000XM" :
                        brand === "Bose" ? "QuietComfort" : "Galaxy Buds";
                        
    products = products.concat(
      generateProducts(
        "Headphones",
        brand,
        nextId + (index * 25),
        25,
        brandPrefix,
        `${brand} premium noise-cancelling headphones, version {i}`,
        [99, 399]
      )
    );
  });
  
  nextId += 100;
  
  // Games
  const gameBrands = ["PC Games", "PlayStation", "Microsoft"];
  gameBrands.forEach((brand, index) => {
    const brandPrefix = `${brand} Title`;
                        
    products = products.concat(
      generateProducts(
        "Games",
        brand,
        nextId + (index * 25),
        25,
        brandPrefix,
        `Exciting ${brand === "PC Games" ? "PC" : brand} game with stunning graphics, edition {i}`,
        [29.99, 69.99]
      )
    );
  });
  
  return products;
};
