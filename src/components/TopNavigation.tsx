
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart } from 'lucide-react';

const TopNavigation = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === '/';
  const { isAuthenticated } = useAuth();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full top-0 z-40">
      <div className="container mx-auto flex items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-[#9eff00] flex items-center gap-2">
          <img 
            src="/lovable-uploads/332dd32d-b893-48bd-8da7-73aa4bc107bb.png" 
            alt="Electrium Logo" 
            className="w-8 h-8"
          />
          Electrium
        </Link>
        
        {isIndexPage && (
          <div className="flex-1 flex justify-center gap-8">
            <Link to="/" className="text-white hover:text-[#9eff00] transition-colors">Explore</Link>
            <Link to="/about" className="text-white hover:text-[#9eff00] transition-colors">About</Link>
            <Link to="/discover" className="text-white hover:text-[#9eff00] transition-colors">Discover</Link>
            <a href="#footer" onClick={handleContactClick} className="text-white hover:text-[#9eff00] transition-colors">Contact</a>
            <Link to="/donation" className="text-white hover:text-[#9eff00] transition-colors">Donation</Link>
            <Link to="/wishlist" className="text-white hover:text-[#9eff00] transition-colors flex items-center gap-1">
              <Heart size={16} />
              Wishlist
            </Link>
          </div>
        )}
        
        <div className="ml-auto">
          {!isAuthenticated && (
            <Link
              to="/login"
              className="text-white hover:text-[#9eff00] transition-colors"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
