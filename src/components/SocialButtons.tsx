
import { Facebook, Instagram, Linkedin, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const SocialButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {/* Settings Button */}
      <Link
        to="/settings"
        className="p-2 bg-black/20 backdrop-blur-sm rounded-full transition-transform hover:rotate-180 duration-300"
      >
        <Settings className="w-6 h-6 text-white" />
      </Link>
      
      {/* Social Media Links */}
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
      >
        <Instagram className="w-6 h-6 text-white" />
      </a>
      
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
      >
        <Linkedin className="w-6 h-6 text-white" />
      </a>
      
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
      >
        <Facebook className="w-6 h-6 text-white" />
      </a>
    </div>
  );
};

export default SocialButtons;
