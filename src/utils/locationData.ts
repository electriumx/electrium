
interface LocationFee {
  name: string;
  fee: number;
}

interface CountryLocations {
  [country: string]: LocationFee[];
}

export const locationData: CountryLocations = {
  "United States": [
    { name: "New York", fee: 5 },
    { name: "Los Angeles", fee: 7 },
    { name: "Chicago", fee: 6 },
    { name: "Houston", fee: 8 },
    { name: "Miami", fee: 9 },
    { name: "Seattle", fee: 10 },
    { name: "Boston", fee: 7 }
  ],
  "Canada": [
    { name: "Toronto", fee: 8 },
    { name: "Vancouver", fee: 10 },
    { name: "Montreal", fee: 9 },
    { name: "Calgary", fee: 11 },
    { name: "Ottawa", fee: 9 }
  ],
  "United Kingdom": [
    { name: "London", fee: 6 },
    { name: "Manchester", fee: 7 },
    { name: "Birmingham", fee: 8 },
    { name: "Edinburgh", fee: 9 },
    { name: "Glasgow", fee: 8 }
  ],
  "Australia": [
    { name: "Sydney", fee: 12 },
    { name: "Melbourne", fee: 11 },
    { name: "Brisbane", fee: 13 },
    { name: "Perth", fee: 15 },
    { name: "Adelaide", fee: 14 }
  ]
};

export const getLocationFee = (country: string, location: string): number => {
  if (!country || !location) return 0;
  const locations = locationData[country] || [];
  const selectedLocation = locations.find(loc => loc.name === location);
  return selectedLocation?.fee || 0;
};
