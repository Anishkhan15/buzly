import React, { useState, useEffect } from 'react';
import { Menu, X, Newspaper, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchCategoryNews = (category) => {
    window.location.href = `/categories/${category}`;
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
          <div className="flex items-center justify-between h-16 group">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Newspaper className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-bold text-red-600">Buzzlynow</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 relative">
              <a href="/" className="text-gray-700 font-bold hover:text-red-600">Home</a>
              <a href="/about" className="text-gray-700 font-bold hover:text-red-600">About Us</a>
              <div
  className="relative group"
  onMouseEnter={() => setIsCategoryOpen(true)}
  onMouseLeave={() => setIsCategoryOpen(false)}
>
  <a href="#" className="text-gray-700 font-bold hover:text-red-600">Categories</a>
  {isCategoryOpen && (
    <div className="absolute top-full left-0 md:left-auto md:right-0 bg-white shadow-lg py-4 z-50 w-full md:w-auto">
      <div className="flex flex-col md:flex-row md:space-x-4 px-4 md:px-8">
        <button
          onClick={() => fetchCategoryNews('india')}
          className="text-gray-700 font-bold hover:text-red-600"
        >
          India
        </button>
        <button
          onClick={() => fetchCategoryNews('business')}
          className="text-gray-700 font-bold hover:text-red-600"
        >
          Business
        </button>
        <button
          onClick={() => fetchCategoryNews('politics')}
          className="text-gray-700 font-bold hover:text-red-600"
        >
          Politics
        </button>
        <button
          onClick={() => fetchCategoryNews('international')}
          className="text-gray-700 font-bold hover:text-red-600"
        >
          International
        </button>
        <button
          onClick={() => fetchCategoryNews('sports')}
          className="text-gray-700 font-bold hover:text-red-600"
        >
          Sports
        </button>
        <button
          onClick={() => fetchCategoryNews('entertainment')}
          className="text-gray-700 font-bold hover:text-red-600"
        >
          Entertainment
        </button>
      </div>
    </div>
 

                )}
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="flex flex-col space-y-4 p-4">
              <a href="/" className="text-gray-700 font-bold hover:text-red-600">Home</a>
              <a href="/about" className="text-gray-700 font-bold hover:text-red-600">About Us</a>
              <button
                onClick={toggleMenu}
                className="text-gray-700 font-bold hover:text-red-600"
              >
                Categories
              </button>
              {isMenuOpen && (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => fetchCategoryNews('india')}
                    className="text-gray-700 font-bold hover:text-red-600"
                  >
                    India
                  </button>
                  <button
                    onClick={() => fetchCategoryNews('business')}
                    className="text-gray-700 font-bold hover:text-red-600"
                  >
                    Business
                  </button>
                  <button
                    onClick={() => fetchCategoryNews('politics')}
                    className="text-gray-700 font-bold hover:text-red-600"
                  >
                    Politics
                  </button>
                  <button
                    onClick={() => fetchCategoryNews('international')}
                    className="text-gray-700 font-bold hover:text-red-600"
                  >
                    International
                  </button>
                  <button
                    onClick={() => fetchCategoryNews('sports')}
                    className="text-gray-700 font-bold hover:text-red-600"
                  >
                    Sports
                  </button>
                  <button
                    onClick={() => fetchCategoryNews('entertainment')}
                    className="text-gray-700 font-bold hover:text-red-600"
                  >
                    Entertainment
                  </button>
                </div>
              )}
              <a href="/contact" className="text-gray-700 font-bold hover:text-red-600">Contact Us</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
