import React from 'react';
import { Link } from 'react-router-dom';
import { Film, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors">
            <Film className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CineMax
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Movies
            </Link>
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-5 h-5" />
              <span className="text-sm">Arshdeep Singh Kohli</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;