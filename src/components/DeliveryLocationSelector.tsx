
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { locationData, getLocationFee } from '@/utils/locationData';
import { translateText } from '@/utils/translation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface DeliveryLocationSelectorProps {
  onLocationChange: (location: string, fee: number) => void;
  onTimeSlotChange: (timeSlot: string, fee: number) => void;
  onCountryChange?: (country: string) => void;
  onDeliveryTimeChange?: (time: string, fee: number) => void;
}

interface Location {
  name: string;
  fee: number;
}

interface TimeSlot {
  slot: string;
  fee: number;
}

const DeliveryLocationSelector = ({ 
  onLocationChange, 
  onTimeSlotChange,
  onCountryChange,
  onDeliveryTimeChange
}: DeliveryLocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [locations, setLocations] = useState<Location[]>([]);
  const [fastDeliveryTime, setFastDeliveryTime] = useState('');
  const [invalidTimeError, setInvalidTimeError] = useState('');
  
  // Get minimum allowed time (current time + 30 minutes)
  const getMinimumTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return format(now, "HH:mm");
  };
  
  const timeSlots: TimeSlot[] = [
    { slot: '9:00 AM - 12:00 PM', fee: 0 },
    { slot: '12:00 PM - 3:00 PM', fee: 0 },
    { slot: '3:00 PM - 6:00 PM', fee: 0 },
    { slot: '6:00 PM - 9:00 PM', fee: 5 },  // Premium evening slot
    { slot: 'Next Day Morning', fee: 0 },
    { slot: 'Next Day Afternoon', fee: 0 },
    { slot: 'Express Delivery (Custom Time)', fee: 15 }  // Express delivery with custom time
  ];

  useEffect(() => {
    // Update locations based on selected country
    setLocations(locationData[selectedCountry] || []);
    
    // Reset selected location when country changes
    setSelectedLocation('');
    
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
    if (onCountryChange) {
      onCountryChange(value);
    }
  };
  
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    const location = locations.find(loc => loc.name === value);
    if (location) {
      onLocationChange(location.name, location.fee);
    }
  };
  
  const handleTimeSlotChange = (value: string) => {
    setSelectedTimeSlot(value);
    const timeSlot = timeSlots.find(slot => slot.slot === value);
    if (timeSlot) {
      onTimeSlotChange(timeSlot.slot, timeSlot.fee);
      
      // Reset custom time selection if not express delivery
      if (value !== 'Express Delivery (Custom Time)') {
        setFastDeliveryTime('');
        setInvalidTimeError('');
      }
    }
  };
  
  const handleFastDeliveryTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    setFastDeliveryTime(timeValue);
    
    // Validate that the time is at least 30 minutes from now
    const minimumTime = getMinimumTime();
    const isValid = timeValue >= minimumTime;
    
    if (!isValid) {
      setInvalidTimeError(`Time must be at least 30 minutes from now (${minimumTime} or later)`);
    } else {
      setInvalidTimeError('');
      
      // Calculate fee based on country and location
      let baseFee = 15; // Base express delivery fee
      if (selectedLocation) {
        const locationFee = getLocationFee(selectedCountry, selectedLocation);
        baseFee += locationFee;
      }
      
      // Notify parent component about the custom time
      if (onDeliveryTimeChange) {
        onDeliveryTimeChange(timeValue, baseFee);
      }
    }
  };
  
  const countries = Object.keys(locationData);
  
  return (
    <div className="space-y-6 border border-border rounded-lg p-4">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          {translateText("delivery_location", currentLanguage)}
        </h3>
        
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="country">{translateText("country", currentLanguage)}</Label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger id="country">
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
          
          <div className="grid gap-2">
            <Label htmlFor="location">{translateText("city", currentLanguage)}</Label>
            <Select value={selectedLocation} onValueChange={handleLocationChange}>
              <SelectTrigger id="location">
                <SelectValue placeholder={translateText("select_location", currentLanguage)} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.name} value={location.name}>
                    {location.name} (${location.fee.toFixed(2)} {translateText("delivery_fee", currentLanguage)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          {translateText("delivery_time", currentLanguage)}
        </h3>
        
        <RadioGroup value={selectedTimeSlot} onValueChange={handleTimeSlotChange} className="grid grid-cols-1 gap-2">
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot.slot} className="flex items-center space-x-2 border border-input rounded-md p-3 cursor-pointer hover:bg-accent">
              <RadioGroupItem value={timeSlot.slot} id={`time-${timeSlot.slot}`} />
              <Label htmlFor={`time-${timeSlot.slot}`} className="flex-1 cursor-pointer">
                <span className="font-medium">{timeSlot.slot}</span>
                {timeSlot.fee > 0 && (
                  <span className="text-sm text-muted-foreground ml-2">
                    (+${timeSlot.fee.toFixed(2)} {translateText("delivery_fee", currentLanguage)})
                  </span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        {/* Custom time for express delivery */}
        {selectedTimeSlot === 'Express Delivery (Custom Time)' && (
          <div className="mt-4 border border-input rounded-md p-4">
            <Label htmlFor="express-time" className="block mb-2">
              Select Delivery Time (minimum 30 minutes from now)
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
          </div>
        )}
      </div>
      
      {selectedLocation && selectedTimeSlot && (
        <div className="bg-muted rounded-md p-3">
          <h4 className="font-medium">Delivery Summary</h4>
          <p className="text-sm mt-1">
            Order delivered to <span className="font-medium">{selectedLocation}, {selectedCountry}</span> during
            <span className="font-medium"> {selectedTimeSlot}</span>
            {selectedTimeSlot === 'Express Delivery (Custom Time)' && fastDeliveryTime && !invalidTimeError && (
              <span className="font-medium"> at {fastDeliveryTime}</span>
            )}.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryLocationSelector;
