import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Newspaper, Facebook, Instagram, Twitter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onLanguageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const categories = [
    { key: 'india', label: 'India' },
    { key: 'international', label: 'International' },
    { key: 'technology', label: 'Technology' },
    { key: 'sports', label: 'Sports' },
    { key: 'business', label: 'Business' },
    { key: 'politics', label: 'Politics' },
    { key: 'entertainment', label: 'Entertainment' },
    { key: 'healthcare', label: 'Healthcare' },
  ];

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));

    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
      onLanguageChange(savedLanguage);
    } else {
      onLanguageChange('en');
    }
  }, [onLanguageChange]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    onLanguageChange(lang);
  };

  const handleHomeClick = () => {
    navigate(`/?lang=${language}`);
  };

  const handleCategorySelect = (categoryKey) => {
    navigate(`/category/${categoryKey}?lang=${language}`);
    setIsCategoryOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className="relative w-full">
      {/* Top Bar */}
      <div className="bg-black text-white text-sm font-bold py-3">
        <div className="container mx-auto px-4 md:px-20 flex justify-between items-center">
          <span>{currentDate}</span>
          <div className="flex items-center space-x-3">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/buzzly.now/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://x.com/buzzlynow03" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <Twitter className="w-5 h-5" />
            </a>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`px-3 py-1 rounded-full text-sm ${language === 'hi' ? 'bg-blue-600' : 'bg-gray-600'}`}
            >
              HI
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-20 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHomeClick}>
            <Newspaper className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-red-600">Buzzlynow</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={handleHomeClick} className="text-gray-700 font-bold hover:text-red-600">
              Home
            </button>
            <a href="/about" className="text-gray-700 font-bold hover:text-red-600">About Us</a>
            <div
              className="relative group"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="text-gray-700 font-bold hover:text-red-600 flex items-center">
                Categories <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bg-white shadow-md mt-2 rounded-md w-48"
                  >
                    <ul className="py-2">
                      {categories.map((category) => (
                        <li
                          key={category.key}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleCategorySelect(category.key)}
                        >
                          {category.label}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a href="/contact" className="text-gray-700 font-bold hover:text-red-600">Contact Us</a>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-gray-600 hover:text-red-600">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-md"
            >
              <nav className="flex flex-col space-y-4 p-4">
                <button onClick={handleHomeClick} className="text-gray-700 font-bold hover:text-red-600">
                  Home
                </button>
                <a href="/about" className="text-gray-700 font-bold hover:text-red-600">About Us</a>
                <button
                  onClick={toggleCategory}
                  className="text-gray-700 font-bold hover:text-red-600 flex items-center"
                >
                  Categories <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div className="bg-white shadow-md rounded-md">
                      <ul className="py-2">
                        {categories.map((category) => (
                          <li
                            key={category.key}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCategorySelect(category.key)}
                          >
                            {category.label}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                <a href="/contact" className="text-gray-700 font-bold hover:text-red-600">Contact Us</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
