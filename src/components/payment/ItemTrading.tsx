
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash } from "lucide-react";

interface ItemTradingProps {
  searchValue: string;
  handleSearch: (query: string) => void;
  searchResults: string[];
  selectedTradeItem: string;
  setSelectedTradeItem: (item: string) => void;
  handleAddTradeItem: () => void;
  tradeItems: string[];
  handleRemoveTradeItem: (item: string) => void;
  searchTradeForValue: string;
  handleSearchTradeFor: (query: string) => void;
  searchTradeForResults: string[];
  selectedTradeForItem: string;
  setSelectedTradeForItem: (item: string) => void;
  handleAddTradeForItem: () => void;
  tradeForItems: string[];
  handleRemoveTradeForItem: (item: string) => void;
  tradeDescription: string;
  setTradeDescription: (description: string) => void;
  tradeItemCondition: string;
  setTradeItemCondition: (condition: string) => void;
  tradeValue: number;
  setTradeValue: (value: number) => void;
}

const ItemTrading = ({
  searchValue,
  handleSearch,
  searchResults,
  selectedTradeItem,
  setSelectedTradeItem,
  handleAddTradeItem,
  tradeItems,
  handleRemoveTradeItem,
  searchTradeForValue,
  handleSearchTradeFor,
  searchTradeForResults,
  selectedTradeForItem,
  setSelectedTradeForItem,
  handleAddTradeForItem,
  tradeForItems,
  handleRemoveTradeForItem,
  tradeDescription,
  setTradeDescription,
  tradeItemCondition,
  setTradeItemCondition,
  tradeValue,
  setTradeValue
}: ItemTradingProps) => {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground mb-4">Trade in your items for store credit to use with this purchase.</p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="trade-item-input">Item to Trade</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input 
                id="trade-item-input" 
                placeholder="PlayStation 4, iPhone 12, etc."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((result, idx) => (
                    <div 
                      key={idx} 
                      className="px-4 py-2 hover:bg-accent cursor-pointer"
                      onClick={() => {
                        setSelectedTradeItem(result);
                        handleSearch(result);
                      }}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button 
              onClick={handleAddTradeItem}
              type="button"
              disabled={!selectedTradeItem}
            >
              Add
            </Button>
          </div>
          {selectedTradeItem && (
            <p className="text-sm text-green-500 mt-1">
              Selected: {selectedTradeItem} (In Stock: Yes)
            </p>
          )}
        </div>
        
        <div className="space-y-2 mt-6">
          <Label htmlFor="trade-for-item-input">Item to Trade For</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input 
                id="trade-for-item-input" 
                placeholder="Search for items you want..."
                value={searchTradeForValue}
                onChange={(e) => handleSearchTradeFor(e.target.value)}
              />
              {searchTradeForResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchTradeForResults.map((result, idx) => (
                    <div 
                      key={idx} 
                      className="px-4 py-2 hover:bg-accent cursor-pointer"
                      onClick={() => {
                        setSelectedTradeForItem(result);
                        handleSearchTradeFor(result);
                      }}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button 
              onClick={handleAddTradeForItem}
              type="button"
              disabled={!selectedTradeForItem}
            >
              Add
            </Button>
          </div>
          {selectedTradeForItem && (
            <p className="text-sm text-green-500 mt-1">
              Selected: {selectedTradeForItem} (Available: Yes)
            </p>
          )}
        </div>
        
        {tradeForItems.length > 0 && (
          <div className="space-y-2">
            <Label>Items You Want</Label>
            <div className="space-y-2">
              {tradeForItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                  <span>{item}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveTradeForItem(item)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {tradeItems.length > 0 && (
          <div className="space-y-2">
            <Label>Items You're Trading</Label>
            <div className="space-y-2">
              {tradeItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                  <span>{item}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveTradeItem(item)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="trade-description">Item Description</Label>
          <Input 
            id="trade-description" 
            placeholder="Details about the items you're trading"
            value={tradeDescription}
            onChange={(e) => setTradeDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="trade-condition">Item Condition</Label>
          <RadioGroup 
            value={tradeItemCondition} 
            onValueChange={setTradeItemCondition}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="like-new" id="like-new" />
              <Label htmlFor="like-new">Like New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="good" id="good" />
              <Label htmlFor="good">Good</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fair" id="fair" />
              <Label htmlFor="fair">Fair</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="poor" id="poor" />
              <Label htmlFor="poor">Poor</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="trade-value">Estimated Trade Value ($)</Label>
          <Input 
            id="trade-value" 
            type="number"
            placeholder="0.00"
            value={tradeValue.toString()}
            onChange={(e) => setTradeValue(Number(e.target.value))}
          />
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> After placing your order, you'll receive instructions for sending or dropping off your trade items. 
            Final trade value will be determined upon inspection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemTrading;
