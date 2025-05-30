
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Settings, ArrowLeftRight } from 'lucide-react';
import BackButton from './BackButton';

interface TopNavigationProps {
  toggleChat: () => void;
}

const TopNavigation = ({
  toggleChat
}: TopNavigationProps) => {
  const location = useLocation();
  const isIndexPage = location.pathname === '/';
  const { isAuthenticated, currentUser } = useAuth();
  const showBackButton = location.pathname !== '/';
  
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <nav className="fixed w-full top-0 z-40">
      <div className="container mx-auto flex flex-wrap items-center py-4 px-6">
        <div className="flex flex-col items-start">
          <Link to="/" className="text-2xl font-bold text-[#18a66e] flex items-center gap-2">
            <img src="/lovable-uploads/332dd32d-b893-48bd-8da7-73aa4bc107bb.png" alt="Electrium Logo" className="w-8 h-8" />
            Electrium
          </Link>
          {showBackButton && <BackButton />}
        </div>
        
        {isIndexPage && (
          <div className="flex-1 flex justify-center gap-4 md:gap-8 mt-2 md:mt-0">
            <Link to="/about" className="text-white hover:text-[#9eff00] transition-colors">About</Link>
            <a href="#" onClick={handleContactClick} className="text-white hover:text-[#9eff00] transition-colors">Contact</a>
            <Link to="/trade" className="text-white hover:text-[#9eff00] transition-colors flex items-center gap-1">
              <ArrowLeftRight size={16} className="text-white" />
              <span>Trade</span>
            </Link>
          </div>
        )}
        
        <div className="ml-auto flex flex-wrap items-center gap-4">
          {/* Welcome Message */}
          {isAuthenticated && currentUser && (
            <div className="text-white font-medium mr-2">
              Welcome, {currentUser.displayName || currentUser.username}
            </div>
          )}
          
          {/* Settings Button */}
          <div className="flex items-center gap-2">
            <Link to="/settings" className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-80 transition-opacity" aria-label="Settings">
              <Settings size={20} className="text-white" />
            </Link>
          </div>
          
          {/* Wishlist Button */}
          <Link to="/wishlist" className="flex items-center justify-center w-8 h-8 rounded-full hover:opacity-80 transition-opacity" aria-label="View Wishlist">
            <Heart size={20} className="text-white" />
          </Link>
          
          {!isAuthenticated && (
            <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
