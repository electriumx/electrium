
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CouponSectionProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedCoupon: string | null;
  handleApplyCoupon: () => void;
  couponDiscount: number;
}

const CouponSection = ({
  couponCode,
  setCouponCode,
  appliedCoupon,
  handleApplyCoupon,
  couponDiscount
}: CouponSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Have a Coupon?</h2>
      
      <div className="flex gap-2">
        <Input 
          placeholder="Enter coupon code" 
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          disabled={!!appliedCoupon}
        />
        <Button 
          variant={appliedCoupon ? "outline" : "default"} 
          onClick={appliedCoupon ? () => {
            setCouponCode('');
          } : handleApplyCoupon}
          className="whitespace-nowrap"
        >
          {appliedCoupon ? "Remove" : "Apply Coupon"}
        </Button>
      </div>
      
      {appliedCoupon && (
        <div className="mt-3 p-2 bg-green-500/10 rounded flex items-center gap-2 text-green-500">
          <CheckCircle size={16} />
          <span className="text-sm">Coupon "{appliedCoupon}" applied for {couponDiscount}% discount!</span>
        </div>
      )}
    </div>
  );
};

export default CouponSection;
