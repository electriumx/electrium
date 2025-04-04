import { useState, useEffect } from 'react';
import { Product, products as initialProducts } from '../data/productData';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { getCategoryImage } from '../utils/productImageUtils';
import { allNewProducts } from '../data/newProducts';
import { convertNumericReviews, ensureProductsReviewsFormat, ensureAccessoriesFormat, filterRestrictedProducts } from '../utils/productUtils';
import { refrigeratorProducts } from '../data/refrigeratorProducts';

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
    reviews: []
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
    reviews: []
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
    reviews: []
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
    reviews: []
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
    reviews: []
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
    reviews: []
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
    reviews: []
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
    reviews: []
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
    reviews: []
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
    rating: 5.0,
    reviews: []
  }
];

// TV subcategory products
const tvSubcategoryProducts: Product[] = [
  {
    id: 15001,
    name: "Samsung OLED 55-inch Smart TV",
    price: 1999.99,
    category: "TVs",
    subcategory: "OLED",
    brand: "Samsung",
    description: "Premium OLED display with perfect blacks and vibrant colors, smart features, and sleek design.",
    imageUrl: "/lovable-uploads/2f84a28b-83f8-4c69-96f8-ed61e49e631b.png",
    quantity: 0,
    rating: 4.8,
    reviews: []
  },
  {
    id: 15002,
    name: "LG QLED 65-inch UHD TV",
    price: 1499.99,
    category: "TVs",
    subcategory: "QLED",
    brand: "LG",
    description: "Quantum dot technology for brilliant color accuracy, smart TV functionality, and slim design.",
    imageUrl: "",
    quantity: 0,
    rating: 4.7,
    reviews: []
  },
  {
    id: 15003,
    name: "Sony LED 50-inch 4K TV",
    price: 899.99,
    category: "TVs",
    subcategory: "LED",
    brand: "Sony",
    description: "High-quality LED panel with 4K resolution, HDR support, and advanced processing.",
    imageUrl: "",
    quantity: 0,
    rating: 4.6,
    reviews: []
  },
  {
    id: 15004,
    name: "Samsung 8K 75-inch Ultra HD TV",
    price: 3499.99,
    category: "TVs",
    subcategory: "8K",
    brand: "Samsung",
    description: "Future-proof 8K resolution with AI upscaling, premium audio, and smart home integration.",
    imageUrl: "",
    quantity: 0,
    rating: 4.9,
    reviews: []
  },
  {
    id: 15005,
    name: "TCL 43-inch Budget Smart TV",
    price: 399.99,
    category: "TVs",
    subcategory: "Budget",
    brand: "TCL",
    description: "Affordable smart TV with good picture quality, streaming apps, and voice control.",
    imageUrl: "",
    quantity: 0,
    rating: 4.3,
    reviews: []
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Generate the additional products with limited numbers
    const generatedProducts = generateAdditionalProducts();
    
    // Combine initial products with additional iPhones, TV subcategories, refrigerator products, generated products, and all new products
    const allProducts = [...initialProducts, ...additionalIPhones, ...tvSubcategoryProducts, ...refrigeratorProducts, ...generatedProducts, ...allNewProducts];
    
    // Remove duplicates (in case they already exist)
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    // Apply formatting fixes
    const formattedProducts = ensureAccessoriesFormat(ensureProductsReviewsFormat(uniqueProducts));
    
    // Deduplicate: Keep only one of each product type and remove numbered versions
    const filteredProducts = formattedProducts.reduce((acc: Product[], product) => {
      // Extract base product name without numbers at the end
      const baseNameMatch = product.name.match(/(.*?)(?:\s+\d+)?$/);
      const baseName = baseNameMatch ? baseNameMatch[1].trim() : product.name;
      
      // Keep only one Battlefield game (remove numbered versions)
      if (product.name.toLowerCase().includes('battlefield')) {
        const existingBattlefield = acc.find(p => p.name.toLowerCase().includes('battlefield'));
        if (existingBattlefield) {
          return acc;
        }
      }
      
      // Check if we already have this base product in our accumulator
      const existingProduct = acc.find(p => {
        const pBaseNameMatch = p.name.match(/(.*?)(?:\s+\d+)?$/);
        const pBaseName = pBaseNameMatch ? pBaseNameMatch[1].trim() : p.name;
        
        return (
          pBaseName === baseName && 
          p.brand === product.brand && 
          p.category === product.category
        );
      });
      
      // Only add if we don't already have this base product type
      // But keep all iPhones, specific games, TVs with subcategories, and all new products 
      // (those with IDs over 10000 which we've just added)
      if (!existingProduct || 
          (product.brand === "Apple" && product.name.includes("iPhone")) ||
          (product.category === "Games" && !product.name.toLowerCase().includes("battlefield 2") && 
           !product.name.toLowerCase().includes("battlefield 3") && 
           !product.name.toLowerCase().includes("battlefield 4") && 
           !product.name.toLowerCase().includes("battlefield 5")) || 
          (product.category === "TVs" && product.subcategory) ||
          (product.name.toLowerCase().includes("battlefield") && !product.name.toLowerCase().match(/battlefield\s+[2-5]/)) ||
          product.name.toLowerCase().includes("rainbow six") ||
          product.name.toLowerCase().includes("call of duty") ||
          (product.name.toLowerCase().includes("switch") && product.category !== "Vacuum Cleaners" && product.subcategory !== "Handheld") ||
          product.id >= 10000 ||
          (product.brand === "Google" && product.name.toLowerCase().includes("chromebook")) ||
          (product.brand.toLowerCase() === "xbox" || 
           (product.brand.toLowerCase() === "microsoft" && product.category.toLowerCase() === "gaming consoles")) ||
          (product.name.toLowerCase().includes("playstation") && !product.name.toLowerCase().includes("playstation 1")) ||
          product.name === "Vankyo Cosmos 6") {
        return [...acc, product];
      }
      
      return acc;
    }, []);

    // Filter out restricted products based on rules
    const restrictedFilteredProducts = filterRestrictedProducts(filteredProducts);

    // Update product images based on category, brand, and requested changes
    const updatedProducts = restrictedFilteredProducts.map(product => {
      // Google Chromebook gets the first uploaded image
      if (product.brand.toLowerCase() === 'google' && product.name.toLowerCase().includes('chromebook')) {
        return {
          ...product,
          imageUrl: '/lovable-uploads/c0f2c21e-2504-4832-acad-c32a492a5a24.png'
        };
      }
      // Xbox products get the second uploaded image
      else if (product.brand.toLowerCase() === 'xbox' || 
               (product.brand.toLowerCase() === 'microsoft' && product.category.toLowerCase() === 'gaming consoles')) {
        return {
          ...product,
          imageUrl: '/lovable-uploads/77956929-c717-415b-aad8-f8e0bf0069b0.png'
        };
      }
      // PlayStation 5 get the third uploaded image
      else if (product.name.toLowerCase() === 'playstation 5' || 
               (product.brand.toLowerCase() === 'playstation' && !product.name.toLowerCase().includes('digital'))) {
        return {
          ...product,
          imageUrl: '/lovable-uploads/36ef7021-a306-4cf2-a331-b1b3a0e4b33d.png'
        };
      }
      // PlayStation 5 Digital Edition get the fourth uploaded image
      else if (product.name.toLowerCase().includes('playstation 5 digital') || 
               (product.name.toLowerCase().includes('playstation') && product.name.toLowerCase().includes('digital'))) {
        return {
          ...product,
          imageUrl: '/lovable-uploads/7b9e23e5-ee70-49a4-ba87-c43c5bd73ce4.png'
        };
      }
      // Vankyo Cosmos 6 gets the first uploaded image
      else if (product.name === "Vankyo Cosmos 6") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/7f739f1f-3772-4ead-89b5-34d5c94221bb.png"
        };
      }
      // All keyboards get the second uploaded image
      else if (product.category === "PC Accessories" && product.subcategory === "Keyboards") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/3f391803-44c1-4437-a246-5070b31d60a5.png"
        };
      }
      // All tablets get the third uploaded image
      else if (product.category === "Tablets") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/ca7ef935-a15a-44db-8d0a-25f62f3b929a.png"
        };
      }
      // Battlefield game gets the first uploaded image
      else if (product.name.toLowerCase().includes('battlefield')) {
        return {
          ...product,
          imageUrl: '/lovable-uploads/ab3d21b8-041b-4137-865c-22fe07795d75.png',
          subcategory: "FPS Games"
        };
      }
      // Nintendo products get the third uploaded image
      else if (product.brand === "Nintendo" || product.name.toLowerCase().includes('nintendo') || product.name.toLowerCase().includes('switch')) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/54b67814-dd27-4a46-ac69-4beaf7bd7851.png"
        };
      }
      // Samsung phones get the first image
      else if (product.brand === "Samsung" && (product.category === "Smartphones" || product.category === "Phone")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/ec449e2d-bb1c-4e51-9af8-cb2419b6785f.png"
        };
      }
      // Pixel phones get the first new image
      else if (product.brand === "Google" && (product.name.toLowerCase().includes("pixel") || (product.category === "Smartphones" || product.category === "Phone"))) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/f97dcb3d-1a62-49e1-ba15-0f5d5f80099d.png"
        };
      }
      // iRobot vacuum cleaners get the second new image
      else if (product.brand === "iRobot" && product.category === "Vacuum Cleaners") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/aefe184c-a90a-46d3-b244-124b1062a6f0.png"
        };
      }
      // Rainbow Six games get the user-provided image
      else if (product.name.toLowerCase().includes("rainbow six")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/2b732385-bcb9-459e-981e-bb57c1860769.png",
          subcategory: "FPS Games"
        };
      }
      // Other vacuum cleaners get the third new image
      else if (product.category === "Vacuum Cleaners" && product.brand !== "iRobot") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/99ac0da2-0189-48a9-8115-cbad8e1b079c.png"
        };
      }
      // Death Stranding gets the fourth new image
      else if (product.name.toLowerCase().includes("death stranding")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/e61d09d1-fb3f-4e38-aaca-2342513b89de.png"
        };
      }
      // Apple headphones get the fifth new image
      else if (product.brand === "Apple" && product.category === "Headphones") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/d1307e35-8834-4230-b1d0-9aa18e7760f7.png"
        };
      }
      // Apple AirPods get the sixth new image
      else if (product.brand === "Apple" && product.name.toLowerCase().includes("airpod")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/b716e87d-a752-4422-aafa-94b38c1dbff3.png"
        };
      }
      // Samsung microwaves get the seventh new image
      else if (product.brand === "Samsung" && product.category === "Microwaves") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/86bf4158-8228-4965-8b2d-1f5a3feed7e9.png"
        };
      }
      // Samsung digital frame get the eighth new image
      else if (product.brand === "Samsung" && product.name.toLowerCase().includes("digital frame")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/15fa551c-cf90-4a18-b949-a21c2a6f44d4.png"
        };
      }
      // Samsung OLED TVs get the ninth new image
      else if (product.brand === "Samsung" && product.category === "TVs" && product.name.toLowerCase().includes("oled")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/2f84a28b-83f8-4c69-96f8-ed61e49e631b.png"
        };
      }
      // Samsung interactive panels get the new first image
      else if (product.brand === "Samsung" && product.name.toLowerCase().includes("interactive panel")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/83220acc-b41f-488f-996c-70c790349093.png"
        };
      }
      // Samsung smart digital displays get the new second image
      else if (product.brand === "Samsung" && product.name.toLowerCase().includes("smart digital display")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/f4d18f61-e011-41e1-8945-0862b8e9cb22.png"
        };
      }
      // Samsung digital signage monitors get the new third image
      else if (product.brand === "Samsung" && product.name.toLowerCase().includes("digital signage")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/e4e5c805-99ee-44b2-bac6-a7549cd85562.png"
        };
      }
      // Call of Duty Black Ops 6 gets the new fourth image
      else if (product.name.toLowerCase().includes("call of duty")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/2f5f9ee3-73a7-48e2-b97a-5de770162a36.png",
          subcategory: "FPS Games"
        };
      }
      // QuietComfort products get the user-provided image
      else if (product.name.toLowerCase().includes("quietcomfort") && product.brand.toLowerCase() === "bose") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/7be48add-b36a-4617-8856-47352e844bae.png"
        };
      }
      // Washing Machines get the newly uploaded image
      else if (product.category === "Washing Machines") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/2ae5236f-4492-452a-b393-492c225380c1.png"
        };
      }
      // Horizon Kings - Simulation gets the newly uploaded image
      else if (product.name.toLowerCase().includes("horizon kings") && product.name.toLowerCase().includes("simulation")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/f58b103e-1e2f-4e40-92bd-5ceee55670d4.png"
        };
      }
      // World of Warriors - Racing gets the newly uploaded image
      else if (product.name.toLowerCase().includes("world of warriors") && product.name.toLowerCase().includes("racing")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/cf30cef5-878e-4911-b265-6fadc46cd9b1.png"
        };
      }
      // Ultimate Fantasy - Racing gets the newly uploaded image
      else if (product.name.toLowerCase().includes("ultimate fantasy") && product.name.toLowerCase().includes("racing")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/49cf3cc6-b591-4fe9-b0ca-7e21178098d2.png"
        };
      }
      // Cyberpunk 2077 gets the newly uploaded image
      else if (product.name.toLowerCase().includes("cyberpunk 2077")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/d0b5f6e9-d8a7-4e6d-92d9-0981cb533be3.png"
        };
      }
      // Sports headphones get the newly uploaded image
      else if (product.category === "Headphones" && product.subcategory && product.subcategory.toLowerCase().includes("sports")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/bfd80abc-6761-4660-9b25-36864420ec27.png"
        };
      }
      // LG Microwaves get the newly uploaded image
      else if (product.brand === "LG" && product.category === "Microwaves") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/67a3f208-e588-471a-88d1-c0db17913854.png"
        };
      }
      // Whirlpool Microwaves get the newly uploaded image
      else if (product.brand === "Whirlpool" && product.category === "Microwaves") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/0140d4cf-1335-41c7-9dbd-d5c2fc67a2f8.png"
        };
      }
      // Panasonic Microwaves get the newly uploaded image
      else if (product.brand === "Panasonic" && product.category === "Microwaves") {
        return {
          ...product,
          imageUrl: "/lovable-uploads/05649a66-79e2-4aa3-b369-2496bac58ad7.png"
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
    
    // Filter out restricted products
    const filteredFinalProducts = filterRestrictedProducts(updatedProducts);
    
    setProducts(filteredFinalProducts);
  }, []);
  
  return { products };
};
