
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';
import { useGlobalDonation } from '@/hooks/use-global-donation';

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
  
  const handleDonate = () => {
    if (amount <= 0 || amount > DONATION_LIMIT) {
      toast({
        title: "Invalid donation amount",
        description: `Please enter an amount between $1 and $${DONATION_LIMIT.toFixed(2)}.`
      });
      return;
    }

    // Check if card details are required for large donations
    if (amount > 100 && !cardName && !showCardForm) {
      setShowCardForm(true);
      toast({
        title: "Card details required",
        description: "Please enter your card details for donations over $100."
      });
      return;
    }

    // If card form is shown, validate card details
    if (showCardForm) {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        toast({
          title: "Missing card information",
          description: "Please fill in all card details to complete your donation."
        });
        return;
      }
    }
    
    const newTotal = addDonation(amount);
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation of $${amount.toFixed(2)} has been received.`
    });
    
    // Set the cooldown
    setCooldown(10);
    
    // Reset form after donation
    if (showCardForm) {
      setCardName('');
      setCardNumber('');
      setCardExpiry('');
      setCvv('');
      setShowCardForm(false);
    }
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
            />
          </div>

          {showCardForm && (
            <div className="space-y-4 border border-border rounded-lg p-4">
              <h3 className="text-lg font-medium">Card Details</h3>
              
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
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardExpiry">Expiry Date</Label>
                  <Input
                    id="cardExpiry"
                    value={cardExpiry}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, '');
                      if (input.length <= 4) {
                        let formatted = input;
                        if (input.length > 2) {
                          formatted = input.substring(0, 2) + '/' + input.substring(2);
                        }
                        setCardExpiry(formatted);
                      }
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardCvv">CVV</Label>
                  <Input
                    id="cardCvv"
                    value={cardCvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          )}
          
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
              : `Donate $${amount.toFixed(2)}`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Donation;
