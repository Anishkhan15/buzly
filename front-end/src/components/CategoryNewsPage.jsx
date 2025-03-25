import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function CategoryNewsPage({ language }) {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(15);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Category:', category);
    console.log('Current Language:', language);
  }, [category, language]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/news/category/${language}/${category}`;
      console.log('Fetching news from URL:', url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
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
  }, [category, language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 animate-pulse text-lg">Loading...</div>
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
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">
        {category} News ({language === 'en' ? 'English' : 'Hindi'})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {news.slice(0, visibleNewsCount).map((article) => (
          <article
            key={article._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigate(`/news/${article.category}/${article.slug}`)}
          >
            <img
              src={article.image || 'https://via.placeholder.com/300x200'}
              alt={article.title}
              className="w-full h-52 object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <span className="inline-block bg-red-600 text-white px-3 py-1 text-sm rounded-full">
                {article.category}
              </span>
              <h3 className="text-lg font-semibold mt-3 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {article.description}
              </p>
              <div className="flex items-center text-gray-500 text-sm mt-3">
                <Clock className="w-4 h-4 mr-1" />
                <span>{new Date(article.dateTime).toLocaleString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Button */}
      {visibleNewsCount < news.length && (
        <div className="flex justify-center mt-8">
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