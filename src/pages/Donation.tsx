
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

    if (isNaN(donationAmount) || donationAmount < 1 || donationAmount > 1000) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter an amount between $1 and $1000"
      });
      return;
    }

    // Here you would typically process the donation with the card details
    toast({
      title: "Thank you!",
      description: `Your donation of $${donationAmount} has been received`
    });
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-black/50 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/10"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Make a Donation</h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Support our mission with a donation between $1 and $1000
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-white">
              Donation Amount ($)
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="1"
              max="1000"
              required
              className="mt-1 block w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-[#7E69AB] focus:border-[#7E69AB] text-white"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-white">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-[#7E69AB] focus:border-[#7E69AB] text-white"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-white">
                Expiry Date
              </label>
              <input
                id="expiry"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-[#7E69AB] focus:border-[#7E69AB] text-white"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-white">
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-[#7E69AB] focus:border-[#7E69AB] text-white"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7E69AB] hover:bg-[#6E59A5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E69AB]"
          >
            Donate
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Donation;
