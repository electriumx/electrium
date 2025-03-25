
import { useState, useEffect } from 'react';

// Global storage key for donations
const DONATIONS_STORAGE_KEY = 'globalDonations';
const DONATION_LIMIT = 1000000; // This is now the per-transaction limit, not total donations

export const useGlobalDonation = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  
  // Load total donations from localStorage on component mount
  useEffect(() => {
    const savedDonations = localStorage.getItem(DONATIONS_STORAGE_KEY);
    if (savedDonations) {
      setTotalDonations(parseFloat(savedDonations));
    }
  }, []);
  
  // Function to add a new donation (now with no total limit)
  const addDonation = (amount: number) => {
    // Only limit per transaction, not total
    if (amount > DONATION_LIMIT) {
      amount = DONATION_LIMIT;
    }
    
    const newTotal = totalDonations + amount;
    setTotalDonations(newTotal);
    localStorage.setItem(DONATIONS_STORAGE_KEY, newTotal.toString());
    return newTotal;
  };
  
  return {
    totalDonations,
    addDonation,
    DONATION_LIMIT
  };
};
