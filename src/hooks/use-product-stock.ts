
import { useState, useEffect } from 'react';
import { Product } from '../data/productData';
import { useToast } from '@/hooks/use-toast';

export function useProductStock(allProducts: Product[]) {
  const [productStocks, setProductStocks] = useState<Record<number, number>>({});
  const { toast } = useToast();

  const resetStocks = () => {
    const stockMap: Record<number, number> = {};
    allProducts.forEach(product => {
      stockMap[product.id] = 100;
    });
    setProductStocks(stockMap);
    localStorage.setItem('productStocks', JSON.stringify(stockMap));
    localStorage.setItem('lastStockReset', Date.now().toString());
    
    toast({
      title: "Stock Reset",
      description: "All product stocks have been reset to 100 units.",
    });
  };

  const checkStockReset = () => {
    const lastReset = localStorage.getItem('lastStockReset');
    const now = Date.now();
    
    if (!lastReset || (now - parseInt(lastReset)) > 12 * 60 * 60 * 1000) {
      resetStocks();
    }
  };

  const updateStock = (id: number, newStock: number) => {
    const updatedStocks = {
      ...productStocks,
      [id]: newStock
    };
    setProductStocks(updatedStocks);
    localStorage.setItem('productStocks', JSON.stringify(updatedStocks));
  };

  useEffect(() => {
    const savedStocks = localStorage.getItem('productStocks');
    if (savedStocks) {
      try {
        setProductStocks(JSON.parse(savedStocks));
        checkStockReset();
      } catch (error) {
        console.error('Error parsing product stocks:', error);
        resetStocks();
      }
    } else {
      resetStocks();
    }
    
    const stockResetInterval = setInterval(checkStockReset, 60 * 60 * 1000);
    
    return () => {
      clearInterval(stockResetInterval);
    };
  }, [allProducts.length]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const updatedStocks = { ...productStocks };
      let needsUpdate = false;
      
      allProducts.forEach(product => {
        if (updatedStocks[product.id] === undefined) {
          updatedStocks[product.id] = 100;
          needsUpdate = true;
        }
      });
      
      if (needsUpdate) {
        setProductStocks(updatedStocks);
        localStorage.setItem('productStocks', JSON.stringify(updatedStocks));
      }
    }
  }, [allProducts, productStocks]);

  return { productStocks, updateStock, resetStocks };
}
