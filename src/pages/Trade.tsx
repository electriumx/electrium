
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Product } from '../data/productData';
import { products as catalogProducts } from '../data/productData';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { convertNumericReviews } from '../utils/productUtils';

const Trade = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tradeForProducts, setTradeForProducts] = useState<Product[]>([]);
  const [secondSearchQuery, setSecondSearchQuery] = useState('');
  const [secondCategory, setSecondCategory] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter for max price difference of 40%
  const priceRangePercent = 40;

  // Get all product categories for filters
  const categories = ['all', ...new Set(
    allProducts.map(product => product.category)
  )];

  useEffect(() => {
    // Combine all products from both sources
    const additionalProducts = generateAdditionalProducts();
    const allAvailableProducts = [...catalogProducts, ...additionalProducts];
    
    // Ensure all products have the correct format
    const formattedProducts = allAvailableProducts.map(product => convertNumericReviews(product));
    
    setAllProducts(formattedProducts);
  }, []);

  // Filter first set of products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // When a product is selected, filter the trade-for options
  useEffect(() => {
    if (selectedProduct) {
      const basePrice = selectedProduct.price;
      const minPrice = basePrice * (1 - priceRangePercent/100);
      const maxPrice = basePrice * (1 + priceRangePercent/100);
      
      const eligibleProducts = allProducts.filter(product => {
        // Don't include the selected product in trade options
        if (product.id === selectedProduct.id) return false;
        
        // Filter by price range
        const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
        
        // Filter by search and category
        const matchesSearch = secondSearchQuery === '' || 
                             product.name.toLowerCase().includes(secondSearchQuery.toLowerCase()) || 
                             product.brand.toLowerCase().includes(secondSearchQuery.toLowerCase());
        const matchesCategory = secondCategory === 'all' || product.category === secondCategory;
        
        return inPriceRange && matchesSearch && matchesCategory;
      });
      
      setTradeForProducts(eligibleProducts);
    }
  }, [selectedProduct, secondSearchQuery, secondCategory, allProducts]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    toast({
      title: "Product Selected",
      description: `${product.name} selected for trade`,
    });
  };

  const handleTradeSubmit = (tradeProduct: Product) => {
    if (!selectedProduct) return;
    
    toast({
      title: "Trade Initiated",
      description: `Trading ${selectedProduct.name} for ${tradeProduct.name}`,
    });
    
    // In a real app, you would handle the trade logic here
    // For now, we'll just navigate to a confirmation page
    navigate('/payment?trade=true');
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
    setTradeForProducts([]);
    toast({
      title: "Selection Cleared",
      description: "Please select a new product to trade",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Trade Your Items</h1>
        <p className="text-muted-foreground">
          Select an item you want to trade, then choose another item within 40% of its value to trade for.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Your Item Selection */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Item</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProduct ? (
                <div className="flex flex-col items-center">
                  <img 
                    src={selectedProduct.imageUrl || selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-48 h-48 object-contain mb-4"
                  />
                  <h3 className="text-xl font-medium">{selectedProduct.name}</h3>
                  <p className="text-muted-foreground">{selectedProduct.brand}</p>
                  <p className="font-semibold text-lg mt-2">${selectedProduct.price.toFixed(2)}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={handleClearSelection}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Select Different Item
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="search">Search Products</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search"
                          type="search"
                          placeholder="Search by name or brand..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-40">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>
                              {cat === 'all' ? 'All Categories' : cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {!selectedProduct && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectProduct(product)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square flex items-center justify-center">
                      <img 
                        src={product.imageUrl || product.image} 
                        alt={product.name}
                        className="max-h-32 max-w-full object-contain"
                      />
                    </div>
                    <h3 className="font-medium text-sm mt-2 truncate">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Trade For Selection */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Trade For</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProduct ? (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="secondSearch">Search Products</Label>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="secondSearch"
                          type="search"
                          placeholder="Search by name or brand..."
                          className="pl-8"
                          value={secondSearchQuery}
                          onChange={(e) => setSecondSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="w-40">
                      <Label htmlFor="secondCategory">Category</Label>
                      <Select value={secondCategory} onValueChange={setSecondCategory}>
                        <SelectTrigger id="secondCategory">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>
                              {cat === 'all' ? 'All Categories' : cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Showing items within 40% of ${selectedProduct.price.toFixed(2)} (
                    ${(selectedProduct.price * 0.6).toFixed(2)} - ${(selectedProduct.price * 1.4).toFixed(2)})
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40">
                  <p className="text-muted-foreground">First select an item to trade</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {selectedProduct && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tradeForProducts.length > 0 ? (
                tradeForProducts.map(product => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleTradeSubmit(product)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square flex items-center justify-center">
                        <img 
                          src={product.imageUrl || product.image} 
                          alt={product.name}
                          className="max-h-32 max-w-full object-contain"
                        />
                      </div>
                      <h3 className="font-medium text-sm mt-2 truncate">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter className="p-2">
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => handleTradeSubmit(product)}
                      >
                        Trade 
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center h-40">
                  <p className="text-muted-foreground">No matching items found in this price range</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trade;
