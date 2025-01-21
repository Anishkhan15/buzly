import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function CategoryNewsPage({ language }) {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Log category and language to the console when they change
  useEffect(() => {
    console.log('Category:', category);
    console.log('Current Language:', language);
  }, [category, language]);

  useEffect(() => {
    const fetchNews = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/news/category/${language}/${category}`;
      console.log('Fetching news from URL:', url);  // Log the URL for debugging

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, language]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        News in {category} ({language === 'en' ? 'English' : 'Hindi'})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article) => (
          <article
            key={article._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(`/news/${article._id}`)}
          >
            <img
              src={article.image || 'https://via.placeholder.com/300x200'}
              alt={article.title}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <span className="bg-red-600 text-white px-3 py-1 text-sm rounded-full">
                {article.category}
              </span>
              <h3 className="text-xl font-semibold mt-3 mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {article.description}
              </p>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{new Date(article.dateTime).toLocaleString()}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
