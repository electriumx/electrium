
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Battlefield 2042",
    brand: "EA",
    category: "Video Games",
    subcategory: "FPS",
    price: 39.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/battlefield-2042.jpg",
    colors: ["N/A"],
    description: "Epic multiplayer first-person shooter with massive battles"
  },
  {
    id: 2,
    name: "Death Stranding",
    brand: "Sony",
    category: "Video Games",
    subcategory: "Action",
    price: 44.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/death-stranding.jpg",
    colors: ["N/A"],
    description: "A genre-defying experience from Hideo Kojima"
  },
  {
    id: 3,
    name: "Elden Ring",
    brand: "FromSoftware",
    category: "Video Games",
    subcategory: "RPG",
    price: 59.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/elden-ring.jpg",
    colors: ["N/A"],
    description: "An epic action RPG adventure"
  },
  {
    id: 4,
    name: "Call of Duty: Modern Warfare",
    brand: "Activision",
    category: "Video Games",
    subcategory: "FPS",
    price: 49.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/cod-mw.jpg",
    colors: ["N/A"],
    description: "Intense military first-person shooter"
  },
  {
    id: 5,
    name: "Call of Duty: Warzone",
    brand: "Activision",
    category: "Video Games",
    subcategory: "FPS",
    price: 24.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/cod-warzone.jpg",
    colors: ["N/A"],
    description: "Free-to-play battle royale game from the Call of Duty franchise"
  },
  {
    id: 6,
    name: "Rainbow Six Siege",
    brand: "Ubisoft",
    category: "Video Games",
    subcategory: "FPS",
    price: 34.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/rainbow-six.jpg",
    colors: ["N/A"],
    description: "Tactical team-based shooter"
  },
  {
    id: 7,
    name: "Cyberpunk 2077",
    brand: "CD Projekt",
    category: "Video Games",
    subcategory: "RPG",
    price: 49.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/cyberpunk-2077.jpg",
    colors: ["N/A"],
    description: "Open-world action RPG set in Night City"
  },
  {
    id: 8,
    name: "Horizon Kings Racing Simulation",
    brand: "Racing Games Co",
    category: "Video Games",
    subcategory: "Racing",
    price: 39.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/horizon-kings.jpg",
    colors: ["N/A"],
    description: "Realistic racing simulation game"
  },
  {
    id: 9,
    name: "World of Warriors Racing",
    brand: "Racing Games Co",
    category: "Video Games",
    subcategory: "Racing",
    price: 34.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/world-warriors.jpg",
    colors: ["N/A"],
    description: "Action-packed racing game"
  },
  {
    id: 10,
    name: "Ultimate Fantasy Racing",
    brand: "Racing Games Co",
    category: "Video Games",
    subcategory: "Racing",
    price: 34.99,
    discount: 0,
    quantity: 0,
    imageUrl: "/images/ultimate-fantasy.jpg",
    colors: ["N/A"],
    description: "Fantasy-themed racing adventure"
  }
];

// Helper function to adjust the game prices
export const adjustGamePrices = () => {
  products.forEach(product => {
    if (product.category === "Video Games" || product.category === "Games") {
      if (product.name === "Call of Duty: Warzone") {
        product.price = 24.99;
      } else if (product.price < 34.99) {
        product.price = 34.99;
      }
    }
  });
  
  return products;
};

// Call the function to adjust prices when importing the file
adjustGamePrices();

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const updateProductQuantity = (id: number, quantity: number) => {
  const product = products.find(p => p.id === id);
  if (product) {
    product.quantity = quantity;
  }
};

export const clearAllQuantities = () => {
  products.forEach(product => {
    product.quantity = 0;
  });
};
