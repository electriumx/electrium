import { useState, useEffect } from 'react';
import { Product, products as initialProducts } from '../data/productData';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { getCategoryImage } from '../utils/productImageUtils';

// Add new iPhone models
const additionalIPhones: Product[] = [
  {
    id: 2001,
    name: "iPhone 7",
    price: 299.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 7 with A10 Fusion chip, 12MP camera, and water resistance.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.3,
    reviews: 142
  },
  {
    id: 2002,
    name: "iPhone 8",
    price: 349.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 8 with A11 Bionic chip, wireless charging, and glass design.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.4,
    reviews: 156
  },
  {
    id: 2003,
    name: "iPhone X",
    price: 499.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone X with edge-to-edge Super Retina display, Face ID, and A11 Bionic chip.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.5,
    reviews: 178
  },
  {
    id: 2004,
    name: "iPhone XS",
    price: 549.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone XS with Super Retina display, A12 Bionic chip, and improved cameras.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.5,
    reviews: 192
  },
  {
    id: 2005,
    name: "iPhone 11",
    price: 599.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 11 with A13 Bionic chip, dual-camera system, and all-day battery life.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.6,
    reviews: 215
  },
  {
    id: 2006,
    name: "iPhone 12",
    price: 699.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 12 with A14 Bionic chip, Super Retina XDR display, and 5G capability.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.7,
    reviews: 235
  },
  {
    id: 2007,
    name: "iPhone 13",
    price: 799.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 13 with A15 Bionic chip, advanced dual-camera system, and improved battery life.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.8,
    reviews: 248
  },
  {
    id: 2008,
    name: "iPhone 14",
    price: 899.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 14 with A16 Bionic chip, ProMotion technology, and outstanding camera system.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.9,
    reviews: 256
  },
  {
    id: 2009,
    name: "iPhone 15",
    price: 999.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 15 with A17 Pro chip, titanium design, and professional camera features.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    rating: 4.9,
    reviews: 243
  },
  {
    id: 2010,
    name: "iPhone 16",
    price: 1099.99,
    category: "Phone",
    brand: "Apple",
    description: "iPhone 16 with the latest A18 chip, improved AI capabilities, and advanced camera system.",
    imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png",
    quantity: 0,
    discount: 5,
    rating: 5.0,
    reviews: 212
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Generate the additional 100+ products per category
    const generatedProducts = generateAdditionalProducts();
    
    // Combine initial products with additional iPhones and generated products
    const allProducts = [...initialProducts, ...additionalIPhones, ...generatedProducts];
    
    // Remove duplicates (in case they already exist)
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    // Update product images based on category and brand
    const updatedProducts = uniqueProducts.map(product => {
      // Samsung phones get the first image
      if (product.brand === "Samsung" && (product.category === "Smartphones" || product.category === "Phone")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png"
        };
      }
      // All tablets get the second image
      else if (product.category === "Tablets") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/ce523ec7-d793-4a5d-b548-b1f7a0193bf1.png"
        };
      }
      // All refrigerators get the third image
      else if (product.category === "Refrigerators") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/b43ca66e-4dd7-4f6f-9b2d-f2af3a926756.png"
        };
      }
      // All air conditioners get the fourth image
      else if (product.category === "Air Conditioners") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/a964141c-5fe9-49ec-9aa0-6b0bd558181c.png"
        };
      }
      // Keep other products with existing images (including iPhones with the previously set image)
      else if (product.category === "Phone" || product.category === "Smartphones") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/27df906c-346c-4282-ba2b-a0b7e8fab3b8.png"
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
  }, []);
  
  return { products };
};
