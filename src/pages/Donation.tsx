import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const chunks = [];
  
  for (let i = 0; i < digits.length && i < 16; i += 4) {
    chunks.push(digits.slice(i, i + 4));
  }
  
  return chunks.join(' ');
};

const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length <= 2) {
    return digits;
  }
  
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};

const formatCVV = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 4);
};

const validateCardNumber = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }
  
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const MAX_DONATION = 1000000;

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    const savedTotal = localStorage.getItem('totalDonations');
    if (savedTotal) {
      setTotalDonations(parseFloat(savedTotal));
    }
    
    const savedCount = localStorage.getItem('donationCount');
    if (savedCount) {
      setDonationCount(parseInt(savedCount, 10));
    }

    let intervalId: NodeJS.Timeout;
    if (isOnCooldown && cooldownTime > 0) {
      intervalId = setInterval(() => {
        setCooldownTime((time) => time - 1);
      }, 1000);
    } else if (cooldownTime === 0) {
      setIsOnCooldown(false);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, [isOnCooldown, cooldownTime]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCVV(e.target.value);
    setCvv(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = Number(amount);

    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to make a donation"
      });
      navigate('/login', { state: { from: '/donation' } });
      return;
    }

    if (isOnCooldown) {
      toast({
        variant: "destructive",
        title: "Donation Cooldown",
        description: `Please wait ${cooldownTime} seconds before making another donation`
      });
      return;
    }

    if (isNaN(donationAmount) || donationAmount < 1 || donationAmount > MAX_DONATION) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: `Please enter an amount between $1 and $${MAX_DONATION.toLocaleString()}`
      });
      return;
    }

    if (!cardNumber || !expiryDate || !cvv) {
      toast({
        variant: "destructive",
        title: "Missing Card Details",
        description: "Please fill in all card details"
      });
      return;
    }

    const newTotal = totalDonations + donationAmount;
    setTotalDonations(newTotal);
    localStorage.setItem('totalDonations', newTotal.toString());
    
    const newCount = donationCount + 1;
    setDonationCount(newCount);
    localStorage.setItem('donationCount', newCount.toString());

    toast({
      title: "Thank you!",
      description: `Your donation of $${donationAmount} has been received`
    });

    setIsOnCooldown(true);
    setCooldownTime(15);
    setAmount('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card/60 backdrop-blur-sm p-8 rounded-xl shadow-lg relative">
        <div>
          <h2 className="text-center text-3xl font-bold mb-2">Make Donation</h2>
          <div className="flex justify-center gap-6 mb-4">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Raised</p>
              <p className="font-bold text-xl">${totalDonations.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Donations</p>
              <p className="font-bold text-xl">{donationCount}</p>
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Support Mission with a donation between $1 and ${MAX_DONATION.toLocaleString()}
          </p>
          {isOnCooldown && (
            <p className="mt-2 text-center text-sm text-yellow-400">
              Cooldown: {cooldownTime} seconds
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                Donation Amount ($)
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="1"
                max={MAX_DONATION}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300">
                Card Number
              </label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={5}
                />
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-300">
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isOnCooldown}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-500 hover:bg-sage-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;
