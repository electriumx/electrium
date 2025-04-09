import { Product, Review } from './productData';

// Add this helper function at the top
const createEmptyReviews = (): Review[] => {
  return [];
};

// For each product that uses numeric reviews, update the initialization to use empty arrays
// And for each accessory, make sure selected property is included

// This code should be somewhere near the top of the file before products are defined
// Fix accessory format by ensuring 'selected' property exists
const fixAccessoryFormat = (accessory: any): any => {
  return {
    ...accessory,
    selected: accessory.selected === undefined ? false : accessory.selected
  };
};

// Define new products with proper typing
export const allNewProducts: Product[] = [
  // Update specific products
  {
    id: 10016,
    name: "Xiaomi Mi 11",
    price: 749.99,
    category: "Smartphones",
    brand: "Xiaomi",
    description: "Flagship smartphone with Snapdragon 888, 108MP camera, and 120Hz AMOLED display.",
    imageUrl: "/lovable-uploads/5c31ebb9-c488-4519-a777-9a35f5548f66.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 10017,
    name: "Dell XPS 15",
    price: 1799.99,
    category: "Laptops",
    brand: "Dell",
    description: "Premium laptop with 11th Gen Intel Core i7, 16GB RAM, and NVIDIA GeForce RTX 3050 Ti.",
    imageUrl: "/lovable-uploads/1bd70cd9-f378-4873-8086-6fcaed3c58e0.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 10001,
    name: "Vankyo Cosmos 6",
    price: 599.99,
    category: "Projectors",
    brand: "Vankyo",
    description: "4K UHD projector with 1000 ANSI lumens, auto focus, and keystone correction.",
    imageUrl: "/lovable-uploads/7f739f1f-3772-4ead-89b5-34d5c94221bb.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 10002,
    name: "Logitech MX Master 3",
    price: 99.99,
    category: "PC Accessories",
    subcategory: "Mice",
    brand: "Logitech",
    description: "Advanced wireless mouse with customizable buttons and app-specific profiles.",
    imageUrl: "/lovable-uploads/62139f0e-bea1-4c16-9cd8-3808407de51f.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews()
  },
  {
    id: 10003,
    name: "Logitech MX Master 3",
    price: 99.99,
    category: "PC Accessories",
    subcategory: "Mice",
    brand: "Logitech",
    description: "Advanced wireless mouse with customizable buttons and app-specific profiles.",
    imageUrl: "/lovable-uploads/d25b7839-e5c3-40e7-b085-79d316d78dcf.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews()
  },
  {
    id: 10004,
    name: "Samsung Galaxy Tab S8",
    price: 699.99,
    category: "Tablets",
    brand: "Samsung",
    description: "Premium Android tablet with S Pen support and powerful performance.",
    imageUrl: "/lovable-uploads/a047847e-cce0-4640-bd11-06bae205b795.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 10005,
    name: "Apple iPad Air",
    price: 599.99,
    category: "Tablets",
    brand: "Apple",
    description: "Lightweight and powerful tablet with M1 chip and all-day battery life.",
    imageUrl: "/lovable-uploads/07576ea8-0330-49e9-8af6-67d36408f939.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 10006,
    name: "Google Chromebook",
    price: 349.99,
    category: "Laptops",
    brand: "Google",
    description: "Affordable, lightweight Chromebook with Chrome OS and cloud-based applications.",
    imageUrl: "/lovable-uploads/e0bd6a1e-c79c-4d51-b7f8-26292c9c6587.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  },
  {
    id: 10007,
    name: "Bose QuietComfort 45",
    price: 329.99,
    category: "Headphones",
    subcategory: "Over-ear",
    brand: "Bose",
    description: "Premium noise-canceling headphones with exceptional comfort and sound quality.",
    imageUrl: "/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews()
  },
  {
    id: 10008,
    name: "Sony WH-1000XM5",
    price: 399.99,
    category: "Headphones",
    subcategory: "Over-ear",
    brand: "Sony",
    description: "Industry-leading noise cancellation and high-resolution audio.",
    imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png",
    quantity: 0,
    rating: 4.9,
    reviews: createEmptyReviews()
  },
  {
    id: 10009,
    name: "Apple AirPods Pro 2",
    price: 249.99,
    category: "Headphones",
    subcategory: "In-ear",
    brand: "Apple",
    description: "Wireless earbuds with active noise cancellation and spatial audio.",
    imageUrl: "/lovable-uploads/b716e87d-a752-4422-aafa-94b38c1dbff3.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews()
  },
  {
    id: 10010,
    name: "Beats Fit Pro",
    price: 199.99,
    category: "Headphones",
    subcategory: "Sports",
    brand: "Beats",
    description: "Secure-fit wireless earbuds with active noise cancellation.",
    imageUrl: "/lovable-uploads/bfd80abc-6761-4660-9b25-36864420ec27.png",
    quantity: 0,
    rating: 4.6,
    reviews: createEmptyReviews()
  },
  {
    id: 10011,
    name: "Horizon Kings - Simulation",
    price: 59.99,
    category: "Games",
    subcategory: "Simulation",
    brand: "PC Games",
    description: "Build and manage your medieval kingdom in this detailed simulation game.",
    imageUrl: "/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png",
    quantity: 0,
    rating: 4.3,
    reviews: createEmptyReviews()
  },
  {
    id: 10012,
    name: "World of Warriors - Racing",
    price: 49.99,
    category: "Games",
    subcategory: "Racing",
    brand: "PC Games",
    description: "High-octane racing game with fantasy warriors and unique vehicles.",
    imageUrl: "/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png",
    quantity: 0,
    rating: 4.2,
    reviews: createEmptyReviews()
  },
  {
    id: 10013,
    name: "Ultimate Fantasy - Racing",
    price: 54.99,
    category: "Games",
    subcategory: "Racing",
    brand: "PC Games",
    description: "Fantasy racing game with magical vehicles and enchanted tracks.",
    imageUrl: "/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png",
    quantity: 0,
    rating: 4.4,
    reviews: createEmptyReviews()
  },
  {
    id: 10014,
    name: "PlayStation 5 Digital Edition",
    price: 399.99,
    category: "Gaming Consoles",
    brand: "Sony",
    description: "Next-gen gaming console without disc drive, featuring lightning-fast loading.",
    imageUrl: "/lovable-uploads/67d0bb7c-dce4-421b-9ccc-4e0b5f12c545.png",
    quantity: 0,
    rating: 4.8,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "107", name: "DualSense Controller", price: 69.99, category: 'accessory', image: "/lovable-uploads/67d0bb7c-dce4-421b-9ccc-4e0b5f12c545.png" }),
      fixAccessoryFormat({ id: "108", name: "Media Remote", price: 29.99, category: 'accessory', image: "/lovable-uploads/67d0bb7c-dce4-421b-9ccc-4e0b5f12c545.png" })
    ]
  },
  {
    id: 10015,
    name: "Xbox Series S",
    price: 299.99,
    category: "Gaming Consoles",
    brand: "Microsoft",
    description: "Smallest Xbox ever, all-digital console for next-gen gaming.",
    imageUrl: "/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png",
    quantity: 0,
    rating: 4.7,
    reviews: createEmptyReviews(),
    accessories: [
      fixAccessoryFormat({ id: "109", name: "Xbox Wireless Controller", price: 59.99, category: 'accessory', image: "/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png" }),
      fixAccessoryFormat({ id: "110", name: "Play & Charge Kit", price: 24.99, category: 'accessory', image: "/lovable-uploads/4b5ba4b7-1d75-4c44-aa6c-c1d6e0d028c4.png" })
    ]
  }
];
