import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedNews() {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch featured news
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/featured`)
      .then((res) => res.json())
      .then((data) => setFeaturedNews(data));

    // Fetch latest news
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/latest`)
      .then((res) => res.json())
      .then((data) => setLatestNews(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredNews]);

  if (!featuredNews.length || !latestNews.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main featured article */}
        <Link to={`/news/${featuredNews[currentSlide]._id}`} className="relative h-[500px] group overflow-hidden">
          <img
            src={featuredNews[currentSlide].image}
            alt={featuredNews[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="absolute bottom-0 p-6">
              <span className="bg-red-600 text-white px-3 py-1 text-sm rounded-full">
                {featuredNews[currentSlide].category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mt-3">
                {featuredNews[currentSlide].title}
              </h2>
              <p className="text-gray-200 mt-2">{featuredNews[currentSlide].description}</p>
            </div>
          </div>
        </Link>

        {/* Latest news articles */}
        <div className="grid grid-cols-2 gap-4">
          {latestNews.map((item, index) => (
            <Link key={index} to={`/news/${item._id}`} className="relative h-[240px] group overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 p-4">
                  <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-2">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
