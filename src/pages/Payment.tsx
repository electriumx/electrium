
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-medium text-gray-900 mb-8">Payment Details</h1>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                  placeholder="123"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Billing Address
              </label>
              <textarea
                id="address"
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                placeholder="Enter your billing address"
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
