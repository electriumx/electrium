
import { motion } from 'framer-motion';

const Checkout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-4xl font-medium text-gray-900"
      >
        Hi! 👋
      </motion.div>
    </div>
  );
};

export default Checkout;
