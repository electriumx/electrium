
import { motion } from 'framer-motion';

const About = () => {
  const facts = [
    "Founded in 2024, Electrium has revolutionized the tech shopping experience",
    "We partner with leading brands like Apple, Samsung, and Sony",
    "Our platform processes over 10,000 transactions daily",
    "We offer a unique trade-in program for your old devices",
    "Customer satisfaction rate of 98% based on verified reviews",
    "Same-day delivery available in selected metropolitan areas",
    "24/7 customer support through multiple channels",
    "Green initiative: All packaging is 100% recyclable",
    "Price match guarantee on all products",
    "Regular tech workshops and product launches for our community"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=2000')] 
                     bg-cover bg-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
        </div>
        
        <div className="relative z-10 pt-24 px-4">
          <div className="container mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-12 text-center"
            >
              About Electrium
            </motion.h1>
            
            <div className="grid gap-8 max-w-4xl mx-auto">
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-[#9eff00] mb-2">Fact #{index + 1}</h3>
                  <p className="text-gray-200">{fact}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
