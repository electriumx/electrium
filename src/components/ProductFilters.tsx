
interface ProductFiltersProps {
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}

const ProductFilters = ({ selectedBrand, onBrandSelect }: ProductFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {["Apple", "Samsung", "Sony"].map((brand) => (
        <button
          key={brand}
          onClick={() => onBrandSelect(selectedBrand === brand ? null : brand)}
          className={`px-6 py-2 rounded-full transition-all ${
            selectedBrand === brand 
              ? 'bg-[#9eff00] text-black'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {brand} Devices
        </button>
      ))}
    </div>
  );
};

export default ProductFilters;
