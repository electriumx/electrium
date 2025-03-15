
interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: number | null;
  description: string;
  isActive: boolean;
  category?: string;
}

export const getCoupons = (): Coupon[] => {
  const savedCoupons = localStorage.getItem('adminCoupons');
  if (savedCoupons) {
    try {
      return JSON.parse(savedCoupons);
    } catch (error) {
      console.error('Error parsing coupons:', error);
      return [];
    }
  }
  return [];
};

export const applyCoupon = (code: string, productCategory?: string): { valid: boolean; discount: number } => {
  const coupons = getCoupons();
  const coupon = coupons.find(
    c => c.code === code && c.isActive && (!c.expiresAt || c.expiresAt > Date.now())
  );
  
  if (!coupon) {
    return { valid: false, discount: 0 };
  }
  
  // If the coupon is category-specific, check if it applies
  if (coupon.category && coupon.category !== 'all' && coupon.category !== productCategory) {
    return { valid: false, discount: 0 };
  }
  
  return { valid: true, discount: coupon.discount };
};
