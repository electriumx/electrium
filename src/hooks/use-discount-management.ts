
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type Discount = {
  value: number;
  expiresAt: number;
};

type Discounts = Record<string, Discount>;

export function useDiscountManagement() {
  const [discounts, setDiscounts] = useState<Discounts>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      try {
        const parsedDiscounts = JSON.parse(savedDiscounts);
        const formattedDiscounts: Discounts = {};
        
        Object.entries(parsedDiscounts).forEach(([brand, value]) => {
          if (typeof value === 'number') {
            // Skip discounts that don't have an expiresAt (not set by admin or wheel)
            return;
          } else if (typeof value === 'object' && value !== null && 'value' in value && 'expiresAt' in value) {
            formattedDiscounts[brand] = value as Discount;
          }
        });
        
        const currentTime = Date.now();
        Object.keys(formattedDiscounts).forEach(brand => {
          if (formattedDiscounts[brand].expiresAt < currentTime || formattedDiscounts[brand].value === 0) {
            delete formattedDiscounts[brand];
          }
        });
        
        setDiscounts(formattedDiscounts);
        localStorage.setItem('discounts', JSON.stringify(formattedDiscounts));
      } catch (error) {
        console.error('Error parsing discounts from localStorage:', error);
      }
    }
  }, []);

  const handleSpinWin = (brand: string, discount: number, expiresAt: number) => {
    if (discount <= 0 || discount > 100) {
      toast({
        variant: "destructive",
        title: "Invalid Discount",
        description: "The discount must be between 1% and 100%.",
      });
      return;
    }

    const newDiscounts = {
      ...discounts,
      [brand]: {
        value: discount,
        expiresAt
      }
    };
    
    setDiscounts(newDiscounts);
    localStorage.setItem('discounts', JSON.stringify(newDiscounts));
    
    toast({
      title: "Discount Applied!",
      description: `You've won a ${discount}% discount on all ${brand} products.`,
    });
  };

  return { discounts, handleSpinWin };
}
