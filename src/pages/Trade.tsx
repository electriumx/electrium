
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ArrowRight, ArrowLeft, MapPin, Clock } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Product } from '../data/productData';
import { products as catalogProducts } from '../data/productData';
import { generateAdditionalProducts } from '../data/additionalProducts';
import { convertNumericReviews } from '../utils/productUtils';
import { format } from 'date-fns';
import { locationData, getLocationFee, calculateFastDeliveryFee } from '@/utils/locationData';

const Trade = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tradeForProducts, setTradeForProducts] = useState<Product[]>([]);
  const [secondSearchQuery, setSecondSearchQuery] = useState('');
  const [secondCategory, setSecondCategory] = useState('all');
  const [wantedItem, setWantedItem] = useState('');
  const [estimatedTradeValue, setEstimatedTradeValue] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Add location states
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState<{ name: string; fee: number }[]>([]);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [invalidTimeError, setInvalidTimeError] = useState('');

  // Filter for max price difference of 40%
  const priceRangePercent = 40;

  // Get all product categories for filters
  const categories = ['all', ...new Set(
    allProducts.map(product => product.category)
  )];
  
  // Get minimum allowed time (current time + 30 minutes)
  const getMinimumTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return format(now, "HH:mm");
  };

  useEffect(() => {
    // Combine all products from both sources
    const additionalProducts = generateAdditionalProducts();
    const allAvailableProducts = [...catalogProducts, ...additionalProducts];
    
    // Ensure all products have the correct format
    const formattedProducts = allAvailableProducts.map(product => convertNumericReviews(product));
    
    setAllProducts(formattedProducts);
    
    // Update cities based on selected country
    setCities(locationData[selectedCountry] || []);
  }, []);
  
  useEffect(() => {
    // Update cities when country changes
    setCities(locationData[selectedCountry] || []);
    setSelectedCity('');
  }, [selectedCountry]);

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
        
        // Filter by wanted item name if provided
        const matchesWanted = wantedItem === '' || 
                             product.name.toLowerCase().includes(wantedItem.toLowerCase());
        
        return inPriceRange && matchesSearch && matchesCategory && matchesWanted;
      });
      
      setTradeForProducts(eligibleProducts);
      
      // Update estimated trade value based on first product in filtered list
      if (eligibleProducts.length > 0) {
        setEstimatedTradeValue(eligibleProducts[0].price);
      } else {
        setEstimatedTradeValue(selectedProduct.price);
      }
    }
  }, [selectedProduct, secondSearchQuery, secondCategory, wantedItem, allProducts]);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    toast({
      title: "Product Selected",
      description: `${product.name} selected for trade`,
    });
  };

  const handleTradeSubmit = (tradeProduct: Product) => {
    if (!selectedProduct) return;
    
    if (selectedCity === '') {
      toast({
        variant: "destructive",
        title: "Missing Location",
        description: "Please select a delivery location",
      });
      return;
    }
    
    if (deliveryTime === '') {
      toast({
        variant: "destructive",
        title: "Missing Delivery Time",
        description: "Please select a delivery time",
      });
      return;
    }
    
    toast({
      title: "Trade Initiated",
      description: `Trading ${selectedProduct.name} for ${tradeProduct.name}. Delivery to ${selectedCity}, ${selectedCountry} at ${deliveryTime}`,
    });
    
    // Pass trade and delivery details to payment page
    navigate('/payment?trade=true', {
      state: {
        tradeDetails: {
          fromProduct: selectedProduct,
          toProduct: tradeProduct,
          location: {
            country: selectedCountry,
            city: selectedCity
          },
          deliveryTime: deliveryTime,
          deliveryFee: deliveryFee
        }
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedProduct(null);
    setTradeForProducts([]);
    toast({
      title: "Selection Cleared",
      description: "Please select a new product to trade",
    });
  };
  
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };
  
  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    updateDeliveryFee();
  };
  
  const handleDeliveryTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    setDeliveryTime(timeValue);
    
    // Validate that the time is at least 30 minutes from now
    const minimumTime = getMinimumTime();
    const isValid = timeValue >= minimumTime;
    
    if (!isValid) {
      setInvalidTimeError(`Time must be at least 30 minutes from now (${minimumTime} or later)`);
    } else {
      setInvalidTimeError('');
      updateDeliveryFee();
    }
  };
  
  const updateDeliveryFee = () => {
    if (selectedCity && deliveryTime) {
      const baseFee = 15; // Base express delivery fee
      const fee = calculateFastDeliveryFee(selectedCountry, selectedCity, baseFee);
      setDeliveryFee(fee);
    }
  };
  
  useEffect(() => {
    updateDeliveryFee();
  }, [selectedCity, deliveryTime]);

  const countries = Object.keys(locationData);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-foreground">
          Trade Your Items
        </h1>
        <p className="text-muted-foreground">
          Select an item you want to trade, then choose another item within 40% of its value to trade for.
        </p>
        <div className="mt-4 text-center">
          <span className="font-bold font-serif">Start Here</span> → Select Your Item → Choose Trade Item → Complete Trade
        </div>
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
                  {selectedProduct.selectedColor && (
                    <p className="text-sm mt-1">Color: {selectedProduct.selectedColor}</p>
                  )}
                  {selectedProduct.accessories && selectedProduct.accessories.length > 0 && (
                    <div className="mt-2 text-sm">
                      <p className="font-medium">Included Accessories:</p>
                      <ul className="list-disc list-inside">
                        {selectedProduct.accessories.map((acc, index) => (
                          <li key={index}>{acc.name} (+${acc.price.toFixed(2)})</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
                    {product.selectedColor && (
                      <p className="text-xs">Color: {product.selectedColor}</p>
                    )}
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
                  
                  <div>
                    <Label htmlFor="wantedItem">Looking For (Product Name)</Label>
                    <Input
                      id="wantedItem"
                      type="text"
                      placeholder="Enter specific product you want..."
                      value={wantedItem}
                      onChange={(e) => setWantedItem(e.target.value)}
                    />
                  </div>
                  
                  {/* Add delivery location selection */}
                  <div className="space-y-4 border border-border rounded-lg p-4 mt-4">
                    <h3 className="font-medium flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Delivery Location
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="trade-country">Country</Label>
                        <Select value={selectedCountry} onValueChange={handleCountryChange}>
                          <SelectTrigger id="trade-country">
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="trade-city">City</Label>
                        <Select 
                          value={selectedCity} 
                          onValueChange={handleCityChange}
                          disabled={!selectedCountry}
                        >
                          <SelectTrigger id="trade-city">
                            <SelectValue placeholder="Select City" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map(city => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name} (${city.fee.toFixed(2)} fee)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="delivery-time" className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Delivery Time (minimum 30 minutes from now)
                      </Label>
                      <Input
                        id="delivery-time"
                        type="time"
                        min={getMinimumTime()}
                        value={deliveryTime}
                        onChange={handleDeliveryTimeChange}
                        className="mt-1"
                      />
                      {invalidTimeError && (
                        <p className="text-sm text-destructive mt-1">{invalidTimeError}</p>
                      )}
                    </div>
                    
                    {selectedCity && deliveryTime && !invalidTimeError && (
                      <div className="bg-muted p-3 rounded">
                        <p className="text-sm font-medium">
                          Delivery to {selectedCity}, {selectedCountry} at {deliveryTime}
                        </p>
                        <p className="text-sm">
                          Delivery Fee: ${deliveryFee.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-1">Trade Details</h4>
                    <p className="text-sm mb-2">
                      Your item value: <span className="font-semibold">${selectedProduct.price.toFixed(2)}</span>
                    </p>
                    <p className="text-sm mb-2">
                      Acceptable range: ${(selectedProduct.price * 0.6).toFixed(2)} - ${(selectedProduct.price * 1.4).toFixed(2)}
                    </p>
                    <p className="text-sm font-medium">
                      Estimated Trade Value: ${estimatedTradeValue.toFixed(2)}
                    </p>
                    {deliveryFee > 0 && (
                      <p className="text-sm mt-2">
                        Delivery Fee: <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                      </p>
                    )}
                  </div>
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
                      {product.selectedColor && (
                        <p className="text-xs">Color: {product.selectedColor}</p>
                      )}
                      {product.accessories && product.accessories.length > 0 && (
                        <div className="mt-1 text-xs">
                          <p>Accessories: {product.accessories.length}</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-2">
                      <Button 
                        className="w-full" 
                        size="sm"
                        onClick={() => handleTradeSubmit(product)}
                        disabled={!selectedCity || !deliveryTime || !!invalidTimeError}
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
