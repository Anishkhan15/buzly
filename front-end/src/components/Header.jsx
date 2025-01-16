import React, { useState, useEffect } from 'react';
import { Menu, X, Newspaper, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative">
      {/* Top Black Bar */}
      <div className="bg-black text-white text-sm font-bold py-4">
        <div className="container mx-auto px-4 md:px-40 flex justify-between items-center">
          {/* Left: Date */}
          <span>{currentDate}</span>

          {/* Right: Contact and Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="/contact" className="hover:text-red-600">Contact Us</a>
            <a href="#" className="hover:text-red-600">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-600">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-red-600">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-40">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Newspaper className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-bold text-red-600">Buzzlynow</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 relative">
              <a href="/" className="text-gray-700 font-bold hover:text-red-600">Home</a>
              <a href="/about" className="text-gray-700 font-bold hover:text-red-600">About Us</a>
              <div className="group relative">
                <a
                  href="/categories"
                  className="text-gray-700 font-bold hover:text-red-600"
                >
                  Categories
                </a>
                <div className="absolute left-0 top-full mt-2 hidden group-hover:flex flex-col bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden">
                  <a href="/categories/india" className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600">India</a>
                  <a href="/categories/business" className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600">Business</a>
                  <a href="/categories/politics" className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600">Politics</a>
                  <a href="/categories/international" className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600">International</a>
                  <a href="/categories/sports" className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600">Sports</a>
                  <a href="/categories/entertainment" className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-600">Entertainment</a>
                </div>
              </div>
              <a href="/contact" className="text-gray-700 font-bold hover:text-red-600">Contact Us</a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-red-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-center transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white hover:text-red-600"
          >
            <X className="w-8 h-8" />
          </button>
          <nav className="space-y-4 text-xl font-semibold">
            <a href="/" className="hover:text-red-600" onClick={toggleMenu}>Home</a>
            <a href="/about" className="hover:text-red-600" onClick={toggleMenu}>About Us</a>
            <div className="space-y-2">
              <a href="/categories" className="hover:text-red-600" onClick={toggleMenu}>Categories</a>
              <ul className="space-y-2 pl-4">
                <li><a href="/categories/india" className="hover:text-red-600" onClick={toggleMenu}>India</a></li>
                <li><a href="/categories/business" className="hover:text-red-600" onClick={toggleMenu}>Business</a></li>
                <li><a href="/categories/politics" className="hover:text-red-600" onClick={toggleMenu}>Politics</a></li>
                <li><a href="/categories/international" className="hover:text-red-600" onClick={toggleMenu}>International</a></li>
                <li><a href="/categories/sports" className="hover:text-red-600" onClick={toggleMenu}>Sports</a></li>
                <li><a href="/categories/entertainment" className="hover:text-red-600" onClick={toggleMenu}>Entertainment</a></li>
              </ul>
            </div>
            <a href="/contact" className="hover:text-red-600" onClick={toggleMenu}>Contact Us</a>
          </nav>
        </div>
      )}
    </header>
  );
}
