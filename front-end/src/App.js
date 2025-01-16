import React from 'react';
import Header from './components/Header';
import FeaturedNews from './components/FeaturedNews';
import LatestNews from './components/LatestNews';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

function App() {
  const currentPage = window.location.pathname;

  return (
    <div className="bg-gray-50">
      <Header />
      {/* Responsive padding: smaller on mobile, larger on medium screens and above */}
      <div className="px-4 md:px-40">
        {currentPage === '/about' ? (
          <AboutUs />
        ) : (
          <main>
            <FeaturedNews />
            <LatestNews />
          </main>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
