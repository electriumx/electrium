import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const distanceFromCairo: Record<string, Record<string, number>> = {
  "Egypt": {
    "Cairo": 0,
    "Alexandria": 220,
    "Giza": 20,
    "Sharm El Sheikh": 500,
    "Luxor": 650,
    "Aswan": 850,
    "Hurghada": 450,
    "Mansoura": 120,
    "Tanta": 94,
    "Asyut": 375
  },
  "United States": {
    "New York": 9000, "Los Angeles": 12000, "Chicago": 10000, "Houston": 11000, 
    "Phoenix": 11500, "Philadelphia": 9200, "San Antonio": 11200, "San Diego": 12100,
    "Dallas": 11100, "San Jose": 12200
  },
  "United Kingdom": {
    "London": 3500, "Birmingham": 3700, "Manchester": 3800, "Glasgow": 4000,
    "Liverpool": 3850, "Bristol": 3600, "Edinburgh": 4100, "Sheffield": 3750
  },
  "Canada": {
    "Toronto": 8900, "Montreal": 8700, "Vancouver": 11500, "Calgary": 10500,
    "Edmonton": 10600, "Ottawa": 8800, "Winnipeg": 9500, "Quebec City": 8600
  },
  "Australia": {
    "Sydney": 14000, "Melbourne": 14200, "Brisbane": 13800, "Perth": 12500,
    "Adelaide": 13600, "Gold Coast": 13700, "Canberra": 14100, "Hobart": 14500
  },
  "Japan": {
    "Tokyo": 9500, "Yokohama": 9550, "Osaka": 9700, "Nagoya": 9650,
    "Sapporo": 10000, "Fukuoka": 10200, "Kyoto": 9750, "Kobe": 9800
  },
  "Germany": {
    "Berlin": 3200, "Hamburg": 3300, "Munich": 3000, "Cologne": 3150,
    "Frankfurt": 3100, "Stuttgart": 3050, "Düsseldorf": 3250, "Leipzig": 3300
  },
  "France": {
    "Paris": 3300, "Marseille": 3000, "Lyon": 3100, "Toulouse": 3250,
    "Nice": 2900, "Nantes": 3350, "Strasbourg": 3200, "Bordeaux": 3300
  }
};

