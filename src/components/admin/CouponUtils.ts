

interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: number | null;
  description: string;
  isActive: boolean;
  category?: string;
}

interface UsedCoupon {
  code: string;
  usedBy: string;
  usedAt: number;
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

export const getUsedCoupons = (): UsedCoupon[] => {
  const savedUsedCoupons = localStorage.getItem('usedCoupons');
  if (savedUsedCoupons) {
    try {
      return JSON.parse(savedUsedCoupons);
    } catch (error) {
      console.error('Error parsing used coupons:', error);
      return [];
    }
  }
  return [];
};

export const saveCouponUsage = (code: string, userId: string) => {
  const usedCoupons = getUsedCoupons();
  
  usedCoupons.push({
    code,
    usedBy: userId,
    usedAt: Date.now()
  });
  
  localStorage.setItem('usedCoupons', JSON.stringify(usedCoupons));
};

export const applyCoupon = (code: string, userId: string, productCategory?: string): { valid: boolean; discount: number } => {
  const coupons = getCoupons();
  const usedCoupons = getUsedCoupons();
  
  // Check if coupon has already been used by this user
  const isUsed = usedCoupons.some(uc => uc.code === code && uc.usedBy === userId);
  
  if (isUsed) {
    return { valid: false, discount: 0 };
  }
  
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
  
  // Mark the coupon as used by this user
  saveCouponUsage(code, userId);
  
  return { valid: true, discount: coupon.discount };
};

