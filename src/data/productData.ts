
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: string;
  subcategory?: string; // Added for subcategory filtering
  rating: number;
  reviews: number;
  quantity?: number;
  discount?: number;
  accessories?: ProductAccessory[];
}

export interface ProductAccessory {
  id: string;
  name: string;
  price: number;
  category: string;
  selected?: boolean;
  image?: string;
}

// Helper function to generate a more reasonable price based on product type
const generateReasonablePrice = (category: string, premium: boolean = false): number => {
  const priceRanges: Record<string, [number, number]> = {
    'Smartphones': premium ? [699, 1299] : [299, 699],
    'Laptops': premium ? [999, 1999] : [499, 999],
    'Gaming Consoles': [299, 599],
    'TVs': premium ? [799, 2499] : [299, 799],
    'Headphones': premium ? [199, 399] : [49, 199],
    'PC Accessories': [29, 199],
    'Tablets': premium ? [499, 999] : [199, 499],
    'Games': [29, 69],
    'Accessories': [9, 99]
  };
  
  const [min, max] = priceRanges[category] || [29, 299];
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

// Generate original set of base products
export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 13 Pro Max',
    description: 'The best iPhone ever. Super Retina XDR display with ProMotion. A15 Bionic chip. Advanced camera system.',
    price: 1199,
    imageUrl: '/lovable-uploads/iphone-13-pro-max.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 235,
    accessories: [
      { id: '1', name: 'AirPods Pro', price: 249, category: 'Headphones', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '2', name: 'Leather Case', price: 59, category: 'Cases', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '3', name: '20W USB-C Power Adapter', price: 19, category: 'Chargers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra',
    description: 'The ultimate smartphone. 8K video recording. 108MP camera. Super fast processor.',
    price: 1099,
    imageUrl: '/lovable-uploads/samsung-galaxy-s21-ultra.jpg',
    brand: 'Samsung',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 198,
    accessories: [
      { id: '4', name: 'Galaxy Buds Pro', price: 199, category: 'Headphones', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '5', name: 'Silicone Cover', price: 29, category: 'Cases', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '6', name: '25W Travel Adapter', price: 24, category: 'Chargers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 3,
    name: 'Sony PlayStation 5',
    description: 'Next-gen gaming console. Lightning-fast SSD. Immersive 3D audio. Haptic feedback.',
    price: 499,
    imageUrl: '/lovable-uploads/sony-playstation-5.jpg',
    brand: 'PlayStation',
    category: 'Gaming Consoles',
    rating: 4.9,
    reviews: 312,
    accessories: [
      { id: '7', name: 'DualSense Controller', price: 69, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '8', name: 'Pulse 3D Wireless Headset', price: 99, category: 'Headphones', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 4,
    name: 'Microsoft Xbox Series X',
    description: 'The fastest, most powerful Xbox ever. 4K gaming at 120FPS. 1TB SSD.',
    price: 499,
    imageUrl: '/lovable-uploads/microsoft-xbox-series-x.jpg',
    brand: 'Microsoft',
    category: 'Gaming Consoles',
    rating: 4.8,
    reviews: 287,
    accessories: [
      { id: '9', name: 'Xbox Wireless Controller', price: 59, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '10', name: 'Xbox Wireless Headset', price: 99, category: 'Headphones', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 5,
    name: 'Apple MacBook Pro 16"',
    description: 'The ultimate pro notebook. M1 Pro or M1 Max chip. Stunning Liquid Retina XDR display.',
    price: 2499,
    imageUrl: '/lovable-uploads/apple-macbook-pro-16.jpg',
    brand: 'Apple',
    category: 'Laptops',
    rating: 4.9,
    reviews: 265,
    accessories: [
      { id: '11', name: 'Magic Mouse', price: 99, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '12', name: 'USB-C to USB Adapter', price: 19, category: 'Adapters', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 6,
    name: 'Samsung 65" QLED 8K TV',
    description: 'Experience the future of TV. Quantum Dot technology. 8K resolution. Immersive sound.',
    price: 3499,
    imageUrl: '/lovable-uploads/samsung-65-qled-8k-tv.jpg',
    brand: 'Samsung',
    category: 'TVs',
    rating: 4.7,
    reviews: 189
  },
  {
    id: 7,
    name: 'Sony WH-1000XM4 Headphones',
    description: 'Industry-leading noise cancellation. Exceptional sound quality. All-day comfort.',
    price: 349,
    imageUrl: '/lovable-uploads/sony-wh-1000xm4-headphones.jpg',
    brand: 'Sony',
    category: 'Headphones',
    rating: 4.8,
    reviews: 212
  },
  {
    id: 8,
    name: 'Bose QuietComfort 45 Headphones',
    description: 'The perfect balance of quiet, comfort, and sound. Iconic design. Simple to use.',
    price: 329,
    imageUrl: '/lovable-uploads/bose-quietcomfort-45-headphones.jpg',
    brand: 'Audio',
    category: 'Headphones',
    rating: 4.6,
    reviews: 167
  },
  {
    id: 9,
    name: 'Apple iPad Pro 12.9"',
    description: 'The ultimate iPad experience. M1 chip. Liquid Retina XDR display. Thunderbolt port.',
    price: 1099,
    imageUrl: '/lovable-uploads/apple-ipad-pro-12-9.jpg',
    brand: 'Apple',
    category: 'Tablets',
    rating: 4.9,
    reviews: 293,
    accessories: [
      { id: '13', name: 'Apple Pencil (2nd generation)', price: 129, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '14', name: 'Smart Keyboard Folio', price: 179, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10,
    name: 'Samsung Galaxy Tab S8 Ultra',
    description: 'The biggest, boldest Galaxy Tab S yet. 14.6" display. S Pen included. Super fast charging.',
    price: 1199,
    imageUrl: '/lovable-uploads/samsung-galaxy-tab-s8-ultra.jpg',
    brand: 'Samsung',
    category: 'Tablets',
    rating: 4.8,
    reviews: 245,
    accessories: [
      { id: '15', name: 'Book Cover Keyboard', price: 149, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 11,
    name: 'Google Pixel 6 Pro',
    description: 'The smartest smartphone yet. Google Tensor chip. Advanced camera system. Smooth display.',
    price: 899,
    imageUrl: '/lovable-uploads/google-pixel-6-pro.jpg',
    brand: 'Google',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 201
  },
  {
    id: 12,
    name: 'Xiaomi 12 Pro',
    description: 'Flagship smartphone with Snapdragon 8 Gen 1. 120W fast charging. 50MP triple camera.',
    price: 799,
    imageUrl: '/lovable-uploads/xiaomi-12-pro.jpg',
    brand: 'Xiaomi',
    category: 'Smartphones',
    rating: 4.6,
    reviews: 176
  },
  {
    id: 13,
    name: 'Logitech MX Master 3 Mouse',
    description: 'The ultimate mouse for productivity. MagSpeed scrolling. Ergonomic design. Customizable buttons.',
    price: 99,
    imageUrl: '/lovable-uploads/logitech-mx-master-3-mouse.jpg',
    brand: 'Accessories',
    category: 'PC Accessories',
    rating: 4.9,
    reviews: 302
  },
  {
    id: 14,
    name: 'Razer BlackWidow V3 Keyboard',
    description: 'The iconic gaming keyboard. Razer Green mechanical switches. Chroma RGB lighting.',
    price: 139,
    imageUrl: '/lovable-uploads/razer-blackwidow-v3-keyboard.jpg',
    brand: 'Accessories',
    category: 'PC Accessories',
    rating: 4.8,
    reviews: 254
  },
  {
    id: 15,
    name: 'Elden Ring',
    description: 'A fantasy action RPG set in a world created by Hidetaka Miyazaki and George R. R. Martin.',
    price: 59.99,
    imageUrl: '/lovable-uploads/elden-ring.jpg',
    brand: 'PC Games',
    category: 'Games',
    rating: 4.9,
    reviews: 420,
    accessories: [
      { id: '40', name: 'Digital Art Book', price: 9.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '41', name: 'Season Pass', price: 29.99, category: 'DLC', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 16,
    name: 'Horizon Forbidden West',
    description: 'Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes.',
    price: 69.99,
    imageUrl: '/lovable-uploads/horizon-forbidden-west.jpg',
    brand: 'PlayStation',
    category: 'Games',
    rating: 4.8,
    reviews: 350,
    accessories: [
      { id: '42', name: 'Digital Soundtrack', price: 14.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '43', name: 'Digital Deluxe Upgrade', price: 19.99, category: 'DLC', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 17,
    name: 'The Last of Us Part II',
    description: 'Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming.',
    price: 39.99,
    imageUrl: '/lovable-uploads/the-last-of-us-part-ii.jpg',
    brand: 'PlayStation',
    category: 'Games',
    rating: 4.7,
    reviews: 300,
    accessories: [
      { id: '44', name: 'Digital Soundtrack', price: 9.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '45', name: 'Concept Art Book', price: 14.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 18,
    name: 'Cyberpunk 2077',
    description: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City, where you play as a cyberpunk mercenary wrapped up in a do-or-die fight for survival.',
    price: 49.99,
    imageUrl: '/lovable-uploads/cyberpunk-2077.jpg',
    brand: 'PC Games',
    category: 'Games',
    rating: 4.6,
    reviews: 280,
    accessories: [
      { id: '46', name: 'Expansion Pass', price: 29.99, category: 'DLC', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '47', name: 'Digital Art Book', price: 9.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 19,
    name: 'Death Stranding',
    description: 'From legendary game creator Hideo Kojima comes an all-new, genre-defying experience.',
    price: 29.99,
    imageUrl: '/lovable-uploads/death-stranding.jpg',
    brand: 'PC Games',
    category: 'Games',
    rating: 4.5,
    reviews: 250,
    accessories: [
      { id: '48', name: 'Digital Deluxe Content', price: 9.99, category: 'DLC', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '49', name: 'Original Score', price: 14.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20,
    name: 'Ghost of Tsushima',
    description: 'In the late 13th century, the Mongol empire has laid waste to entire nations along their path to conquer the East. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet led by the ruthless and cunning general, Khotun Khan.',
    price: 49.99,
    imageUrl: '/lovable-uploads/ghost-of-tsushima.jpg',
    brand: 'PlayStation',
    category: 'Games',
    rating: 4.8,
    reviews: 320,
    accessories: [
      { id: '50', name: 'Director\'s Cut Upgrade', price: 19.99, category: 'DLC', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '51', name: 'Digital Mini Art Book', price: 4.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  
  {
    id: 21,
    name: 'Google Pixel 7 Pro',
    description: 'The most advanced Pixel phone yet with the best camera and a powerful Tensor G2 processor.',
    price: 899,
    imageUrl: '/lovable-uploads/google-pixel-6-pro.jpg',
    brand: 'Google',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 189,
    accessories: [
      { id: '52', name: 'Pixel Stand', price: 79, category: 'Chargers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '53', name: 'Pixel Buds Pro', price: 199, category: 'Headphones', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  
  {
    id: 22,
    name: 'iPhone 14',
    description: 'The latest iPhone with advanced camera features and powerful A16 chip.',
    price: 799,
    imageUrl: '/lovable-uploads/iphone-13-pro-max.jpg',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 210,
    discount: 10,
    accessories: [
      { id: '54', name: 'MagSafe Charger', price: 39, category: 'Chargers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '55', name: 'Silicone Case', price: 49, category: 'Cases', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  
  {
    id: 23,
    name: 'Xbox Series X',
    description: 'The most powerful Xbox ever with 4K gaming at up to 120 FPS.',
    price: 499,
    imageUrl: '/lovable-uploads/microsoft-xbox-series-x.jpg',
    brand: 'Microsoft',
    category: 'Gaming Consoles',
    rating: 4.8,
    reviews: 275,
    accessories: [
      { id: '56', name: 'Xbox Wireless Controller', price: 59, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '57', name: 'Play & Charge Kit', price: 24.99, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  
  {
    id: 24,
    name: 'Dell XPS 15',
    description: 'Premium laptop with InfinityEdge display and powerful performance.',
    price: 1499,
    imageUrl: '/lovable-uploads/apple-macbook-pro-16.jpg',
    brand: 'Dell',
    category: 'Laptops',
    rating: 4.7,
    reviews: 198,
    accessories: [
      { id: '58', name: 'USB-C Dock', price: 199, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '59', name: 'Laptop Backpack', price: 69, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  
  {
    id: 25,
    name: 'Apple AirPods Max',
    description: 'High-fidelity audio with Active Noise Cancellation and Transparency mode.',
    price: 549,
    imageUrl: '/lovable-uploads/sony-wh-1000xm4-headphones.jpg',
    brand: 'Apple',
    category: 'Headphones',
    rating: 4.8,
    reviews: 156,
    discount: 15,
    accessories: [
      { id: '60', name: 'AirPods Max Smart Case', price: 59, category: 'Cases', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '61', name: 'AppleCare+ for Headphones', price: 29, category: 'Services', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  
  {
    id: 26,
    name: 'God of War Ragnarök',
    description: 'Embark on an epic journey as Kratos and Atreus in the Nordic realm.',
    price: 69.99,
    imageUrl: '/lovable-uploads/ghost-of-tsushima.jpg',
    brand: 'PlayStation',
    category: 'Games',
    rating: 4.9,
    reviews: 340,
    accessories: [
      { id: '62', name: 'Digital Soundtrack', price: 9.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '63', name: 'Art Book', price: 19.99, category: 'Digital Content', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  
  {
    id: 27,
    name: 'Logitech G Pro X Keyboard',
    description: 'Compact tenkeyless design with pro-grade switches for gaming.',
    price: 149.99,
    imageUrl: '/lovable-uploads/razer-blackwidow-v3-keyboard.jpg',
    brand: 'Accessories',
    category: 'PC Accessories',
    rating: 4.7,
    reviews: 187,
    accessories: [
      { id: '64', name: 'Wrist Rest', price: 19.99, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: '65', name: 'Keycap Set', price: 29.99, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  }
];

// Generate additional products for each category
const categories = [
  'Smartphones', 'Laptops', 'Gaming Consoles', 'TVs', 
  'Headphones', 'PC Accessories', 'Tablets', 'Games'
];

// Subcategories mapping
const subcategories: Record<string, string[]> = {
  "Smartphones": ["iPhone", "Android", "Foldable", "Budget", "Premium", "Camera-focused", "Battery-focused"],
  "Laptops": ["Gaming", "Business", "Ultrabook", "2-in-1", "Budget", "Premium", "Chromebook"],
  "Gaming Consoles": ["Home Console", "Portable", "Retro", "VR", "Accessories"],
  "TVs": ["OLED", "QLED", "LED", "Smart TV", "4K", "8K", "Budget"],
  "Headphones": ["Over-ear", "In-ear", "Wireless", "Noise-cancelling", "Gaming", "Sports"],
  "PC Accessories": ["Keyboards", "Mice", "Monitors", "Webcams", "Microphones", "Speakers"],
  "Tablets": ["iOS", "Android", "Windows", "E-readers", "Budget", "Premium"],
  "Games": ["Action", "RPG", "Strategy", "Sports", "Simulation", "Racing", "Puzzle"]
};

// Brand mappings per category
const brandsByCategory: Record<string, string[]> = {
  "Smartphones": ["Apple", "Samsung", "Google", "Xiaomi"],
  "Laptops": ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Microsoft"],
  "Gaming Consoles": ["PlayStation", "Microsoft", "Nintendo"],
  "TVs": ["Samsung", "Sony", "LG", "TCL"],
  "Headphones": ["Sony", "Bose", "Apple", "JBL", "Audio"],
  "PC Accessories": ["Logitech", "Razer", "Corsair", "SteelSeries"],
  "Tablets": ["Apple", "Samsung", "Microsoft", "Amazon"],
  "Games": ["PlayStation", "PC Games", "Microsoft", "Nintendo"]
};

// Generate accessories for products
const generateAccessories = (category: string): ProductAccessory[] => {
  const accessoryCount = Math.floor(Math.random() * 3) + 1; // 1-3 accessories
  const result: ProductAccessory[] = [];
  
  for (let i = 0; i < accessoryCount; i++) {
    const accessoryType = Math.floor(Math.random() * 6);
    let accessoryName = "";
    let accessoryCat = "";
    let price = 0;
    
    switch(accessoryType) {
      case 0:
        accessoryName = "Premium Case";
        accessoryCat = "Cases";
        price = generateReasonablePrice("Accessories", false);
        break;
      case 1:
        accessoryName = "High-Speed Charger";
        accessoryCat = "Chargers";
        price = generateReasonablePrice("Accessories", false);
        break;
      case 2:
        accessoryName = "Screen Protector";
        accessoryCat = "Screen Protectors";
        price = generateReasonablePrice("Accessories", false);
        break;
      case 3:
        accessoryName = "Premium Headphones";
        accessoryCat = "Headphones";
        price = generateReasonablePrice("Headphones", false);
        break;
      case 4:
        accessoryName = "Extended Warranty";
        accessoryCat = "Services";
        price = generateReasonablePrice("Accessories", true);
        break;
      case 5:
        accessoryName = "Connectivity Cable";
        accessoryCat = "Cables";
        price = generateReasonablePrice("Accessories", false);
        break;
    }
    
    result.push({
      id: `acc-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 9)}`,
      name: accessoryName,
      price: price,
      category: accessoryCat,
      image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png'
    });
  }
  
  return result;
};

// Generate a large number of additional products
let nextId = 100; // Start from ID 100 to avoid conflicts with existing products

categories.forEach(category => {
  // Get all subcategories for this category
  const categorySubcategories = subcategories[category] || [];
  // Get all brands for this category
  const categoryBrands = brandsByCategory[category] || ["Generic"];
  
  // Generate 100 products for this category
  for (let i = 0; i < 100; i++) {
    const isPremium = Math.random() > 0.7; // 30% chance of being a premium product
    const subcategory = categorySubcategories[Math.floor(Math.random() * categorySubcategories.length)];
    const brand = categoryBrands[Math.floor(Math.random() * categoryBrands.length)];
    
    let productName, productDesc;
    
    switch (category) {
      case 'Smartphones':
        productName = `${brand} ${subcategory} Phone ${Math.floor(Math.random() * 20 + 1)}`;
        productDesc = `A powerful ${subcategory.toLowerCase()} smartphone with great battery life and camera performance.`;
        break;
      case 'Laptops':
        productName = `${brand} ${subcategory} Laptop ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 900 + 100)}`;
        productDesc = `High-performance ${subcategory.toLowerCase()} laptop ideal for productivity and entertainment.`;
        break;
      case 'Gaming Consoles':
        productName = `${brand} ${subcategory} ${Math.floor(Math.random() * 10 + 1)}`;
        productDesc = `Next-generation gaming experience with immersive graphics and fast loading times.`;
        break;
      case 'TVs':
        const size = Math.floor(Math.random() * 30 + 32); // 32-62 inch
        productName = `${brand} ${size}" ${subcategory} TV`;
        productDesc = `Crystal clear display with smart features and immersive sound.`;
        break;
      case 'Headphones':
        productName = `${brand} ${subcategory} Headphones ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `Premium audio experience with comfortable fit and long battery life.`;
        break;
      case 'PC Accessories':
        productName = `${brand} ${subcategory} ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `High-quality PC accessory designed for gamers and professionals.`;
        break;
      case 'Tablets':
        productName = `${brand} ${subcategory} Tablet ${Math.floor(Math.random() * 20 + 1)}`;
        productDesc = `Versatile tablet for work and entertainment with a beautiful display.`;
        break;
      case 'Games':
        const gameNames = ["Legend of", "World of", "Rise of", "Call to", "Ultimate", "Horizon", "Eternal", "Epic", "Chronicles of", "Shadow"];
        const gameSuffixes = ["Champions", "Heroes", "Legends", "Adventure", "Quest", "Warriors", "Conquest", "Realms", "Kings", "Fantasy"];
        productName = `${gameNames[Math.floor(Math.random() * gameNames.length)]} ${gameSuffixes[Math.floor(Math.random() * gameSuffixes.length)]} - ${subcategory}`;
        productDesc = `Immersive ${subcategory.toLowerCase()} game with stunning graphics and engaging gameplay.`;
        break;
      default:
        productName = `${brand} ${category} ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `High-quality ${category.toLowerCase()} product with premium features.`;
    }
    
    // Generate a reasonable price
    const price = generateReasonablePrice(category, isPremium);
    
    // Generate 0-15% discount occasionally
    const hasDiscount = Math.random() > 0.8; // 20% chance of having a discount
    const discount = hasDiscount ? Math.floor(Math.random() * 15) + 5 : 0;
    
    // Use a placeholder image from the same category if available
    let imageUrl = '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png';
    
    switch (category) {
      case 'Smartphones':
        imageUrl = '/lovable-uploads/iphone-13-pro-max.jpg';
        break;
      case 'Laptops':
        imageUrl = '/lovable-uploads/apple-macbook-pro-16.jpg';
        break;
      case 'Gaming Consoles':
        imageUrl = Math.random() > 0.5 ? '/lovable-uploads/sony-playstation-5.jpg' : '/lovable-uploads/microsoft-xbox-series-x.jpg';
        break;
      case 'TVs':
        imageUrl = '/lovable-uploads/samsung-65-qled-8k-tv.jpg';
        break;
      case 'Headphones':
        imageUrl = Math.random() > 0.5 ? '/lovable-uploads/sony-wh-1000xm4-headphones.jpg' : '/lovable-uploads/bose-quietcomfort-45-headphones.jpg';
        break;
      case 'Games':
        const gameImages = [
          '/lovable-uploads/elden-ring.jpg',
          '/lovable-uploads/horizon-forbidden-west.jpg',
          '/lovable-uploads/the-last-of-us-part-ii.jpg',
          '/lovable-uploads/cyberpunk-2077.jpg',
          '/lovable-uploads/death-stranding.jpg',
          '/lovable-uploads/ghost-of-tsushima.jpg'
        ];
        imageUrl = gameImages[Math.floor(Math.random() * gameImages.length)];
        break;
    }
    
    // Create a new product with generated properties
    const newProduct: Product = {
      id: nextId++,
      name: productName,
      description: productDesc,
      price: price,
      imageUrl: imageUrl,
      brand: brand,
      category: category,
      subcategory: subcategory,
      rating: 3 + Math.random() * 2, // Random rating between 3-5
      reviews: Math.floor(Math.random() * 400) + 10, // Random number of reviews
      accessories: generateAccessories(category)
    };
    
    // Add discount if applicable
    if (discount > 0) {
      newProduct.discount = discount;
    }
    
    // Add to products array
    products.push(newProduct);
  }
});

// Sort products by category and then by price
products.sort((a, b) => {
  if (a.category === b.category) {
    return a.price - b.price;
  }
  return a.category.localeCompare(b.category);
});
