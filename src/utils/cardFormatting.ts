
/**
 * Utilities for formatting and validating payment card information
 */

/**
 * Format a credit card number with spaces after every 4 digits
 * @param value - The card number to format
 * @returns Formatted card number string
 */
export const formatCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  // Group into chunks of 4 digits
  const groups = cleaned.match(/.{1,4}/g) || [];
  // Join with spaces
  return groups.join(' ').trim();
};

/**
 * Format expiry date with a slash after month
 * @param value - The expiry date to format
 * @returns Formatted expiry date (MM/YY)
 */
export const formatExpiryDate = (value: string): string => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');
  
  if (cleaned.length > 2) {
    return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
  }
  
  return cleaned;
};

/**
 * Validate credit card number using Luhn algorithm
 * @param number - The card number to validate
 * @returns Whether the card number is valid
 */
export const validateCardNumber = (number: string): boolean => {
  const cleaned = number.replace(/\D/g, '');
  
  // Check for valid length
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Format CVV/CVC code (3-4 digits)
 * @param value - The CVV to format
 * @returns Formatted CVV string (numbers only)
 */
export const formatCVV = (value: string): string => {
  return value.replace(/\D/g, '');
};
