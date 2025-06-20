import { useState } from "react";
import { Code, Menu, X } from "lucide-react";
// import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              code<span className="text-purple-400">Nest</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/auth">
              <button variant="ghost" className="text-gray-300 hover:text-white">
                Login
              </button>
            </Link>
            <Link to="/auth">
              <button className="bg-purple-600 hover:bg-purple-700 text-white">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2">
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-white">
                Features
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-white">
                Pricing
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-white">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white">
                Contact
              </a>
              <div className="pt-4 pb-2 space-y-2">
                <Link to="/auth" className="block">
                  <button variant="ghost" className="w-full text-gray-300 hover:text-white">
                    Login
                  </button>
                </Link>
                <Link to="/auth" className="block">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;