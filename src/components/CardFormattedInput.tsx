
import { useState, useRef, ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { translateText } from '@/utils/translation';

interface CardFormattedInputProps {
  type: 'cardNumber' | 'expiryDate' | 'cvv';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: string;
}

const CardFormattedInput = ({ 
  type, 
  value, 
  onChange, 
  placeholder = '', 
  language = 'english' 
}: CardFormattedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 16 digits (standard credit card length)
    const trimmed = digits.slice(0, 16);
    
    // Add spaces every 4 digits
    const formatted = trimmed.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 4 digits (MM/YY)
    const trimmed = digits.slice(0, 4);
    
    // Add slash after first 2 digits if there are more than 2
    if (trimmed.length > 2) {
      return `${trimmed.slice(0, 2)}/${trimmed.slice(2)}`;
    }
    
    return trimmed;
  };

  const formatCVV = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Limit to 3 or 4 digits (CVV/CVC)
    return digits.slice(0, 4);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let formattedValue = e.target.value;
    
    switch (type) {
      case 'cardNumber':
        formattedValue = formatCardNumber(e.target.value);
        break;
      case 'expiryDate':
        formattedValue = formatExpiryDate(e.target.value);
        break;
      case 'cvv':
        formattedValue = formatCVV(e.target.value);
        break;
    }
    
    onChange(formattedValue);
  };

  // Generate placeholder based on type
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    switch (type) {
      case 'cardNumber':
        return translateText('card_number_placeholder', language) || '0000 0000 0000 0000';
      case 'expiryDate':
        return translateText('expiry_date_placeholder', language) || 'MM/YY';
      case 'cvv':
        return translateText('cvv_placeholder', language) || 'CVV';
      default:
        return '';
    }
  };

  // Get input type
  const getInputType = () => {
    if (type === 'cvv') return 'password';
    return 'text';
  };

  // Get max length
  const getMaxLength = () => {
    switch (type) {
      case 'cardNumber':
        return 19; // 16 digits + 3 spaces
      case 'expiryDate':
        return 5; // MM/YY
      case 'cvv':
        return 4;
      default:
        return undefined;
    }
  };

  return (
    <Input
      ref={inputRef}
      type={getInputType()}
      value={value}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={getPlaceholder()}
      className={`${isFocused ? 'border-primary' : ''}`}
      maxLength={getMaxLength()}
      inputMode="numeric"
    />
  );
};

export default CardFormattedInput;
