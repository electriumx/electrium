import { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProductDetailModal from '@/components/ProductDetailModal';
import ProductFilters from '@/components/ProductFilters';
import { getProductImage } from '@/utils/productImageUtils';
import ProductReviewButton from '@/components/ProductReviewButton';
import { updateProductsData } from '@/utils/productImageUtils';

interface Review {
  name: string;
  rating: number;
  comment: string;
}

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [brands, setBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAdmin = false;
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  useEffect(() => {
    const updatedProducts = updateProductsData();
    setFilteredProducts(updatedProducts);
    setAllProducts(updatedProducts);
    
    const initialWishlist = localStorage.getItem('wishlist');
    if (initialWishlist) {
      setWishlist(JSON.parse(initialWishlist));
    }
    
    const initialMaxPrice = Math.max(...updatedProducts.map(p => p.price));
    setMaxPrice(initialMaxPrice);
    setPriceRange([0, initialMaxPrice]);
  }, []);
  
  useEffect(() => {
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    setCurrentProducts(filteredProducts.slice(firstIndex, lastIndex));
  }, [currentPage, filteredProducts]);
  
  useEffect(() => {
    const filtered = allProducts.filter(product => {
      const brandMatch = brands.length === 0 || brands.includes(product.brand);
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const subcategoryMatch = selectedSubcategories.length === 0 || selectedSubcategories.some(subcategory =>
        product.name.toLowerCase().includes(subcategory.toLowerCase()) ||
        product.category.toLowerCase().includes(subcategory.toLowerCase())
      );
      
      return brandMatch && searchMatch && priceMatch && subcategoryMatch;
    });
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [allProducts, brands, searchQuery, priceRange, selectedSubcategories]);
  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };
  
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleFilterChange = (brands: string[]) => {
    setBrands(brands);
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };
  
  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to add items to your cart"
      });
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`
    });
  };
  
  const handleWishlistToggle = (productId: number) => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to save items to your wishlist"
      });
      navigate('/login', { state: { from: '/products' } });
      return;
    }
    
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      toast({
        title: "Removed from wishlist",
        description: "This item has been removed from your wishlist"
      });
    } else {
      setWishlist([...wishlist, productId]);
      toast({
        title: "Added to wishlist",
        description: "This item has been saved to your wishlist"
      });
    }
  };
  
  const isInWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    console.log(`Product ${id} quantity updated to ${quantity}`);
  };

  const handleSubCategoryChange = (subcategories: string[]) => {
    setSelectedSubcategories(subcategories);
  };
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const emptyProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    brand: '',
    category: '',
    rating: 0,
    reviews: 0
  };
  
  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-6">
            <ProductFilters
              selectedBrands={brands}
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              maxPrice={maxPrice}
              onSearch={handleSearch}
              onSubCategoryChange={handleSubCategoryChange}
            />
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {currentProducts.length} of {filteredProducts.length} products
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-muted">
                    <img 
                      src={getProductImage(product.id, product.name, product.brand, product.category)} 
                      alt={product.name} 
                      className="object-cover w-full h-full cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    />
                  </div>
                  <div className="p-4">
                    <h3 
                      className="font-medium truncate cursor-pointer hover:text-primary"
                      onClick={() => handleProductClick(product)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.brand}</p>
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      <ProductReviewButton productId={product.id} productName={product.name} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex items-center gap-1"
                        onClick={() => handleWishlistToggle(product.id)}
                      >
                        {isInWishlist(product.id) ? (
                          <>
                            <Heart className="h-4 w-4 fill-destructive text-destructive" />
                            <span>Saved</span>
                          </>
                        ) : (
                          <>
                            <Heart className="h-4 w-4" />
                            <span>Wishlist</span>
                          </>
                        )}
                      </Button>
                      
                      <Button 
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <button
                  key={pageNumber}
                  className={`mx-1 px-4 py-2 rounded-md ${currentPage === pageNumber ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-muted'}`}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <ProductDetailModal
          product={selectedProduct || emptyProduct}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          onQuantityChange={handleQuantityChange}
          reviews={reviews}
        />
      </div>
    </div>
  );
};

export default Products;
