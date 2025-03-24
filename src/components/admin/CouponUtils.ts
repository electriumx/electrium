
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

// Global variable in localStorage to ensure consistent access across devices
const COUPONS_STORAGE_KEY = 'globalAdminCoupons';
const USED_COUPONS_STORAGE_KEY = 'globalUsedCoupons';

export const getCoupons = (): Coupon[] => {
  const savedCoupons = localStorage.getItem(COUPONS_STORAGE_KEY);
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
  const savedUsedCoupons = localStorage.getItem(USED_COUPONS_STORAGE_KEY);
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
  
  localStorage.setItem(USED_COUPONS_STORAGE_KEY, JSON.stringify(usedCoupons));
};

export const applyCoupon = (code: string, userId: string, productCategory?: string): { valid: boolean; discount: number } => {
  const coupons = getCoupons();
  
  // We're removing the check for previously used coupons to allow reuse across accounts
  // Instead we'll just validate that the coupon exists and is valid
  
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
  
  // Still record usage for analytics purposes
  saveCouponUsage(code, userId);
  
  return { valid: true, discount: coupon.discount };
};
