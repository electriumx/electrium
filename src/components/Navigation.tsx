
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 right-0 p-4 z-50 flex items-center gap-4">
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <span className="text-white">Welcome, {currentUser?.displayName || 'User'}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
