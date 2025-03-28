
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGlobalDonation } from '../hooks/use-global-donation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { formatCardNumber, formatExpiryDate, formatCVV } from '@/utils/cardFormatting';

const Donation = () => {
  const { totalDonations, addDonation, DONATION_LIMIT } = useGlobalDonation();
  const [amount, setAmount] = useState<number>(10);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({
    amount: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: ''
  });
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
      
      // Clear error if value is valid
      if (value > 0) {
        setErrors(prev => ({ ...prev, amount: '' }));
      }
    } else {
      setAmount(0);
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
    if (formattedValue.replace(/\s/g, '').length === 16) {
      setErrors(prev => ({ ...prev, cardNumber: '' }));
    }
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
    if (formattedValue.length === 5) {
      setErrors(prev => ({ ...prev, expiryDate: '' }));
    }
  };
  
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCVV(e.target.value);
    setCvc(formattedValue);
    if (formattedValue.length === 3) {
      setErrors(prev => ({ ...prev, cvc: '' }));
    }
  };
  
  const validateFirstStep = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (amount <= 0) {
      newErrors.amount = 'Please enter a valid donation amount';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const validateCardDetails = () => {
    const newErrors = { ...errors };
    let isValid = true;
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Please enter the cardholder name';
      isValid = false;
    }
    
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      isValid = false;
    }
    
    if (expiryDate.length !== 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      isValid = false;
    } else {
      const [month, year] = expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      const expiryMonth = parseInt(month, 10);
      const expiryYear = parseInt(year, 10);
      
      if (
        expiryMonth < 1 || 
        expiryMonth > 12 || 
        (expiryYear < currentYear) || 
        (expiryYear === currentYear && expiryMonth < currentMonth)
      ) {
        newErrors.expiryDate = 'Card has expired';
        isValid = false;
      }
    }
    
    if (cvc.length !== 3) {
      newErrors.cvc = 'Please enter a valid 3-digit CVC';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleContinue = () => {
    if (validateFirstStep()) {
      setStep(2);
    }
  };
  
  const handleDonate = () => {
    if (!validateCardDetails()) {
      return;
    }
    
    const newTotal = addDonation(amount);
    
    // Reset form
    setAmount(10);
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvc('');
    setStep(1);
    
    toast({
      title: "Thank you for your donation!",
      description: `Your donation of $${amount.toFixed(2)} has been received. Total raised: $${newTotal.toFixed(2)}`,
    });
  };
  
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-muted-foreground">
            Your contribution helps us continue to develop and improve our products and services.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Total Raised</CardTitle>
            <CardDescription className="text-center">
              <span className="text-4xl font-bold text-primary">${totalDonations.toFixed(2)}</span>
            </CardDescription>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
            <CardDescription>
              Every contribution makes a difference, no matter the size.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount ($)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      value={amount || ''}
                      onChange={handleAmountChange}
                      className="pl-8"
                    />
                  </div>
                  {errors.amount && <p className="text-destructive text-sm">{errors.amount}</p>}
                  
                  <div className="text-sm text-muted-foreground mt-2">
                    Maximum donation per transaction: ${DONATION_LIMIT.toLocaleString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[10, 25, 50, 100, 250, 500].map(value => (
                    <Button
                      key={value}
                      type="button"
                      variant={amount === value ? "default" : "outline"}
                      onClick={() => setAmount(value)}
                      className="w-full"
                    >
                      ${value}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    value={cardName}
                    onChange={(e) => {
                      setCardName(e.target.value);
                      if (e.target.value.trim()) {
                        setErrors(prev => ({ ...prev, cardName: '' }));
                      }
                    }}
                    placeholder="Name on card"
                  />
                  {errors.cardName && <p className="text-destructive text-sm">{errors.cardName}</p>}
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
                  {errors.cardNumber && <p className="text-destructive text-sm">{errors.cardNumber}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiryDate && <p className="text-destructive text-sm">{errors.expiryDate}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      value={cvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      maxLength={3}
                    />
                    {errors.cvc && <p className="text-destructive text-sm">{errors.cvc}</p>}
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    You are donating <span className="font-medium">${amount.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            )}
            <Button 
              onClick={step === 1 ? handleContinue : handleDonate}
              className={step === 1 ? "ml-auto" : ""}
            >
              {step === 1 ? 'Continue' : 'Donate Now'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Donation;
