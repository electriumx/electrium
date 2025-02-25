
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Clear the cart after successful payment
    localStorage.removeItem('cart');
    
    toast({
      title: "Payment Successful",
      description: "Thank you for your purchase!"
    });

    // Redirect to thank you page
    navigate('/thank-you');
  }, [navigate, toast]);

  return null;
};

export default PaymentSuccess;
