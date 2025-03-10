
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CookieConsentProps {
  onAccept: () => void;
}

const CookieConsent = ({ onAccept }: CookieConsentProps) => {
  const [showManageOptions, setShowManageOptions] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always enabled
    analytics: true,
    marketing: false,
    preferences: true
  });

  const handleTogglePreference = (key: keyof typeof cookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setCookiePreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcceptAll = () => {
    setCookiePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
    onAccept();
  };

  const handleAcceptSelected = () => {
    onAccept();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] cookie-consent">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Cookie Consent</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This website uses cookies to ensure you get the best experience on our
              website. By continuing to use this site, you consent to our use of
              cookies.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowManageOptions(true)}
            >
              Manage Cookies
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onAccept}
            >
              Decline
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
      
      {/* Manage Cookies Dialog */}
      <Dialog open={showManageOptions} onOpenChange={(open) => !open && setShowManageOptions(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Cookie Preferences</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-medium text-sm">Necessary Cookies</label>
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.necessary} 
                  disabled 
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Required for the website to function properly. Cannot be disabled.
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-medium text-sm">Analytics Cookies</label>
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.analytics} 
                  onChange={() => handleTogglePreference('analytics')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Help us understand how visitors interact with our website.
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-medium text-sm">Marketing Cookies</label>
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.marketing} 
                  onChange={() => handleTogglePreference('marketing')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Used to track visitors across websites to display relevant advertisements.
              </p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-medium text-sm">Preference Cookies</label>
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.preferences} 
                  onChange={() => handleTogglePreference('preferences')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Allow the website to remember choices you make and provide enhanced functionality.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowManageOptions(false)}>
              Cancel
            </Button>
            <Button onClick={handleAcceptSelected}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CookieConsent;
