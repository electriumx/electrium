
import { Product } from '../data/productData';
import { products } from '../data/productData';
import { allNewProducts } from '../data/newProducts';
import { allAdditionalProducts } from '../data/additionalNewProducts';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { refrigeratorProducts } from '../data/refrigeratorProducts';
import { additionalCategoryProducts } from '../data/additionalCategoryProducts';

// Combine all product data sources into a single array
export const combineAllProducts = (): Product[] => {
  // Start with the base products
  const combinedProducts: Product[] = [...products];
  
  // Add products from newProducts
  combinedProducts.push(...allNewProducts);
  
  // Add products from additionalNewProducts
  combinedProducts.push(...allAdditionalProducts);
  
  // Add products from additionalProducts
  combinedProducts.push(...generateAdditionalProducts());
  
  // Add refrigerator products
  combinedProducts.push(...refrigeratorProducts);
  
  // Add additional category products
  combinedProducts.push(...additionalCategoryProducts);

  // Create additional products to ensure minimum 10 per category
  const additionalGeneratedProducts = generateProductsForEmptyCategories(combinedProducts);
  combinedProducts.push(...additionalGeneratedProducts);
  
  // Remove any duplicates by ID
  const uniqueProducts = combinedProducts.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );
  
  return uniqueProducts;
};

// Get all products by category
export const getProductsByCategory = (categoryName: string): Product[] => {
  const allProducts = combineAllProducts();
  return allProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );
};

// Get all available categories
export const getAllCategories = (): string[] => {
  const allProducts = combineAllProducts();
  const categories = [...new Set(allProducts.map(product => product.category))];
  return categories.sort();
};

// Check if a category has enough products (at least 15)
export const hasSufficientProducts = (categoryName: string): boolean => {
  return getProductsByCategory(categoryName).length >= 15;
};

// Get counts of products by category
export const getProductCountsByCategory = (): Record<string, number> => {
  const allProducts = combineAllProducts();
  const counts: Record<string, number> = {};
  
  allProducts.forEach(product => {
    const category = product.category;
    counts[category] = (counts[category] || 0) + 1;
  });
  
  return counts;
};

// Helper function to generate products for categories with fewer than 10 products
const generateProductsForEmptyCategories = (existingProducts: Product[]): Product[] => {
  const counts = getProductCountsFromProducts(existingProducts);
  const generatedProducts: Product[] = [];
  let nextId = 90000; // Starting ID for generated products
  
  // Categories that should have at least 10 products
  const targetCategories = Object.keys(counts).filter(category => 
    counts[category] < 10 && category.trim() !== ''
  );
  
  // Sample brands by category
  const brandsByCategory: Record<string, string[]> = {
    'Smartphones': ['Samsung', 'Apple', 'Google', 'Xiaomi', 'OnePlus', 'Motorola'],
    'Laptops': ['Dell', 'HP', 'Lenovo', 'Apple', 'Acer', 'ASUS'],
    'TVs': ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Philips'],
    'Headphones': ['Sony', 'Bose', 'Apple', 'Sennheiser', 'JBL', 'Beats'],
    'Tablets': ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Amazon', 'Huawei'],
    'Gaming Consoles': ['Sony', 'Microsoft', 'Nintendo', 'Valve', 'Meta', 'Atari'],
    'Cameras': ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Olympus'],
    'Printers': ['HP', 'Canon', 'Epson', 'Brother', 'Xerox', 'Lexmark'],
    'PC Accessories': ['Logitech', 'Corsair', 'Razer', 'SteelSeries', 'HyperX', 'Microsoft'],
    'Monitors': ['Dell', 'LG', 'Samsung', 'ASUS', 'Acer', 'ViewSonic'],
    'Keyboards': ['Logitech', 'Corsair', 'Razer', 'Keychron', 'Ducky', 'Das Keyboard'],
    'Speakers': ['Bose', 'Sonos', 'JBL', 'Harman Kardon', 'Klipsch', 'Edifier'],
    'Smart Home': ['Google', 'Amazon', 'Apple', 'Philips', 'Ecobee', 'Ring'],
    'Smartwatches': ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Fossil', 'Amazfit'],
    'Gaming Gear': ['Logitech', 'Razer', 'SteelSeries', 'HyperX', 'Corsair', 'ASUS'],
    'Projectors': ['Epson', 'BenQ', 'Optoma', 'LG', 'Sony', 'ViewSonic'],
    'Audio': ['Bose', 'Sony', 'Sennheiser', 'JBL', 'Harman Kardon', 'Bang & Olufsen'],
    'Networking': ['TP-Link', 'Netgear', 'ASUS', 'Linksys', 'Ubiquiti', 'D-Link'],
    'Storage': ['Samsung', 'Western Digital', 'Seagate', 'SanDisk', 'Crucial', 'Kingston'],
    'Games': ['Sony', 'Microsoft', 'Nintendo', 'EA', 'Ubisoft', 'Activision'],
    'PC Games': ['Valve', 'Blizzard', 'EA', 'Ubisoft', 'Epic Games', '2K Games'],
    'Vacuum Cleaners': ['Dyson', 'Shark', 'iRobot', 'Eufy', 'Ecovacs', 'Miele'],
    'Refrigerators': ['Samsung', 'LG', 'Whirlpool', 'GE', 'Bosch', 'Frigidaire'],
    'Air Conditioners': ['LG', 'Daikin', 'Midea', 'Carrier', 'Friedrich', 'Haier'],
    'Washing Machines': ['Samsung', 'LG', 'Whirlpool', 'Bosch', 'Electrolux', 'Maytag'],
    'Microwaves': ['Samsung', 'LG', 'Panasonic', 'Whirlpool', 'GE', 'Sharp'],
    'Smart Screens': ['Samsung', 'LG', 'Google', 'Amazon', 'Lenovo', 'Facebook'],
  };
  
  // Default fallback brands if category not found
  const defaultBrands = ['Samsung', 'LG', 'Sony', 'Apple', 'Microsoft', 'Google'];
  
  targetCategories.forEach(category => {
    const needed = 15 - counts[category]; // Generate enough to have at least 15
    const categoryBrands = brandsByCategory[category] || defaultBrands;
    
    for (let i = 0; i < needed; i++) {
      const brandIndex = i % categoryBrands.length;
      const brand = categoryBrands[brandIndex];
      const productNumber = i + 1;
      
      const newProduct: Product = {
        id: nextId++,
        name: `${brand} ${category} Pro ${productNumber}`,
        price: 199.99 + (Math.random() * 300),
        category: category,
        brand: brand,
        description: `High-quality ${category.toLowerCase()} from ${brand} with premium features.`,
        imageUrl: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png',
        quantity: 0,
        rating: 4.0 + (Math.random() * 1.0),
        reviews: []
      };
      
      generatedProducts.push(newProduct);
    }
  });
  
  return generatedProducts;
};

// Helper function to get current product counts by category
const getProductCountsFromProducts = (products: Product[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  
  products.forEach(product => {
    const category = product.category;
    if (category) {
      counts[category] = (counts[category] || 0) + 1;
    }
  });
  
  return counts;
};
