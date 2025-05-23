import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';

// Lazy-loaded components
const FeaturedNews = lazy(() => import('./components/FeaturedNews'));
const LatestNews = lazy(() => import('./components/LatestNews'));
const AutoAndCryptoNews = lazy(() => import('./components/AutoAndCryptoNews'));
const AboutUs = lazy(() => import('./components/AboutUs'));
const NewsDetails = lazy(() => import('./components/NewsDetail'));
const CategoryNewsPage = lazy(() => import('./components/CategoryNewsPage'));
const Contact = lazy(() => import('./components/Contact'));
const Trending = lazy(() => import('./components/Trending'));

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('preferredLanguage') || 'en');
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <Router>
      <AppContent
        language={language}
        onLanguageChange={handleLanguageChange}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </Router>
  );
}
function FullScreenLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-red-600 text-white relative">
      <div className="text-4xl font-bold absolute z-10">BuzzlyNow</div>
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
function AppContent({ language, onLanguageChange, isLoading, setIsLoading }) {
  const location = useLocation();
  const isHiddenPage = location.pathname.startsWith('/category/') || location.pathname.startsWith('/news/');

  useEffect(() => {
    if (isHiddenPage) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, [location.pathname]);

  return (
    <div className="bg-gray-50">
      {isLoading && <FullScreenLoader />}
      <Suspense fallback={<FullScreenLoader />}>
      {!isLoading && (
  <>
    <Header language={language} onLanguageChange={onLanguageChange} />
    <div>
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/"
          element={
            <main>
              <div className="px-4 md:px-10">
                <FeaturedNews language={language} />
              </div>
              <div className="px-4 md:px-10">
                <LatestNews language={language} />
              </div>
              {!isHiddenPage && <Trending language={language} />}
            </main>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/category/:lang/:category"
          element={<div className="px-4 md:px-40"><CategoryNewsPage /></div>}
        />
        <Route
          path="/news/:lang/:category/:slug"
          element={<div className="px-4"><NewsDetails /></div>}
        />
        <Route path="/news/:category/:slug" element={<Navigate to={`/news/${language}/:category/:slug`} replace />} />
        <Route path="/category/:category" element={<Navigate to={`/category/${language}/:category`} replace />} />
      </Routes>
    </div>

    {location.pathname === '/' && <AutoAndCryptoNews language={language} />}
    <Footer />
  </>
)}

      </Suspense>
    </div>
  );
}

export default App;