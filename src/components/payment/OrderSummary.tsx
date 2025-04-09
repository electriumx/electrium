
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Product } from '@/data/productData';

interface OrderSummaryProps {
  cart: Product[];
  calculateItemTotal: (item: Product) => number;
  calculateSubtotal: () => number;
  calculateShipping: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
  appliedCoupon: string | null;
  couponDiscount: number;
  discounts: Record<string, number>;
}

const OrderSummary = ({
  cart,
  calculateItemTotal,
  calculateSubtotal,
  calculateShipping,
  calculateTax,
  calculateTotal,
  appliedCoupon,
  couponDiscount,
  discounts
}: OrderSummaryProps) => {
  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex-shrink-0 w-20 h-20 bg-muted rounded overflow-hidden">
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
              {item.accessories && item.accessories.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  With: {item.accessories.filter(a => a.selected).map(a => a.name).join(', ')}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold">${calculateItemTotal(item).toFixed(2)}</p>
              {item.brand && discounts[item.brand] && (
                <p className="text-xs text-destructive">
                  {discounts[item.brand]}% off
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
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
          <span>Tax (8%)</span>
          <span>${calculateTax().toFixed(2)}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between text-destructive">
            <span>Discount ({appliedCoupon})</span>
            <span>-${(couponDiscount / 100 * calculateSubtotal()).toFixed(2)}</span>
          </div>
        )}
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${calculateTotal().toFixed(2)}</span>
      </div>
      
      <div className="mt-6 p-3 bg-muted/50 rounded-lg text-sm flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <AlertCircle size={18} className="text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">
          Orders usually ship within 1-2 business days. 
          Free shipping on orders over $100. 
          International shipping available.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
