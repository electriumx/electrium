
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Hero onExploreClick={handleExploreClick} />
    </div>
  );
};

export default Index;
