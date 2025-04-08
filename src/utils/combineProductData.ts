
import { Product } from '../data/productData';
import { products } from '../data/productData';
import { allNewProducts } from '../data/newProducts';
import { allAdditionalProducts } from '../data/additionalNewProducts';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { refrigeratorProducts } from '../data/refrigeratorProducts';
import { additionalCategoryProducts } from '../data/additionalCategoryProducts';

// Combine all product data sources into a single array
export const combineAllProducts = (): Product[] => {
  // Start with the base products
  const combinedProducts: Product[] = [...products];
  
  // Add products from newProducts
  combinedProducts.push(...allNewProducts);
  
  // Add products from additionalNewProducts
  combinedProducts.push(...allAdditionalProducts);
  
  // Add products from additionalProducts
  combinedProducts.push(...generateAdditionalProducts());
  
  // Add refrigerator products
  combinedProducts.push(...refrigeratorProducts);
  
  // Add additional category products
  combinedProducts.push(...additionalCategoryProducts);
  
  // Remove any duplicates by ID
  const uniqueProducts = combinedProducts.filter((product, index, self) => 
    index === self.findIndex(p => p.id === product.id)
  );
  
  return uniqueProducts;
};

// Get all products by category
export const getProductsByCategory = (categoryName: string): Product[] => {
  const allProducts = combineAllProducts();
  return allProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase()
  );
};

// Get all available categories
export const getAllCategories = (): string[] => {
  const allProducts = combineAllProducts();
  const categories = [...new Set(allProducts.map(product => product.category))];
  return categories.sort();
};

// Check if a category has enough products (at least 15)
export const hasSufficientProducts = (categoryName: string): boolean => {
  return getProductsByCategory(categoryName).length >= 15;
};

// Get counts of products by category
export const getProductCountsByCategory = (): Record<string, number> => {
  const allProducts = combineAllProducts();
  const counts: Record<string, number> = {};
  
  allProducts.forEach(product => {
    const category = product.category;
    counts[category] = (counts[category] || 0) + 1;
  });
  
  return counts;
};
