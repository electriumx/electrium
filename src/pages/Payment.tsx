
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/productData';
import { applyCoupon } from '@/components/admin/CouponUtils';

// Importing our new components
import MobileOrderSummary from '@/components/payment/MobileOrderSummary';
import PaymentMethodCard from '@/components/payment/PaymentMethodCard';
import CashOnDelivery from '@/components/payment/CashOnDelivery';
import ItemTrading from '@/components/payment/ItemTrading';
import BillingAddressForm from '@/components/payment/BillingAddressForm';
import CouponSection from '@/components/payment/CouponSection';
import OrderSummary from '@/components/payment/OrderSummary';

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
  const [searchTradeForValue, setSearchTradeForValue] = useState('');
  const [searchTradeForResults, setSearchTradeForResults] = useState<string[]>([]);
  const [selectedTradeForItem, setSelectedTradeForItem] = useState('');
  const [tradeForItems, setTradeForItems] = useState<string[]>([]);

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

  const handleAddTradeForItem = () => {
    if (selectedTradeForItem && !tradeForItems.includes(selectedTradeForItem)) {
      setTradeForItems([...tradeForItems, selectedTradeForItem]);
      setSelectedTradeForItem('');
      setSearchTradeForValue('');
      setSearchTradeForResults([]);
    }
  };

  const handleRemoveTradeForItem = (item: string) => {
    setTradeForItems(tradeForItems.filter(i => i !== item));
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
          "Apple Watch", "Samsung Galaxy Watch", "Fitbit Versa", "Garmin Forerunner",
          "Logitech MX Keys", "Nintendo Switch", "PlayStation 5", "Xbox Series X"
        ];
    
    const filteredResults = productNames.filter(name => 
      name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };

  const handleSearchTradeFor = (query: string) => {
    setSearchTradeForValue(query);
    
    if (!query.trim()) {
      setSearchTradeForResults([]);
      return;
    }
    
    const productNames = products.length > 0 
      ? products.map((p: any) => p.name) 
      : [
          "iPhone 13", "Samsung Galaxy S21", "Google Pixel 6", "OnePlus 9",
          "MacBook Pro", "Dell XPS 13", "HP Spectre", "Lenovo ThinkPad",
          "iPad Pro", "Samsung Galaxy Tab", "Amazon Fire HD", "Microsoft Surface",
          "AirPods Pro", "Sony WH-1000XM4", "Bose QuietComfort", "Jabra Elite",
          "Apple Watch", "Samsung Galaxy Watch", "Fitbit Versa", "Garmin Forerunner",
          "Logitech MX Keys", "Nintendo Switch", "PlayStation 5", "Xbox Series X"
        ];
    
    const filteredResults = productNames.filter(name => 
      name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchTradeForResults(filteredResults);
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

  const toggleSectionExpansion = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
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

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Complete Your Payment</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-7/12 space-y-6">
          <MobileOrderSummary
            expandedSection={expandedSection}
            toggleSectionExpansion={toggleSectionExpansion}
            cart={cart}
            calculateItemTotal={calculateItemTotal}
            calculateSubtotal={calculateSubtotal}
            calculateShipping={calculateShipping}
            calculateTax={calculateTax}
            calculateTotal={calculateTotal}
            appliedCoupon={appliedCoupon}
            couponDiscount={couponDiscount}
          />
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            
            <Tabs defaultValue="card" onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="cash">Cash on Delivery</TabsTrigger>
                <TabsTrigger value="trade">Item Trading</TabsTrigger>
              </TabsList>
              
              <TabsContent value="card" className="space-y-6">
                <PaymentMethodCard
                  savedCards={savedCards}
                  selectedCard={selectedCard}
                  onCardSelection={handleCardSelection}
                  onAddNewCard={handleAddNewCard}
                  showCardForm={showCardForm}
                  cardName={cardName}
                  setCardName={setCardName}
                  cardNumber={cardNumber}
                  setCardNumber={setCardNumber}
                  cardExpiry={cardExpiry}
                  setCardExpiry={setCardExpiry}
                  cardCVV={cardCVV}
                  setCardCVV={setCardCVV}
                  saveCard={saveCard}
                  setSaveCard={setSaveCard}
                  isDefault={isDefault}
                  setIsDefault={setIsDefault}
                />
              </TabsContent>
              
              <TabsContent value="cash" className="space-y-4">
                <CashOnDelivery
                  deliveryOption={deliveryOption}
                  setDeliveryOption={setDeliveryOption}
                  deliveryTime={deliveryTime}
                  setDeliveryTime={setDeliveryTime}
                  deliveryLocation={deliveryLocation}
                  setDeliveryLocation={setDeliveryLocation}
                  estimatedDeliveryTime={estimatedDeliveryTime}
                  getDeliveryFee={getDeliveryFee}
                />
              </TabsContent>
              
              <TabsContent value="trade" className="space-y-4">
                <ItemTrading
                  searchValue={searchValue}
                  handleSearch={handleSearch}
                  searchResults={searchResults}
                  selectedTradeItem={selectedTradeItem}
                  setSelectedTradeItem={setSelectedTradeItem}
                  handleAddTradeItem={handleAddTradeItem}
                  tradeItems={tradeItems}
                  handleRemoveTradeItem={handleRemoveTradeItem}
                  searchTradeForValue={searchTradeForValue}
                  handleSearchTradeFor={handleSearchTradeFor}
                  searchTradeForResults={searchTradeForResults}
                  selectedTradeForItem={selectedTradeForItem}
                  setSelectedTradeForItem={setSelectedTradeForItem}
                  handleAddTradeForItem={handleAddTradeForItem}
                  tradeForItems={tradeForItems}
                  handleRemoveTradeForItem={handleRemoveTradeForItem}
                  tradeDescription={tradeDescription}
                  setTradeDescription={setTradeDescription}
                  tradeItemCondition={tradeItemCondition}
                  setTradeItemCondition={setTradeItemCondition}
                  tradeValue={tradeValue}
                  setTradeValue={setTradeValue}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-6">Billing Address</h2>
            
            <BillingAddressForm
              savedAddresses={savedAddresses}
              selectedAddress={selectedAddress}
              handleAddressSelection={handleAddressSelection}
              handleAddNewAddress={handleAddNewAddress}
              showAddressForm={showAddressForm}
              billingAddress={billingAddress}
              setBillingAddress={setBillingAddress}
              sameAsShipping={sameAsShipping}
              setSameAsShipping={setSameAsShipping}
            />
          </div>
          
          <div className="p-6 bg-card rounded-lg border border-border">
            <CouponSection
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              appliedCoupon={appliedCoupon}
              handleApplyCoupon={handleApplyCoupon}
              couponDiscount={couponDiscount}
            />
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
          <OrderSummary
            cart={cart}
            calculateItemTotal={calculateItemTotal}
            calculateSubtotal={calculateSubtotal}
            calculateShipping={calculateShipping}
            calculateTax={calculateTax}
            calculateTotal={calculateTotal}
            appliedCoupon={appliedCoupon}
            couponDiscount={couponDiscount}
            discounts={discounts}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
