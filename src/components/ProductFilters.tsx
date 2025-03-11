
import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  selectedBrands: string[];
  onFilterChange: (brands: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  onSearch: (query: string) => void;
}

const ProductFilters = ({ 
  selectedBrands, 
  onFilterChange, 
  priceRange, 
  onPriceRangeChange, 
  maxPrice,
  onSearch 
}: ProductFiltersProps) => {
  const brands = ["Apple", "Samsung", "Sony", "Google", "Microsoft", "Xiaomi", "Audio", "PlayStation", "PC Games"];
  const accessories = ["Headphones", "Cases", "Chargers", "Screen Protectors", "Cables", "Memory Cards"];
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePriceChange = (values: number[]) => {
    onPriceRangeChange([values[0], values[1]]);
  };
  
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="p-4 rounded-lg bg-card shadow-md">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Price Range Filter */}
      <div className="p-4 rounded-lg bg-card shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, maxPrice]}
            value={[priceRange[0], priceRange[1]]}
            max={maxPrice}
            step={10}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex justify-between items-center">
            <div className="px-3 py-1 bg-secondary rounded-md">
              ${priceRange[0]}
            </div>
            <div className="text-muted-foreground">to</div>
            <div className="px-3 py-1 bg-secondary rounded-md">
              ${priceRange[1]}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="p-4 rounded-lg bg-card shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Brands</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                const newSelectedBrands = selectedBrands.includes(brand)
                  ? selectedBrands.filter(b => b !== brand)
                  : [...selectedBrands, brand];
                onFilterChange(newSelectedBrands);
              }}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedBrands.includes(brand) 
                  ? 'bg-sage-500 text-white'
                  : 'bg-secondary text-foreground border border-border hover:bg-muted'
              }`}
            >
              {brand}
            </button>
          ))}
          {selectedBrands.length > 0 && (
            <button
              onClick={() => onFilterChange([])}
              className="px-3 py-1 text-sm rounded-full bg-muted-foreground/20 text-foreground hover:bg-muted-foreground/30 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Accessories Filter */}
      <div className="p-4 rounded-lg bg-card shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Accessories</h3>
        <div className="flex flex-wrap gap-2">
          {accessories.map((accessory) => (
            <button
              key={accessory}
              onClick={() => {
                const newSelectedBrands = selectedBrands.includes(accessory)
                  ? selectedBrands.filter(b => b !== accessory)
                  : [...selectedBrands, accessory];
                onFilterChange(newSelectedBrands);
              }}
              className={`px-3 py-1 text-sm rounded-full transition-all ${
                selectedBrands.includes(accessory) 
                  ? 'bg-sage-500 text-white'
                  : 'bg-secondary text-foreground border border-border hover:bg-muted'
              }`}
            >
              {accessory}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
