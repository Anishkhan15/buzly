import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LatestNews() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/latest`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-auto">
        {news.map((item) => (
          <article
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => navigate(`/news/${item._id}`)} // Navigate to the NewsDetails page
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="bg-red-600 text-white px-3 py-1 text-sm rounded-full">
                {item.category}
              </span>
              <h3 className="text-xl font-semibold mt-3 mb-2">{item.title}</h3>
              {/* Truncate the description to two lines */}
              <p className="text-gray-600 mb-4 line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{new Date(item.dateTime).toLocaleString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
