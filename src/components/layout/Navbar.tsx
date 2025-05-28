import React from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="bg-dark-900 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/templates"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/templates' 
                      ? 'text-primary' 
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  Templates
                </Link>
                <Link
                  to="/my-memes"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/my-memes' 
                      ? 'text-primary' 
                      : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  My Memes
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="flex items-center text-sm px-4 py-2 leading-none border rounded-md border-primary text-primary hover:text-dark-900 hover:bg-primary transition duration-150 ease-in-out"
            >
              <Sparkles size={16} className="mr-2" />
              Sign Up
            </Link>
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-dark-800 animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/templates"
              className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Templates
            </Link>
            <Link
              to="/my-memes"
              className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              My Memes
            </Link>
            <Link
              to="/auth/login"
              className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
            <Link
              to="/auth/signup"
              className="flex items-center mt-4 w-full text-sm px-4 py-2 leading-none border rounded-md border-primary text-primary hover:text-dark-900 hover:bg-primary transition duration-150 ease-in-out"
            >
              <Sparkles size={16} className="mr-2" />
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;