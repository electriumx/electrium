
import { translateText } from '@/utils/translation';

interface ActiveDiscountsProps {
  discounts: Record<string, { value: number; expiresAt: number }>;
  currentLanguage: string;
}

const ActiveDiscounts = ({ discounts, currentLanguage }: ActiveDiscountsProps) => {
  // Function to capitalize first letter of each word and remove underscores
  const formatText = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const activeDiscounts = Object.entries(discounts)
    .filter(([_, discount]) => discount.value > 0 && discount.expiresAt > Date.now())
    .sort((a, b) => b[1].value - a[1].value);

  return (
    <div className="mb-6 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-lg font-semibold mb-2 text-center">{formatText(translateText("active_discounts", currentLanguage) || "Active Discounts")}</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {activeDiscounts.length > 0 ? (
          activeDiscounts.map(([brand, discount]) => {
            const now = Date.now();
            const timeRemaining = discount.expiresAt - now;
            const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
            return (
              <span key={brand} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-destructive text-white">
                {brand}: {discount.value}% {formatText(translateText("off", currentLanguage) || "Off")} ({hoursRemaining}h {formatText(translateText("left", currentLanguage) || "Left")})
              </span>
            );
          })
        ) : (
          <p className="text-muted-foreground">{formatText(translateText("no_active_discounts", currentLanguage) || "No Active Discounts")}</p>
        )}
      </div>
    </div>
  );
};

export default ActiveDiscounts;
