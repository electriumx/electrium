export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: string;
  subcategory?: string;
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

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 17 Ultra',
    description: 'The most advanced iPhone ever with cutting-edge AI features, revolutionary camera system, and all-day battery life.',
    price: 1599,
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.9,
    reviews: 127,
    accessories: [
      { id: '1', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '2', name: 'Leather Case', price: 59, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' },
      { id: '3', name: '20W USB-C Power Adapter', price: 19, category: 'Chargers', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1470&auto=format&fit=crop' }
    ]
  },
  {
    id: 2,
    name: 'iPhone 17 Pro Max',
    description: 'Pro-level performance with the most powerful camera in an iPhone. Features a stunning ProMotion display and extended battery life.',
    price: 1499,
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.9,
    reviews: 186,
    accessories: [
      { id: '4', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '5', name: 'Silicon Case', price: 49, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' },
      { id: '6', name: '30W USB-C Charger', price: 29, category: 'Chargers', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1470&auto=format&fit=crop' }
    ]
  },
  {
    id: 3,
    name: 'iPhone 17 Pro',
    description: 'All the pro features in a compact size. Advanced camera system, A19 chip, and beautiful Ceramic Shield design.',
    price: 1399,
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 167,
    accessories: [
      { id: '7', name: 'AirPods', price: 179, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '8', name: 'Clear Case', price: 39, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 4,
    name: 'iPhone 17',
    description: 'The perfect iPhone for everyone with all-day battery life, amazing camera, and powerful A19 chip.',
    price: 1099,
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 189,
    accessories: [
      { id: '9', name: 'AirPods', price: 179, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '10', name: 'Silicon Case', price: 39, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 5,
    name: 'iPhone 16 Pro Max',
    description: 'Pro camera. Pro display. Pro performance. Titanium design and all-day battery life.',
    price: 1299,
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 245,
    accessories: [
      { id: '11', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '12', name: 'Leather Case', price: 59, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 6,
    name: 'iPhone 16 Pro',
    description: 'The most advanced technology in a smartphone with a Titanium design and A18 Pro chip.',
    price: 1199,
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 223,
    accessories: [
      { id: '13', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '14', name: 'MagSafe Wallet', price: 59, category: 'Accessories', image: 'https://images.unsplash.com/photo-1607975218223-94f82613e833?q=80&w=1074&auto=format&fit=crop' }
    ]
  },
  {
    id: 7,
    name: 'iPhone 16',
    description: 'Amazing technology at an incredible value. New design, A18 chip, and advanced camera.',
    price: 999,
    imageUrl: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 198,
    accessories: [
      { id: '15', name: 'AirPods', price: 179, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '16', name: 'Silicon Case', price: 49, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 8,
    name: 'iPhone 15 Pro Max',
    description: 'The most advanced technology in a smartphone with a Titanium design and A17 Pro chip.',
    price: 1099,
    imageUrl: 'https://images.unsplash.com/photo-1695048134810-a564da370512?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 316,
    accessories: [
      { id: '17', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '18', name: 'Leather Case', price: 59, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 9,
    name: 'iPhone 15 Pro',
    description: 'Pro camera. Pro display. Pro performance. Titanium design and all-day battery life.',
    price: 999,
    imageUrl: 'https://images.unsplash.com/photo-1695048134810-a564da370512?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 284,
    accessories: [
      { id: '19', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '20', name: 'MagSafe Wallet', price: 59, category: 'Accessories', image: 'https://images.unsplash.com/photo-1607975218223-94f82613e833?q=80&w=1074&auto=format&fit=crop' }
    ]
  },
  {
    id: 10,
    name: 'iPhone 15',
    description: 'Serious upgrade, seriously fun. With a Dynamic Island, powerful camera, and USB-C.',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1695048134810-a564da370512?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.6,
    reviews: 267,
    accessories: [
      { id: '21', name: 'AirPods', price: 179, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '22', name: 'Silicon Case', price: 49, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 11,
    name: 'iPhone 14 Pro Max',
    description: 'The ultimate iPhone with Pro camera system, always-on display, and A16 Bionic.',
    price: 899,
    imageUrl: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=1471&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 329,
    accessories: [
      { id: '23', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '24', name: 'Leather Case', price: 59, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 12,
    name: 'iPhone 14 Pro',
    description: 'Always-On display. Dynamic Island. 48MP camera. A16 Bionic.',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=1471&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.6,
    reviews: 302,
    accessories: [
      { id: '25', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '26', name: 'MagSafe Charger', price: 39, category: 'Chargers', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1470&auto=format&fit=crop' }
    ]
  },
  {
    id: 13,
    name: 'iPhone 14',
    description: 'Big and bigger. With all-day battery life and A15 Bionic.',
    price: 699,
    imageUrl: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?q=80&w=1471&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.5,
    reviews: 278,
    accessories: [
      { id: '27', name: 'AirPods', price: 179, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '28', name: 'Clear Case', price: 49, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 14,
    name: 'iPhone 13 Pro Max',
    description: 'The best iPhone ever. Super Retina XDR display with ProMotion. A15 Bionic chip. Advanced camera system.',
    price: 699,
    imageUrl: 'https://images.unsplash.com/photo-1642641957348-301eb386b7b8?q=80&w=1480&auto=format&fit=crop',
    brand: 'Apple',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 342,
    accessories: [
      { id: '29', name: 'AirPods Pro', price: 249, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '30', name: 'Leather Case', price: 59, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 15,
    name: 'Samsung Galaxy S21 Ultra',
    description: 'The ultimate smartphone. 8K video recording. 108MP camera. Super fast processor.',
    price: 1099,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1471&auto=format&fit=crop',
    brand: 'Samsung',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 198,
    accessories: [
      { id: '31', name: 'Galaxy Buds Pro', price: 199, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' },
      { id: '32', name: 'Silicone Cover', price: 29, category: 'Cases', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop' }
    ]
  },
  {
    id: 16,
    name: 'Sony PlayStation 5',
    description: 'Next-gen gaming console. Lightning-fast SSD. Immersive 3D audio. Haptic feedback.',
    price: 499,
    imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1527&auto=format&fit=crop',
    brand: 'PlayStation',
    category: 'Gaming Consoles',
    rating: 4.9,
    reviews: 312,
    accessories: [
      { id: '33', name: 'DualSense Controller', price: 69, category: 'Controllers', image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=1470&auto=format&fit=crop' },
      { id: '34', name: 'Pulse 3D Wireless Headset', price: 99, category: 'Headphones', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1470&auto=format&fit=crop' }
    ]
  }
];

const categories = [
  'Smartphones', 'Laptops', 'Gaming Consoles', 'TVs', 
  'Headphones', 'PC Accessories', 'Tablets', 'Games',
  'Microwaves', 'Washing Machines', 'Refrigerators', 'Smart Screens', 
  'Air Conditioners', 'Vacuum Cleaners'
];

const subcategories: Record<string, string[]> = {
  "Smartphones": ["iPhone", "Android", "Foldable", "Budget", "Premium", "Camera-focused", "Battery-focused"],
  "Laptops": ["Gaming", "Business", "Ultrabook", "2-in-1", "Budget", "Premium", "Chromebook"],
  "Gaming Consoles": ["Home Console", "Portable", "Retro", "VR", "Accessories"],
  "TVs": ["OLED", "QLED", "LED", "Smart TV", "4K", "8K", "Budget"],
  "Headphones": ["Over-ear", "In-ear", "Wireless", "Noise-cancelling", "Gaming", "Sports"],
  "PC Accessories": ["Keyboards", "Mice", "Monitors", "Webcams", "Microphones", "Speakers"],
  "Tablets": ["iOS", "Android", "Windows", "E-readers", "Budget", "Premium"],
  "Games": ["Action", "RPG", "Strategy", "Sports", "Simulation", "Racing", "Puzzle"],
  "Microwaves": ["Countertop", "Built-in", "Convection", "Smart", "Compact"],
  "Washing Machines": ["Front Load", "Top Load", "Compact", "Smart", "Commercial"],
  "Refrigerators": ["French Door", "Side-by-Side", "Top Freezer", "Bottom Freezer", "Mini", "Smart"],
  "Smart Screens": ["Digital Frames", "Smart Displays", "Interactive Panels", "Digital Signage"],
  "Air Conditioners": ["Window", "Split", "Portable", "Central", "Smart"],
  "Vacuum Cleaners": ["Robot", "Upright", "Canister", "Handheld", "Stick"]
};

const brandsByCategory: Record<string, string[]> = {
  "Smartphones": ["Apple", "Samsung", "Google", "Xiaomi"],
  "Laptops": ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Microsoft"],
  "Gaming Consoles": ["PlayStation", "Microsoft", "Nintendo"],
  "TVs": ["Samsung", "Sony", "LG", "TCL"],
  "Headphones": ["Sony", "Bose", "Apple", "JBL", "Audio"],
  "PC Accessories": ["Logitech", "Razer", "Corsair", "SteelSeries"],
  "Tablets": ["Apple", "Samsung", "Microsoft", "Amazon"],
  "Games": ["PlayStation", "PC Games", "Microsoft", "Nintendo"],
  "Microwaves": ["Samsung", "LG", "Whirlpool", "Panasonic", "GE"],
  "Washing Machines": ["Samsung", "LG", "Whirlpool", "Maytag", "Bosch"],
  "Refrigerators": ["Samsung", "LG", "Whirlpool", "GE", "Frigidaire"],
  "Smart Screens": ["Samsung", "Google", "Amazon", "Facebook", "Lenovo"],
  "Air Conditioners": ["LG", "Samsung", "Carrier", "Daikin", "Frigidaire"],
  "Vacuum Cleaners": ["Dyson", "Shark", "iRobot", "Miele", "Bissell"]
};

const generateAccessories = (category: string): ProductAccessory[] => {
  const accessoryCount = Math.floor(Math.random() * 3) + 1;
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
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1528&auto=format&fit=crop'
    });
  }
  
  return result;
};

let nextId = 100;

categories.forEach(category => {
  const categorySubcategories = subcategories[category] || [];
  const categoryBrands = brandsByCategory[category] || ["Generic"];
  
  for (let i = 0; i < 100; i++) {
    const isPremium = Math.random() > 0.7;
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
        const size = Math.floor(Math.random() * 30 + 32);
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
      case 'Microwaves':
        productName = `${brand} ${subcategory} Microwave ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `High-efficiency ${subcategory.toLowerCase()} with multiple cooking presets.`;
        break;
      case 'Washing Machines':
        productName = `${brand} ${subcategory} Washing Machine ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `Energy-efficient ${subcategory.toLowerCase()} with steam cleaning technology.`;
        break;
      case 'Refrigerators':
        productName = `${brand} ${subcategory} Refrigerator ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `Smart refrigerator with touchscreen and camera to see inside from your phone.`;
        break;
      case 'Smart Screens':
        productName = `${brand} ${subcategory} Smart Screen ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `High-quality ${subcategory.toLowerCase()} display with Google Assistant integration.`;
        break;
      case 'Air Conditioners':
        productName = `${brand} ${subcategory} Air Conditioner ${Math.floor(Math.random() * 1000 + 100)}`;
        productDesc = `Energy-efficient ${subcategory.toLowerCase()} with smart controls and quiet operation.`;
        break;
      case 'Vacuum Cleaners':
        productName = `${brand} ${subcategory}
