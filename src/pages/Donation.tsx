
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobalDonation } from '@/hooks/use-global-donation';

const Donation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [amount, setAmount] = useState(10);
  const { totalDonations, addDonation } = useGlobalDonation();
  
  const presetAmounts = [5, 10, 25, 50, 100];
  
  const handleAmountSelect = (value: number) => {
    setAmount(value);
  };
  
  const handleSliderChange = (values: number[]) => {
    setAmount(values[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    }
  };
  
  const handleDonate = () => {
    const newTotal = addDonation(amount);
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation of $${amount.toFixed(2)} has been received.`
    });
    
    navigate('/thank-you');
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
              <div className="text-muted-foreground">
                Total Raised: ${totalDonations.toFixed(2)}
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
                max={250}
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
            disabled={amount <= 0}
          >
            Donate ${amount.toFixed(2)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Donation;
