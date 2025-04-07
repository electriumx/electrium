import { motion } from 'framer-motion';
interface HeroProps {
  onExploreClick: () => void;
}
const Hero = ({
  onExploreClick
}: HeroProps) => {
  return <div className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=2000')] 
                   bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>
      <div className="relative z-10 h-full">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7
        }} className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-br from-[#FFFFFF] to-[#FFFFFF] bg-clip-text text-transparent">
              NEXT-GEN SHOPPING
            </span>
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3,
            duration: 0.7
          }} className="block text-3xl md:text-4xl font-light bg-gradient-to-br from-[#F2FCE2] to-[#0EA5E9] bg-clip-text text-transparent">
              Starts Here
            </motion.span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5,
          duration: 0.7
        }} className="text-lg md:text-xl mb-8 font-['Times_New_Roman'] bg-gradient-to-br from-[#F2FCE2] to-[#0EA5E9] bg-clip-text text-transparent">
            Quality products. Seamless shopping.
            <br />
            "Discover top-tier products designed to enhance your lifestyle."
          </motion.p>
          <motion.button initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7,
          duration: 0.7
        }} whileHover={{
          scale: 1.05
        }} onClick={onExploreClick} className="bg-[#9eff00] text-black px-8 py-3 rounded-full text-lg font-medium hover:bg-[#8bdf00] transition-colors">
            Upgrade Your World
          </motion.button>
        </div>
      </div>
    </div>;
};
export default Hero;