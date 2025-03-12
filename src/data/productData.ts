
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: string;
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
  image?: string; // Added image property
}

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
      { id: '1', name: 'AirPods Pro', price: 249, category: 'Headphones' },
      { id: '2', name: 'Leather Case', price: 59, category: 'Cases' },
      { id: '3', name: '20W USB-C Power Adapter', price: 19, category: 'Chargers' }
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
      { id: '4', name: 'Galaxy Buds Pro', price: 199, category: 'Headphones' },
      { id: '5', name: 'Silicone Cover', price: 29, category: 'Cases' },
      { id: '6', name: '25W Travel Adapter', price: 24, category: 'Chargers' }
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
      { id: '7', name: 'DualSense Controller', price: 69, category: 'Controllers' },
      { id: '8', name: 'Pulse 3D Wireless Headset', price: 99, category: 'Headphones' }
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
      { id: '9', name: 'Xbox Wireless Controller', price: 59, category: 'Controllers' },
      { id: '10', name: 'Xbox Wireless Headset', price: 99, category: 'Headphones' }
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
      { id: '11', name: 'Magic Mouse', price: 99, category: 'Accessories' },
      { id: '12', name: 'USB-C to USB Adapter', price: 19, category: 'Adapters' }
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
      { id: '13', name: 'Apple Pencil (2nd generation)', price: 129, category: 'Accessories' },
      { id: '14', name: 'Smart Keyboard Folio', price: 179, category: 'Accessories' }
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
      { id: '15', name: 'Book Cover Keyboard', price: 149, category: 'Accessories' }
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
    reviews: 420
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
    reviews: 350
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
    reviews: 300
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
    reviews: 280
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
    reviews: 250
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
    reviews: 320
  }
];
