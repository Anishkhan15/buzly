import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function FeaturedNews({ language }) {
  const [latestNews, setLatestNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/latest/${language}`);
        const data = await res.json();
        setLatestNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchLatestNews();
  }, [language]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % latestNews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + latestNews.length) % latestNews.length);
  };

  useEffect(() => {
    if (latestNews.length > 1) {
      const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval); // Clean up the interval on component unmount or language change
    }
  }, [latestNews]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: News carousel */}
        <div className="relative h-[500px] overflow-hidden">
          {latestNews.length > 0 ? (
            <Link to={`/news/${latestNews[currentSlide]?._id || ''}`} className="block h-full">
              <img
                src={latestNews[currentSlide]?.image || 'https://via.placeholder.com/500'}
                alt={latestNews[currentSlide]?.title || 'No Title'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-end p-4">
                <h2 className="text-xl font-bold">{latestNews[currentSlide]?.title || 'No title available'}</h2>
              </div>
            </Link>
          ) : (
            <p className="text-center">Loading news...</p>
          )}
          {/* Navigation Arrows */}
          {latestNews.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <FiChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Right side: Latest articles (2x2 grid) */}
        <div className="grid grid-cols-2 gap-4">
          {latestNews.length > 1 ? (
            latestNews.slice(0, 4).map((news) => (
              <Link
                key={news._id}
                to={`/news/${news._id}`}
                className="relative h-[240px] group overflow-hidden"
              >
                <img
                  src={news.image || 'https://via.placeholder.com/240'}
                  alt={news.title || 'No Title'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-end p-4">
                  <h3 className="text-sm font-bold">{news.title || 'No title available'}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-2">Loading latest news...</p>
          )}
        </div>
      </div>
    </div>
  );
}
