import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FeaturedNews from './components/FeaturedNews';
import LatestNews from './components/LatestNews';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import NewsDetails from './components/NewsDetail';

function App() {
  return (
    <Router>
      <div className="bg-gray-50">
        <Header />
        <div className="px-4 md:px-40">
          <Routes>
            <Route path="/" element={
              <main>
                <FeaturedNews />
                <LatestNews />
              </main>
            } />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/news/:id" element={<NewsDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
