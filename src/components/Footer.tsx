
import { useState, useEffect } from 'react';
import { Globe, Mail, Phone, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTimeUTC, setCurrentTimeUTC] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const utcHours = now.getUTCHours().toString().padStart(2, '0');
      const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');
      setCurrentTimeUTC(`${utcHours}:${utcMinutes} UTC`);
    }, 60000);

    const now = new Date();
    const utcHours = now.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = now.getUTCMinutes().toString().padStart(2, '0');
    setCurrentTimeUTC(`${utcHours}:${utcMinutes} UTC`);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return <footer id="footer" className="bg-black text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#18a66e]">Electrium</h3>
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
              
              <div className="flex space-x-4 mt-4">
                <a href="https://www.instagram.com/electruim/" target="_blank" rel="noopener noreferrer" className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                
                <a href="https://www.linkedin.com/in/electruim-x-a84988354/" target="_blank" rel="noopener noreferrer" className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Electrium. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};

export default Footer;
