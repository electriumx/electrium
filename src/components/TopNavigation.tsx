
import { Link, useLocation } from 'react-router-dom';

const TopNavigation = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === '/';

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
            src="/lovable-uploads/72ebffff-bdd7-4309-b67c-3142e2a52726.png" 
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigation;
