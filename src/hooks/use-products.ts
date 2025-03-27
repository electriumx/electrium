
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { products as initialProducts } from '@/data/productData';
import { generateAdditionalProducts } from '@/data/additionalProducts';
import { 
  generateSmartphoneProducts, 
  generateGamingConsoleProducts, 
  generateHeadphoneProducts,
  generatePCAccessoriesProducts,
  generateTabletProducts,
  generateGamesProducts,
  generateMicrowaveProducts,
  generateWashingMachineProducts,
  generateRefrigeratorProducts
} from '@/utils/productGenerators';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Combine all products from different sources
    const allProducts = [
      ...initialProducts,
      ...generateAdditionalProducts(),
      ...generateSmartphoneProducts(),
      ...generateGamingConsoleProducts(),
      ...generateHeadphoneProducts(),
      ...generatePCAccessoriesProducts(),
      ...generateTabletProducts(),
      ...generateGamesProducts(),
      ...generateMicrowaveProducts(),
      ...generateWashingMachineProducts(),
      ...generateRefrigeratorProducts()
    ];

    // Create a map to deduplicate products by ID
    const productMap = new Map<number, Product>();
    allProducts.forEach(product => {
      // Apply special image URLs for specific products
      if (product.name.toLowerCase().includes('vankyo cosmos 6')) {
        product.imageUrl = '/lovable-uploads/5d027cd9-133c-4fb3-9cfa-fd6de305cd63.png';
      } else if (product.category === 'PC Accessories' && product.subcategory === 'Keyboards') {
        product.imageUrl = '/lovable-uploads/2d37dabc-ed4e-4de1-bc85-32c8c2efe88c.png';
      } else if (product.category === 'Tablets') {
        product.imageUrl = '/lovable-uploads/13233859-ad6b-4338-b9aa-5e3ab58c9eb7.png';
      }
      
      productMap.set(product.id, product);
    });

    // Convert the map back to an array
    const uniqueProducts = Array.from(productMap.values());
    
    setProducts(uniqueProducts);
    setIsLoading(false);
  }, []);

  return { products, isLoading };
};
