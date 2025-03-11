
import { useState, useEffect } from 'react';
import { Globe, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTimeUTC, setCurrentTimeUTC] = useState('');
  
  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Format UTC time
      const utcHours = now.getUTCHours().toString().padStart(2, '0');
      const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');
      setCurrentTimeUTC(`${utcHours}:${utcMinutes} UTC`);
    }, 60000);
    
    // Initial setting
    const now = new Date();
    const utcHours = now.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');
    setCurrentTimeUTC(`${utcHours}:${utcMinutes} UTC`);
    
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
            <div className="flex flex-col text-gray-400 mt-2 space-y-1">
              <p>Local Time: {formattedTime}</p>
              <p>Universal Time: {currentTimeUTC}</p>
            </div>
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
            <div className="space-y-3">
              <p className="text-gray-300 flex items-center gap-2">
                <Mail size={16} />
                <span>electriumx@gmail.com</span>
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <Phone size={16} />
                <span>+20 011 5468 4095</span>
              </p>
              <p className="text-gray-300 flex items-center gap-2">
                <Globe size={16} />
                <span>www.electrium.com</span>
              </p>
            </div>
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
