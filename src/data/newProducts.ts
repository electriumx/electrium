
import { Product, ProductAccessory } from './productData';

// Helper function to generate random ratings between 3.5 and 5.0
const randomRating = (): number => {
  return Number((Math.random() * 1.5 + 3.5).toFixed(1));
};

// Helper function to generate random number of reviews between 10 and 500
const randomReviews = (): number => {
  return Math.floor(Math.random() * 490) + 10;
};

// Generate premium products with prices up to $5000
export const premiumProducts: Product[] = [
  {
    id: 10001,
    name: "Sony Professional Video Camera",
    description: "Professional-grade 8K camera with advanced stabilization and interchangeable lens system",
    price: 5000,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Sony",
    category: "Cameras",
    subcategory: "Professional",
    rating: 4.9,
    reviews: 87,
    accessories: [
      { id: 'acc-cam-1', name: 'Professional Lens Kit', price: 1200, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-cam-2', name: 'Heavy Duty Tripod', price: 350, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10002,
    name: "Mac Pro Workstation",
    description: "High-performance workstation with 28-core processor, 1.5TB RAM capacity, and dual Radeon Pro graphics",
    price: 4999,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Apple",
    category: "Computers",
    subcategory: "Workstation",
    rating: 4.8,
    reviews: 62,
    accessories: [
      { id: 'acc-mac-1', name: 'Pro Display XDR', price: 4999, category: 'Monitors', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-mac-2', name: 'Pro Stand', price: 999, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10003,
    name: "LG Signature OLED 88\" 8K TV",
    description: "Flagship 88-inch 8K OLED TV with advanced AI processing and premium sound system",
    price: 4799,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "LG",
    category: "TVs",
    subcategory: "OLED",
    rating: 4.9,
    reviews: 43,
    accessories: [
      { id: 'acc-tv-1', name: 'Premium Wall Mount', price: 299, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-tv-2', name: 'Wireless Surround Sound System', price: 899, category: 'Audio', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10004,
    name: "Samsung The Wall MicroLED 146\"",
    description: "Modular professional display with MicroLED technology for unparalleled picture quality and size customization",
    price: 4500,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Samsung",
    category: "TVs",
    subcategory: "MicroLED",
    rating: 4.9,
    reviews: 28,
    accessories: [
      { id: 'acc-wall-1', name: 'Professional Installation', price: 1500, category: 'Services', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-wall-2', name: 'Control System', price: 799, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10005,
    name: "Vankyo Cosmos 6",
    description: "Premium 4K home theater projector with HDR support, 3,000 ANSI lumens brightness and Dolby Digital Plus",
    price: 4150,
    imageUrl: "/lovable-uploads/7f739f1f-3772-4ead-89b5-34d5c94221bb.png",
    brand: "Vankyo",
    category: "Projectors",
    subcategory: "Home Theater",
    rating: 4.7,
    reviews: 112,
    accessories: [
      { id: 'acc-proj-1', name: 'Motorized Projector Screen', price: 499, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-proj-2', name: 'Ceiling Mount Kit', price: 79, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10006,
    name: "Microsoft Surface Studio 2",
    description: "Premium all-in-one PC with 28-inch adjustable touchscreen display and professional-grade performance",
    price: 3999,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Microsoft",
    category: "Computers",
    subcategory: "All-in-One",
    rating: 4.6,
    reviews: 89,
    accessories: [
      { id: 'acc-surf-1', name: 'Surface Dial', price: 99, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-surf-2', name: 'Surface Pen', price: 99, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10007,
    name: "Sony A1 OLED 77\" 4K TV",
    description: "Flagship OLED TV with cognitive processor XR, acoustic surface audio+ and premium build quality",
    price: 3799,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Sony",
    category: "TVs",
    subcategory: "OLED",
    rating: 4.8,
    reviews: 124,
    accessories: [
      { id: 'acc-a1-1', name: 'Sony Sound Bar', price: 999, category: 'Audio', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-a1-2', name: 'Premium HDMI Cables', price: 49, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10008,
    name: "Alienware Area-51m Gaming Laptop",
    description: "Ultimate gaming laptop with desktop components, 17-inch 360Hz display, and advanced cooling system",
    price: 3499,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Dell",
    category: "Laptops",
    subcategory: "Gaming",
    rating: 4.7,
    reviews: 98,
    accessories: [
      { id: 'acc-alien-1', name: 'Gaming Backpack', price: 199, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-alien-2', name: 'Alienware Mechanical Keyboard', price: 179, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10009,
    name: "Canon EOS C700 FF Cinema Camera",
    description: "Professional cinema camera with full-frame sensor, 5.9K raw recording, and exceptional low-light performance",
    price: 3299,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Canon",
    category: "Cameras",
    subcategory: "Professional",
    rating: 4.9,
    reviews: 52,
    accessories: [
      { id: 'acc-c700-1', name: 'Cinema Prime Lens Kit', price: 4999, category: 'Lenses', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-c700-2', name: 'Professional Shoulder Mount', price: 899, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 10010,
    name: "Sony PlayStation 5 Pro Special Edition",
    description: "Limited edition console with enhanced processor, extended storage, and exclusive game bundle",
    price: 2999,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "PlayStation",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: 4.8,
    reviews: 203,
    accessories: [
      { id: 'acc-ps5-1', name: 'DualSense Edge Controller', price: 199, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' },
      { id: 'acc-ps5-2', name: 'PlayStation VR2', price: 549, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  }
];

// Gaming Console Products - Home Console subcategory
export const homeConsoleProducts: Product[] = [
  {
    id: 20001,
    name: "PlayStation 5 Digital Edition",
    description: "Next-gen gaming console with lightning-fast loading, ultra-high speed SSD, and no disc drive",
    price: 399.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "PlayStation",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-ps5d-1', name: 'DualSense Controller', price: 69.99, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20002,
    name: "Xbox Series X",
    description: "Microsoft's most powerful console ever with 12 teraflops of processing power and true 4K gaming",
    price: 499.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Microsoft",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-xsx-1', name: 'Xbox Wireless Controller', price: 59.99, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20003,
    name: "Xbox Series S",
    description: "Smallest Xbox ever with digital gaming, 1440p gaming at up to 120fps, and quick resume",
    price: 299.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Microsoft",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-xss-1', name: 'Xbox Expansion Card', price: 219.99, category: 'Storage', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20004,
    name: "Nintendo Switch OLED Model",
    description: "Enhanced Nintendo Switch with vibrant 7-inch OLED screen and improved audio",
    price: 349.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Nintendo",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-nso-1', name: 'Joy-Con Pair', price: 79.99, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20005,
    name: "PlayStation 4 Pro",
    description: "Enhanced PS4 with 4K gaming, HDR technology, and faster frame rates",
    price: 399.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "PlayStation",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-ps4p-1', name: 'DualShock 4 Controller', price: 59.99, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20006,
    name: "Xbox One X",
    description: "Premium 4K gaming console with 6 teraflops of graphical power and 4K Blu-ray player",
    price: 349.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Microsoft",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-x1x-1', name: 'Xbox One Controller', price: 49.99, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20007,
    name: "Nintendo Switch Lite",
    description: "Compact, lightweight Nintendo Switch dedicated to handheld play",
    price: 199.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Nintendo",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-nsl-1', name: 'Carrying Case', price: 19.99, category: 'Cases', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20008,
    name: "Atari VCS",
    description: "Modern reimagining of the iconic Atari 2600 with modern hardware and classic games",
    price: 299.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Atari",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-avcs-1', name: 'Modern Controller', price: 59.99, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20009,
    name: "Sega Genesis Mini",
    description: "Miniature version of the classic console with 40 legendary games pre-installed",
    price: 79.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Sega",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-sgm-1', name: 'Extra Controller', price: 19.99, category: 'Controllers', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  },
  {
    id: 20010,
    name: "Steam Deck",
    description: "Handheld gaming PC with AMD APU, 7-inch touchscreen, and access to Steam library",
    price: 649.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Valve",
    category: "Gaming Consoles",
    subcategory: "Home Console",
    rating: randomRating(),
    reviews: randomReviews(),
    accessories: [
      { id: 'acc-sd-1', name: 'Dock', price: 89.99, category: 'Accessories', image: '/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png' }
    ]
  }
];

// Gaming Console Products - Accessories subcategory
export const consoleAccessoriesProducts: Product[] = [
  {
    id: 21001,
    name: "PlayStation VR2",
    description: "Next-generation VR headset for PS5 with 4K HDR displays and advanced haptic feedback",
    price: 549.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "PlayStation",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21002,
    name: "Xbox Elite Wireless Controller Series 2",
    description: "Professional-grade gaming controller with interchangeable components and 40-hour battery life",
    price: 179.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Microsoft",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21003,
    name: "Nintendo Pro Controller",
    description: "Premium controller for Nintendo Switch with motion controls and HD rumble",
    price: 69.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Nintendo",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21004,
    name: "PlayStation DualSense Edge Controller",
    description: "High-performance controller with customizable controls, replaceable stick modules and back buttons",
    price: 199.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "PlayStation",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21005,
    name: "Xbox Expansion Card 1TB",
    description: "Seagate storage expansion card providing additional 1TB of storage for Xbox Series X|S",
    price: 219.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Microsoft",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21006,
    name: "Nintendo Ring Fit Adventure",
    description: "Exercise game for Nintendo Switch with Ring-Con and leg strap accessories",
    price: 79.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Nintendo",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21007,
    name: "PlayStation Media Remote",
    description: "Media remote control for PS5 with dedicated streaming service buttons",
    price: 29.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "PlayStation",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21008,
    name: "Xbox Adaptive Controller",
    description: "Gamepad designed for people with limited mobility, with programmable buttons",
    price: 99.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Microsoft",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21009,
    name: "Nintendo Switch Dock",
    description: "Replacement dock for Nintendo Switch with HDMI and USB ports",
    price: 59.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "Nintendo",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  },
  {
    id: 21010,
    name: "PlayStation PULSE 3D Wireless Headset",
    description: "Wireless headset optimized for 3D Audio on PS5 with dual hidden microphones",
    price: 99.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: "PlayStation",
    category: "Gaming Consoles",
    subcategory: "Accessories",
    rating: randomRating(),
    reviews: randomReviews()
  }
];

// PC Accessories - Keyboards subcategory
export const keyboardProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 30001 + i,
  name: `RGB Mechanical Gaming Keyboard ${i + 1}`,
  description: "Mechanical gaming keyboard with customizable RGB lighting, programmable keys, and durable switches",
  price: 89.99 + (i * 10),
  imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png",
  brand: i % 2 === 0 ? "Corsair" : "Razer",
  category: "PC Accessories",
  subcategory: "Keyboards",
  rating: randomRating(),
  reviews: randomReviews()
}));

// PC Accessories - Mice subcategory
export const miceProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 31001 + i,
  name: `Gaming Mouse ${i + 1}`,
  description: "High-precision gaming mouse with adjustable DPI, programmable buttons, and ergonomic design",
  price: 49.99 + (i * 5),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: i % 2 === 0 ? "Logitech" : "SteelSeries",
  category: "PC Accessories",
  subcategory: "Mice",
  rating: randomRating(),
  reviews: randomReviews()
}));

// PC Accessories - Monitors subcategory
export const monitorProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 32001 + i,
  name: `Gaming Monitor ${27 + i}"`,
  description: `${27 + i}-inch gaming monitor with high refresh rate, low response time, and adaptive sync technology`,
  price: 299.99 + (i * 50),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["ASUS", "LG", "Samsung", "Acer", "MSI"][i % 5],
  category: "PC Accessories",
  subcategory: "Monitors",
  rating: randomRating(),
  reviews: randomReviews()
}));

// PC Accessories - Webcams subcategory
export const webcamProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 33001 + i,
  name: `HD Webcam ${i + 1}`,
  description: `High-definition webcam with ${720 + (i * 30)}p resolution, auto-focus, and noise-cancelling microphone`,
  price: 49.99 + (i * 10),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: i % 2 === 0 ? "Logitech" : "Microsoft",
  category: "PC Accessories",
  subcategory: "Webcams",
  rating: randomRating(),
  reviews: randomReviews()
}));

// PC Accessories - Microphones subcategory
export const microphoneProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 34001 + i,
  name: `Studio Microphone ${i + 1}`,
  description: "High-quality microphone for streaming, podcasting, and recording with adjustable stand and pop filter",
  price: 79.99 + (i * 20),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Blue", "HyperX", "Audio-Technica", "Rode", "Shure"][i % 5],
  category: "PC Accessories",
  subcategory: "Microphones",
  rating: randomRating(),
  reviews: randomReviews()
}));

// PC Accessories - Speakers subcategory
export const speakerProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 35001 + i,
  name: `Computer Speakers ${i + 1}`,
  description: "Premium computer speakers with rich sound, multiple inputs, and stylish design",
  price: 59.99 + (i * 15),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Bose", "Logitech", "Creative", "JBL", "Klipsch"][i % 5],
  category: "PC Accessories",
  subcategory: "Speakers",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Tablets - iOS subcategory
export const iosTabletProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 40001 + i,
  name: `iPad ${["Pro", "Air", "Mini", ""][(i % 4)]} ${Math.floor(i / 4) + 1}`,
  description: `Apple tablet with stunning Retina display, powerful processor, and versatile features`,
  price: 329.99 + (i * 100),
  imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
  brand: "Apple",
  category: "Tablets",
  subcategory: "iOS",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Tablets - Windows subcategory
export const windowsTabletProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 41001 + i,
  name: `Surface ${["Pro", "Go", "Book", "Laptop"][i % 4]} ${Math.floor(i / 4) + 1}`,
  description: "Windows tablet with versatile 2-in-1 design, high-resolution display, and full Windows experience",
  price: 399.99 + (i * 150),
  imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
  brand: "Microsoft",
  category: "Tablets",
  subcategory: "Windows",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Tablets - E-readers subcategory
export const eReaderProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 42001 + i,
  name: `E-Reader ${i + 1}`,
  description: "E-reader with paper-like display, adjustable light, and weeks of battery life",
  price: 79.99 + (i * 20),
  imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
  brand: i % 2 === 0 ? "Amazon" : "Kobo",
  category: "Tablets",
  subcategory: "E-readers",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Tablets - Budget subcategory
export const budgetTabletProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 43001 + i,
  name: `Budget Tablet ${i + 1}`,
  description: "Affordable tablet with good performance, HD display, and long battery life",
  price: 99.99 + (i * 15),
  imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
  brand: ["Amazon", "Lenovo", "Samsung", "Huawei", "Nokia"][i % 5],
  category: "Tablets",
  subcategory: "Budget",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Games - For each subcategory (Action, RPG, Strategy, Sports, Simulation, Racing, Puzzle, FPS)
export const gameProducts: Record<string, Product[]> = {
  "Action": Array.from({ length: 10 }, (_, i) => ({
    id: 50001 + i,
    name: `Action Adventure ${i + 1}`,
    description: "Fast-paced action game with stunning visuals, engaging storyline, and intense combat",
    price: 49.99 + (i % 3) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["PlayStation", "PC Games", "Microsoft", "Nintendo"][i % 4],
    category: "Games",
    subcategory: "Action",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "RPG": Array.from({ length: 10 }, (_, i) => ({
    id: 51001 + i,
    name: `Epic RPG ${i + 1}`,
    description: "Immersive role-playing game with vast open world, deep character customization, and rich storytelling",
    price: 49.99 + (i % 3) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["PlayStation", "PC Games", "Microsoft", "Nintendo"][i % 4],
    category: "Games",
    subcategory: "RPG",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Strategy": Array.from({ length: 10 }, (_, i) => ({
    id: 52001 + i,
    name: `Strategic Conquest ${i + 1}`,
    description: "Deep strategy game with complex systems, multiple victory paths, and engaging multiplayer",
    price: 39.99 + (i % 3) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["PC Games", "Microsoft", "Nintendo"][i % 3],
    category: "Games",
    subcategory: "Strategy",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Sports": Array.from({ length: 10 }, (_, i) => ({
    id: 53001 + i,
    name: `Sports Champion ${i + 1}`,
    description: "Realistic sports simulation with authentic teams, players, and stadiums",
    price: 59.99 + (i % 2) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["PlayStation", "PC Games", "Microsoft", "Nintendo"][i % 4],
    category: "Games",
    subcategory: "Sports",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Simulation": Array.from({ length: 10 }, (_, i) => ({
    id: 54001 + i,
    name: `Life Simulator ${i + 1}`,
    description: "Detailed simulation game letting you experience different lifestyles, careers, and activities",
    price: 29.99 + (i % 4) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["PC Games", "PlayStation", "Microsoft", "Nintendo"][i % 4],
    category: "Games",
    subcategory: "Simulation",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Racing": Array.from({ length: 10 }, (_, i) => ({
    id: 55001 + i,
    name: `Racing Legends ${i + 1}`,
    description: "High-speed racing game featuring realistic physics, diverse tracks, and extensive vehicle customization",
    price: 49.99 + (i % 3) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["PlayStation", "PC Games", "Microsoft", "Nintendo"][i % 4],
    category: "Games",
    subcategory: "Racing",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Puzzle": Array.from({ length: 10 }, (_, i) => ({
    id: 56001 + i,
    name: `Mind Bender ${i + 1}`,
    description: "Brain-teasing puzzle game with progressively challenging levels and unique mechanics",
    price: 19.99 + (i % 3) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["Nintendo", "PC Games", "PlayStation", "Microsoft"][i % 4],
    category: "Games",
    subcategory: "Puzzle",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "FPS": Array.from({ length: 10 }, (_, i) => ({
    id: 57001 + i,
    name: `Tactical Shooter ${i + 1}`,
    description: "First-person shooter with intense combat, strategic gameplay, and competitive multiplayer",
    price: 59.99 + (i % 2) * 10,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["PC Games", "PlayStation", "Microsoft"][i % 3],
    category: "Games",
    subcategory: "FPS",
    rating: randomRating(),
    reviews: randomReviews()
  }))
};

// Microwaves - Countertop subcategory
export const countertopMicrowaveProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 60001 + i,
  name: `Countertop Microwave ${i + 1}`,
  description: "Compact countertop microwave with multiple power levels, preset cooking programs, and easy-clean interior",
  price: 79.99 + (i * 10),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Samsung", "LG", "Whirlpool", "Panasonic", "GE"][i % 5],
  category: "Microwaves",
  subcategory: "Countertop",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Microwaves - Built-in subcategory
export const builtInMicrowaveProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 61001 + i,
  name: `Built-in Microwave ${i + 1}`,
  description: "Integrated microwave designed for cabinet installation with sensor cooking and convection features",
  price: 299.99 + (i * 50),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Samsung", "LG", "Whirlpool", "Bosch", "GE"][i % 5],
  category: "Microwaves",
  subcategory: "Built-in",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Microwaves - Convection subcategory
export const convectionMicrowaveProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 62001 + i,
  name: `Convection Microwave ${i + 1}`,
  description: "Versatile microwave with convection cooking capabilities for baking, roasting, and browning",
  price: 199.99 + (i * 30),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Samsung", "LG", "Whirlpool", "Panasonic", "GE"][i % 5],
  category: "Microwaves",
  subcategory: "Convection",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Washing Machines - Front Load subcategory
export const frontLoadWasherProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 70001 + i,
  name: `Front Load Washer ${i + 1}`,
  description: "Energy-efficient front-loading washing machine with large capacity and multiple wash cycles",
  price: 599.99 + (i * 100),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Samsung", "LG", "Whirlpool", "Bosch", "GE"][i % 5],
  category: "Washing Machines",
  subcategory: "Front Load",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Washing Machines - Top Load subcategory
export const topLoadWasherProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 71001 + i,
  name: `Top Load Washer ${i + 1}`,
  description: "Traditional top-loading washing machine with agitator, multiple water levels, and quick wash cycle",
  price: 399.99 + (i * 50),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Samsung", "LG", "Whirlpool", "Maytag", "GE"][i % 5],
  category: "Washing Machines",
  subcategory: "Top Load",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Washing Machines - Commercial subcategory
export const commercialWasherProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: 72001 + i,
  name: `Commercial Washer ${i + 1}`,
  description: "Heavy-duty commercial washing machine with high capacity, durable construction, and coin operation",
  price: 1499.99 + (i * 200),
  imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
  brand: ["Speed Queen", "LG", "Whirlpool", "Maytag", "Alliance"][i % 5],
  category: "Washing Machines",
  subcategory: "Commercial",
  rating: randomRating(),
  reviews: randomReviews()
}));

// Refrigerators - Each subcategory (French Door, Side-by-Side, Top Freezer, Bottom Freezer, Mini, Smart)
export const refrigeratorProducts: Record<string, Product[]> = {
  "French Door": Array.from({ length: 10 }, (_, i) => ({
    id: 80001 + i,
    name: `French Door Refrigerator ${i + 1}`,
    description: "Spacious French door refrigerator with bottom freezer, adjustable shelves, and ice maker",
    price: 1499.99 + (i * 200),
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["Samsung", "LG", "Whirlpool", "GE", "Frigidaire"][i % 5],
    category: "Refrigerators",
    subcategory: "French Door",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Side-by-Side": Array.from({ length: 10 }, (_, i) => ({
    id: 81001 + i,
    name: `Side-by-Side Refrigerator ${i + 1}`,
    description: "Side-by-side refrigerator with through-door ice and water dispenser and adjustable storage",
    price: 1199.99 + (i * 150),
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["Samsung", "LG", "Whirlpool", "GE", "Frigidaire"][i % 5],
    category: "Refrigerators",
    subcategory: "Side-by-Side",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Top Freezer": Array.from({ length: 10 }, (_, i) => ({
    id: 82001 + i,
    name: `Top Freezer Refrigerator ${i + 1}`,
    description: "Traditional top freezer refrigerator with adjustable shelves and humidity-controlled drawers",
    price: 699.99 + (i * 100),
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["Samsung", "LG", "Whirlpool", "GE", "Frigidaire"][i % 5],
    category: "Refrigerators",
    subcategory: "Top Freezer",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Bottom Freezer": Array.from({ length: 10 }, (_, i) => ({
    id: 83001 + i,
    name: `Bottom Freezer Refrigerator ${i + 1}`,
    description: "Refrigerator with bottom freezer drawer for easy access to frozen items",
    price: 899.99 + (i * 100),
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["Samsung", "LG", "Whirlpool", "GE", "Frigidaire"][i % 5],
    category: "Refrigerators",
    subcategory: "Bottom Freezer",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Mini": Array.from({ length: 10 }, (_, i) => ({
    id: 84001 + i,
    name: `Mini Refrigerator ${i + 1}`,
    description: "Compact refrigerator perfect for dorms, offices, or small spaces",
    price: 149.99 + (i * 20),
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["Frigidaire", "Danby", "Whirlpool", "GE", "Midea"][i % 5],
    category: "Refrigerators",
    subcategory: "Mini",
    rating: randomRating(),
    reviews: randomReviews()
  })),
  "Smart": Array.from({ length: 10 }, (_, i) => ({
    id: 85001 + i,
    name: `Smart Refrigerator ${i + 1}`,
    description: "Connected refrigerator with touchscreen, cameras, and smartphone integration",
    price: 2499.99 + (i * 300),
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    brand: ["Samsung", "LG", "GE", "Whirlpool", "Bosch"][i % 5],
    category: "Refrigerators",
    subcategory: "Smart",
    rating: randomRating(),
    reviews: randomReviews()
  }))
};

// Combine all product arrays
export const allNewProducts: Product[] = [
  ...premiumProducts,
  ...homeConsoleProducts,
  ...consoleAccessoriesProducts,
  ...keyboardProducts,
  ...miceProducts,
  ...monitorProducts,
  ...webcamProducts,
  ...microphoneProducts,
  ...speakerProducts,
  ...iosTabletProducts,
  ...windowsTabletProducts,
  ...eReaderProducts,
  ...budgetTabletProducts,
  ...gameProducts.Action,
  ...gameProducts.RPG,
  ...gameProducts.Strategy,
  ...gameProducts.Sports,
  ...gameProducts.Simulation,
  ...gameProducts.Racing,
  ...gameProducts.Puzzle,
  ...gameProducts.FPS,
  ...countertopMicrowaveProducts,
  ...builtInMicrowaveProducts,
  ...convectionMicrowaveProducts,
  ...frontLoadWasherProducts,
  ...topLoadWasherProducts,
  ...commercialWasherProducts,
  ...refrigeratorProducts["French Door"],
  ...refrigeratorProducts["Side-by-Side"],
  ...refrigeratorProducts["Top Freezer"],
  ...refrigeratorProducts["Bottom Freezer"],
  ...refrigeratorProducts.Mini,
  ...refrigeratorProducts.Smart
];
