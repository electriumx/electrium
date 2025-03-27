import { useState, useEffect } from 'react';
import { products as initialProducts } from '../data/productData';
import { Product } from '@/types/product';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { generateSmartphoneProducts, generateGamingConsoleProducts, generateHeadphoneProducts } from '@/utils/productGenerators';
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
    reviews: 142,
    colors: ["Black", "Silver", "Gold", "Rose Gold"],
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
    reviews: 156,
    colors: ["Black"],
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
    reviews: 132
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
    reviews: 98
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
    reviews: 67
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
    reviews: 215
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Generate the additional products with limited numbers
    const generatedProducts = generateAdditionalProducts();
    
    // Generate new subcategory products
    const smartphoneProducts = generateSmartphoneProducts();
    const gamingConsoleProducts = generateGamingConsoleProducts();
    const headphoneProducts = generateHeadphoneProducts();
    
    // Combine initial products with additional iPhones, TV subcategories, and generated products
    const allProducts = [
      ...initialProducts, 
      ...additionalIPhones, 
      ...tvSubcategoryProducts, 
      ...generatedProducts,
      ...smartphoneProducts,
      ...gamingConsoleProducts,
      ...headphoneProducts
    ];
    
    // Remove duplicates (in case they already exist)
    const uniqueProducts = allProducts.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );

    // Update product images based on category, brand, and requested changes
    const updatedProducts = uniqueProducts.map(product => {
      // IMPORTANT: Update Chromebook image with the new image
      if (product.brand === "Google" && product.name.toLowerCase().includes("chromebook")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/42c20503-f943-4848-985f-0972f82629cc.png"
        };
      }
      
      // Keep the rest of the image assignment logic
      // Battlefield games get the first uploaded image
      if (product.name.toLowerCase().includes("battlefield")) {
        return {
          ...product,
          imageUrl: "/lovable-uploads/d496c5e1-cf2a-4e3a-ad70-e121a939a763.png",
          subcategory: "FPS Games"
        };
      }
      // Nintendo products get the third uploaded image
      else if (product.brand === "Nintendo" || product.name.toLowerCase().includes("nintendo") || product.name.toLowerCase().includes("switch")) {
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
