
import { Link } from 'react-router-dom';

const TopNavigation = () => {
  return (
    <nav className="bg-black text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#9eff00]">
          Electrium
        </Link>
        
        <div className="flex gap-8">
          <Link to="/" className="hover:text-[#9eff00] transition-colors">Explore</Link>
          <Link to="/about" className="hover:text-[#9eff00] transition-colors">About</Link>
          <Link to="/discover" className="hover:text-[#9eff00] transition-colors">Discover</Link>
          <Link to="/contact" className="hover:text-[#9eff00] transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
