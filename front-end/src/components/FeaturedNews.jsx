import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function FeaturedNews({ language }) {
  const [latestNews, setLatestNews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/news/latest/${language}`
        );
        const data = await res.json();
        setLatestNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
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
      const interval = setInterval(nextSlide, 10000); // Changed to 10 seconds
      return () => clearInterval(interval);
    }
  }, [latestNews]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Featured News Slider */}
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-lg">
          {latestNews.length > 0 ? (
            <Link 
              to={`/news/${latestNews[currentSlide]?.category}/${latestNews[currentSlide]?.slug}`} 
              className="block h-full"
            >
              <img
                src={latestNews[currentSlide]?.image || "https://via.placeholder.com/500"}
                alt={latestNews[currentSlide]?.title || "No Title"}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex items-end text-white">
                <h2 className="text-xl md:text-2xl font-semibold">
                  {latestNews[currentSlide]?.title || "No title available"}
                </h2>
              </div>
            </Link>
          ) : (
            <p className="text-center text-gray-500">Loading news...</p>
          )}

          {/* Navigation Arrows */}
          {latestNews.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80"
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-3 rounded-full hover:bg-black/80"
              >
                <FiChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Right: Latest News Grid (Smaller Text Below Image) */}
        <div className="grid grid-cols-2 gap-4">
          {latestNews.length > 1 ? (
            latestNews.slice(0, 4).map((news) => (
              <Link
                key={news._id}
                to={`/news/${news.category}/${news.slug}`}
                className="relative h-[200px] md:h-[240px] rounded-xl overflow-hidden shadow-md transition-transform transform hover:scale-105"
              >
                <img
                  src={news.image || "https://via.placeholder.com/240"}
                  alt={news.title || "No Title"}
                  className="w-full h-full object-cover"
                />
                {/* Title Below Image */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm font-medium text-center py-2 px-3">
                  {news.title || "No title available"}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">Loading latest news...</p>
          )}
        </div>
      </div>
    </div>
  );
}
