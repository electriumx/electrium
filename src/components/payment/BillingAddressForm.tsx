
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface BillingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface BillingAddressFormProps {
  savedAddresses: string[];
  selectedAddress: string | null;
  handleAddressSelection: (address: string) => void;
  handleAddNewAddress: () => void;
  showAddressForm: boolean;
  billingAddress: BillingAddress;
  setBillingAddress: (address: BillingAddress) => void;
  sameAsShipping: boolean;
  setSameAsShipping: (same: boolean) => void;
}

const BillingAddressForm = ({
  savedAddresses,
  selectedAddress,
  handleAddressSelection,
  handleAddNewAddress,
  showAddressForm,
  billingAddress,
  setBillingAddress,
  sameAsShipping,
  setSameAsShipping
}: BillingAddressFormProps) => {
  return (
    <div>
      {savedAddresses.length > 0 && (
        <div className="space-y-4 mb-6">
          <RadioGroup value={selectedAddress || ''} onValueChange={handleAddressSelection} className="space-y-3">
            {savedAddresses.map((address, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={address} id={`address-${index}`} />
                <Label htmlFor={`address-${index}`} className="cursor-pointer">
                  {address}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <Button 
            variant="outline" 
            onClick={handleAddNewAddress}
            className="w-full"
          >
            + Add New Address
          </Button>
        </div>
      )}
      
      {showAddressForm && (
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input 
              id="full-name" 
              placeholder="John Doe" 
              value={billingAddress.name}
              onChange={(e) => setBillingAddress({...billingAddress, name: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input 
              id="street" 
              placeholder="123 Main St" 
              value={billingAddress.street}
              onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="New York" 
                value={billingAddress.city}
                onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                placeholder="NY" 
                value={billingAddress.state}
                onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input 
                id="zip" 
                placeholder="10001" 
                value={billingAddress.zip}
                onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input 
                id="country" 
                placeholder="United States" 
                value={billingAddress.country}
                onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="same-address" 
              checked={sameAsShipping}
              onCheckedChange={setSameAsShipping}
            />
            <Label htmlFor="same-address">Same as shipping address</Label>
          </div>
        </form>
      )}
    </div>
  );
};

export default BillingAddressForm;
