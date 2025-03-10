
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 right-0 p-4 z-50">
      {!isAuthenticated && (
        <Link
          to="/login"
          className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
        >
          Log In
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
