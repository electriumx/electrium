
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { locationData } from '@/utils/locationData';
import { translateText } from '@/utils/translation';

interface DeliveryLocationSelectorProps {
  onLocationChange: (location: string, fee: number) => void;
  onTimeSlotChange: (timeSlot: string, fee: number) => void;
  onCountryChange?: (country: string) => void;
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
  onCountryChange
}: DeliveryLocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [locations, setLocations] = useState<Location[]>([]);
  
  const timeSlots: TimeSlot[] = [
    { slot: '9:00 AM - 12:00 PM', fee: 0 },
    { slot: '12:00 PM - 3:00 PM', fee: 0 },
    { slot: '3:00 PM - 6:00 PM', fee: 0 },
    { slot: '6:00 PM - 9:00 PM', fee: 5 },  // Premium evening slot
    { slot: 'Next Day Morning', fee: 0 },
    { slot: 'Next Day Afternoon', fee: 0 },
    { slot: 'Express Delivery (2h)', fee: 15 }  // Express delivery
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
      </div>
      
      {selectedLocation && selectedTimeSlot && (
        <div className="bg-muted rounded-md p-3">
          <h4 className="font-medium">{translateText("delivery", currentLanguage)} {translateText("summary", currentLanguage)}</h4>
          <p className="text-sm mt-1">
            {translateText("order_delivered_to", currentLanguage)} <span className="font-medium">{selectedLocation}</span> {translateText("during", currentLanguage)} 
            <span className="font-medium"> {selectedTimeSlot}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryLocationSelector;
