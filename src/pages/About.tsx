
import { motion } from 'framer-motion';

const About = () => {
  const facts = [
    "E-commerce reduces environmental impact by minimizing physical store energy consumption",
    "Over 2.14 billion people worldwide shop online",
    "Mobile shopping accounts for over 70% of all e-commerce transactions",
    "Online shopping saves an average of 2 hours compared to traditional shopping",
    "Digital payment methods are 26% more secure than traditional methods",
    "Online marketplaces offer 73% more product variety than physical stores",
    "Customer reviews influence 93% of online purchase decisions",
    "Free shipping is the top factor in online purchase decisions",
    "Online shopping reduces impulse purchases by 18%",
    "E-commerce platforms operate 24/7, allowing shopping at any time"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Electrium</h1>
          <div className="space-y-6">
            <p className="text-gray-600 text-lg mb-8">
              Welcome to Electrium, your premier destination for electronic devices. We strive to provide the best shopping experience with a curated selection of high-quality products.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Facts About Online Shopping</h2>
            <ul className="space-y-4">
              {facts.map((fact, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center mr-3 mt-1">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{fact}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
