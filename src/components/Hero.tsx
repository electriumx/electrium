import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
interface HeroProps {
  onExploreClick: () => void;
}
const Hero = ({
  onExploreClick
}: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  const handleStartClick = () => {
    onExploreClick();
  };
  return <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
        <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600" variants={itemVariants}>
          NEXT-GEN SHOPPING
        </motion.h1>
        
        <motion.p className="text-xl md:text-2xl mb-8 text-gray-300" variants={itemVariants}>Experience the future of online shopping right here</motion.p>
        
        <motion.div className="flex flex-col sm:flex-row justify-center gap-4" variants={itemVariants}>
          <Button size="lg" onClick={handleStartClick} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 rounded-lg text-lg font-semibold">
            Start Here
          </Button>
          
          
        </motion.div>
      </motion.div>
    </div>;
};
export default Hero;