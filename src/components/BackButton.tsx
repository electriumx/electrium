
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if we have a stored route in session storage
    const storedRoutes = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]');
    
    if (storedRoutes.length > 1) {
      // Remove current route and go to previous one
      storedRoutes.pop();
      const previousRoute = storedRoutes[storedRoutes.length - 1];
      sessionStorage.setItem('navigationHistory', JSON.stringify(storedRoutes));
      navigate(previousRoute);
    } else {
      // Default to home if no history
      navigate('/');
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="absolute top-4 left-4 z-10" 
      onClick={handleBack}
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back
    </Button>
  );
};

export default BackButton;
