
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DeliveryLocationSelectorProps {
  onLocationChange: (location: string, fee: number) => void;
  onTimeSlotChange: (timeSlot: string, fee: number) => void;
}

interface Location {
  name: string;
  fee: number;
}

interface TimeSlot {
  slot: string;
  fee: number;
}

const DeliveryLocationSelector = ({ onLocationChange, onTimeSlotChange }: DeliveryLocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  
  const locations: Location[] = [
    { name: 'Downtown', fee: 5 },
    { name: 'Uptown', fee: 7 },
    { name: 'East Side', fee: 9 },
    { name: 'West Side', fee: 8 },
    { name: 'Suburb North', fee: 12 },
    { name: 'Suburb South', fee: 15 },
    { name: 'Industrial Zone', fee: 10 }
  ];
  
  const timeSlots: TimeSlot[] = [
    { slot: '9:00 AM - 12:00 PM', fee: 0 },
    { slot: '12:00 PM - 3:00 PM', fee: 0 },
    { slot: '3:00 PM - 6:00 PM', fee: 0 },
    { slot: '6:00 PM - 9:00 PM', fee: 5 },  // Premium evening slot
    { slot: 'Next Day Morning', fee: 0 },
    { slot: 'Next Day Afternoon', fee: 0 },
    { slot: 'Express Delivery (2h)', fee: 15 }  // Express delivery
  ];
  
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
  
  return (
    <div className="space-y-6 border border-border rounded-lg p-4">
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Delivery Location
        </h3>
        
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="location">Select your area</Label>
            <Select value={selectedLocation} onValueChange={handleLocationChange}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.name} value={location.name}>
                    {location.name} (${location.fee.toFixed(2)} delivery fee)
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
          Delivery Time
        </h3>
        
        <RadioGroup value={selectedTimeSlot} onValueChange={handleTimeSlotChange} className="grid grid-cols-1 gap-2">
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot.slot} className="flex items-center space-x-2 border border-input rounded-md p-3 cursor-pointer hover:bg-accent">
              <RadioGroupItem value={timeSlot.slot} id={`time-${timeSlot.slot}`} />
              <Label htmlFor={`time-${timeSlot.slot}`} className="flex-1 cursor-pointer">
                <span className="font-medium">{timeSlot.slot}</span>
                {timeSlot.fee > 0 && (
                  <span className="text-sm text-muted-foreground ml-2">
                    (+${timeSlot.fee.toFixed(2)} fee)
                  </span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {selectedLocation && selectedTimeSlot && (
        <div className="bg-muted rounded-md p-3">
          <h4 className="font-medium">Delivery Summary</h4>
          <p className="text-sm mt-1">
            Your order will be delivered to <span className="font-medium">{selectedLocation}</span> during 
            <span className="font-medium"> {selectedTimeSlot}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryLocationSelector;
