import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { translateText } from '@/utils/translation';
import { useState, useEffect } from 'react';
interface FloatingActionsProps {
  showCheckout?: boolean;
  cartItemCount?: number;
}
const FloatingActions = ({
  showCheckout = true,
  cartItemCount = 0
}: FloatingActionsProps) => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [wishlistCount, setWishlistCount] = useState(0);
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    // Get wishlist count from localStorage
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistCount(wishlist.length);
    };

    // Initial count
    updateWishlistCount();

    // Listen for wishlist changes
    window.addEventListener('storage', updateWishlistCount);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
      window.removeEventListener('storage', updateWishlistCount);
    };
  }, []);
  return <>
      {/* Cart Button - Bottom Left */}
      {showCheckout && cartItemCount > 0 && <div className="fixed bottom-6 left-6 z-40">
          <button onClick={() => navigate('/checkout')} aria-label={translateText("View Cart", currentLanguage)} className="flex items-center justify-center bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors px-[12px] py-[12px] text-base">
            <ShoppingCart className="mr-2" />
            <span>{translateText("Your Cart", currentLanguage)} ({cartItemCount})</span>
          </button>
        </div>}
      
      {/* Wishlist Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        
      </div>
    </>;
};
export default FloatingActions;