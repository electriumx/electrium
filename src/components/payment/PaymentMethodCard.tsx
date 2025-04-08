
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CreditCard } from "lucide-react";
import { formatCardNumber, formatExpiryDate } from '@/utils/cardFormatting';

interface SavedCard {
  id: string;
  name: string;
  number: string;
  expiry: string;
  default?: boolean;
}

interface PaymentMethodCardProps {
  savedCards: SavedCard[];
  selectedCard: string | null;
  onCardSelection: (cardId: string) => void;
  onAddNewCard: () => void;
  showCardForm: boolean;
  cardName: string;
  setCardName: (name: string) => void;
  cardNumber: string;
  setCardNumber: (number: string) => void;
  cardExpiry: string;
  setCardExpiry: (expiry: string) => void;
  cardCVV: string;
  setCardCVV: (cvv: string) => void;
  saveCard: boolean;
  setSaveCard: (save: boolean) => void;
  isDefault: boolean;
  setIsDefault: (isDefault: boolean) => void;
}

const PaymentMethodCard = ({
  savedCards,
  selectedCard,
  onCardSelection,
  onAddNewCard,
  showCardForm,
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCVV,
  setCardCVV,
  saveCard,
  setSaveCard,
  isDefault,
  setIsDefault
}: PaymentMethodCardProps) => {
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardExpiry(formatted.substring(0, 5));
  };

  return (
    <>
      {savedCards.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Saved Cards</h3>
          
          <RadioGroup value={selectedCard || ''} onValueChange={onCardSelection} className="space-y-3">
            {savedCards.map(card => (
              <div key={card.id} className="flex items-center space-x-2">
                <RadioGroupItem value={card.id} id={card.id} />
                <Label htmlFor={card.id} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{card.name}</p>
                      <p className="text-sm text-muted-foreground">
                        •••• {card.number.slice(-4)} • Expires {card.expiry}
                      </p>
                    </div>
                    {card.default && (
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">Default</span>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <Button 
            variant="outline" 
            onClick={onAddNewCard}
            className="w-full"
          >
            + Add New Card
          </Button>
        </div>
      )}
      
      {showCardForm && (
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-name">Cardholder Name</Label>
            <Input 
              id="card-name" 
              placeholder="John Doe" 
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
              <Input 
                id="card-number" 
                placeholder="1234 5678 9012 3456" 
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                required
              />
              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input 
                id="expiry" 
                placeholder="MM/YY" 
                value={cardExpiry}
                onChange={handleExpiryChange}
                maxLength={5}
                required
              />
            </div>
            
            <div className="w-1/2 space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input 
                id="cvv" 
                placeholder="123" 
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').substring(0, 3))}
                maxLength={3}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="save-card" 
                checked={saveCard}
                onCheckedChange={setSaveCard}
              />
              <Label htmlFor="save-card">Save card for future purchases</Label>
            </div>
            
            {saveCard && (
              <div className="flex items-center space-x-2 ml-6">
                <Switch 
                  id="default-card" 
                  checked={isDefault}
                  onCheckedChange={setIsDefault}
                />
                <Label htmlFor="default-card">Set as default payment method</Label>
              </div>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default PaymentMethodCard;
