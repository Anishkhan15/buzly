import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import FeaturedNews from './components/FeaturedNews';
import LatestNews from './components/LatestNews';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import NewsDetails from './components/NewsDetail';
import CategoryNewsPage from './components/CategoryNewsPage';
import Contact from './components/Contact';

function App() {
  const [language, setLanguage] = useState('en'); // Default language is English

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Router>
      <div className="bg-gray-50">
        {/* Header with language selection */}
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <div className="px-4 md:px-40">
          <Routes>
            {/* Home page with Featured and Latest News */}
            <Route
              path="/"
              element={
                <main>
                  <FeaturedNews language={language} />
                  <LatestNews language={language} />
                </main>
              }
            />
            {/* Redirect old category path */}
            <Route
              path="/categories/:category"
              element={<Navigate to="/category/:category" replace />}
            />
            {/* Category-specific news */}
            <Route
  path="/category/:category"
  element={<CategoryNewsPage language={language} />}
/>
            {/* About Us page */}
            <Route path="/about" element={<AboutUs />} />
            {/* Contact page */}
            <Route path="/contact" element={<Contact />} />
            {/* News details page */}
            <Route
              path="/news/:id"
              element={<NewsDetails language={language} />}
            />
          </Routes>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
