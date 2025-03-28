
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
  const wheelProductIds = [1, 2, 4, 10, 17, 19];
  return wheelProductIds.includes(productId);
}

// Get discount expiration time - 24 hours instead of 34
export const getDiscountExpirationTime = (): number => {
  return 24 * 60 * 60 * 1000; // 24 hours in milliseconds
}
