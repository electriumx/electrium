import { Product, Review } from '../data/productData';

// Convert number reviews to proper Review array format
export const convertNumericReviews = (product: Product): Product => {
  // Handle case where reviews is a number
  if (typeof product.reviews === 'number') {
    // Create empty reviews array
    product.reviews = [] as Review[];
  }
  
  // Ensure reviews is always an array
  if (!product.reviews) {
    product.reviews = [] as Review[];
  }
  
  return product;
};

// Make sure number value is converted to array for reviews
export const ensureProductsReviewsFormat = (products: Product[]): Product[] => {
  return products.map(product => convertNumericReviews(product));
};

// Convert legacy accessory format to include 'selected' property
export const ensureAccessoriesFormat = (products: Product[]): Product[] => {
  return products.map(product => {
    if (product.accessories) {
      product.accessories = product.accessories.map(acc => {
        if (acc.selected === undefined) {
          return {
            ...acc,
            selected: false
          };
        }
        return acc;
      });
    }
    return product;
  });
};

// Check if a product should have a discount based on the SpinWheel
export const shouldApplyDiscount = (productId: number): boolean => {
  // Products to be shown under the wheel - can be customized as needed
  const wheelProductIds = []; // Emptied the array to remove all discounts
  return wheelProductIds.includes(productId);
}

// Get discount expiration time - 24 hours instead of 34
export const getDiscountExpirationTime = (): number => {
  return 24 * 60 * 60 * 1000; // 24 hours in milliseconds
}

// Filter out specific products from categories
export const filterRestrictedProducts = (products: Product[]): Product[] => {
  return products.filter(product => {
    // Filter out "Nintendo Switch Lite" from Vacuum Cleaners, Smart Screens, and Refrigerators
    if (product.name === "Nintendo Switch Lite" && 
        (product.category === "Vacuum Cleaners" || 
         product.category === "Smart Screens" ||
         product.category === "Refrigerators")) {
      return false;
    }
    
    // Filter out "Nintendo Switch" from the "Handheld" subcategory in "Vacuum Cleaners"
    if (product.name.toLowerCase().includes("nintendo switch") && 
        product.category === "Vacuum Cleaners" && 
        product.subcategory === "Handheld") {
      return false;
    }
    
    // Filter out "PlayStation 1" products
    if (product.name.toLowerCase().includes("playstation 1")) {
      return false;
    }
    
    // Filter out multiple Battlefield versions (keep only one)
    if (product.name.toLowerCase().includes("battlefield")) {
      // Keep only the generic "Battlefield" or the newest version
      if (product.name.toLowerCase().match(/battlefield\s+[2-5]/)) {
        return false;
      }
    }
    
    return true;
  });
};
