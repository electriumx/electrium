
import React from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";
import { Product } from '@/data/productData';

interface MobileOrderSummaryProps {
  expandedSection: string | null;
  toggleSectionExpansion: (section: string) => void;
  cart: Product[];
  calculateItemTotal: (item: Product) => number;
  calculateSubtotal: () => number;
  calculateShipping: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
  appliedCoupon: string | null;
  couponDiscount: number;
}

const MobileOrderSummary = ({
  expandedSection,
  toggleSectionExpansion,
  cart,
  calculateItemTotal,
  calculateSubtotal,
  calculateShipping,
  calculateTax,
  calculateTotal,
  appliedCoupon,
  couponDiscount
}: MobileOrderSummaryProps) => {
  return (
    <div className="lg:hidden mb-6">
      <div 
        className="bg-card p-4 rounded-lg border border-border flex justify-between items-center cursor-pointer"
        onClick={() => toggleSectionExpansion('items')}
      >
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="flex items-center">
          <span className="font-bold mr-2">${calculateTotal().toFixed(2)}</span>
          {expandedSection === 'items' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>
      
      {expandedSection === 'items' && (
        <div className="mt-2 p-4 bg-card rounded-lg border border-border">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex-shrink-0 w-16 h-16 bg-muted rounded overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  {/* Only show color if it's explicitly selected */}
                  {item.selectedColor && (
                    <p className="text-xs text-muted-foreground">
                      Color: {item.selectedColor}
                    </p>
                  )}
                  <p className="font-semibold">${calculateItemTotal(item).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-destructive">
                <span>Discount ({appliedCoupon})</span>
                <span>-${(couponDiscount / 100 * calculateSubtotal()).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t border-border">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileOrderSummary;
