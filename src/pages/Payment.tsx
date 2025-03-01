
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

// Countries and locations data
const countries = [
  { id: 'us', name: 'United States' },
  { id: 'ca', name: 'Canada' },
  { id: 'uk', name: 'United Kingdom' },
  { id: 'au', name: 'Australia' },
  { id: 'de', name: 'Germany' }
];

const locations = {
  us: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  ca: ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
  uk: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Bristol', 'Edinburgh', 'Sheffield', 'Leeds', 'Newcastle'],
  au: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Wollongong', 'Logan City'],
  de: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig']
};

const Payment = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [deliveryType, setDeliveryType] = useState('normal');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [availableLocations, setAvailableLocations] = useState<string[]>(locations.us);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [address, setAddress] = useState('');
  const [baseTotal, setBaseTotal] = useState(() => {
    const cart = localStorage.getItem('cart');
    if (!cart) return 0;
    const items = JSON.parse(cart);
    return items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  });

  // Update available locations when country changes
  useEffect(() => {
    setAvailableLocations(locations[selectedCountry as keyof typeof locations] || []);
    setSelectedLocation(''); // Reset location when country changes
  }, [selectedCountry]);

  // Calculate delivery fee based on time remaining
  const calculateDeliveryFee = () => {
    if (deliveryType !== 'fast' || !deliveryTime) return 0;
    
    const now = new Date();
    const selected = new Date();
    const [hours, minutes] = deliveryTime.split(':');
    selected.setHours(parseInt(hours), parseInt(minutes));

    // If selected time is before current time, assume it's for tomorrow
    if (selected < now) {
      selected.setDate(selected.getDate() + 1);
    }

    const timeDiff = (selected.getTime() - now.getTime()) / (1000 * 60 * 60); // difference in hours
    
    // Minimum 2 hours for fast delivery
    if (timeDiff < 2) {
      return -1; // Invalid time
    }

    // Base fee is $50, increases by $10 for each hour less than 6
    const baseFee = 50;
    if (timeDiff >= 6) return baseFee;
    return baseFee + ((6 - timeDiff) * 10);
  };

  const deliveryFee = calculateDeliveryFee();
  const total = baseTotal + (deliveryFee >= 0 ? deliveryFee : 0);

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

    if (deliveryType === 'fast' && deliveryFee < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Delivery Time",
        description: "Please select a delivery time at least 2 hours from now"
      });
      return;
    }

    if (paymentMethod === 'trade' && (!itemImage || !estimatedPrice || !itemName)) {
      toast({
        variant: "destructive",
        title: "Missing Trade Information",
        description: "Please provide all item trade details"
      });
      return;
    }

    if (!selectedLocation) {
      toast({
        variant: "destructive",
        title: "Address Required",
        description: "Please select a delivery location"
      });
      return;
    }

    // Clear cart and navigate to thank you page
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
                      Fast Delivery
                      {deliveryFee >= 0 && deliveryType === 'fast' && ` (+$${deliveryFee.toFixed(2)})`}
                    </button>
                  </div>
                </div>

                {deliveryType === 'fast' && (
                  <div>
                    <label htmlFor="deliveryTime" className="block text-sm font-medium text-foreground mb-1">
                      Desired Delivery Time (Min. 2 hours from now)
                    </label>
                    <input
                      type="time"
                      id="deliveryTime"
                      required
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                    />
                    {deliveryFee < 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        Please select a time at least 2 hours from now
                      </p>
                    )}
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
                    value={itemImage}
                    onChange={(e) => setItemImage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
                    placeholder="Enter image URL"
                  />
                  {itemImage && (
                    <div className="mt-2">
                      <img
                        src={itemImage}
                        alt="Item preview"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="estimatedPrice" className="block text-sm font-medium text-foreground mb-1">
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    id="estimatedPrice"
                    required
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
                    placeholder="Enter estimated value"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground mb-1">
                Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
              >
                {countries.map(country => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground mb-1">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
              >
                <option value="">Select location</option>
                {availableLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                Street Address
              </label>
              <textarea
                id="address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500"
                placeholder="Enter your street address"
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
