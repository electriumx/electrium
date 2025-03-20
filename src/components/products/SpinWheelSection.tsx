
import { translateText } from '@/utils/translation';
import SpinWheel from '../SpinWheel';

interface SpinWheelSectionProps {
  showSpinWheel: boolean;
  setShowSpinWheel: (show: boolean) => void;
  onWin: (brand: string, discount: number, expiresAt: number) => void;
  currentLanguage: string;
}

const SpinWheelSection = ({ 
  showSpinWheel, 
  setShowSpinWheel, 
  onWin,
  currentLanguage 
}: SpinWheelSectionProps) => {
  // Function to capitalize first letter of each word and remove underscores
  const formatText = (text: string) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <>
      <div className="mb-6 flex justify-center">
        <button 
          onClick={() => setShowSpinWheel(!showSpinWheel)} 
          className="px-4 py-2 bg-card text-foreground rounded-md border border-border hover:bg-accent transition-colors"
        >
          {showSpinWheel 
            ? formatText(translateText("hide_spin", currentLanguage) || "Hide Spin") 
            : "Try Your Luck With A Daily Spin!"}
        </button>
      </div>
      
      {showSpinWheel && (
        <div className="mb-4 text-center">
          <SpinWheel onWin={onWin} />
        </div>
      )}
    </>
  );
};

export default SpinWheelSection;
