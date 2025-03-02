
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "../contexts/AuthContext";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const hasSeenCookieConsent = sessionStorage.getItem("hasSeenCookieConsent");
    if (!hasSeenCookieConsent) {
      setIsVisible(true);
      
      // Auto-dismiss after 2 seconds
      const autoDismissTimer = setTimeout(() => {
        handleCookieChoice(true); // Auto-accept cookies
      }, 2000);
      
      return () => clearTimeout(autoDismissTimer);
    }
  }, []);

  const handleCookieChoice = (accepted: boolean) => {
    setIsAnimating(true);
    sessionStorage.setItem("hasSeenCookieConsent", "true");
    localStorage.setItem("cookieConsent", accepted ? "accepted" : "rejected");
    
    toast({
      title: accepted ? "All Cookies Accepted" : "All Cookies Rejected",
      description: accepted 
        ? "Thank you for accepting all cookies" 
        : "You've opted out of all cookies",
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
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-foreground">Cookie Consent</h3>
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => setShowManage(prev => !prev)}
        >
          Manage Cookies
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        We use cookies to enhance your browsing experience and analyze our traffic.
      </p>
      {showManage ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Essential Cookies</span>
            <input type="checkbox" checked disabled className="accent-sage-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Analytics Cookies</span>
            <input type="checkbox" className="accent-sage-500" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Marketing Cookies</span>
            <input type="checkbox" className="accent-sage-500" />
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => handleCookieChoice(false)}
          >
            Reject All
          </Button>
          <Button 
            onClick={() => handleCookieChoice(true)}
          >
            Accept All
          </Button>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
