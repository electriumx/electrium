
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface CashOnDeliveryProps {
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
  deliveryTime: string;
  setDeliveryTime: (time: string) => void;
  deliveryLocation: string;
  setDeliveryLocation: (location: string) => void;
  estimatedDeliveryTime: string;
  getDeliveryFee: () => number;
}

const CashOnDelivery = ({
  deliveryOption,
  setDeliveryOption,
  deliveryTime,
  setDeliveryTime,
  deliveryLocation,
  setDeliveryLocation,
  estimatedDeliveryTime,
  getDeliveryFee
}: CashOnDeliveryProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground mb-4">Choose your delivery speed and provide your location details.</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="delivery-option">Delivery Option</Label>
          <RadioGroup 
            value={deliveryOption} 
            onValueChange={setDeliveryOption}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal" className="cursor-pointer">
                <div>
                  <p className="font-medium">Normal Delivery (1-3 days)</p>
                  <p className="text-sm text-muted-foreground">$5.00 delivery fee</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fast" id="fast" />
              <Label htmlFor="fast" className="cursor-pointer">
                <div>
                  <p className="font-medium">Fast Delivery</p>
                  <p className="text-sm text-muted-foreground">Fees vary based on urgency</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {deliveryOption === 'fast' && (
          <div className="space-y-2 pl-6">
            <Label htmlFor="delivery-time">Delivery Time Preference</Label>
            <RadioGroup 
              value={deliveryTime} 
              onValueChange={setDeliveryTime}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="cursor-pointer">
                  <div>
                    <p className="font-medium">Standard (45-90 min)</p>
                    <p className="text-sm text-muted-foreground">${getDeliveryFee()} delivery fee</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="cursor-pointer">
                  <div>
                    <p className="font-medium">Express (30-45 min)</p>
                    <p className="text-sm text-muted-foreground">${deliveryTime === 'express' ? getDeliveryFee() : 20} delivery fee</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="priority" id="priority" />
                <Label htmlFor="priority" className="cursor-pointer">
                  <div>
                    <p className="font-medium">Priority (15-30 min)</p>
                    <p className="text-sm text-muted-foreground">${deliveryTime === 'priority' ? getDeliveryFee() : 30} delivery fee</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="delivery-location">Delivery Notes</Label>
          <Input 
            id="delivery-location" 
            placeholder="Apartment number, access codes, or special instructions" 
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
          />
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Estimated Delivery Time:</strong> {estimatedDeliveryTime}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Note:</strong> Payment will be collected upon delivery. Please have the exact amount ready.
            Minimum delivery time depends on your location and selected options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CashOnDelivery;
