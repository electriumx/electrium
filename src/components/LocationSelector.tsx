
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { locationData, getLocationFee } from '@/utils/locationData';
import { translateText } from '@/utils/translation';

interface LocationSelectorProps {
  onLocationSelect: (country: string, city: string, fee: number) => void;
}

// Helper function to format display names
const formatDisplayName = (name: string) => {
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const LocationSelector = ({ onLocationSelect }: LocationSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [cities, setCities] = useState<{ name: string; fee: number }[]>([]);

  useEffect(() => {
    // Update cities based on selected country
    setCities(locationData[selectedCountry] || []);
    
    // Reset selected city when country changes
    setSelectedCity('');
    
    // Get user language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    
    // Listen for language changes
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener);
  }, [selectedCountry]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    const fee = getLocationFee(selectedCountry, value);
    onLocationSelect(selectedCountry, value, fee);
  };

  const countries = Object.keys(locationData);
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="country">{translateText("country", currentLanguage)}</Label>
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger id="country" className="w-full">
            <SelectValue placeholder={translateText("select_location", currentLanguage)} />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {translateText(country, currentLanguage) || country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="city">{translateText("city", currentLanguage)}</Label>
        <Select value={selectedCity} onValueChange={handleCityChange}>
          <SelectTrigger id="city" className="w-full">
            <SelectValue placeholder={translateText("select_location", currentLanguage)} />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {translateText(city.name, currentLanguage) || formatDisplayName(city.name)} (${city.fee.toFixed(2)} {translateText("delivery_fee", currentLanguage)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedCountry && selectedCity && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm">
            {translateText("delivery_to", currentLanguage) || "Delivery to"} {translateText(selectedCity, currentLanguage) || selectedCity}, {translateText(selectedCountry, currentLanguage) || selectedCountry}
          </p>
          <p className="text-sm font-medium mt-1">
            {translateText("delivery_fee", currentLanguage)}: ${getLocationFee(selectedCountry, selectedCity).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
