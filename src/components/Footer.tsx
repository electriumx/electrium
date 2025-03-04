
import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format time based on user's locale
  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  return (
    <footer id="footer" className="bg-black text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#9eff00]">Electrium</h3>
            <p className="text-gray-300">Your one-stop shop for premium electronics</p>
            <p className="text-gray-400 mt-2">Current Time: {formattedTime}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-[#9eff00]">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-[#9eff00]">About</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-[#9eff00]">Products</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-[#9eff00]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Apple</li>
              <li className="text-gray-300">Samsung</li>
              <li className="text-gray-300">Sony</li>
              <li className="text-gray-300">Google</li>
              <li className="text-gray-300">Microsoft</li>
              <li className="text-gray-300">Xiaomi</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">Email: electriumx@gmail.com</p>
            <p className="text-gray-300">Phone: +20 011 5468 4095</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Electrium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
