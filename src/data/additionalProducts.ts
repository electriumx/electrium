
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

// Function to generate products for a specific category and brand (limited to just a few per category)
const generateProducts = (
  category: string,
  brand: string,
  baseId: number,
  namePrefix: string,
  descriptionFormat: string,
  priceRange: [number, number]
): Product[] => {
  // For most categories, just generate 1-3 products to avoid duplicates
  const count = 3;
  
  return Array.from({ length: count }, (_, i) => {
    const productName = `${namePrefix} ${i + 1}`;
    
    // Choose appropriate image based on category and name
    let imageUrl = getCategoryImage(category);
    
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
  });
};

// Generate additional products for various categories
export const generateAdditionalProducts = (): Product[] => {
  let products: Product[] = [];
  let nextId = 5000;
  
  // Smartphones - Add a representative product for each brand
  const smartphoneBrands = ["Samsung", "Google", "Xiaomi"];
  smartphoneBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Samsung" ? "Galaxy S" :
                        brand === "Google" ? "Pixel" : "Redmi";
                        
    products = products.concat(
      generateProducts(
        "Phone",
        brand,
        nextId + (index * 100),
        brandPrefix,
        `${brand} flagship smartphone with advanced camera system, version {i}`,
        [399, 1299]
      )
    );
  });
  
  nextId += 500;
  
  // Laptops - Add Chromebook with specific image
  products.push({
    id: nextId++,
    name: "Google Chromebook",
    price: 349.99,
    category: "Laptop",
    brand: "Google",
    description: "Affordable, lightweight Chromebook with Chrome OS and cloud-based applications.",
    imageUrl: "/lovable-uploads/f36c4267-74e8-4514-8f6d-ba947eea3a13.png",
    quantity: 0,
    rating: 4.2,
    reviews: 189
  });
  
  // Laptops - Add other representative laptops
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
        brandPrefix,
        `${brand} premium laptop with high-performance processor, model {i}`,
        [699, 2499]
      )
    );
  });
  
  nextId += 500;
  
  // Nintendo products with specific image
  products.push({
    id: nextId++,
    name: "Nintendo Switch",
    price: 299.99,
    category: "Gaming Consoles",
    brand: "Nintendo",
    description: "Versatile gaming console that can be played on-the-go or docked to your TV.",
    imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png",
    quantity: 0,
    rating: 4.8,
    reviews: 342
  });
  
  products.push({
    id: nextId++,
    name: "Nintendo Switch Lite",
    price: 199.99,
    category: "Gaming Consoles",
    brand: "Nintendo",
    description: "Compact, lightweight Nintendo Switch system dedicated to handheld play.",
    imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png",
    quantity: 0,
    rating: 4.7,
    reviews: 278
  });
  
  products.push({
    id: nextId++,
    name: "Nintendo Switch OLED",
    price: 349.99,
    category: "Gaming Consoles",
    brand: "Nintendo",
    description: "Enhanced Nintendo Switch with vibrant 7-inch OLED screen and improved audio.",
    imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png",
    quantity: 0,
    rating: 4.9,
    reviews: 215
  });
  
  // Gaming consoles - Add other representative consoles
  const consoleBrands = ["Sony", "Microsoft"];
  consoleBrands.forEach((brand, index) => {
    const brandPrefix = brand === "Sony" ? "PlayStation" : "Xbox";
                        
    products = products.concat(
      generateProducts(
        "Gaming Consoles",
        brand,
        nextId + (index * 100),
        brandPrefix,
        `${brand} gaming console with immersive gameplay experience, generation {i}`,
        [249, 599]
      )
    );
  });
  
  nextId += 500;
  
  // Battlefield games with specific image
  for (let i = 1; i <= 5; i++) {
    products.push({
      id: nextId++,
      name: `Battlefield ${i}`,
      price: 59.99,
      category: "Games",
      brand: "PC Games",
      description: `Epic first-person shooter with massive battles, destructible environments, and multiplayer modes.`,
      imageUrl: "/lovable-uploads/d496c5e1-cf2a-4e3a-ad70-e121a939a763.png",
      quantity: 0,
      rating: 4.5 + (i * 0.1 > 0.5 ? 0.5 : i * 0.1),
      reviews: 150 + (i * 30),
      subcategory: "FPS Games"
    });
  }
  
  // Add Rainbow Six games with the uploaded image
  products.push({
    id: nextId++,
    name: "Rainbow Six Siege Standard Edition",
    price: 29.99,
    category: "Games",
    brand: "PC Games",
    description: "Tom Clancy's Rainbow Six Siege Standard Edition - tactical first-person shooter with destructible environments and team-based gameplay",
    imageUrl: "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png",
    quantity: 0,
    rating: randomRating(),
    reviews: randomReviews(),
    subcategory: "FPS Games"
  });
  
  products.push({
    id: nextId++,
    name: "Rainbow Six Siege Deluxe Edition",
    price: 39.99,
    category: "Games",
    brand: "PC Games",
    description: "Tom Clancy's Rainbow Six Siege Deluxe Edition - includes the base game and Year 1 operators for intense tactical shooter experience",
    imageUrl: "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png",
    quantity: 0,
    rating: randomRating(),
    reviews: randomReviews(),
    subcategory: "FPS Games"
  });
  
  products.push({
    id: nextId++,
    name: "Rainbow Six Siege Gold Edition",
    price: 49.99,
    category: "Games",
    brand: "PC Games",
    description: "Tom Clancy's Rainbow Six Siege Gold Edition - includes the base game, Year 1 operators, and latest season pass",
    imageUrl: "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png",
    quantity: 0,
    rating: randomRating(),
    reviews: randomReviews(),
    subcategory: "FPS Games"
  });
  
  // Add Call of Duty games
  for (let i = 1; i <= 6; i++) {
    products.push({
      id: nextId++,
      name: `Call of Duty: Black Ops ${i}`,
      price: 59.99,
      category: "Games",
      brand: "PC Games",
      description: `Call of Duty: Black Ops ${i} - intense first-person shooter with epic campaign and multiplayer modes`,
      imageUrl: "/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png",
      quantity: 0,
      rating: randomRating(),
      reviews: randomReviews(),
      subcategory: "FPS Games"
    });
  }
  
  // Add other popular game titles
  products.push({
    id: nextId++,
    name: "Cyberpunk 2077",
    price: 59.99,
    category: "Games",
    brand: "PC Games",
    description: "Open-world RPG set in a dystopian future with advanced cybernetic enhancements and a branching storyline.",
    imageUrl: "/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png",
    quantity: 0,
    rating: 4.2,
    reviews: 320,
    subcategory: "RPG"
  });
  
  products.push({
    id: nextId++,
    name: "Elden Ring",
    price: 59.99,
    category: "Games",
    brand: "PC Games",
    description: "Open-world fantasy RPG developed in collaboration with George R.R. Martin, featuring challenging combat and exploration.",
    imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    quantity: 0,
    rating: 4.9,
    reviews: 410,
    subcategory: "RPG"
  });
  
  products.push({
    id: nextId++,
    name: "Death Stranding",
    price: 49.99,
    category: "Games",
    brand: "PC Games",
    description: "A genre-defying experience from Hideo Kojima, featuring a unique storyline and innovative gameplay mechanics.",
    imageUrl: "/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png",
    quantity: 0,
    rating: 4.6,
    reviews: 280,
    subcategory: "Adventure"
  });
  
  // Add one representative product for each appliance category
  products.push({
    id: nextId++,
    name: "Samsung Microwave",
    price: 149.99,
    category: "Microwaves",
    brand: "Samsung",
    description: "Samsung microwave with multiple cooking modes and smart features.",
    imageUrl: "/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png",
    quantity: 0,
    rating: 4.5,
    reviews: 132
  });
  
  products.push({
    id: nextId++,
    name: "LG Microwave",
    price: 129.99,
    category: "Microwaves",
    brand: "LG",
    description: "LG microwave with multiple cooking modes and smart features.",
    imageUrl: "/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png",
    quantity: 0,
    rating: 4.4,
    reviews: 118
  });
  
  products.push({
    id: nextId++,
    name: "Whirlpool Microwave",
    price: 109.99,
    category: "Microwaves",
    brand: "Whirlpool",
    description: "Whirlpool microwave with multiple cooking modes and smart features.",
    imageUrl: "/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png",
    quantity: 0,
    rating: 4.3,
    reviews: 98
  });
  
  products.push({
    id: nextId++,
    name: "Panasonic Microwave",
    price: 119.99,
    category: "Microwaves",
    brand: "Panasonic",
    description: "Panasonic microwave with multiple cooking modes and smart features.",
    imageUrl: "/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png",
    quantity: 0,
    rating: 4.6,
    reviews: 142
  });
  
  // Add representative products for other categories
  products.push({
    id: nextId++,
    name: "Samsung Washing Machine",
    price: 599.99,
    category: "Washing Machines",
    brand: "Samsung",
    description: "Samsung washing machine with energy-efficient technology.",
    imageUrl: "/lovable-uploads/2ae5236f-4492-452a-b393-492c225380c1.png",
    quantity: 0,
    rating: 4.7,
    reviews: 156
  });
  
  products.push({
    id: nextId++,
    name: "Samsung Refrigerator",
    price: 1299.99,
    category: "Refrigerators",
    brand: "Samsung",
    description: "Samsung refrigerator with smart cooling system.",
    imageUrl: "/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png",
    quantity: 0,
    rating: 4.8,
    reviews: 189
  });
  
  products.push({
    id: nextId++,
    name: "LG Air Conditioner",
    price: 499.99,
    category: "Air Conditioners",
    brand: "LG",
    description: "LG air conditioner with energy-saving technology.",
    imageUrl: "/lovable-uploads/a964141c-5fe9-49ec-9aa0-6b0bd558181c.png",
    quantity: 0,
    rating: 4.5,
    reviews: 142
  });
  
  products.push({
    id: nextId++,
    name: "Dyson Vacuum Cleaner",
    price: 399.99,
    category: "Vacuum Cleaners",
    brand: "Dyson",
    description: "Dyson vacuum cleaner with powerful suction and advanced filtration.",
    imageUrl: "/lovable-uploads/99ac0da2-0189-48a9-8115-cbad8e1b079c.png",
    quantity: 0,
    rating: 4.9,
    reviews: 213
  });
  
  products.push({
    id: nextId++,
    name: "iRobot Roomba",
    price: 349.99,
    category: "Vacuum Cleaners",
    brand: "iRobot",
    description: "iRobot Roomba with automated cleaning and smart navigation.",
    imageUrl: "/lovable-uploads/aefe184c-a90a-46d3-b244-124b1062a6f0.png",
    quantity: 0,
    rating: 4.7,
    reviews: 187
  });
  
  products.push({
    id: nextId++,
    name: "Samsung Digital Frame",
    price: 149.99,
    category: "Smart Screens",
    brand: "Samsung",
    description: "Samsung digital photo frame with high-resolution display.",
    imageUrl: "/lovable-uploads/15fa551c-cf90-4a18-b949-a21c2a6f44d4.png",
    quantity: 0,
    rating: 4.3,
    reviews: 98
  });
  
  products.push({
    id: nextId++,
    name: "Samsung Smart Digital Display",
    price: 249.99,
    category: "Smart Screens",
    brand: "Samsung",
    description: "Samsung smart digital display with touch interface.",
    imageUrl: "/lovable-uploads/f4d18f61-e011-41e1-8945-0862b8e9cb22.png",
    quantity: 0,
    rating: 4.5,
    reviews: 123
  });
  
  products.push({
    id: nextId++,
    name: "Samsung Digital Signage",
    price: 349.99,
    category: "Smart Screens",
    brand: "Samsung",
    description: "Samsung digital signage for business applications.",
    imageUrl: "/lovable-uploads/e4e5c805-99ee-44b2-bac6-a7549cd85562.png",
    quantity: 0,
    rating: 4.6,
    reviews: 87
  });
  
  products.push({
    id: nextId++,
    name: "Samsung Interactive Panel",
    price: 499.99,
    category: "Smart Screens",
    brand: "Samsung",
    description: "Samsung interactive panel for educational and business use.",
    imageUrl: "/lovable-uploads/83220acc-b41f-488f-996c-70c790349093.png",
    quantity: 0,
    rating: 4.8,
    reviews: 76
  });
  
  return products;
};
