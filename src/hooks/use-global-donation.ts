
import { useState, useEffect } from 'react';

// Global storage key for donations
const DONATIONS_STORAGE_KEY = 'globalDonations';
const DONATION_LIMIT = 1000000;

export const useGlobalDonation = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  
  // Load total donations from localStorage on component mount
  useEffect(() => {
    const savedDonations = localStorage.getItem(DONATIONS_STORAGE_KEY);
    if (savedDonations) {
      setTotalDonations(parseFloat(savedDonations));
    }
  }, []);
  
  // Function to add a new donation
  const addDonation = (amount: number) => {
    const newTotal = Math.min(totalDonations + amount, DONATION_LIMIT);
    setTotalDonations(newTotal);
    localStorage.setItem(DONATIONS_STORAGE_KEY, newTotal.toString());
    return newTotal;
  };
  
  return {
    totalDonations,
    addDonation
  };
};
