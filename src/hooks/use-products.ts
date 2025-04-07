
import { useEffect, useState } from "react";
import { Product } from "@/data/productData";
import { allNewProducts } from "@/data/newProducts";
import { allRefrigeratorProducts } from "@/data/refrigeratorProducts";
import { allAdditionalProducts } from "@/data/additionalNewProducts";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Combine all product sources
        const allProducts = [...allNewProducts, ...allRefrigeratorProducts, ...allAdditionalProducts];
        
        // Initialize product stocks in localStorage if not already set
        const productStocks = JSON.parse(localStorage.getItem('productStocks') || '{}');
        
        allProducts.forEach(product => {
          if (productStocks[product.id] === undefined) {
            productStocks[product.id] = Math.floor(Math.random() * 50) + 1;
          }
        });
        
        localStorage.setItem('productStocks', JSON.stringify(productStocks));
        
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return { products, filteredProducts, setFilteredProducts, loading, error };
};
