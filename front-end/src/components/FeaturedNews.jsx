import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedNews({ language }) {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/featured/${language}`);
        const data = await res.json();
        setFeaturedNews(data);
      } catch (error) {
      }
    };

    const fetchLatestNews = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/latest/${language}`);
        const data = await res.json();
        setLatestNews(data);
      } catch (error) {
      }
    };

    fetchNews();
    fetchLatestNews();
  }, [language]);

  useEffect(() => {
    if (featuredNews.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredNews]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Featured news (carousel) */}
        {featuredNews.length > 0 ? (
          <Link
            to={`/news/${featuredNews[currentSlide]?._id || ''}`}
            className="relative h-[500px] group overflow-hidden"
          >
            <img
              src={featuredNews[currentSlide]?.image || 'https://via.placeholder.com/500'}
              alt={featuredNews[currentSlide]?.title || 'No Title'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-end p-4">
              <h2 className="text-xl font-bold">{featuredNews[currentSlide]?.title || 'No title available'}</h2>
            </div>
          </Link>
        ) : (
          <p className="text-center">Loading featured news...</p>
        )}

        {/* Right side: Latest featured articles (2x2 grid) */}
        <div className="grid grid-cols-2 gap-4">
          {latestNews.length > 0 ? (
            latestNews.slice(0, 4).map((news) => (
              <Link
                key={news._id || Math.random()}
                to={`/news/${news._id || ''}`}
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
