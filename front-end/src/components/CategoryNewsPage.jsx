import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function CategoryNewsPage() {
  // Get parameters from URL
  const { lang, category } = useParams();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/news/category/${lang}/${category}`;
      console.log('Fetching data from URL:', url); // Debugging step: check if the URL is correct

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, lang]); // Re-fetch data when category or lang changes
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="h-48 bg-gray-200 rounded-t-2xl" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-300 rounded w-full" />
              <div className="h-3 bg-gray-300 rounded w-5/6" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-red-500">
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize text-center">
        {category} News ({lang === 'en' ? 'English' : 'Hindi'})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, visibleNewsCount).map((article) => (
          <article
            key={article._id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
            onClick={() => navigate(`/news/${lang}/${article.category}/${article.slug}`)}
          >
            <div className="overflow-hidden">
              <img
                src={article.image || 'https://via.placeholder.com/300x200'}
                alt={article.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-xl font-semibold mt-2 mb-1 line-clamp-2 hover:underline">
                {article.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {article.description?.replace(/[*#]/g, '')}
              </p>
              <div className="flex items-center text-gray-500 text-xs mt-auto">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {new Date(article.dateTime).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
       </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleNewsCount < news.length && (
        <div className="flex justify-center mt-10">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => setVisibleNewsCount((prev) => prev + 15)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
