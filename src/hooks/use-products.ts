import { useState, useEffect } from 'react';
import { Product, Review } from '../data/productData';
import { products as productList } from '../data/productData';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { generateNewProducts } from '../data/newProducts';

// Fix any product data entries that use number instead of Review[]
const createEmptyReviewArray = (count: number): Review[] => {
  return Array(count).fill({
    userName: "Customer",
    rating: 5,
    comment: "Great product!",
    date: new Date().toISOString().split('T')[0]
  });
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Combine product lists
        let combinedProducts = [...productList, ...generateAdditionalProducts(), ...generateNewProducts()];

        // When processing products, ensure all required properties exist
        const processProducts = (rawProducts: any[]): Product[] => {
          return rawProducts.map(product => {
            // Convert number reviews to Review[] if needed
            let reviews = product.reviews;
            if (typeof reviews === 'number') {
              reviews = createEmptyReviewArray(reviews);
            }

            // Ensure required properties exist
            return {
              ...product,
              reviews,
              colors: product.colors || ["Default"],
              stockStatus: product.stockStatus || "In Stock",
              image: product.image || product.imageUrl || "",
              imageUrl: product.imageUrl || product.image || "",
              // Map subcategory references to be safe
              ...(product.subcategory && { subcategory: product.subcategory })
            };
          });
        };

        combinedProducts = processProducts(combinedProducts);

        setProducts(combinedProducts);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
