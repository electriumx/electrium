interface ProductFiltersProps {
  selectedBrands: string[];
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
}

const ProductFilters = ({ selectedBrands, selectedBrand, onBrandSelect }: ProductFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {["Apple", "Samsung", "Sony"].map((brand) => (
        <button
          key={brand}
          onClick={() => onBrandSelect(brand)}
          className={`px-6 py-2 rounded-full transition-all ${
            selectedBrands.includes(brand) 
              ? 'bg-sage-500 text-white'
              : 'bg-card text-foreground hover:bg-accent'
          }`}
        >
          {brand} Devices
        </button>
      ))}
    </div>
  );
};

export default ProductFilters;
