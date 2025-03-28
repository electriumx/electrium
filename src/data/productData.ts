
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  brand: string;
  discount?: number;
  quantity?: number;
  selectedColor?: string;
  accessories?: ProductAccessory[];
  reviews?: Review[];
  subcategory?: string;
  rating?: number;
  image?: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    description: "The latest iPhone with a super retina XDR display.",
    price: 999.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Smartphones",
    brand: "Apple",
    discount: 10,
    reviews: [
      { name: "John Doe", rating: 4.5, comment: "Great phone, love the camera!" },
      { name: "Jane Smith", rating: 5.0, comment: "Best iPhone ever!" }
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S21",
    description: "A flagship Android phone with a dynamic AMOLED display.",
    price: 899.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Smartphones",
    brand: "Samsung",
    discount: 5,
    reviews: [
      { name: "Alice Johnson", rating: 4.0, comment: "Good phone, but battery life could be better." },
      { name: "Bob Williams", rating: 4.5, comment: "Excellent display and performance." }
    ]
  },
  {
    id: 3,
    name: "Dell XPS 15",
    description: "A premium laptop with a stunning display and powerful performance.",
    price: 1499.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Laptops",
    brand: "Dell",
    reviews: [
      { name: "Charlie Brown", rating: 5.0, comment: "The best laptop I've ever owned!" },
      { name: "Diana Davis", rating: 4.5, comment: "Great for work and play." }
    ]
  },
  {
    id: 4,
    name: "Sony WH-1000XM4",
    description: "Industry-leading noise-canceling headphones.",
    price: 349.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Headphones",
    brand: "Sony",
    discount: 15,
    reviews: [
      { name: "Eve White", rating: 5.0, comment: "Amazing sound quality and noise cancellation." },
      { name: "Frank Green", rating: 4.0, comment: "Comfortable to wear for long periods." }
    ]
  },
  {
    id: 5,
    name: "Apple iPad Pro",
    description: "The ultimate iPad experience with the M1 chip.",
    price: 799.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Tablets",
    brand: "Apple",
    reviews: [
      { name: "Grace Hall", rating: 4.5, comment: "Great for creative work." },
      { name: "Harry Indigo", rating: 5.0, comment: "Fast and responsive." }
    ]
  },
  {
    id: 6,
    name: "Samsung Galaxy Tab S7+",
    description: "A premium Android tablet with a stunning display.",
    price: 699.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Tablets",
    brand: "Samsung",
    discount: 20,
    reviews: [
      { name: "Ivy Black", rating: 4.0, comment: "Good tablet, but the S Pen could be better." },
      { name: "Jack Brown", rating: 4.5, comment: "Excellent display and performance." }
    ]
  },
  {
    id: 7,
    name: "Bose QuietComfort 35 II",
    description: "Classic noise-canceling headphones with great comfort.",
    price: 299.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Headphones",
    brand: "Bose",
    reviews: [
      { name: "Kelly Blue", rating: 5.0, comment: "Very comfortable and great sound quality." },
      { name: "Liam Green", rating: 4.0, comment: "Reliable and durable." }
    ]
  },
  {
    id: 8,
    name: "Microsoft Surface Laptop 4",
    description: "A sleek and lightweight laptop with a long battery life.",
    price: 1299.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Laptops",
    brand: "Microsoft",
    reviews: [
      { name: "Mia White", rating: 4.5, comment: "Beautiful design and great performance." },
      { name: "Noah Gray", rating: 4.0, comment: "Excellent for productivity." }
    ]
  },
  {
    id: 9,
    name: "Google Pixel 6",
    description: "The latest Google phone with a unique design and great camera.",
    price: 799.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Smartphones",
    brand: "Google",
    reviews: [
      { name: "Olivia Silver", rating: 4.0, comment: "Good phone, but the design is not for everyone." },
      { name: "Owen Black", rating: 4.5, comment: "Excellent camera and software." }
    ]
  },
  {
    id: 10,
    name: "Xiaomi Mi 11",
    description: "A high-performance phone with a great display and fast charging.",
    price: 699.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Smartphones",
    brand: "Xiaomi",
    discount: 25,
    reviews: [
      { name: "Penelope Green", rating: 4.5, comment: "Great value for the price." },
      { name: "Quentin Red", rating: 4.0, comment: "Excellent display and fast charging." }
    ]
  },
  {
    id: 11,
    name: "Call of Duty: Warzone",
    description: "A free-to-play battle royale video game.",
    price: 0,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "PC Games",
    brand: "Activision",
    reviews: [
      { name: "Ryan Orange", rating: 4.5, comment: "Addictive and fun." },
      { name: "Sophia Yellow", rating: 4.0, comment: "Great for playing with friends." }
    ]
  },
  {
    id: 12,
    name: "The Last of Us Part II",
    description: "A critically acclaimed action-adventure game.",
    price: 59.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Gaming",
    brand: "Naughty Dog",
    reviews: [
      { name: "Thomas Purple", rating: 5.0, comment: "A masterpiece." },
      { name: "Uma Teal", rating: 4.5, comment: "Emotional and engaging." }
    ]
  },
  {
    id: 13,
    name: "Cyberpunk 2077",
    description: "An open-world, action-adventure RPG set in Night City.",
    price: 49.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "PC Games",
    brand: "CD Projekt Red",
    reviews: [
      { name: "Victor Lime", rating: 3.5, comment: "Great world, but buggy." },
      { name: "Wendy Rose", rating: 4.0, comment: "Immersive and detailed." }
    ]
  },
  {
    id: 14,
    name: "Red Dead Redemption 2",
    description: "An epic tale of life in America’s unforgiving heartland.",
    price: 59.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Gaming",
    brand: "Rockstar Games",
    reviews: [
      { name: "Xander Lavender", rating: 5.0, comment: "A true masterpiece." },
      { name: "Yara Olive", rating: 4.5, comment: "Stunning visuals and story." }
    ]
  },
  {
    id: 15,
    name: "Horizon Forbidden West",
    description: "Explore distant lands, fight bigger and more awe-inspiring machines.",
    price: 69.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Gaming",
    brand: "Guerrilla Games",
    reviews: [
      { name: "Zara Crimson", rating: 4.5, comment: "Beautiful game with a great story." },
      { name: "Adam Amber", rating: 4.0, comment: "Fun and engaging gameplay." }
    ]
  },
  {
    id: 16,
    name: "Elden Ring",
    description: "A fantasy action RPG set in a vast world full of mystery and peril.",
    price: 59.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "PC Games",
    brand: "FromSoftware",
    reviews: [
      { name: "Bella Beige", rating: 4.0, comment: "Challenging but rewarding." },
      { name: "Cody Coral", rating: 4.5, comment: "Great combat and exploration." }
    ]
  },
  {
    id: 17,
    name: "PlayStation 5",
    description: "Next-gen gaming console with lightning-fast loading.",
    price: 499.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Gaming Consoles",
    brand: "PlayStation",
    accessories: [
      { id: "105", name: "Extra Controller", price: 69.99, selected: false, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" },
      { id: "106", name: "Gaming Headset", price: 89.99, selected: false, category: 'accessory', image: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png" }
    ],
    reviews: [
      { name: "David Denim", rating: 5.0, comment: "Amazing console, love the fast loading times!" },
      { name: "Emily Emerald", rating: 4.5, comment: "Great graphics and performance." }
    ]
  },
  {
    id: 18,
    name: "Xbox Series X",
    description: "The fastest, most powerful Xbox ever.",
    price: 499.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Gaming Consoles",
    brand: "Microsoft",
    reviews: [
      { name: "Fiona Fuchsia", rating: 4.5, comment: "Great console, but the game library is lacking." },
      { name: "George Gold", rating: 4.0, comment: "Fast and powerful." }
    ]
  },
  {
    id: 19,
    name: "Nintendo Switch OLED",
    description: "The latest Nintendo console with a vibrant OLED screen.",
    price: 349.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Gaming Consoles",
    brand: "Nintendo",
    reviews: [
      { name: "Hannah Hazel", rating: 4.0, comment: "Great for portable gaming." },
      { name: "Isaac Indigo", rating: 4.5, comment: "Vibrant screen and fun games." }
    ]
  },
  {
    id: 20,
    name: "AirPods Pro",
    description: "Wireless earbuds with active noise cancellation.",
    price: 249.99,
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    category: "Audio",
    brand: "Apple",
    reviews: [
      { name: "Juliet Jade", rating: 5.0, comment: "Amazing sound quality and noise cancellation." },
      { name: "Kyle Khaki", rating: 4.5, comment: "Comfortable and reliable." }
    ]
  }
];

// Update any game products to have a minimum price of $34.99 and fix Call of Duty: Warzone
products.forEach(product => {
  if (product.category === "PC Games" || product.category === "Gaming") {
    if (product.price < 34.99) {
      product.price = 34.99;
    }
    
    // Fix specifically Call of Duty: Warzone
    if (product.name === "Call of Duty: Warzone" && product.price === 0) {
      product.price = 24.99;
    }
  }
});

// Ensure all products have a reviews array if missing
products.forEach(product => {
  if (!product.reviews || typeof product.reviews === 'number') {
    product.reviews = [];
  }
});

export interface ProductAccessory {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  category: string;
  image: string;
}
