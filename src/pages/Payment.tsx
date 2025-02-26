import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [itemName, setItemName] = useState('');
  const [deliveryType, setDeliveryType] = useState('normal');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [baseTotal, setBaseTotal] = useState(() => {
    const cart = localStorage.getItem('cart');
    if (!cart) return 0;
    const items = JSON.parse(cart);
    return items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  });

  const total = deliveryType === 'fast' ? baseTotal + 50 : baseTotal;

  const validateCardNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }

    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i));

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to complete your purchase"
      });
      navigate('/login', { state: { from: '/payment' } });
      return;
    }

    if (paymentMethod === 'card') {
      const cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
      if (!validateCardNumber(cardNumberInput.value)) {
        toast({
          variant: "destructive",
          title: "Invalid Card Number",
          description: "Please enter a valid card number"
        });
        return;
      }
    }

    localStorage.removeItem('cart');
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-medium text-foreground mb-8">Payment Details</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Select Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
              >
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="trade">Item Trade</option>
              </select>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-foreground mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-foreground mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'cash' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Delivery Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryType('normal');
                        setDeliveryTime('');
                      }}
                      className={`p-4 border rounded-lg ${
                        deliveryType === 'normal' ? 'border-sage-500 bg-sage-50' : 'border-gray-200'
                      }`}
                    >
                      Normal Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('fast')}
                      className={`p-4 border rounded-lg ${
                        deliveryType === 'fast' ? 'border-sage-500 bg-sage-50' : 'border-gray-200'
                      }`}
                    >
                      Fast Delivery (+$50)
                    </button>
                  </div>
                </div>

                {deliveryType === 'fast' && (
                  <div>
                    <label htmlFor="deliveryTime" className="block text-sm font-medium text-foreground mb-1">
                      Desired Delivery Time
                    </label>
                    <input
                      type="time"
                      id="deliveryTime"
                      required
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                    />
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'trade' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="itemName" className="block text-sm font-medium text-foreground mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    id="itemName"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label htmlFor="itemImage" className="block text-sm font-medium text-foreground mb-1">
                    Item Image URL
                  </label>
                  <input
                    type="url"
                    id="itemImage"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
                    placeholder="Enter image URL"
                  />
                </div>
                <div>
                  <label htmlFor="estimatedPrice" className="block text-sm font-medium text-foreground mb-1">
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    id="estimatedPrice"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
                    placeholder="Enter estimated value"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                Delivery Address
              </label>
              <textarea
                id="address"
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                placeholder="Enter your delivery address"
              />
            </div>

            <div className="pt-4">
              <div className="mb-4 text-right">
                <span className="text-lg font-medium">
                  Total: ${total.toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-sage-500 text-white py-3 px-6 rounded-lg font-medium 
                         transition-all duration-200 hover:bg-sage-600"
              >
                Complete Purchase
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
