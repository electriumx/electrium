
import { Button } from "@/components/ui/button";

interface CookieConsentProps {
  onAccept: () => void;
}

const CookieConsent = ({ onAccept }: CookieConsentProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-card border-t border-border z-50 p-4 cookie-consent">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm md:text-base">
          <p>
            This website uses cookies to ensure you get the best experience on our
            website. By continuing to use this site, you consent to our use of
            cookies.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAccept}
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={onAccept}
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
