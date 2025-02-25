
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const hasSeenCookieConsent = localStorage.getItem("hasSeenCookieConsent");
      if (!hasSeenCookieConsent) {
        setIsVisible(true);
      }
    }
  }, [isAuthenticated]);

  const handleCookieChoice = (accepted: boolean) => {
    setIsAnimating(true);
    localStorage.setItem("hasSeenCookieConsent", "true");
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
