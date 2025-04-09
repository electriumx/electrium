
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black pt-20 flex flex-col items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8 bg-black/60 backdrop-blur-sm rounded-xl shadow-lg p-8"
      >
        <h1 className="text-4xl font-bold text-white">Thanks for visiting!</h1>
        <p className="text-xl text-gray-200">We appreciate your business.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-sage-500 text-white px-8 py-3 rounded-full text-lg font-medium 
                   hover:bg-sage-600 transition-colors"
        >
          Return to Shopping
        </button>
      </motion.div>
    </div>
  );
};

export default ThankYou;
