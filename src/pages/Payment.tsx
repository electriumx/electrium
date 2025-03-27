import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  Edit,
  Trash,
  ChevronDown,
  ChevronRight,
  Search
} from "lucide-react";
import { Product } from '../data/productData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { applyCoupon } from '@/components/admin/CouponUtils';
import { useToast } from '@/hooks/use-toast';

interface SavedCard {
  id: string;
  name: string;
  number: string;
  expiry: string;
  default?: boolean;
}

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showCardForm, setShowCardForm] = useState(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [discounts, setDiscounts] = useState<Record<string, number>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>('items');
  const [deliveryOption, setDeliveryOption] = useState('normal');
  const [deliveryTime, setDeliveryTime] = useState('standard');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [tradeItems, setTradeItems] = useState<string[]>([]);
  const [selectedTradeItem, setSelectedTradeItem] = useState('');
  const [tradeValue, setTradeValue] = useState(0);
  const [tradeDescription, setTradeDescription] = useState('');
  const [tradeItemCondition, setTradeItemCondition] = useState('good');
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const shipping = calculateShipping();
    const deliveryFee = paymentMethod === 'cash' ? getDeliveryFee() : 0;
    
    const couponDiscountAmount = couponDiscount / 100 * subtotal;
    const tradeDiscount = paymentMethod === 'trade' ? calculateTradeDiscount() : 0;
    
    return subtotal + tax + shipping + deliveryFee - couponDiscountAmount - tradeDiscount;
  };

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
    
    const savedCardsData = localStorage.getItem('savedCards');
    if (savedCardsData) {
      try {
        const parsedCards = JSON.parse(savedCardsData);
        setSavedCards(parsedCards);
        
        const defaultCard = parsedCards.find((card: SavedCard) => card.default);
        if (defaultCard) {
          setSelectedCard(defaultCard.id);
          setShowCardForm(false);
        }
      } catch (error) {
        console.error('Error parsing saved cards:', error);
      }
    }
    
    const addressesData = localStorage.getItem('savedAddresses');
    if (addressesData) {
      try {
        const parsedAddresses = JSON.parse(addressesData);
        setSavedAddresses(parsedAddresses);
        
        if (parsedAddresses.length > 0) {
          setSelectedAddress(parsedAddresses[0]);
          setShowAddressForm(false);
        }
      } catch (error) {
        console.error('Error parsing saved addresses:', error);
      }
    }
    
    const discountsData = localStorage.getItem('discounts');
    if (discountsData) {
      try {
        const parsedDiscounts = JSON.parse(discountsData);
        const formattedDiscounts: Record<string, number> = {};
        Object.entries(parsedDiscounts).forEach(([brand, data]) => {
          if (typeof data === 'object' && data !== null && 'value' in data && 'expiresAt' in data) {
            const { value, expiresAt } = data as { value: number, expiresAt: number };
            if (expiresAt > Date.now()) {
              formattedDiscounts[brand] = value;
            }
          }
        });
        setDiscounts(formattedDiscounts);
      } catch (error) {
        console.error('Error parsing discounts:', error);
      }
    }
    
    const productsData = localStorage.getItem('products');
    if (productsData) {
      try {
        const parsedProducts = JSON.parse(productsData);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error parsing products:', error);
      }
    }
    
    window.scrollTo(0, 0);
    
    updateEstimatedDeliveryTime();
  }, []);

  useEffect(() => {
    updateEstimatedDeliveryTime();
  }, [deliveryOption, deliveryTime, deliveryLocation]);

  const updateEstimatedDeliveryTime = () => {
    let baseTime = '';
    
    if (deliveryOption === 'normal') {
      baseTime = '1-3 days';
    } else if (deliveryOption === 'fast') {
      if (deliveryTime === 'standard') {
        baseTime = '45-90 minutes';
      } else if (deliveryTime === 'express') {
        baseTime = '30-45 minutes';
      } else if (deliveryTime === 'priority') {
        baseTime = '15-30 minutes';
      }
      
      if (deliveryLocation.length > 30) {
        if (deliveryTime === 'standard') {
          baseTime = '60-120 minutes';
        } else if (deliveryTime === 'express') {
          baseTime = '45-60 minutes';
        } else if (deliveryTime === 'priority') {
          baseTime = '30-45 minutes';
        }
      }
    }
    
    setEstimatedDeliveryTime(baseTime);
  };

  const getDiscountedPrice = (item: Product) => {
    if (!item.brand) return item.price;
    
    const discount = discounts[item.brand] || discounts['All'] || 0;
    if (discount === 0) return item.price;
    
    return item.price * (1 - discount / 100);
  };

  const calculateItemTotal = (item: Product) => {
    const itemPrice = getDiscountedPrice(item);
    
    let accessoriesPrice = 0;
    if (item.accessories) {
      accessoriesPrice = item.accessories
        .filter(acc => acc.selected)
        .reduce((sum, acc) => sum + acc.price, 0);
    }
    
    return (itemPrice + accessoriesPrice) * item.quantity;
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 100 ? 0 : 10;
  };

  const getDeliveryFee = () => {
    if (deliveryOption === 'normal') {
      return 5;
    } else if (deliveryOption === 'fast') {
      let baseFee = 15;
      
      if (deliveryTime === 'express') {
        baseFee = 20;
      } else if (deliveryTime === 'priority') {
        baseFee = 30;
      }
      
      if (deliveryLocation.length > 30) {
        baseFee += 5;
      }
      
      return baseFee;
    }
    return 0;
  };

  const calculateTradeDiscount = () => {
    return tradeValue;
  };

  const handleAddTradeItem = () => {
    if (selectedTradeItem && !tradeItems.includes(selectedTradeItem)) {
      setTradeItems([...tradeItems, selectedTradeItem]);
      setSelectedTradeItem('');
      setSearchValue('');
      setSearchResults([]);
    }
  };

  const handleRemoveTradeItem = (item: string) => {
    setTradeItems(tradeItems.filter(i => i !== item));
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    const mainCategory = cart.length > 0 ? cart[0].category : undefined;
    
    const { valid, discount } = applyCoupon(couponCode, mainCategory);
    
    if (valid) {
      setAppliedCoupon(couponCode);
      setCouponDiscount(discount);
      toast({
        title: "Coupon Applied",
        description: `${couponCode} - ${discount}% discount applied successfully!`,
      });
    } else {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      toast({
        title: "Invalid Coupon",
        description: "This coupon is invalid or cannot be applied to your current purchase.",
        variant: "destructive",
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchValue(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const productNames = products.length > 0 
      ? products.map((p: any) => p.name) 
      : [
          "iPhone 13", "Samsung Galaxy S21", "Google Pixel 6", "OnePlus 9",
          "MacBook Pro", "Dell XPS 13", "HP Spectre", "Lenovo ThinkPad",
          "iPad Pro", "Samsung Galaxy Tab", "Amazon Fire HD", "Microsoft Surface",
          "AirPods Pro", "Sony WH-1000XM4", "Bose QuietComfort", "Jabra Elite",
          "Apple Watch", "Samsung Galaxy Watch", "Fitbit Versa", "Garmin Forerunner"
        ];
    
    const filteredResults = productNames.filter(name => 
      name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };

  const handleCardSelection = (cardId: string) => {
    setSelectedCard(cardId);
    setShowCardForm(false);
  };

  const handleAddNewCard = () => {
    setSelectedCard(null);
    setShowCardForm(true);
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCVV('');
  };

  const handleAddressSelection = (address: string) => {
    setSelectedAddress(address);
    setShowAddressForm(false);
  };

  const handleAddNewAddress = () => {
    setSelectedAddress(null);
    setShowAddressForm(true);
    setBillingAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    });
  };

  const formatCardNumber = (input: string) => {
    const digits = input.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < digits.length; i += 4) {
      formatted += digits.slice(i, i + 4) + ' ';
    }
    return formatted.trim();
  };

  const formatExpiry = (input: string) => {
    const digits = input.replace(/\D/g, '');
    if (digits.length > 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    } else if (digits.length > 0) {
      return digits;
    }
    return '';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardExpiry(formatted.substring(0, 5));
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields based on payment method
    if (paymentMethod === 'card' && showCardForm) {
      if (!cardName || !cardNumber || !cardExpiry || !cardCVV) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all card details"
        });
        return;
      }
    } else if (paymentMethod === 'cash') {
      if (deliveryOption === 'fast' && !deliveryLocation) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please provide delivery location details"
        });
        return;
      }
    } else if (paymentMethod === 'trade') {
      if (tradeItems.length === 0) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please add at least one item to trade"
        });
        return;
      }
      
      if (!tradeDescription || !tradeValue) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please provide item description and trade value"
        });
        return;
      }
    }
    
    // Validate billing address
    if (showAddressForm) {
      const { name, street, city, state, zip, country } = billingAddress;
      if (!name || !street || !city || !state || !zip || !country) {
        toast({
          variant: "destructive",
          title: "Missing Information",
          description: "Please fill in all billing address fields"
        });
        return;
      }
    }
    
    setProcessingPayment(true);
    
    if (paymentMethod === 'card' && saveCard && showCardForm) {
      const newCard: SavedCard = {
        id: Date.now().toString(),
        name: cardName,
        number: cardNumber,
        expiry: cardExpiry,
        default: isDefault
      };
      
      const updatedCards = [...savedCards];
      
      if (isDefault) {
        updatedCards.forEach(card => card.default = false);
      }
      
      updatedCards.push(newCard);
      setSavedCards(updatedCards);
      localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    } else if (paymentMethod === 'cash') {
      localStorage.setItem('deliveryPreferences', JSON.stringify({
        option: deliveryOption,
        time: deliveryTime,
        location: deliveryLocation,
        estimatedTime: estimatedDeliveryTime
      }));
    } else if (paymentMethod === 'trade') {
      localStorage.setItem('tradePreferences', JSON.stringify({
        items: tradeItems,
        value: tradeValue,
        condition: tradeItemCondition
      }));
    }
    
    if (showAddressForm) {
      const addressString = `${billingAddress.name}, ${billingAddress.street}, ${billingAddress.city}, ${billingAddress.state} ${billingAddress.zip}, ${billingAddress.country}`;
      
      if (!savedAddresses.includes(addressString)) {
        const updatedAddresses = [...savedAddresses, addressString];
        setSavedAddresses(updatedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
      }
    }
    
    setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify([]));
      navigate('/payment-success');
    }, 2000);
  };

  const toggleSectionExpansion = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Complete Your Payment</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-7/12 space-y-6">
          <div className="lg:hidden mb-6">
            <div 
              className="bg-card p-4 rounded-lg border border-border flex justify-between items-center cursor-pointer"
              onClick={() => toggleSectionExpansion('items')}
            >
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="flex items-center">
                <span className="font-bold mr-2">${calculateTotal().toFixed(2)}</span>
                {expandedSection === 'items' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </div>
            </div>
            
            {expandedSection === 'items' && (
              <div className="mt-2 p-4 bg-card rounded-lg border border-border">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex-shrink-0 w-16 h-16 bg-muted rounded overflow-hidden">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-semibold">${calculateItemTotal(item).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-destructive">
                      <span>Discount ({appliedCoupon})</span>
                      <span>-${(couponDiscount / 100 * calculateSubtotal()).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            
            <Tabs defaultValue="card" onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="cash">Cash on Delivery</TabsTrigger>
                <TabsTrigger value="trade">Item Trading</TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="space-y-6">
                {savedCards.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Saved Cards</h3>
                    
                    <RadioGroup value={selectedCard || ''} onValueChange={handleCardSelection} className="space-y-3">
                      {savedCards.map(card => (
                        <div key={card.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={card.id} id={card.id} />
                          <Label htmlFor={card.id} className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{card.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  •••• {card.number.slice(-4)} • Expires {card.expiry}
                                </p>
                              </div>
                              {card.default && (
                                <span className="text-xs bg-muted px-2 py-1 rounded-full">Default</span>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleAddNewCard}
                      className="w-full"
                    >
                      + Add New Card
                    </Button>
                  </div>
                )}
                
                {showCardForm && (
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Cardholder Name</Label>
                      <Input 
                        id="card-name" 
                        placeholder="John Doe" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <Input 
                          id="card-number" 
                          placeholder="1234 5678 9012 3456" 
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          required
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="w-1/2 space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY" 
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          required
                        />
                      </div>
                      
                      <div className="w-1/2 space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123" 
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').substring(0, 3))}
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="save-card" 
                          checked={saveCard}
                          onCheckedChange={setSaveCard}
                        />
                        <Label htmlFor="save-card">Save card for future purchases</Label>
                      </div>
                      
                      {saveCard && (
                        <div className="flex items-center space-x-2 ml-6">
                          <Switch 
                            id="default-card" 
                            checked={isDefault}
                            onCheckedChange={setIsDefault}
                          />
                          <Label htmlFor="default-card">Set as default payment method</Label>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </TabsContent>
              
              <TabsContent value="cash" className="space-y-4">
                <p className="text-muted-foreground mb-4">Choose your delivery speed and provide your location details.</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="delivery-option">Delivery Option</Label>
                    <RadioGroup 
                      value={deliveryOption} 
                      onValueChange={setDeliveryOption}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="normal" id="normal" />
                        <Label htmlFor="normal" className="cursor-pointer">
                          <div>
                            <p className="font-medium">Normal Delivery (1-3 days)</p>
                            <p className="text-sm text-muted-foreground">$5.00 delivery fee</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fast" id="fast" />
                        <Label htmlFor="fast" className="cursor-pointer">
                          <div>
                            <p className="font-medium">Fast Delivery</p>
                            <p className="text-sm text-muted-foreground">Fees vary based on urgency</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {deliveryOption === 'fast' && (
                    <div className="space-y-2 pl-6">
                      <Label htmlFor="delivery-time">Delivery Time Preference</Label>
                      <RadioGroup 
                        value={deliveryTime} 
                        onValueChange={setDeliveryTime}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <div>
                              <p className="font-medium">Standard (45-90 min)</p>
                              <p className="text-sm text-muted-foreground">${getDeliveryFee()} delivery fee</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer">
                            <div>
                              <p className="font-medium">Express (30-45 min)</p>
                              <p className="text-sm text-muted-foreground">${deliveryTime === 'express' ? getDeliveryFee() : 20} delivery fee</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="priority" id="priority" />
                          <Label htmlFor="priority" className="cursor-pointer">
                            <div>
                              <p className="font-medium">Priority (15-30 min)</p>
                              <p className="text-sm text-muted-foreground">${deliveryTime === 'priority' ? getDeliveryFee() : 30} delivery fee</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="delivery-location">Delivery Notes</Label>
                    <Input 
                      id="delivery-location" 
                      placeholder="Apartment number, access codes, or special instructions" 
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                    />
                  </div>
                  
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Estimated Delivery Time:</strong> {estimatedDeliveryTime}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Note:</strong> Payment will be collected upon delivery. Please have the exact amount ready.
                      Minimum delivery time depends on your location and selected options.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trade" className="space-y-4">
                <p className="text-muted-foreground mb-4">Trade in your items for store credit to use with this purchase.</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trade-item-input">Item to Trade</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input 
                          id="trade-item-input" 
                          placeholder="PlayStation 4, iPhone 12, etc."
                          value={searchValue}
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                        {searchResults.length > 0 && (
                          <div className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                            {searchResults.map((result, idx) => (
                              <div 
                                key={idx} 
                                className="px-4 py-2 hover:bg-accent cursor-pointer"
                                onClick={() => {
                                  setSelectedTradeItem(result);
                                  setSearchValue(result);
                                  setSearchResults([]);
                                }}
                              >
                                {result}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button 
                        onClick={handleAddTradeItem}
                        type="button"
                        disabled={!selectedTradeItem}
                      >
                        Add
                      </Button>
                    </div>
                    {selectedTradeItem && (
                      <p className="text-sm text-green-500 mt-1">
                        Selected: {selectedTradeItem} (In Stock: Yes)
                      </p>
                    )}
                  </div>
                  
                  {tradeItems.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Trade Items</Label>
                      <div className="space-y-2">
                        {tradeItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                            <span>{item}</span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveTradeItem(item)}
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="trade-description">Item Description</Label>
                    <Input 
                      id="trade-description" 
                      placeholder="Details about the items you're trading"
                      value={tradeDescription}
                      onChange={(e) => setTradeDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trade-condition">Item Condition</Label>
                    <RadioGroup 
                      value={tradeItemCondition} 
                      onValueChange={setTradeItemCondition}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="like-new" id="like-new" />
                        <Label htmlFor="like-new">Like New</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="good" id="good" />
                        <Label htmlFor="good">Good</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fair" id="fair" />
                        <Label htmlFor="fair">Fair</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="poor" id="poor" />
                        <Label htmlFor="poor">Poor</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trade-value">Estimated Trade Value ($)</Label>
                    <Input 
                      id="trade-value" 
                      type="number"
                      placeholder="0.00"
                      value={tradeValue.toString()}
                      onChange={(e) => setTradeValue(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> After placing your order, you'll receive instructions for sending or dropping off your trade items. 
                      Final trade value will be determined upon inspection.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
            
            {savedAddresses.length > 0 && (
              <div className="space-y-4 mb-6">
                <RadioGroup value={selectedAddress || ''} onValueChange={handleAddressSelection} className="space-y-3">
                  {savedAddresses.map((address, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={address} id={`address-${index}`} />
                      <Label htmlFor={`address-${index}`} className="cursor-pointer">
                        {address}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <Button 
                  variant="outline" 
                  onClick={handleAddNewAddress}
                  className="w-full"
                >
                  + Add New Address
                </Button>
              </div>
            )}
            
            {showAddressForm && (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input 
                    id="full-name" 
                    placeholder="John Doe" 
                    value={billingAddress.name}
                    onChange={(e) => setBillingAddress({...billingAddress, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input 
                    id="street" 
                    placeholder="123 Main St" 
                    value={billingAddress.street}
                    onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="New York" 
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      placeholder="NY" 
                      value={billingAddress.state}
                      onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input 
                      id="zip" 
                      placeholder="10001" 
                      value={billingAddress.zip}
                      onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      placeholder="United States" 
                      value={billingAddress.country}
                      onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="same-address" 
                    checked={sameAsShipping}
                    onCheckedChange={setSameAsShipping}
                  />
                  <Label htmlFor="same-address">Same as shipping address</Label>
                </div>
              </form>
            )}
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-4">Have a Coupon?</h2>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Enter coupon code" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={!!appliedCoupon}
              />
              <Button 
                variant={appliedCoupon ? "outline" : "default"} 
                onClick={appliedCoupon ? () => {
                  setAppliedCoupon(null);
                  setCouponDiscount(0);
                  setCouponCode('');
                } : handleApplyCoupon}
                className="whitespace-nowrap"
              >
                {appliedCoupon ? "Remove" : "Apply Coupon"}
              </Button>
            </div>
            
            {appliedCoupon && (
              <div className="mt-3 p-2 bg-green-500/10 rounded flex items-center gap-2 text-green-500">
                <CheckCircle size={16} />
                <span className="text-sm">Coupon "{appliedCoupon}" applied for {couponDiscount}% discount!</span>
              </div>
            )}
          </div>
          
          <Button 
            onClick={handleSubmitPayment}
            disabled={processingPayment}
            className="w-full py-6 text-lg"
          >
            {processingPayment ? 'Processing...' : `Pay $${calculateTotal().toFixed(2)}`}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>By completing this purchase, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
          </div>
        </div>
        
        <div className="hidden lg:block lg:w-5/12">
          <div className="sticky top-20 p-6 bg-card rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-muted rounded overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    {item.accessories && item.accessories.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        With: {item.accessories.filter(a => a.selected).map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${calculateItemTotal(item).toFixed(2)}</p>
                    {item.brand && discounts[item.brand] && (
                      <p className="text-xs text-destructive">
                        {discounts[item.brand]}% off
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-destructive">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-${(couponDiscount / 100 * calculateSubtotal()).toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            
            <div className="mt-6 p-3 bg-muted/50 rounded-lg text-sm flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle size={18} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Orders usually ship within 1-2 business days. 
                Free shipping on orders over $100. 
                International shipping available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
