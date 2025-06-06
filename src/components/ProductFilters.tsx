
import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubCategory {
  name: string;
  parent: string;
}

interface ProductFiltersProps {
  selectedBrands: string[];
  onFilterChange: (brands: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  onSearch: (query: string) => void;
  onSubCategoryChange?: (subcategories: string[]) => void;
  onClearFilters?: () => void;
}

const ProductFilters = ({
  selectedBrands,
  onFilterChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  onSearch,
  onSubCategoryChange,
  onClearFilters
}: ProductFiltersProps) => {
  const brands = ["Apple", "Samsung", "Sony", "Google", "Microsoft", "Xiaomi", "Audio", "PlayStation", "PC Games", "LG", "Whirlpool", "Dyson", "Bosch", "Panasonic"];
  const accessories = ["Headphones", "Cases", "Chargers", "Screen Protectors", "Cables", "Memory Cards", "Warranties", "Installation Kits"];
  const subcategories: Record<string, string[]> = {
    "Smartphones": ["iPhone", "Android", "Foldable"],
    "Laptops": ["Business", "Chromebook"],
    "Gaming Consoles": ["Home Console", "Portable", "Retro", "VR", "Accessories"],
    "TVs": ["OLED", "QLED", "LED", "Smart TV", "4K", "8K", "Budget"],
    "Headphones": ["Over-ear", "In-ear", "Wireless"],
    "PC Accessories": ["Keyboards", "Mice", "Monitors", "Webcams", "Microphones", "Speakers"],
    "Tablets": ["iOS", "Android", "Windows", "E-readers"],
    "Games": ["Action", "RPG", "Sports", "Simulation", "Racing"],
    "Microwaves": ["Countertop", "Built-in", "Smart"],
    "Washing Machines": ["Front Load", "Top Load", "Smart"],
    "Refrigerators": ["French Door", "Side-by-Side", "Top Freezer", "Bottom Freezer", "Mini"],
    "Smart Screens": ["Digital Frames", "Smart Displays", "Interactive Panels", "Digital Signage"],
    "Air Conditioners": ["Window", "Split", "Portable", "Central"],
    "Vacuum Cleaners": ["Robot", "Upright", "Canister", "Handheld", "Stick"]
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    setMaxPriceValue(maxPrice);
  }, [maxPrice]);

  useEffect(() => {
    // Check if any filters are active
    const filtersActive = selectedBrands.length > 0 || 
                          selectedSubcategories.length > 0 || 
                          priceRange[0] > 0 || 
                          priceRange[1] < maxPrice ||
                          searchQuery.trim() !== '';
    
    setHasActiveFilters(filtersActive);
  }, [selectedBrands, selectedSubcategories, priceRange, maxPrice, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePriceChange = (values: number[]) => {
    setMaxPriceValue(values[0]);
    onPriceRangeChange([0, values[0]]);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
    if (selectedCategory !== category) {
      setSelectedCategory(category);
    }
  };

  const handleSubcategoryClick = (subcategory: string) => {
    let newSelectedSubcategories = [...selectedSubcategories];
    if (newSelectedSubcategories.includes(subcategory)) {
      newSelectedSubcategories = newSelectedSubcategories.filter(sc => sc !== subcategory);
    } else {
      newSelectedSubcategories.push(subcategory);
    }
    setSelectedSubcategories(newSelectedSubcategories);
    if (onSubCategoryChange) {
      onSubCategoryChange(newSelectedSubcategories);
    }
  };

  const handleClearFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    }
    setSearchQuery('');
    setSelectedSubcategories([]);
  };

  // Function to capitalize first letter of each word and remove underscores
  const capitalizeWords = (text: string) => {
    return text
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const categories = Object.keys(subcategories);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-card shadow-md">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input 
            type="text" 
            placeholder="Search Products..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            className="pr-10" 
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div className="p-4 rounded-lg bg-card shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[maxPrice]} 
            value={[maxPriceValue]} 
            max={maxPrice} 
            step={10} 
            onValueChange={handlePriceChange} 
            className="mb-6" 
          />
          <div className="flex justify-between items-center">
            <div className="px-3 py-1 bg-secondary rounded-md">
              $0
            </div>
            <div className="text-muted-foreground">to</div>
            <div className="px-3 py-1 bg-secondary rounded-md">
              ${maxPriceValue}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-card shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map(category => (
            <div key={category} className="border-b border-border pb-2 last:border-0">
              <button 
                className="w-full flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors" 
                onClick={() => toggleCategory(category)}
              >
                <span className={`${selectedBrands.includes(category) ? 'text-sage-500 font-semibold' : ''}`}>
                  {capitalizeWords(category)}
                </span>
                {expandedCategories[category] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {expandedCategories[category] && subcategories[category] && (
                <div className="ml-4 mt-2 flex flex-col gap-1">
                  {subcategories[category].map(subcategory => (
                    <button 
                      key={subcategory} 
                      onClick={() => handleSubcategoryClick(subcategory)} 
                      className={`text-left p-1 text-sm rounded hover:bg-muted transition-colors ${selectedSubcategories.includes(subcategory) ? 'text-sage-500 font-semibold' : 'text-muted-foreground'}`}
                    >
                      {capitalizeWords(subcategory)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg bg-card shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">Brands</h3>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearFilters}
              className="flex items-center"
            >
              <X size={14} className="mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {brands.map(brand => (
            <button 
              key={brand} 
              onClick={() => {
                const newSelectedBrands = selectedBrands.includes(brand) ? selectedBrands.filter(b => b !== brand) : [...selectedBrands, brand];
                onFilterChange(newSelectedBrands);
              }} 
              className={`px-3 py-1 text-sm rounded-full transition-all ${selectedBrands.includes(brand) ? 'bg-sage-500 text-white' : 'bg-secondary text-foreground border border-border hover:bg-muted'}`}
            >
              {capitalizeWords(brand)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
