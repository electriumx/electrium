
interface ProductFiltersProps {
  selectedBrands: string[];
  onFilterChange: (brands: string[]) => void;
}

const ProductFilters = ({ selectedBrands, onFilterChange }: ProductFiltersProps) => {
  const brands = ["Apple", "Samsung", "Sony", "Google", "Microsoft", "Xiaomi", "Audio", "Accessories", "PlayStation", "PC Games"];
  
  return (
    <div className="p-4 rounded-lg bg-card shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Filter by Brand</h3>
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
  );
};

export default ProductFilters;
