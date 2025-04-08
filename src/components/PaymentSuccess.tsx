
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

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

    // Launch confetti to celebrate
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Redirect to thank you page
    navigate('/thank-you');
  }, [navigate, toast]);

  return null;
};

export default PaymentSuccess;
