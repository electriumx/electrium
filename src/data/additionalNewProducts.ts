
import { Product, Review } from './productData';

// Add this helper function at the top
const createEmptyReviews = (): Review[] => {
  return [];
};

// Fix accessory format by ensuring 'selected' property exists
const fixAccessoryFormat = (accessory: any): any => {
  return {
    ...accessory,
    selected: accessory.selected === undefined ? false : accessory.selected
  };
};

// Define new smartphone products
export const newSmartphones: Product[] = [
  {
    id: 20001,
    name: "iPhone 13 Pro",
    price: 999.99,
    category: "Smartphones",
    brand: "Apple",
    description: "Pro camera system with new 12MP Telephoto, Wide, and Ultra Wide cameras; LiDAR Scanner; 6x optical zoom range; macro photography",
    imageUrl: "/lovable-uploads/36fdb57d-95cb-4f52-a96a-aaf2f174a210.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews(),
    discount: 10
  },
  {
    id: 20002,
    name: "Samsung Galaxy S22",
    price: 899.99,
    category: "Smartphones",
    brand: "Samsung",
    description: "The latest Samsung flagship with incredible camera and performance.",
    imageUrl: "/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 20003,
    name: "Google Pixel 6",
    price: 699.99,
    category: "Smartphones",
    brand: "Google",
    description: "Experience the best of Google with the custom Tensor chip.",
    imageUrl: "/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 20004,
    name: "OnePlus 10 Pro",
    price: 799.99,
    category: "Smartphones",
    brand: "OnePlus",
    description: "Hasselblad Camera for Mobile, 120 Hz Fluid Display.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews(),
    discount: 15
  },
  {
    id: 20005,
    name: "Xiaomi 12",
    price: 749.99,
    category: "Smartphones",
    brand: "Xiaomi",
    description: "Snapdragon 8 Gen 1, 50MP triple camera system, 120W fast charging.",
    imageUrl: "/lovable-uploads/5c31ebb9-c488-4519-a777-9a35f5548f66.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 20006,
    name: "iPhone SE",
    price: 429.99,
    category: "Smartphones",
    brand: "Apple",
    description: "A15 Bionic chip, 4.7-inch Retina HD display, Touch ID.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 20007,
    name: "Samsung Galaxy A53",
    price: 449.99,
    category: "Smartphones",
    brand: "Samsung",
    description: "Super AMOLED display, 64MP Quad camera, 5000mAh battery.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  },
  {
    id: 20008,
    name: "Motorola Edge 30",
    price: 499.99,
    category: "Smartphones",
    brand: "Motorola",
    description: "144Hz pOLED display, 50MP triple camera system.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.1,
    reviews: createEmptyReviews(),
    discount: 20
  },
  {
    id: 20009,
    name: "Nothing Phone 1",
    price: 479.99,
    category: "Smartphones",
    brand: "Nothing",
    description: "Unique Glyph Interface, 50MP dual camera, wireless charging.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.0,
    reviews: createEmptyReviews()
  },
  {
    id: 20010,
    name: "ASUS Zenfone 9",
    price: 699.99,
    category: "Smartphones",
    brand: "ASUS",
    description: "Compact flagship with Snapdragon 8+ Gen 1, gimbal stabilization.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  }
];

// Define new laptop products
export const newLaptops: Product[] = [
  {
    id: 21001,
    name: "MacBook Pro 14",
    price: 1999.99,
    category: "Laptops",
    brand: "Apple",
    description: "Apple M1 Pro chip, 16GB RAM, 512GB SSD, 14-inch Liquid Retina XDR display.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews(),
    discount: 5
  },
  {
    id: 21002,
    name: "HP Spectre x360",
    price: 1399.99,
    category: "Laptops",
    brand: "HP",
    description: "Intel Core i7, 16GB RAM, 1TB SSD, OLED touchscreen display.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 21003,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1549.99,
    category: "Laptops",
    brand: "Lenovo",
    description: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch display.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 21004,
    name: "ASUS ROG Zephyrus G14",
    price: 1499.99,
    category: "Laptops",
    subcategory: "Gaming",
    brand: "ASUS",
    description: "AMD Ryzen 9, 16GB RAM, RTX 3060, 1TB SSD.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews(),
    discount: 10
  },
  {
    id: 21005,
    name: "Microsoft Surface Laptop 4",
    price: 1299.99,
    category: "Laptops",
    brand: "Microsoft",
    description: "AMD Ryzen 7, 16GB RAM, 512GB SSD, 13.5-inch touchscreen.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 21006,
    name: "Acer Swift 5",
    price: 1099.99,
    category: "Laptops",
    brand: "Acer",
    description: "Intel Core i7, 16GB RAM, 512GB SSD, 14-inch touchscreen.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 21007,
    name: "Dell Inspiron 15",
    price: 799.99,
    category: "Laptops",
    brand: "Dell",
    description: "Intel Core i5, 8GB RAM, 512GB SSD, 15.6-inch display.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  },
  {
    id: 21008,
    name: "MSI Creator Z16",
    price: 2399.99,
    category: "Laptops",
    subcategory: "Content Creation",
    brand: "MSI",
    description: "Intel Core i9, 32GB RAM, RTX 3060, 1TB SSD.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews(),
    discount: 15
  },
  {
    id: 21009,
    name: "Razer Blade 15",
    price: 1999.99,
    category: "Laptops",
    subcategory: "Gaming",
    brand: "Razer",
    description: "Intel Core i7, 16GB RAM, RTX 3070, 1TB SSD.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 21010,
    name: "LG Gram 17",
    price: 1499.99,
    category: "Laptops",
    brand: "LG",
    description: "Intel Core i7, 16GB RAM, 1TB SSD, 17-inch display, ultra-lightweight.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  }
];

// Define new headphone products
export const newHeadphones: Product[] = [
  {
    id: 22001,
    name: "Sony WH-1000XM5",
    price: 399.99,
    category: "Headphones",
    subcategory: "Over-ear",
    brand: "Sony",
    description: "Industry-leading noise cancellation and high-resolution audio.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews(),
    discount: 10
  },
  {
    id: 22002,
    name: "Apple AirPods Max",
    price: 549.99,
    category: "Headphones",
    subcategory: "Over-ear",
    brand: "Apple",
    description: "High-fidelity audio, Active Noise Cancellation, spatial audio.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 22003,
    name: "Sennheiser Momentum 4",
    price: 349.99,
    category: "Headphones",
    subcategory: "Over-ear",
    brand: "Sennheiser",
    description: "Superior sound quality, adaptive noise cancellation, 60-hour battery life.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 22004,
    name: "Bose QuietComfort Earbuds II",
    price: 299.99,
    category: "Headphones",
    subcategory: "In-ear",
    brand: "Bose",
    description: "Best noise cancellation in true wireless earbuds, CustomTune sound calibration.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews(),
    discount: 15
  },
  {
    id: 22005,
    name: "Samsung Galaxy Buds Pro 2",
    price: 229.99,
    category: "Headphones",
    subcategory: "In-ear",
    brand: "Samsung",
    description: "24-bit Hi-Fi sound, intelligent ANC, IPX7 water resistance.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  },
  {
    id: 22006,
    name: "Jabra Elite 7 Pro",
    price: 199.99,
    category: "Headphones",
    subcategory: "In-ear",
    brand: "Jabra",
    description: "MultiSensor Voice technology, adjustable ANC, IP57 rating.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 22007,
    name: "Beats Studio Buds",
    price: 149.99,
    category: "Headphones",
    subcategory: "In-ear",
    brand: "Beats",
    description: "Active Noise Cancellation, transparency mode, 8-hour battery life.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews(),
    discount: 20
  },
  {
    id: 22008,
    name: "Beyerdynamic DT 900 Pro X",
    price: 299.99,
    category: "Headphones",
    subcategory: "Over-ear",
    brand: "Beyerdynamic",
    description: "Open-back studio headphones, STELLAR.45 driver, detachable cable.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 22009,
    name: "Shure SE846",
    price: 899.99,
    category: "Headphones",
    subcategory: "In-ear",
    brand: "Shure",
    description: "Professional in-ear monitors, quad drivers, customizable frequency response.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews()
  },
  {
    id: 22010,
    name: "Audio-Technica ATH-M50xBT2",
    price: 199.99,
    category: "Headphones",
    subcategory: "Over-ear",
    brand: "Audio-Technica",
    description: "Wireless version of the iconic studio headphones, 50-hour battery life.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  }
];

// Define new tablet products
export const newTablets: Product[] = [
  {
    id: 23001,
    name: "iPad Pro 12.9",
    price: 1099.99,
    category: "Tablets",
    brand: "Apple",
    description: "M2 chip, Liquid Retina XDR display, ProMotion technology, Thunderbolt.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews(),
    discount: 5
  },
  {
    id: 23002,
    name: "Samsung Galaxy Tab S8 Ultra",
    price: 1099.99,
    category: "Tablets",
    brand: "Samsung",
    description: "14.6-inch AMOLED display, Snapdragon 8 Gen 1, S Pen included.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 23003,
    name: "Microsoft Surface Pro 9",
    price: 999.99,
    category: "Tablets",
    brand: "Microsoft",
    description: "Intel Core i5, 8GB RAM, 256GB SSD, 13-inch PixelSense display.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 23004,
    name: "Lenovo Tab P12 Pro",
    price: 699.99,
    category: "Tablets",
    brand: "Lenovo",
    description: "12.6-inch AMOLED display, Snapdragon 870, Precision Pen 3 included.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews(),
    discount: 15
  },
  {
    id: 23005,
    name: "Amazon Fire HD 10 Plus",
    price: 179.99,
    category: "Tablets",
    brand: "Amazon",
    description: "10.1-inch 1080p display, 4GB RAM, wireless charging, Alexa built-in.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  },
  {
    id: 23006,
    name: "Xiaomi Pad 5",
    price: 349.99,
    category: "Tablets",
    brand: "Xiaomi",
    description: "11-inch 2.5K 120Hz display, Snapdragon 860, quad speakers.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 23007,
    name: "Huawei MatePad Pro 12.6",
    price: 799.99,
    category: "Tablets",
    brand: "Huawei",
    description: "12.6-inch OLED display, Kirin 9000E, HarmonyOS, M-Pencil support.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 23008,
    name: "ASUS Zenpad 3S 10",
    price: 299.99,
    category: "Tablets",
    brand: "ASUS",
    description: "9.7-inch 2K display, MediaTek MT8176, 4GB RAM, fingerprint sensor.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.0,
    reviews: createEmptyReviews(),
    discount: 25
  },
  {
    id: 23009,
    name: "Samsung Galaxy Tab A8",
    price: 229.99,
    category: "Tablets",
    brand: "Samsung",
    description: "10.5-inch display, Unisoc T618, quad speakers, metal design.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.1,
    reviews: createEmptyReviews()
  },
  {
    id: 23010,
    name: "Lenovo Yoga Tab 13",
    price: 679.99,
    category: "Tablets",
    brand: "Lenovo",
    description: "13-inch 2K display, Snapdragon 870, built-in kickstand, HDMI input.",
    imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews()
  }
];

// Define new gaming console products
export const newGamingConsoles: Product[] = [
  {
    id: 24001,
    name: "PlayStation 5 Pro",
    price: 599.99,
    category: "Gaming Consoles",
    brand: "Sony",
    description: "Enhanced version of PS5 with improved ray tracing and 8K support.",
    imageUrl: "/lovable-uploads/67d0bb7c-dce4-421b-9ccc-4e0b5f12c545.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews(),
    discount: 10,
    accessories: [
      fixAccessoryFormat({ id: "107", name: "DualSense Edge Controller", price: 199.99, category: 'accessory', image: "/lovable-uploads/67d0bb7c-dce4-421b-9ccc-4e0b5f12c545.png" }),
      fixAccessoryFormat({ id: "108", name: "PS5 HD Camera", price: 59.99, category: 'accessory', image: "/lovable-uploads/67d0bb7c-dce4-421b-9ccc-4e0b5f12c545.png" })
    ]
  },
  {
    id: 24002,
    name: "Xbox Series X Halo Edition",
    price: 549.99,
    category: "Gaming Consoles",
    brand: "Microsoft",
    description: "Limited edition Halo-themed Xbox Series X with custom design.",
    imageUrl: "/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "109", name: "Xbox Elite Controller Series 2", price: 179.99, category: 'accessory', image: "/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png" }),
      fixAccessoryFormat({ id: "110", name: "Xbox Expansion Card", price: 219.99, category: 'accessory', image: "/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png" })
    ]
  },
  {
    id: 24003,
    name: "Nintendo Switch OLED Model",
    price: 349.99,
    category: "Gaming Consoles",
    brand: "Nintendo",
    description: "Enhanced Switch with 7-inch OLED screen and improved kickstand.",
    imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "111", name: "Switch Pro Controller", price: 69.99, category: 'accessory', image: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png" }),
      fixAccessoryFormat({ id: "112", name: "Switch Carrying Case", price: 19.99, category: 'accessory', image: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png" })
    ]
  },
  {
    id: 24004,
    name: "Steam Deck 512GB",
    price: 649.99,
    category: "Gaming Consoles",
    subcategory: "Handheld",
    brand: "Valve",
    description: "Portable PC gaming device with anti-glare screen and premium case.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews(),
    discount: 15,
    accessories: [
      fixAccessoryFormat({ id: "113", name: "Steam Deck Dock", price: 89.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" }),
      fixAccessoryFormat({ id: "114", name: "Steam Deck Travel Case", price: 49.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" })
    ]
  },
  {
    id: 24005,
    name: "Playdate",
    price: 179.99,
    category: "Gaming Consoles",
    subcategory: "Handheld",
    brand: "Panic",
    description: "Unique handheld with black & white screen and crank controller.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "115", name: "Playdate Cover", price: 29.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" })
    ]
  },
  {
    id: 24006,
    name: "Analogue Pocket",
    price: 219.99,
    category: "Gaming Consoles",
    subcategory: "Handheld",
    brand: "Analogue",
    description: "Modern Game Boy with high-resolution screen, FPGA architecture.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "116", name: "Analogue Dock", price: 99.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" })
    ]
  },
  {
    id: 24007,
    name: "Atari VCS",
    price: 299.99,
    category: "Gaming Consoles",
    brand: "Atari",
    description: "Modern reimagining of the classic console with PC capabilities.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 3.9,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "117", name: "Atari Classic Joystick", price: 49.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" })
    ]
  },
  {
    id: 24008,
    name: "Evercade VS",
    price: 99.99,
    category: "Gaming Consoles",
    brand: "Evercade",
    description: "Retro home console that uses physical cartridges with classic games.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews(),
    discount: 20,
    accessories: [
      fixAccessoryFormat({ id: "118", name: "Evercade Premium Pack", price: 79.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" })
    ]
  },
  {
    id: 24009,
    name: "Oculus Quest 2",
    price: 299.99,
    category: "Gaming Consoles",
    subcategory: "VR",
    brand: "Meta",
    description: "All-in-one VR gaming system with immersive experiences.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "119", name: "Quest 2 Elite Strap", price: 49.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" }),
      fixAccessoryFormat({ id: "120", name: "Quest 2 Carrying Case", price: 49.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" })
    ]
  },
  {
    id: 24010,
    name: "NVIDIA Shield TV Pro",
    price: 199.99,
    category: "Gaming Consoles",
    subcategory: "Streaming",
    brand: "NVIDIA",
    description: "4K HDR streaming media player with AI upscaling and GeForce NOW gaming.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    rating: 4.5,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "121", name: "NVIDIA Shield Controller", price: 59.99, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" })
    ]
  }
];

// Export all new products
export const allAdditionalProducts: Product[] = [
  ...newSmartphones,
  ...newLaptops,
  ...newHeadphones,
  ...newTablets,
  ...newGamingConsoles
];
