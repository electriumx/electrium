
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Get existing history or initialize it
    const storedRoutes = JSON.parse(sessionStorage.getItem('navigationHistory') || '[]');
    
    // Avoid duplicate entries and don't track back-to-back same routes
    if (storedRoutes.length === 0 || storedRoutes[storedRoutes.length - 1] !== currentPath) {
      storedRoutes.push(currentPath);
      sessionStorage.setItem('navigationHistory', JSON.stringify(storedRoutes));
    }
  }, [location]);

  return null; // This is a "headless" component that doesn't render anything
};

export default RouteTracker;
