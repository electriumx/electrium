import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedTotal = localStorage.getItem('totalDonations');
    if (savedTotal) {
      setTotalDonations(parseFloat(savedTotal));
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
    };
  }, [isOnCooldown, cooldownTime]);

  const validateCardNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i));
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(' ').trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
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

    if (!validateCardNumber(cardNumber)) {
      toast({
        variant: "destructive",
        title: "Invalid Card Number",
        description: "Please enter a valid card number"
      });
      return;
    }

    if (isNaN(donationAmount) || donationAmount < 1 || donationAmount > 1000) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter an amount between $1 and $1000"
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
          <h2 className="text-center text-3xl font-bold mb-2">Make a Donation</h2>
          <p className="text-center font-bold text-xl mb-4">
            Total Donations: ${totalDonations.toFixed(2)}
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Support our mission with a donation between $1 and $1000
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
                max="1000"
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
                onChange={(e) => setCardNumber(e.target.value)}
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
                  onChange={(e) => setExpiryDate(e.target.value)}
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
                  onChange={(e) => setCvv(e.target.value)}
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
