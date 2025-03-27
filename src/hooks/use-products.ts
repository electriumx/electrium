
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
      productMap.set(product.id, product);
    });

    // Convert the map back to an array
    const uniqueProducts = Array.from(productMap.values());
    
    setProducts(uniqueProducts);
    setIsLoading(false);
  }, []);

  return { products, isLoading };
};
