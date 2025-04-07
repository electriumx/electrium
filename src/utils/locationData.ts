
interface LocationFee {
  name: string;
  fee: number;
  fastDeliveryMultiplier?: number; // Multiplier for fast delivery in this location
}

interface CountryLocations {
  [country: string]: LocationFee[];
}

export const locationData: CountryLocations = {
  "United States": [
    { name: "New York", fee: 5, fastDeliveryMultiplier: 1.5 },
    { name: "Los Angeles", fee: 7, fastDeliveryMultiplier: 1.3 },
    { name: "Chicago", fee: 6, fastDeliveryMultiplier: 1.2 },
    { name: "Houston", fee: 8, fastDeliveryMultiplier: 1.4 },
    { name: "Miami", fee: 9, fastDeliveryMultiplier: 1.6 },
    { name: "Seattle", fee: 10, fastDeliveryMultiplier: 1.5 },
    { name: "Boston", fee: 7, fastDeliveryMultiplier: 1.4 },
    { name: "San Francisco", fee: 12, fastDeliveryMultiplier: 1.7 },
    { name: "Denver", fee: 8, fastDeliveryMultiplier: 1.3 },
    { name: "Austin", fee: 7, fastDeliveryMultiplier: 1.2 }
  ],
  "Canada": [
    { name: "Toronto", fee: 8, fastDeliveryMultiplier: 1.4 },
    { name: "Vancouver", fee: 10, fastDeliveryMultiplier: 1.5 },
    { name: "Montreal", fee: 9, fastDeliveryMultiplier: 1.4 },
    { name: "Calgary", fee: 11, fastDeliveryMultiplier: 1.6 },
    { name: "Ottawa", fee: 9, fastDeliveryMultiplier: 1.3 },
    { name: "Edmonton", fee: 10, fastDeliveryMultiplier: 1.5 },
    { name: "Quebec City", fee: 12, fastDeliveryMultiplier: 1.7 },
    { name: "Winnipeg", fee: 11, fastDeliveryMultiplier: 1.5 },
    { name: "Halifax", fee: 14, fastDeliveryMultiplier: 1.8 },
    { name: "Victoria", fee: 13, fastDeliveryMultiplier: 1.6 }
  ],
  "United Kingdom": [
    { name: "London", fee: 6, fastDeliveryMultiplier: 1.6 },
    { name: "Manchester", fee: 7, fastDeliveryMultiplier: 1.4 },
    { name: "Birmingham", fee: 8, fastDeliveryMultiplier: 1.5 },
    { name: "Edinburgh", fee: 9, fastDeliveryMultiplier: 1.7 },
    { name: "Glasgow", fee: 8, fastDeliveryMultiplier: 1.6 },
    { name: "Liverpool", fee: 7, fastDeliveryMultiplier: 1.4 },
    { name: "Bristol", fee: 8, fastDeliveryMultiplier: 1.5 },
    { name: "Leeds", fee: 7, fastDeliveryMultiplier: 1.4 },
    { name: "Newcastle", fee: 9, fastDeliveryMultiplier: 1.6 },
    { name: "Cardiff", fee: 10, fastDeliveryMultiplier: 1.7 }
  ],
  "Australia": [
    { name: "Sydney", fee: 12, fastDeliveryMultiplier: 1.8 },
    { name: "Melbourne", fee: 11, fastDeliveryMultiplier: 1.7 },
    { name: "Brisbane", fee: 13, fastDeliveryMultiplier: 1.9 },
    { name: "Perth", fee: 15, fastDeliveryMultiplier: 2.0 },
    { name: "Adelaide", fee: 14, fastDeliveryMultiplier: 1.8 },
    { name: "Gold Coast", fee: 13, fastDeliveryMultiplier: 1.7 },
    { name: "Canberra", fee: 14, fastDeliveryMultiplier: 1.8 },
    { name: "Hobart", fee: 16, fastDeliveryMultiplier: 2.1 },
    { name: "Darwin", fee: 18, fastDeliveryMultiplier: 2.2 },
    { name: "Newcastle", fee: 14, fastDeliveryMultiplier: 1.9 }
  ],
  "Germany": [
    { name: "Berlin", fee: 7, fastDeliveryMultiplier: 1.5 },
    { name: "Munich", fee: 8, fastDeliveryMultiplier: 1.6 },
    { name: "Hamburg", fee: 7, fastDeliveryMultiplier: 1.5 },
    { name: "Cologne", fee: 8, fastDeliveryMultiplier: 1.6 },
    { name: "Frankfurt", fee: 9, fastDeliveryMultiplier: 1.7 },
    { name: "Stuttgart", fee: 8, fastDeliveryMultiplier: 1.6 },
    { name: "Düsseldorf", fee: 9, fastDeliveryMultiplier: 1.7 },
    { name: "Leipzig", fee: 10, fastDeliveryMultiplier: 1.8 },
    { name: "Dresden", fee: 10, fastDeliveryMultiplier: 1.8 },
    { name: "Nuremberg", fee: 9, fastDeliveryMultiplier: 1.7 }
  ],
  "Japan": [
    { name: "Tokyo", fee: 10, fastDeliveryMultiplier: 1.8 },
    { name: "Osaka", fee: 9, fastDeliveryMultiplier: 1.7 },
    { name: "Kyoto", fee: 11, fastDeliveryMultiplier: 1.9 },
    { name: "Yokohama", fee: 10, fastDeliveryMultiplier: 1.8 },
    { name: "Nagoya", fee: 10, fastDeliveryMultiplier: 1.8 },
    { name: "Sapporo", fee: 13, fastDeliveryMultiplier: 2.0 },
    { name: "Fukuoka", fee: 12, fastDeliveryMultiplier: 1.9 },
    { name: "Kobe", fee: 11, fastDeliveryMultiplier: 1.8 },
    { name: "Hiroshima", fee: 12, fastDeliveryMultiplier: 1.9 },
    { name: "Sendai", fee: 12, fastDeliveryMultiplier: 1.9 }
  ]
};

// Get delivery fee for a specific location
export const getLocationFee = (country: string, location: string): number => {
  if (!country || !location) return 0;
  const locations = locationData[country] || [];
  const selectedLocation = locations.find(loc => loc.name === location);
  return selectedLocation?.fee || 0;
};

// Get fast delivery fee multiplier for a specific location
export const getFastDeliveryMultiplier = (country: string, location: string): number => {
  if (!country || !location) return 1.0;
  const locations = locationData[country] || [];
  const selectedLocation = locations.find(loc => loc.name === location);
  return selectedLocation?.fastDeliveryMultiplier || 1.0;
};

// Calculate fast delivery fee based on location and base fee
export const calculateFastDeliveryFee = (country: string, location: string, baseFee: number = 15): number => {
  const multiplier = getFastDeliveryMultiplier(country, location);
  const locationFee = getLocationFee(country, location);
  return baseFee * multiplier + locationFee;
};