const countryData = {
  "Egypt": [
    "Cairo", "Alexandria", "Giza", "Sharm El Sheikh", "Luxor", 
    "Aswan", "Hurghada", "Mansoura", "Tanta", "Asyut"
  ],
  "United States": [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", 
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
    "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis", "Seattle",
    "Denver", "Washington DC", "Boston", "El Paso", "Nashville", "Detroit", "Portland"
  ],
  "Canada": [
    "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", 
    "Winnipeg", "Quebec City", "Hamilton", "Kitchener", "London", "Victoria",
    "Halifax", "Oshawa", "Windsor", "Saskatoon", "Regina", "St. John's"
  ],
  "United Kingdom": [
    "London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Bristol",
    "Edinburgh", "Sheffield", "Leeds", "Leicester", "Coventry", "Bradford",
    "Cardiff", "Belfast", "Nottingham", "Kingston upon Hull", "Newcastle"
  ],
  "Australia": [
    "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
    "Newcastle", "Canberra", "Wollongong", "Hobart", "Geelong", "Townsville",
    "Cairns", "Darwin", "Toowoomba", "Ballarat", "Bendigo"
  ],
  "Germany": [
    "Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart",
    "Düsseldorf", "Leipzig", "Dortmund", "Essen", "Bremen", "Dresden",
    "Hanover", "Nuremberg", "Duisburg", "Bochum", "Wuppertal"
  ],
  "France": [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg",
    "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre",
    "Saint-Étienne", "Toulon", "Angers", "Grenoble", "Dijon", "Nîmes"
  ],
  "Japan": [
    "Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe",
    "Kyoto", "Kawasaki", "Saitama", "Hiroshima", "Sendai", "Kitakyushu",
    "Chiba", "Sakai", "Niigata", "Hamamatsu", "Kumamoto", "Sagamihara"
  ],
  "Brazil": [
    "São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", 
    "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre", 
    "Belém", "Goiânia", "Guarulhos", "Campinas", "São Luís", "Maceió"
  ],
  "India": [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Surat", "Jaipur", "Lucknow", "Kanpur", "Nagpur",
    "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara"
  ],
  "China": [
    "Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Chengdu", "Tianjin",
    "Wuhan", "Dongguan", "Chongqing", "Nanjing", "Shenyang", "Hangzhou",
    "Xi'an", "Harbin", "Suzhou", "Qingdao", "Dalian", "Zhengzhou", "Jinan"
  ],
  "South Korea": [
    "Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Suwon",
    "Ulsan", "Changwon", "Seongnam", "Goyang", "Yongin", "Bucheon", "Ansan"
  ],
  "Mexico": [
    "Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León",
    "Juárez", "Zapopan", "Nezahualcóyotl", "Chihuahua", "Aguascalientes"
  ],
  "Spain": [
    "Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga",
    "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba"
  ],
  "Italy": [
    "Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna",
    "Florence", "Bari", "Catania", "Venice", "Verona", "Messina", "Padua"
  ],
  "Russia": [
    "Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan",
    "Nizhny Novgorod", "Chelyabinsk", "Omsk", "Samara", "Rostov-on-Don", 
    "Ufa", "Krasnoyarsk", "Voronezh", "Perm", "Volgograd", "Krasnodar"
  ]
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
  const [country, setCountry] = useState('Egypt');
  const [location, setLocation] = useState('Cairo');
  const [address, setAddress] = useState('');
  const [locations, setLocations] = useState<string[]>(countryData["Egypt"]);
  const [baseTotal, setBaseTotal] = useState(() => {
    const cart = localStorage.getItem('cart');
    if (!cart) return 0;
    const items = JSON.parse(cart);
    return items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (country && countryData[country]) {
      setLocations(countryData[country]);
      setLocation('');
    }
  }, [country]);

  const calculateDeliveryFee = () => {
    if (deliveryType !== 'fast' || !deliveryTime) return 0;
    
    const now = new Date();
    const selected = new Date();
    const [hours, minutes] = deliveryTime.split(':');
    selected.setHours(parseInt(hours), parseInt(minutes));

    if (selected < now) {
      selected.setDate(selected.getDate() + 1);
    }

    const timeDiff = (selected.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (timeDiff < 2) {
      return -1;
    }

    const distanceFactor = distanceFromCairo[country]?.[location] 
      ? distanceFromCairo[country][location] / 1000
      : 0;
    
    const baseFee = 50 + (distanceFactor * 20);
    
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

    if (!country || !location || !address) {
      toast({
        variant: "destructive",
        title: "Missing Address Information",
        description: "Please provide complete delivery address"
      });
      return;
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
                  <Input
                    type="text"
                    id="cardNumber"
                    required
                    className="w-full"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium text-foreground mb-1">
                      Expiry Date
                    </label>
                    <Input
                      type="text"
                      id="expiry"
                      required
                      className="w-full"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-foreground mb-1">
                      CVV
                    </label>
                    <Input
                      type="text"
                      id="cvv"
                      required
                      className="w-full"
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
                      className={`p-4 border rounded-lg transition-colors ${
                        deliveryType === 'normal' 
                          ? 'border-sage-500 bg-sage-50 dark:bg-sage-900/30 dark:border-sage-400' 
                          : 'border-gray-200 dark:border-gray-700 bg-background'
                      }`}
                    >
                      Normal Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('fast')}
                      className={`p-4 border rounded-lg transition-colors ${
                        deliveryType === 'fast' 
                          ? 'border-sage-500 bg-sage-50 dark:bg-sage-900/30 dark:border-sage-400' 
                          : 'border-gray-200 dark:border-gray-700 bg-background'
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
                    <Input
                      type="time"
                      id="deliveryTime"
                      required
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
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
                  <Input
                    type="text"
                    id="itemName"
                    required
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label htmlFor="itemImage" className="block text-sm font-medium text-foreground mb-1">
                    Item Image URL
                  </label>
                  <Input
                    type="url"
                    id="itemImage"
                    required
                    value={itemImage}
                    onChange={(e) => setItemImage(e.target.value)}
                    className="w-full"
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
                  <Input
                    type="number"
                    id="estimatedPrice"
                    required
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full"
                    placeholder="Enter estimated value"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">
                  Country
                </label>
                <select
                  id="country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
                >
                  {Object.keys(countryData).map((countryName) => (
                    <option key={countryName} value={countryName}>
                      {countryName}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">
                  City/Location
                </label>
                <select
                  id="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 bg-background text-foreground"
                >
                  <option value="" disabled>Select a location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                  Street Address
                </label>
                <Input
                  id="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full"
                  placeholder="Enter your street address"
                />
              </div>
            </div>

            <div className="pt-4">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${baseTotal.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Delivery Fee:</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-medium pt-2 border-t border-border">
                  <span>Total:</span>
                  <span className="text-sage-600 dark:text-sage-400">${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-sage-500 text-white py-3 px-6 rounded-lg font-medium 
                         transition-all duration-200 hover:bg-sage-600"
              >
                Complete Purchase
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
