import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LatestNews({ language }) {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const categories = ['business', 'sports', 'politics', 'technology', 'india', 'international', 'entertainment', 'healthcare'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/news/latest/${language}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setNews(data);
        } else {
          throw new Error('Expected JSON response, but got HTML');
        }
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };

    fetchNews();
  }, [language]);

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

  const truncateTitle = (title) => {
    if (title.length > 70) {
      return title.substring(0, 70) + '...';
    }
    return title;
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
        {/* Categories Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category} className="bg-white p-4 rounded-lg shadow-md">
              <h2
                className="text-xl font-semibold text-black cursor-pointer mb-3 hover:underline italic"
                onClick={() => navigate(`/category/${category}`)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <ul>
                {/* Top 4 news without image */}
                {news
                  .filter((item) => item.category.toLowerCase() === category)
                  .slice(0, 4)
                  .map((item) => (
                    <li key={item._id} className="mb-4">
                      <p
                        className="text-gray-800 font-medium cursor-pointer hover:underline hover:text-blue-400"
                        onClick={() => navigate(`/news/${item._id}`)}
                      >
                        {truncateTitle(item.title)} {/* Truncate title to 80 characters */}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{formatDate(item.dateTime)}</span>
                      </div>
                      {/* Horizontal line */}
                      <div className="border-t-2 border-gray-300 mt-4"></div>
                    </li>
                  ))}

                {/* Last news with image */}
                {news
                  .filter((item) => item.category.toLowerCase() === category)
                  .slice(4, 5) // This gets the next item after the top 4
                  .map((item) => (
                    <li key={item._id} className="mb-4">
                      <div className="flex flex-col">
                        {/* Image above title */}
                        <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="w-full pt-4">
                          <p
                            className="text-gray-800 font-medium cursor-pointer hover:text-blue-600"
                            onClick={() => navigate(`/news/${item._id}`)}
                          >
                            {truncateTitle(item.title)}
                          </p>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{formatDate(item.dateTime)}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
