import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Trending = ({ language }) => {
  const [news, setNews] = useState([]);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${backendUrl}/api/news/latest/${language}`);

        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching trending news:", error);
      }
    };

    fetchNews();
  }, [language]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        // If reached the end, scroll back to start
        if (
          scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth >=
          scrollContainerRef.current.scrollWidth
        ) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white py-6 px-4 pb-10 relative">
      <h2 className="text-xl font-semibold font-serif border-b border-gray-600 pb-2">
        Discover More from Buzzlynow
      </h2>

      <div className="relative mt-4">
        {/* Left Arrow Button */}
        <button
          onClick={scrollLeft}
          className="absolute -left-3 sm:left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-1.5 sm:p-3 rounded-full z-10 text-white text-sm"
        >
          ◀
        </button>
       {/* Scrollable News Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {news.map((article) => (
            <div
              key={article._id}
              onClick={() =>
                navigate(`/news/${language}/${article.category}/${article.slug || article._id}`)
              }
              className="w-full sm:w-72 bg-gray-900 p-4 rounded-lg flex-shrink-0 cursor-pointer hover:bg-gray-800 transition snap-center"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{article.title}</h3>
              <p className="text-sm text-gray-400">{article.description.slice(0, 100)}...</p>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={scrollRight}
          className="absolute -right-3 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-1.5 sm:p-3 rounded-full z-10 text-white text-sm"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Trending;