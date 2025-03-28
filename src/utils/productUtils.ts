
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
