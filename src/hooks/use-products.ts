
import { useState, useEffect } from 'react';
import { Product, products as initialProducts } from '../data/productData';

// Add new iPhone models
const additionalIPhones: Product[] = [
  {
    id: 2001,
    name: "iPhone 7",
    price: 299.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 7 with A10 Fusion chip, 12MP camera, and water resistance.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2002,
    name: "iPhone 8",
    price: 349.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 8 with A11 Bionic chip, wireless charging, and glass design.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2003,
    name: "iPhone X",
    price: 499.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone X with edge-to-edge Super Retina display, Face ID, and A11 Bionic chip.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2004,
    name: "iPhone XS",
    price: 549.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone XS with Super Retina display, A12 Bionic chip, and improved cameras.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2005,
    name: "iPhone 11",
    price: 599.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 11 with A13 Bionic chip, dual-camera system, and all-day battery life.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2006,
    name: "iPhone 12",
    price: 699.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 12 with A14 Bionic chip, Super Retina XDR display, and 5G capability.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2007,
    name: "iPhone 13",
    price: 799.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 13 with A15 Bionic chip, advanced dual-camera system, and improved battery life.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2008,
    name: "iPhone 14",
    price: 899.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 14 with A16 Bionic chip, ProMotion technology, and outstanding camera system.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2009,
    name: "iPhone 15",
    price: 999.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 15 with A17 Pro chip, titanium design, and professional camera features.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0
  },
  {
    id: 2010,
    name: "iPhone 16",
    price: 1099.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 16 with the latest A18 chip, improved AI capabilities, and advanced camera system.",
    imageUrl: "/lovable-uploads/247135f4-b54e-45b5-b11a-44fe27602132.png",
    quantity: 0,
    discount: 5
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Combine initial products with additional iPhones
    const allProducts = [...initialProducts, ...additionalIPhones];
    
    // Remove duplicates (in case they already exist)
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    setProducts(uniqueProducts);
  }, []);
  
  return { products };
};
