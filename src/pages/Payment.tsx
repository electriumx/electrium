
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  Edit,
  Trash,
  ChevronDown,
  ChevronRight,
  Search,
  CircleDollarSign,
  Wallet
} from "lucide-react";
import { translateText } from '@/utils/translation';
import PaymentLocationSelector from '@/components/PaymentLocationSelector';
import { useToast } from '@/hooks/use-toast';
import { getTradeInItems } from '@/utils/paymentUtils';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [tradeItems, setTradeItems] = useState<{id: number, name: string, value: number, selected: boolean}[]>(getTradeInItems());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({country: '', city: '', fee: 0});
  const [selectedDelivery, setSelectedDelivery] = useState({option: 'standard', fee: 0});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  
  useEffect(() => {
    // Get language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Get cart data
    const cart = localStorage.getItem('cart');
    if (!cart || JSON.parse(cart).length === 0) {
      navigate('/checkout');
    }
    
    // Listen for language changes
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [navigate]);
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      // Format card number in groups of 4
      const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
      setCardNumber(formatted);
    }
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      // Format as MM/YY
      const formatted = value.length > 2 
        ? `${value.slice(0, 2)}/${value.slice(2)}` 
        : value;
      setCardExpiry(formatted);
    }
  };
  
  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCardCVC(value);
    }
  };
  
  const handleTradeItemToggle = (id: number) => {
    setTradeItems(tradeItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };
  
  const handleLocationChange = (country: string, city: string, fee: number) => {
    setSelectedLocation({country, city, fee});
  };
  
  const handleDeliveryTimeChange = (option: string, fee: number) => {
    setSelectedDelivery({option, fee});
  };
  
  const filteredTradeItems = tradeItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedTradeValue = tradeItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.value, 0);
  
  const getCartTotal = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const discounts = JSON.parse(localStorage.getItem('discounts') || '{}');
    
    return cart.reduce((total: number, item: any) => {
      let itemPrice = item.price;
      
      // Apply brand discount if available
      if (item.brand && discounts[item.brand] && discounts[item.brand].value) {
        itemPrice = itemPrice * (1 - discounts[item.brand].value / 100);
      }
      
      // Add accessory prices
      const accessoriesPrice = item.accessories
        ? item.accessories
            .filter((acc: any) => acc.selected)
            .reduce((sum: number, acc: any) => sum + acc.price, 0)
        : 0;
      
      return total + (itemPrice * item.quantity) + accessoriesPrice;
    }, 0);
  };
  
  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.08; // 8% tax
  const shippingFee = selectedLocation.fee + selectedDelivery.fee;
  const finalTotal = cartTotal + tax + shippingFee - selectedTradeValue;
  
  const handleSubmitPayment = () => {
    if (activeTab === 'card') {
      // Basic validation
      if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
        toast({
          variant: "destructive",
          title: translateText("validation_error", currentLanguage) || "Validation Error",
          description: translateText("all_fields_required", currentLanguage) || "All fields are required",
        });
        return;
      }
      
      if (cardNumber.replace(/\s/g, '').length < 16) {
        toast({
          variant: "destructive",
          title: translateText("invalid_card", currentLanguage) || "Invalid Card",
          description: translateText("card_number_invalid", currentLanguage) || "Please enter a valid card number",
        });
        return;
      }
    }
    
    if (!selectedLocation.city) {
      toast({
        variant: "destructive",
        title: translateText("delivery_location", currentLanguage) || "Delivery Location",
        description: translateText("select_delivery_location", currentLanguage) || "Please select a delivery location",
      });
      return;
    }
    
    // Start payment processing
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessDialog(true);
    }, 2000);
  };
  
  const handlePaymentComplete = () => {
    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Create order history entry
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cart,
      total: finalTotal,
      paymentMethod: activeTab,
      shippingAddress: `${selectedLocation.city}, ${selectedLocation.country}`,
      status: 'completed'
    };
    
    orderHistory.push(newOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Navigate to thank you page
    navigate('/thank-you');
  };
  
  return (
    <div className="container mx-auto p-4 pt-24 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6">
          {translateText("payment", currentLanguage) || "Payment"}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">
                {translateText("payment_method", currentLanguage) || "Payment Method"}
              </h2>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>{translateText("card", currentLanguage) || "Card"}</span>
                  </TabsTrigger>
                  <TabsTrigger value="paypal" className="flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4" />
                    <span>PayPal</span>
                  </TabsTrigger>
                  <TabsTrigger value="crypto" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span>{translateText("crypto", currentLanguage) || "Crypto"}</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">
                      {translateText("card_number", currentLanguage) || "Card Number"}
                    </Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="card-name">
                      {translateText("name_on_card", currentLanguage) || "Name on Card"}
                    </Label>
                    <Input
                      id="card-name"
                      placeholder={translateText("full_name", currentLanguage) || "Full name"}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">
                        {translateText("expiry_date", currentLanguage) || "Expiry Date"}
                      </Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={cardCVC}
                        onChange={handleCVCChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="save-card" checked={saveCard} onCheckedChange={setSaveCard} />
                    <Label htmlFor="save-card">
                      {translateText("save_card", currentLanguage) || "Save card for future payments"}
                    </Label>
                  </div>
                </TabsContent>
                
                <TabsContent value="paypal" className="space-y-4">
                  <div className="bg-muted p-6 rounded-md text-center">
                    <p className="text-muted-foreground mb-4">
                      {translateText("redirect_paypal", currentLanguage) || "You will be redirected to PayPal to complete your payment"}
                    </p>
                    <Button className="w-full">
                      {translateText("continue_to_paypal", currentLanguage) || "Continue to PayPal"}
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="crypto" className="space-y-4">
                  <RadioGroup defaultValue="bitcoin" className="space-y-2">
                    <div className="flex items-center space-x-2 border border-input rounded-md p-3">
                      <RadioGroupItem value="bitcoin" id="bitcoin" />
                      <Label htmlFor="bitcoin" className="flex-1 cursor-pointer">Bitcoin</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-input rounded-md p-3">
                      <RadioGroupItem value="ethereum" id="ethereum" />
                      <Label htmlFor="ethereum" className="flex-1 cursor-pointer">Ethereum</Label>
                    </div>
                    <div className="flex items-center space-x-2 border border-input rounded-md p-3">
                      <RadioGroupItem value="usdt" id="usdt" />
                      <Label htmlFor="usdt" className="flex-1 cursor-pointer">USDT</Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      {translateText("crypto_warning", currentLanguage) || "Cryptocurrency payments are irreversible. Please ensure you send the exact amount to the provided address."}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">
                {translateText("delivery_information", currentLanguage) || "Delivery Information"}
              </h2>
              
              <PaymentLocationSelector 
                onLocationChange={handleLocationChange}
                onDeliveryTimeChange={handleDeliveryTimeChange}
              />
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">
                {translateText("trade_in", currentLanguage) || "Trade-In"}
              </h2>
              
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={translateText("search_items", currentLanguage) || "Search items..."}
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="max-h-64 overflow-y-auto space-y-2">
                {filteredTradeItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${
                      item.selected ? 'border-sage-500 bg-sage-50 dark:bg-sage-900/20' : 'border-border'
                    }`}
                    onClick={() => handleTradeItemToggle(item.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                        item.selected ? 'bg-sage-500 text-white' : 'border border-input'
                      }`}>
                        {item.selected && <CheckCircle className="h-3 w-3" />}
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">${item.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <span>{translateText("total_trade_value", currentLanguage) || "Total Trade Value"}:</span>
                <span className="text-lg font-medium">${selectedTradeValue.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">
                {translateText("order_summary", currentLanguage) || "Order Summary"}
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {translateText("subtotal", currentLanguage) || "Subtotal"}
                  </span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {translateText("tax", currentLanguage) || "Tax"} (8%)
                  </span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {translateText("shipping", currentLanguage) || "Shipping"}
                  </span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                
                {selectedTradeValue > 0 && (
                  <div className="flex justify-between text-sage-600 dark:text-sage-400">
                    <span>
                      {translateText("trade_in_credit", currentLanguage) || "Trade-in Credit"}
                    </span>
                    <span>-${selectedTradeValue.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>{translateText("total", currentLanguage) || "Total"}</span>
                  <span>${Math.max(0, finalTotal).toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6"
                disabled={isProcessing}
                onClick={handleSubmitPayment}
              >
                {isProcessing ? (
                  <span>{translateText("processing", currentLanguage) || "Processing..."}</span>
                ) : (
                  <span>{translateText("complete_payment", currentLanguage) || "Complete Payment"}</span>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                {translateText("payment_secure", currentLanguage) || "All payments are secure and encrypted"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-center">
              <CheckCircle className="h-6 w-6 text-sage-500 mr-2" />
              {translateText("payment_successful", currentLanguage) || "Payment Successful"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {translateText("payment_processed", currentLanguage) || "Your payment has been processed successfully."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={handlePaymentComplete}>
              {translateText("continue", currentLanguage) || "Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
