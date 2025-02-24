
import { Link } from 'react-router-dom';

const TopNavigation = () => {
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-transparent text-white py-4 px-6 fixed w-full top-0 z-40">
      <div className="container mx-auto flex items-center">
        <Link to="/" className="text-2xl font-bold text-[#7E69AB]">
          Electrium
        </Link>
        
        <div className="flex-1 flex justify-center gap-8">
          <Link to="/" className="hover:text-[#7E69AB] transition-colors">Explore</Link>
          <Link to="/about" className="hover:text-[#7E69AB] transition-colors">About</Link>
          <Link to="/discover" className="hover:text-[#7E69AB] transition-colors">Discover</Link>
          <a href="#footer" onClick={handleContactClick} className="hover:text-[#7E69AB] transition-colors">Contact</a>
          <Link to="/donation" className="hover:text-[#7E69AB] transition-colors">Donation</Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
