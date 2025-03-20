
import { useState } from 'react';
import { Product } from '../data/productData';

export function useProductFilters(allProducts: Product[], maxPrice: number) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  const handleFilterChange = (brands: string[]) => {
    setSelectedBrands(brands);
  };
  
  const handleSubCategoryChange = (subcategories: string[]) => {
    setSelectedSubcategories(subcategories);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Apply all filters to product list
  const getFilteredProducts = () => {
    let filteredProducts = allProducts;
    
    if (selectedBrands.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        selectedBrands.includes(product.brand) || selectedBrands.includes(product.category)
      );
    }
    
    if (selectedSubcategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const productText = `${product.name} ${product.description}`.toLowerCase();
        return selectedSubcategories.some(subcategory => 
          productText.includes(subcategory.toLowerCase())
        );
      });
    }
    
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    return filteredProducts;
  };

  return {
    selectedBrands,
    selectedSubcategories,
    priceRange,
    searchQuery,
    handleFilterChange,
    handleSubCategoryChange,
    handlePriceRangeChange,
    handleSearch,
    getFilteredProducts
  };
}
