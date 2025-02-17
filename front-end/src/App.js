import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

// Lazy-loaded components
const FeaturedNews = lazy(() => import('./components/FeaturedNews'));
const LatestNews = lazy(() => import('./components/LatestNews'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const NewsDetails = lazy(() => import('./components/NewsDetail'));
const CategoryNewsPage = lazy(() => import('./components/CategoryNewsPage'));
const Contact = lazy(() => import('./components/Contact'));
const Trending = lazy(() => import('./components/Trending'));

function App() {
  const [language, setLanguage] = useState('en'); 
  const [isLoading, setIsLoading] = useState(false); 

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <Router>
      <AppContent language={language} onLanguageChange={handleLanguageChange} isLoading={isLoading} setIsLoading={setIsLoading} />
    </Router>
  );
}

// ✅ Full-Screen Red Background Loader
function FullScreenLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-red-600 text-white relative">
      {/* Centered "BuzzlyNow" */}
      <div className="text-4xl font-bold absolute z-10">BuzzlyNow</div>

      {/* Rotating Circular Text BEHIND the main text */}
      <div className="absolute w-40 h-40 animate-spin-slow z-0">
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100
                m -80, 0
                a 80,80 0 1,1 160,0
                a 80,80 0 1,1 -160,0"
              fill="none"
            />
          </defs>
          <text fontSize="12" letterSpacing="3" className="fill-current text-white">
            <textPath xlinkHref="#circlePath" startOffset="50%">
              B U Z Z L Y N O W • B U Z Z L Y N O W • B U Z Z L Y N O W •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}


// ✅ Main App Content with Conditional API Loader
function AppContent({ language, onLanguageChange, isLoading, setIsLoading }) {
  const location = useLocation();
  const isHiddenPage = location.pathname.startsWith('/category/') || location.pathname.startsWith('/news/');

  // ✅ Only show API loader if fetching actual data (EXCEPT for About & Contact)
  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/about' && location.pathname !== '/contact') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulating API response time
    }
  }, [location.pathname]);

  return (
    <div className="bg-gray-50">
      {/* Show Loader only if API is fetching (except About & Contact) */}
      {isLoading && <FullScreenLoader />}

      {/* Ensure Suspense is handling lazy loading correctly */}
      <Suspense fallback={<FullScreenLoader />}>
        {!isLoading && (
          <>
            <Header language={language} onLanguageChange={onLanguageChange} />
            <div className="px-4 md:px-40">
              <Routes>
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/" element={<main><FeaturedNews language={language} /><LatestNews language={language} /></main>} />
                <Route path="/categories/:category" element={<Navigate to="/category/:category" replace />} />
                <Route path="/category/:category" element={<CategoryNewsPage language={language} />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news/:id" element={<NewsDetails language={language} />} />
              </Routes>
            </div>
            {!isHiddenPage && <Trending language={language} />}
            <Footer />
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
