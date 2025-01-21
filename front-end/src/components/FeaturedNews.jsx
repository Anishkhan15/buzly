import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedNews({ language }) {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/featured/${language}`)
      .then((res) => res.json())
      .then((data) => setFeaturedNews(data))
      .catch((error) => console.error('Error fetching featured news:', error));

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/latest/${language}`)
      .then((res) => res.json())
      .then((data) => setLatestNews(data))
      .catch((error) => console.error('Error fetching latest news:', error));
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
        {featuredNews.length > 0 && (
          <Link to={`/news/${featuredNews[currentSlide]._id}`} className="relative h-[500px] group overflow-hidden">
            <img
              src={featuredNews[currentSlide].image}
              alt={featuredNews[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col justify-end p-4">
              <h2 className="text-xl font-bold">{featuredNews[currentSlide].title}</h2>
              <p>{featuredNews[currentSlide].description}</p>
            </div>
          </Link>
        )}

        {/* Right side: Latest featured articles */}
        <div className="space-y-4">
          {latestNews.slice(0, 4).map((news) => (
            <Link
              key={news._id}
              to={`/news/${news._id}`}
              className="flex items-center space-x-4 hover:bg-gray-100 p-2 rounded"
            >
              <img src={news.image} alt={news.title} className="w-24 h-16 object-cover rounded" />
              <div>
                <h3 className="font-bold">{news.title}</h3>
                <p className="text-sm text-gray-600">{news.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
