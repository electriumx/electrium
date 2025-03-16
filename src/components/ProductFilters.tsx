import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

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
}

const ProductFilters = ({ 
  selectedBrands, 
  onFilterChange, 
  priceRange, 
  onPriceRangeChange, 
  maxPrice,
  onSearch,
  onSubCategoryChange
}: ProductFiltersProps) => {
  const brands = ["Apple", "Samsung", "Sony", "Google", "Microsoft", "Xiaomi", "Audio", "PlayStation", "PC Games", "LG", "Whirlpool", "Dyson", "Bosch", "Panasonic"];
  
  const accessories = ["Headphones", "Cases", "Chargers", "Screen Protectors", "Cables", "Memory Cards", "Warranties", "Installation Kits"];
  
  const subcategories: Record<string, string[]> = {
    "Smartphones": ["iPhone", "Android", "Foldable", "Budget", "Premium", "Camera-focused", "Battery-focused"],
    "Laptops": ["Gaming", "Business", "Ultrabook", "2-in-1", "Budget", "Premium", "Chromebook"],
    "Gaming Consoles": ["Home Console", "Portable", "Retro", "VR", "Accessories"],
    "TVs": ["OLED", "QLED", "LED", "Smart TV", "4K", "8K", "Budget"],
    "Headphones": ["Over-ear", "In-ear", "Wireless", "Noise-cancelling", "Gaming", "Sports"],
    "PC Accessories": ["Keyboards", "Mice", "Monitors", "Webcams", "Microphones", "Speakers"],
    "Tablets": ["iOS", "Android", "Windows", "E-readers", "Budget", "Premium"],
    "Games": ["Action", "RPG", "Strategy", "Sports", "Simulation", "Racing", "Puzzle"],
    "Microwaves": ["Countertop", "Built-in", "Convection", "Smart", "Compact"],
    "Washing Machines": ["Front Load", "Top Load", "Compact", "Smart", "Commercial"],
    "Refrigerators": ["French Door", "Side-by-Side", "Top Freezer", "Bottom Freezer", "Mini", "Smart"],
    "Smart Screens": ["Digital Frames", "Smart Displays", "Interactive Panels", "Digital Signage"],
    "Air Conditioners": ["Window", "Split", "Portable", "Central", "Smart"],
    "Vacuum Cleaners": ["Robot", "Upright", "Canister", "Handheld", "Stick"]
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [maxPriceValue, setMaxPriceValue] = useState(maxPrice);
  
  useEffect(() => {
    if (priceRange[1] === 0 || priceRange[1] === maxPrice) {
      onPriceRangeChange([0, maxPrice]);
    }
  }, [maxPrice]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handlePriceChange = (values: number[]) => {
    setMaxPriceValue(values[1]);
    onPriceRangeChange([0, values[1]]);
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
  
  const categories = Object.keys(subcategories);
  
  return (
    <div className="space-y-4">
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

      <div className="p-4 rounded-lg bg-card shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, maxPrice]}
            value={[0, priceRange[1]]}
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
          {categories.map((category) => (
            <div key={category} className="border-b border-border pb-2 last:border-0">
              <button
                className="w-full flex justify-between items-center p-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => toggleCategory(category)}
              >
                <span className={`${selectedBrands.includes(category) ? 'text-sage-500 font-semibold' : ''}`}>
                  {category}
                </span>
                {expandedCategories[category] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              
              {expandedCategories[category] && subcategories[category] && (
                <div className="ml-4 mt-2 flex flex-col gap-1">
                  {subcategories[category].map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={() => handleSubcategoryClick(subcategory)}
                      className={`text-left p-1 text-sm rounded hover:bg-muted transition-colors ${
                        selectedSubcategories.includes(subcategory) 
                          ? 'text-sage-500 font-semibold'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
