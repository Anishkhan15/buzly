import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Newspaper,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Flag,
  Users,
  Monitor,
  Trophy,
  Briefcase,
  Landmark,
  Clapperboard,
  HeartPulse,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onLanguageChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [language, setLanguage] = useState('en');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { key: 'india', label: 'India', icon: <Flag className="w-5 h-5" /> },
    { key: 'international', label: 'International', icon: <Globe className="w-5 h-5" /> },
    { key: 'technology', label: 'Technology', icon: <Monitor className="w-5 h-5" /> },
    { key: 'sports', label: 'Sports', icon: <Trophy className="w-5 h-5" /> },
    { key: 'business', label: 'Business', icon: <Briefcase className="w-5 h-5" /> },
    { key: 'politics', label: 'Politics', icon: <Landmark className="w-5 h-5" /> },
    { key: 'entertainment', label: 'Entertainment', icon: <Clapperboard className="w-5 h-5" /> },
    { key: 'healthcare', label: 'Healthcare', icon: <HeartPulse className="w-5 h-5" /> },
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

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    onLanguageChange(lang);
    setIsMenuOpen(false);
    navigate(`/?lang=${lang}`);
  };

  const handleHomeClick = () => {
    navigate(`/?lang=${language}`);
    setIsMenuOpen(false);
  };

  const handleCategorySelect = (categoryKey) => {
    navigate(`/category/${language}/${categoryKey}`);
    setIsMenuOpen(false);
    setIsCategoryOpen(false);
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center font-bold text-gray-700">
            <button onClick={handleHomeClick} className="hover:text-red-600">Home</button>
            <a href="/about" className="hover:text-red-600">About Us</a>
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="hover:text-red-600">Categories</button>
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bg-white shadow-md mt-2 rounded-md w-48 z-50"
                  >
                    {categories.map((cat) => (
                      <li
                        key={cat.key}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCategorySelect(cat.key)}
                      >
                        {cat.label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <a href="/contact" className="hover:text-red-600">Contact Us</a>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-gray-600 hover:text-red-600">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Fullscreen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-40 flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center space-x-2" onClick={handleHomeClick}>
                  <Newspaper className="w-7 h-7 text-red-600" />
                  <h1 className="text-xl font-bold text-red-600">Buzzlynow</h1>
                </div>
                <button onClick={toggleMenu} className="text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex justify-around items-center text-lg font-semibold text-gray-700 py-6 border-b">
                <button onClick={handleHomeClick} className="hover:text-red-600">Home</button>
                <a href="/about" className="hover:text-red-600">About</a>
                <a href="/contact" className="hover:text-red-600">Contact</a>
              </div>

              {/* Mobile Categories */}
              <div className="grid grid-cols-2 gap-4 px-6 py-6 flex-grow">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    className="flex flex-col items-center justify-center text-gray-700 hover:text-red-600 text-sm font-medium"
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Mobile Footer */}
              <div className="flex justify-center items-center p-4 space-x-3 border-t">
                <Facebook className="w-5 h-5 text-gray-700 hover:text-red-600" />
                <Instagram className="w-5 h-5 text-gray-700 hover:text-red-600" />
                <Twitter className="w-5 h-5 text-gray-700 hover:text-red-600" />
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`px-3 py-1 rounded-full text-sm ${language === 'hi' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                >
                  HI
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
