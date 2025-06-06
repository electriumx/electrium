
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Heart, CreditCard } from 'lucide-react';
import { useGlobalDonation } from '@/hooks/use-global-donation';
import { formatCardNumber, formatExpiryDate, formatCVV } from '@/utils/cardFormatting';

const Donation = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState(10);
  const { totalDonations, addDonation, DONATION_LIMIT } = useGlobalDonation();
  const [cooldown, setCooldown] = useState(0);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCvv] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);
  const [message, setMessage] = useState('');
  
  const presetAmounts = [5, 10, 25, 50, 100];
  
  useEffect(() => {
    // Handle cooldown timer
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleAmountSelect = (value: number) => {
    // Ensure amount doesn't exceed the per-transaction limit
    setAmount(Math.min(value, DONATION_LIMIT));
  };
  
  const handleSliderChange = (values: number[]) => {
    // Ensure amount doesn't exceed the per-transaction limit
    setAmount(Math.min(values[0], DONATION_LIMIT));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      // Ensure amount doesn't exceed the per-transaction limit
      setAmount(Math.min(value, DONATION_LIMIT));
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(formatExpiryDate(e.target.value));
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(formatCVV(e.target.value));
  };
  
  const validateCardDetails = () => {
    if (!cardName.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please enter the cardholder name."
      });
      return false;
    }
    
    if (cardNumber.replace(/\s/g, '').length < 16) {
      toast({
        variant: "destructive",
        title: "Invalid card number",
        description: "Please enter a valid 16-digit card number."
      });
      return false;
    }
    
    if (cardExpiry.length < 5) {
      toast({
        variant: "destructive",
        title: "Invalid expiry date",
        description: "Please enter a valid expiry date in MM/YY format."
      });
      return false;
    }
    
    if (cardCvv.length < 3) {
      toast({
        variant: "destructive",
        title: "Invalid security code",
        description: "Please enter a valid 3-digit security code."
      });
      return false;
    }
    
    return true;
  };
  
  const handleDonate = () => {
    if (amount <= 0 || amount > DONATION_LIMIT) {
      toast({
        title: "Invalid donation amount",
        description: `Please enter an amount between $1 and $${DONATION_LIMIT.toFixed(2)}.`
      });
      return;
    }

    // Always require card details for any donation
    if (!showCardForm) {
      setShowCardForm(true);
      toast({
        title: "Card details required",
        description: "Please enter your card details to complete your donation."
      });
      return;
    }

    // Validate card details
    if (!validateCardDetails()) {
      return;
    }
    
    const newTotal = addDonation(amount);
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation of $${amount.toFixed(2)} has been received.`
    });
    
    // Set the cooldown
    setCooldown(10);
    
    // Reset form after donation
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCvv('');
    setMessage('');
    setShowCardForm(false);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-4 pt-10">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary-foreground p-4 rounded-full w-16 h-16 flex items-center justify-center mb-2">
            <Heart className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Make a Donation</CardTitle>
          <CardDescription>Your contribution helps support our mission</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">Donation Amount</h3>
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Total Raised: ${totalDonations.toFixed(2)}
                </span>
                <span className="ml-2 text-muted-foreground">
                  (Max per donation: ${DONATION_LIMIT.toFixed(2)})
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {presetAmounts.map((presetAmount) => (
                <Button 
                  key={presetAmount}
                  variant={amount === presetAmount ? "default" : "outline"}
                  onClick={() => handleAmountSelect(presetAmount)}
                >
                  ${presetAmount}
                </Button>
              ))}
            </div>
            
            <div className="pt-6 pb-2">
              <Slider
                value={[amount]}
                min={1}
                max={DONATION_LIMIT}
                step={1}
                onValueChange={handleSliderChange}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="customAmount">Custom Amount:</Label>
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5">$</span>
                <Input
                  id="customAmount"
                  type="number"
                  min="1"
                  max={DONATION_LIMIT}
                  value={amount}
                  onChange={handleInputChange}
                  className="pl-7"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Input
              id="message"
              placeholder="Add a message with your donation"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className={`space-y-4 border border-border rounded-lg p-4 ${showCardForm ? 'block' : 'hidden'}`}>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Payment Information</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Name on card"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Expiry Date</Label>
                <Input
                  id="cardExpiry"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardCvv">CVV</Label>
                <Input
                  id="cardCvv"
                  value={cardCvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
            
            <div className="flex items-center pt-2">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-muted-foreground">Your payment information is secure and encrypted</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <h4 className="font-medium mb-2">How your donation helps:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Supporting community initiatives</li>
              <li>• Funding educational programs</li>
              <li>• Providing resources to those in need</li>
              <li>• Advancing our shared mission</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg" 
            onClick={handleDonate}
            disabled={amount <= 0 || cooldown > 0}
          >
            {cooldown > 0 
              ? `Donate (${cooldown}s)` 
              : showCardForm 
                ? `Complete Donation $${amount.toFixed(2)}` 
                : `Donate $${amount.toFixed(2)}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Donation;
