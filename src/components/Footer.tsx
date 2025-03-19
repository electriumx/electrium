import { useState, useEffect } from 'react';
import { Globe, Mail, Phone, Instagram, Linkedin } from 'lucide-react';
import { translateText } from '@/utils/translation';
const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTimeUTC, setCurrentTimeUTC] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('english');
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    const handleLanguageChange = (e: CustomEvent) => {
      setCurrentLanguage(e.detail);
    };
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
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
    return () => {
      clearInterval(interval);
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
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
            <p className="text-gray-300">{translateText("Your one-stop shop for premium electronics", currentLanguage)}</p>
            <div className="flex flex-col text-gray-400 mt-2 space-y-1">
              <p>{translateText("Local Time", currentLanguage)}: {formattedTime}</p>
              <p>{translateText("Universal Time", currentLanguage)}: {currentTimeUTC}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{translateText("Contact Us", currentLanguage)}</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:info@electrium.com" className="hover:text-[#9eff00]">electruimx@gmail.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <a href="tel:+15551234567" className="hover:text-[#9eff00]">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <Instagram className="mr-2 h-4 w-4" />
                <a href="https://instagram.com/electrium" target="_blank" rel="noopener noreferrer" className="hover:text-[#9eff00]">
              </a>
              </li>
              <li className="flex items-center">
                <Linkedin className="mr-2 h-4 w-4" />
                <a href="https://linkedin.com/company/electrium" target="_blank" rel="noopener noreferrer" className="hover:text-[#9eff00]">Electrium Tech</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{translateText("Quick Links", currentLanguage)}</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-[#9eff00]">{translateText("Home", currentLanguage)}</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-[#9eff00]">{translateText("About", currentLanguage)}</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-[#9eff00]">{translateText("Products", currentLanguage)}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{translateText("Categories", currentLanguage)}</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Apple</li>
              <li className="text-gray-300">Samsung</li>
              <li className="text-gray-300">Sony</li>
              <li className="text-gray-300">Google</li>
              <li className="text-gray-300">Microsoft</li>
              <li className="text-gray-300">Xiaomi</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Electrium. {translateText("All Rights Reserved", currentLanguage)}.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;