
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { locationData, getLocationFee, calculateFastDeliveryFee } from '@/utils/locationData';
import { translateText } from '@/utils/translation';
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface PaymentLocationSelectorProps {
  onLocationChange: (country: string, city: string, fee: number) => void;
  onDeliveryTimeChange: (timeOption: string, timeFee: number) => void;
}

const PaymentLocationSelector = ({ 
  onLocationChange, 
  onDeliveryTimeChange 
}: PaymentLocationSelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('standard');
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [cities, setCities] = useState<{ name: string; fee: number }[]>([]);
  const [fastDeliveryTime, setFastDeliveryTime] = useState('');
  const [invalidTimeError, setInvalidTimeError] = useState('');
  
  // Get minimum allowed time (current time + 30 minutes)
  const getMinimumTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return format(now, "HH:mm");
  };
  
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
    if (selectedCity) {
      setSelectedCity('');
    }
  };
  
  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    const fee = getLocationFee(selectedCountry, value);
    onLocationChange(selectedCountry, value, fee);
  };
  
  const handleDeliveryTimeChange = (value: string) => {
    setSelectedDeliveryTime(value);
    setFastDeliveryTime('');
    setInvalidTimeError('');
    
    let timeFee = 0;
    
    if (value === 'express') {
      timeFee = 10;
    } else if (value === 'priority') {
      timeFee = 20;
    } else if (value === 'custom') {
      // Will be calculated when custom time is set
      return;
    }
    
    onDeliveryTimeChange(value, timeFee);
  };
  
  const handleFastDeliveryTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    setFastDeliveryTime(timeValue);
    
    // Validate that the time is at least 30 minutes from now
    const minimumTime = getMinimumTime();
    const isValid = timeValue >= minimumTime;
    
    if (!isValid) {
      setInvalidTimeError(`Time must be at least 30 minutes from now (${minimumTime} or later)`);
      return;
    } 
    
    setInvalidTimeError('');
    
    // Calculate fee based on country and location
    if (selectedCity) {
      const fee = calculateFastDeliveryFee(selectedCountry, selectedCity, 15);
      onDeliveryTimeChange(`custom:${timeValue}`, fee);
    }
  };
  
  const getTimeFee = () => {
    if (selectedDeliveryTime === 'express') return 10;
    if (selectedDeliveryTime === 'priority') return 20;
    if (selectedDeliveryTime === 'custom' && selectedCity && !invalidTimeError) {
      return calculateFastDeliveryFee(selectedCountry, selectedCity, 15);
    }
    return 0;
  };
  
  const deliveryTimeFee = getTimeFee();
  const locationFee = selectedCity ? getLocationFee(selectedCountry, selectedCity) : 0;
  const totalFee = deliveryTimeFee + locationFee;
  
  const countries = Object.keys(locationData);
  
  return (
    <div className="space-y-6 p-4 border border-border rounded-lg">
      <div className="space-y-4">
        <h3 className="font-medium">{translateText("delivery_location", currentLanguage)}</h3>
        
        <div className="space-y-2">
          <Label htmlFor="payment-country">{translateText("country", currentLanguage)}</Label>
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger id="payment-country">
              <SelectValue placeholder={translateText("select_location", currentLanguage)} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="payment-city">{translateText("city", currentLanguage)}</Label>
          <Select 
            value={selectedCity} 
            onValueChange={handleCityChange}
            disabled={!selectedCountry}
          >
            <SelectTrigger id="payment-city">
              <SelectValue placeholder={translateText("select_location", currentLanguage)} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name} (${city.fee.toFixed(2)} {translateText("delivery_fee", currentLanguage)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium">{translateText("delivery_time", currentLanguage)}</h3>
        
        <RadioGroup 
          value={selectedDeliveryTime} 
          onValueChange={handleDeliveryTimeChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 border border-input rounded-md p-3">
            <RadioGroupItem value="standard" id="standard-delivery" />
            <Label htmlFor="standard-delivery" className="flex-1 cursor-pointer">
              <div>
                <p className="font-medium">{translateText("standard", currentLanguage)}</p>
                <p className="text-sm text-muted-foreground">{translateText("free", currentLanguage)}</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border border-input rounded-md p-3">
            <RadioGroupItem value="express" id="express-delivery" />
            <Label htmlFor="express-delivery" className="flex-1 cursor-pointer">
              <div>
                <p className="font-medium">{translateText("express", currentLanguage)}</p>
                <p className="text-sm text-muted-foreground">+$10.00 {translateText("delivery_fee", currentLanguage)}</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border border-input rounded-md p-3">
            <RadioGroupItem value="priority" id="priority-delivery" />
            <Label htmlFor="priority-delivery" className="flex-1 cursor-pointer">
              <div>
                <p className="font-medium">{translateText("priority", currentLanguage)}</p>
                <p className="text-sm text-muted-foreground">+$20.00 {translateText("delivery_fee", currentLanguage)}</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 border border-input rounded-md p-3">
            <RadioGroupItem value="custom" id="custom-delivery" />
            <Label htmlFor="custom-delivery" className="flex-1 cursor-pointer">
              <div>
                <p className="font-medium">{translateText("custom", currentLanguage) || "Custom Time"}</p>
                <p className="text-sm text-muted-foreground">{translateText("specific_time", currentLanguage) || "Select a specific delivery time"}</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
        
        {selectedDeliveryTime === 'custom' && (
          <div className="mt-4 border border-input rounded-md p-4">
            <Label htmlFor="express-time" className="block mb-2">
              {translateText("select_delivery_time", currentLanguage) || "Select Delivery Time"} (minimum 30 minutes from now)
            </Label>
            <Input
              id="express-time"
              type="time"
              min={getMinimumTime()}
              value={fastDeliveryTime}
              onChange={handleFastDeliveryTimeChange}
              className="mb-2"
            />
            {invalidTimeError && (
              <p className="text-sm text-destructive">{invalidTimeError}</p>
            )}
            {!invalidTimeError && fastDeliveryTime && selectedCity && (
              <p className="text-sm">
                {translateText("delivery_fee", currentLanguage)}: $
                {calculateFastDeliveryFee(selectedCountry, selectedCity, 15).toFixed(2)}
              </p>
            )}
          </div>
        )}
      </div>
      
      {selectedCity && (
        <div className="bg-muted p-3 rounded-lg">
          <h4 className="font-medium">{translateText("delivery", currentLanguage)} {translateText("summary", currentLanguage)}</h4>
          <p className="text-sm mt-1">
            {translateText("delivery_to", currentLanguage) || "Delivery to"}: {selectedCity}, {selectedCountry}
          </p>
          <p className="text-sm mt-1">
            {translateText("delivery_time", currentLanguage)}: {
              selectedDeliveryTime === 'standard' ? translateText("standard", currentLanguage) :
              selectedDeliveryTime === 'express' ? translateText("express", currentLanguage) :
              selectedDeliveryTime === 'priority' ? translateText("priority", currentLanguage) :
              selectedDeliveryTime === 'custom' && fastDeliveryTime ? `${translateText("custom", currentLanguage) || "Custom"} (${fastDeliveryTime})` :
              translateText("not_selected", currentLanguage) || "Not selected"
            }
          </p>
          <p className="text-sm font-medium mt-1">
            {translateText("total_delivery_fee", currentLanguage) || "Total Delivery Fee"}: ${totalFee.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentLocationSelector;
