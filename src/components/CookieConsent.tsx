
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const handleCookieChoice = (accepted: boolean) => {
    setIsAnimating(true);
    localStorage.setItem("cookieConsent", accepted ? "accepted" : "rejected");
    
    toast({
      title: accepted ? "Cookies Accepted" : "Cookies Rejected",
      description: accepted 
        ? "Thank you for accepting cookies" 
        : "You've opted out of cookies",
    });

    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 max-w-sm bg-card p-6 rounded-lg shadow-lg z-50 ${
      isAnimating ? "fade-out" : "fade-in"
    }`}>
      <h3 className="font-semibold mb-2">Cookie Consent</h3>
      <p className="text-sm text-muted-foreground mb-4">
        We use cookies to enhance your browsing experience and analyze our traffic.
      </p>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => handleCookieChoice(false)}
        >
          Reject
        </Button>
        <Button 
          onClick={() => handleCookieChoice(true)}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
