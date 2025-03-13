
import { useState, useEffect, useMemo } from 'react';
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
  X,
  Search
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Product, products } from '../data/productData';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface SavedCard {
  id: string;
  name: string;
  number: string;
  expiry: string;
  default?: boolean;
}

interface ProductSuggestion {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  brand?: string;
  category: string;
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
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [tradeItemSearch, setTradeItemSearch] = useState('');
  const [tradeItems, setTradeItems] = useState<ProductSuggestion[]>([]);
  const [showTradeItemSuggestions, setShowTradeItemSuggestions] = useState(false);
  const [tradeValue, setTradeValue] = useState(0);
  const [tradeDescription, setTradeDescription] = useState('');
  const [tradeItemCondition, setTradeItemCondition] = useState('good');
  const [tradeValueError, setTradeValueError] = useState<string | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<{code: string, discount: number, type: string, target: string}[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([]);
  
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTimeWindow, setDeliveryTimeWindow] = useState('');
  const [deliveryDistance, setDeliveryDistance] = useState(5);

  const conditionMultipliers = {
    'like-new': 0.9,
    'good': 0.7,
    'fair': 0.5,
    'poor': 0.3
  };

  // Helper functions
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
      return 15 + (deliveryDistance * 0.5);
    }
    return 0;
  };

  const getEstimatedDeliveryTime = () => {
    return deliveryTime;
  };

  const calculateTradeDiscount = () => {
    return tradeValue;
  };

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
        setDiscounts(parsedDiscounts);
      } catch (error) {
        console.error('Error parsing discounts:', error);
      }
    }

    const couponsData = localStorage.getItem('coupons');
    if (couponsData) {
      try {
        const parsedCoupons = JSON.parse(couponsData);
        setAvailableCoupons(parsedCoupons);
      } catch (error) {
        console.error('Error parsing coupons:', error);
      }
    } else {
      const defaultCoupons = [
        { code: 'SAVE10', discount: 10, type: 'percentage', target: 'all' },
        { code: 'SAVE20', discount: 20, type: 'percentage', target: 'all' }
      ];
      setAvailableCoupons(defaultCoupons);
      localStorage.setItem('coupons', JSON.stringify(defaultCoupons));
    }
    
    if (products) {
      const suggestions: ProductSuggestion[] = products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        brand: product.brand,
        category: product.category
      }));
      setProductSuggestions(suggestions);
    }
    
    updateEstimatedDeliveryTime();
    
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    updateEstimatedDeliveryTime();
  }, [deliveryOption, deliveryDistance]);

  useEffect(() => {
    if (tradeItems.length > 0) {
      const baseValue = tradeItems.reduce((sum, item) => sum + item.price, 0);
      const multiplier = conditionMultipliers[tradeItemCondition as keyof typeof conditionMultipliers] || 0.7;
      setTradeValue(baseValue * multiplier);
    } else {
      setTradeValue(0);
    }
  }, [tradeItems, tradeItemCondition]);

  useEffect(() => {
    if (tradeItemSearch && tradeItemSearch.length > 1) {
      const filtered = productSuggestions.filter(product => 
        product.name.toLowerCase().includes(tradeItemSearch.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(tradeItemSearch.toLowerCase()))
      );
      setShowTradeItemSuggestions(filtered.length > 0);
    } else {
      setShowTradeItemSuggestions(false);
    }
  }, [tradeItemSearch, productSuggestions]);

  useEffect(() => {
    const total = calculateTotal();
    if (paymentMethod === 'trade' && tradeValue > 0) {
      // Changed from 60% to 40% as per request
      const minAcceptableValue = total * 0.6;
      const maxAcceptableValue = total * 1.4; // 40% more than total
      
      if (tradeValue < minAcceptableValue) {
        setTradeValueError("The trade value must be at least 60% of your order total. Add more items or choose items with higher value.");
      } else if (tradeValue > maxAcceptableValue) {
        setTradeValueError("The trade value can't exceed 40% more than your order total. Please select items with lower value.");
      } else {
        setTradeValueError(null);
      }
    }
  }, [tradeValue, cart, paymentMethod]);

  const updateEstimatedDeliveryTime = () => {
    const now = new Date();
    let deliveryMinutes = 0;
    let deliveryTimeText = '';
    
    if (deliveryOption === 'normal') {
      const days = Math.floor(Math.random() * 3) + 1;
      const deliveryDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
      setDeliveryDate(deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
      setDeliveryTimeWindow('Between 9 AM and 5 PM');
      deliveryTimeText = `${days} day${days > 1 ? 's' : ''} (${deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })})`;
    } else if (deliveryOption === 'fast') {
      deliveryMinutes = 45 + (deliveryDistance * 3);
      const maxDeliveryMinutes = deliveryMinutes + 45;
      
      const deliveryTime = new Date(now.getTime() + deliveryMinutes * 60 * 1000);
      const maxDeliveryTime = new Date(now.getTime() + maxDeliveryMinutes * 60 * 60 * 1000);
      
      setDeliveryDate('Today');
      setDeliveryTimeWindow(`Between ${deliveryTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} and ${maxDeliveryTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`);
      deliveryTimeText = `${deliveryMinutes}-${maxDeliveryMinutes} minutes`;
    }
    
    setDeliveryTime(deliveryTimeText);
  };

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode);
    if (coupon) {
      setAppliedCoupon(couponCode);
      setCouponDiscount(coupon.discount);
      toast({
        title: "Coupon applied",
        description: `${coupon.code} for ${coupon.discount}% off has been applied to your order.`
      });
    } else {
      setAppliedCoupon(null);
      setCouponDiscount(0);
      toast({
        variant: "destructive",
        title: "Invalid coupon code",
        description: "The coupon code you entered is not valid."
      });
    }
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

  const handleTradeItemSearch = (value: string) => {
    setTradeItemSearch(value);
    if (value.length > 1) {
      const filtered = productSuggestions.filter(product => 
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(value.toLowerCase()))
      );
      setShowTradeItemSuggestions(filtered.length > 0);
    } else {
      setShowTradeItemSuggestions(false);
    }
  };

  const handleAddTradeItem = (item: ProductSuggestion) => {
    if (!tradeItems.some(existingItem => existingItem.id === item.id)) {
      setTradeItems([...tradeItems, item]);
      setTradeItemSearch('');
      setShowTradeItemSuggestions(false);
    }
  };

  const handleRemoveTradeItem = (itemId: number) => {
    setTradeItems(tradeItems.filter(item => item.id !== itemId));
  };
  
  const handleDeliveryDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const distance = Number(e.target.value);
    setDeliveryDistance(distance);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'trade' && tradeValueError) {
      toast({
        variant: "destructive",
        title: "Trade value issue",
        description: tradeValueError
      });
      return;
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
        location: deliveryLocation,
        distance: deliveryDistance,
        estimatedTime: deliveryTime
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

  const filteredProductSuggestions = useMemo(() => {
    if (!tradeItemSearch || tradeItemSearch.length < 2) return [];
    
    return productSuggestions.filter(product => 
      product.name.toLowerCase().includes(tradeItemSearch.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(tradeItemSearch.toLowerCase()))
    ).slice(0, 5);
  }, [tradeItemSearch, productSuggestions]);

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
                            <p className="font-medium">Fast Delivery ({getEstimatedDeliveryTime()})</p>
                            <p className="text-sm text-muted-foreground">${getDeliveryFee().toFixed(2)} delivery fee</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {deliveryOption === 'fast' && (
                    <div className="space-y-2">
                      <Label htmlFor="delivery-distance">Delivery Distance (miles)</Label>
                      <div className="flex items-center gap-4">
                        <Input 
                          id="delivery-distance" 
                          type="number"
                          min="1"
                          max="30"
                          value={deliveryDistance}
                          onChange={handleDeliveryDistanceChange}
                          className="w-24"
                        />
                        <span className="text-sm text-muted-foreground">
                          {deliveryDistance <= 5 ? 'Nearby' : 
                           deliveryDistance <= 15 ? 'Medium distance' : 'Far distance'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-muted/30 rounded-lg p-4 mt-4">
                    <h3 className="font-medium mb-2">Estimated Delivery</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Date:</span> {deliveryDate}</p>
                      <p><span className="text-muted-foreground">Time:</span> {deliveryTimeWindow}</p>
                    </div>
                  </div>
                  
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
                      <strong>Note:</strong> Payment will be collected upon delivery. Please have the exact amount ready.
                      Minimum delivery time is {deliveryOption === 'fast' ? '45 minutes' : '1 day'} for {deliveryOption} delivery option.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trade" className="space-y-4">
                <p className="text-muted-foreground mb-4">Trade in your items for store credit to use with this purchase.</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trade-items">Search for Items to Trade</Label>
                    <div className="relative">
                      <div className="flex">
                        <div className="relative flex-1">
                          <Input 
                            id="trade-items" 
                            placeholder="Search for products to trade..."
                            value={tradeItemSearch}
                            onChange={(e) => handleTradeItemSearch(e.target.value)}
                            className="pr-8"
                          />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                        </div>
                      </div>
                      
                      {showTradeItemSuggestions && (
                        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          <ul className="py-1">
                            {filteredProductSuggestions.length === 0 ? (
                              <li className="px-4 py-2 text-sm text-muted-foreground">No matching products found</li>
                            ) : (
                              filteredProductSuggestions.map(product => (
                                <li 
                                  key={product.id}
                                  onClick={() => handleAddTradeItem(product)}
                                  className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-3"
                                >
                                  <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                                    <img 
                                      src={product.imageUrl} 
                                      alt={product.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {product.brand && `${product.brand} · `}{product.category} · ${product.price.toFixed(2)}
                                    </p>
                                  </div>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {tradeItems.length > 0 && (
                    <div className="border border-border rounded-lg p-3 space-y-3">
                      <h3 className="font-medium">Selected Trade Items</h3>
                      {tradeItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded overflow-hidden">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">Original value: ${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTradeItem(item.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium">Condition:</h4>
                            <RadioGroup 
                              value={tradeItemCondition} 
                              onValueChange={value => setTradeItemCondition(value)}
                              className="flex gap-4 mt-1"
                            >
                              <div className="flex items-center gap-1">
                                <RadioGroupItem value="like-new" id="like-new" />
                                <Label htmlFor="like-new" className="text-xs">Like New</Label>
                              </div>
                              <div className="flex items-center gap-1">
                                <RadioGroupItem value="good" id="good" />
                                <Label htmlFor="good" className="text-xs">Good</Label>
                              </div>
                              <div className="flex items-center gap-1">
                                <RadioGroupItem value="fair" id="fair" />
                                <Label htmlFor="fair" className="text-xs">Fair</Label>
                              </div>
                              <div className="flex items-center gap-1">
                                <RadioGroupItem value="poor" id="poor" />
                                <Label htmlFor="poor" className="text-xs">Poor</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Trade Value:</p>
                            <p className="text-lg font-bold">${tradeValue.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                      
                      {tradeValueError && (
                        <div className="p-2 bg-destructive/10 text-destructive rounded-md text-sm">
                          {tradeValueError}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="pt-3">
                    <Label htmlFor="trade-description">Additional Notes</Label>
                    <Input
                      id="trade-description"
                      placeholder="Any additional details about your items..."
                      value={tradeDescription}
                      onChange={(e) => setTradeDescription(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Coupon Code Section */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="font-medium mb-3">Have a Coupon?</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1"
              />
              <Button onClick={handleApplyCoupon}>Apply</Button>
            </div>
            {appliedCoupon && (
              <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-md flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Coupon <span className="font-semibold">{appliedCoupon}</span> applied - {couponDiscount}% off
                </span>
              </div>
            )}
          </div>
          
          {/* Payment Button */}
          <Button 
            onClick={handleSubmitPayment} 
            className="w-full py-6 text-lg"
            disabled={processingPayment}
          >
            {processingPayment ? (
              <>Processing Payment...</>
            ) : (
              <>Pay ${calculateTotal().toFixed(2)}</>
            )}
          </Button>
        </div>
        
        {/* Order Summary (desktop) */}
        <div className="hidden lg:block lg:w-5/12">
          <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-20">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            
            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-20 h-20 bg-muted rounded overflow-hidden">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold mt-1">${calculateItemTotal(item).toFixed(2)}</p>
                      
                      {item.accessories && item.accessories.some(acc => acc.selected) && (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">Added Accessories:</p>
                          <ul className="text-xs">
                            {item.accessories
                              .filter(acc => acc.selected)
                              .map(acc => (
                                <li key={acc.id} className="flex justify-between">
                                  <span>{acc.name}</span>
                                  <span>${acc.price.toFixed(2)}</span>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                
                {paymentMethod === 'cash' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${getDeliveryFee().toFixed(2)}</span>
                  </div>
                )}
                
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-${(couponDiscount / 100 * calculateSubtotal()).toFixed(2)}</span>
                  </div>
                )}
                
                {paymentMethod === 'trade' && tradeValue > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Trade-in Credit</span>
                    <span>-${tradeValue.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              
              {paymentMethod === 'cash' && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Delivery Information</h4>
                  <p className="text-xs text-muted-foreground">
                    Estimated delivery: {deliveryDate}
                    <br />
                    Delivery time: {deliveryTimeWindow}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
