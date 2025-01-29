import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LatestNews({ language }) {
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/latest/${language}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setNews(data);
        } else {
          throw new Error("Expected JSON response, but got HTML");
        }
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchNews();
  }, [language]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 15);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'politics': 'bg-red-600',
      'technology': 'bg-blue-600',
      'sports': 'bg-green-600',
      'business': 'bg-purple-600',
      'entertainment': 'bg-yellow-600',
      'science': 'bg-indigo-600',
      'health': 'bg-pink-600'
    };
    return colors[category.toLowerCase()] || 'bg-gray-600';
  };

  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Latest News</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Article */}
        {news.length > 0 && (
          <div className="mb-12">
            <article 
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => navigate(`/news/${news[0]._id}`)}
            >
              <img
                src={news[0].image}
                alt={news[0].title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-8">
                <span className={`${getCategoryColor(news[0].category)} text-white px-3 py-1 text-sm rounded-full`}>
                  {news[0].category}
                </span>
                <h2 className="text-4xl font-bold text-white mt-3 mb-2 line-clamp-2">{news[0].title}</h2>
                <p className="text-gray-200 mb-4 line-clamp-2 text-lg">{news[0].description}</p>
                <div className="flex items-center text-gray-300 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDate(news[0].dateTime)}</span>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.slice(1, visibleCount).map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              onClick={() => navigate(`/news/${item._id}`)}
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`${getCategoryColor(item.category)} text-white px-3 py-1 text-sm rounded-full shadow-lg`}>
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {item.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{formatDate(item.dateTime)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < news.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}