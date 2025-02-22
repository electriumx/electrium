
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [itemName, setItemName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('cart'); // Clear cart after successful purchase
    navigate('/thank-you');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-medium text-gray-900 mb-8">Payment Details</h1>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg ${
                    paymentMethod === 'card' ? 'border-sage-500 bg-sage-50' : 'border-gray-200'
                  }`}
                >
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 border rounded-lg ${
                    paymentMethod === 'cash' ? 'border-sage-500 bg-sage-50' : 'border-gray-200'
                  }`}
                >
                  Cash
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('trade')}
                  className={`p-4 border rounded-lg ${
                    paymentMethod === 'trade' ? 'border-sage-500 bg-sage-50' : 'border-gray-200'
                  }`}
                >
                  Item Trade
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('service')}
                  className={`p-4 border rounded-lg ${
                    paymentMethod === 'service' ? 'border-sage-500 bg-sage-50' : 'border-gray-200'
                  }`}
                >
                  Service
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
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
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
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

            {paymentMethod === 'trade' && (
              <div>
                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                  placeholder="Enter item name"
                />
              </div>
            )}

            {paymentMethod === 'service' && (
              <div>
                <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Description
                </label>
                <textarea
                  id="serviceDescription"
                  required
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                  placeholder="Describe your service"
                  rows={3}
                />
              </div>
            )}

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
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

