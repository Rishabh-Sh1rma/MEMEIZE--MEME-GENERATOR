import React from 'react';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-white text-lg font-bold mb-4 md:mb-0">MEMEIZE BY RISHABH SHARMA</h2>
        <p className="text-gray-400 text-center md:text-left">
          Create, customize, and share memes in seconds. The fastest way to go from idea to viral content.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-primary transition">
            <Github size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-primary transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-primary transition">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
