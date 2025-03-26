
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the cart after successful payment
    localStorage.removeItem('cart');
    
    toast({
      title: "Payment Successful",
      description: "Thank you for your purchase!"
    });

    // Redirect to thank you page
    navigate('/thank-you');
  }, [navigate]);

  return null;
};

export default PaymentSuccess;
