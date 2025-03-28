
/**
 * Utility functions for text formatting
 */

/**
 * Format text by capitalizing each word and replacing underscores with spaces
 * @param text - Text to format
 * @returns Formatted text
 */
export const formatText = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Truncate text to a specific length with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if necessary
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format currency value to include dollar sign and two decimal places
 * @param value - Numeric value to format as currency
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};
