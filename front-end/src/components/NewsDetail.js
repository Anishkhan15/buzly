import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF, FaCopy } from 'react-icons/fa';

const NewsDetail = ({ language = 'en' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    if (!backendUrl) {
      setError('Backend URL is not configured.');
      return;
    }

    fetch(`${backendUrl}/api/news/${language}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch news: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news details. Please try again later.');
      });
  }, [id, language]);

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!news) return <div className="text-center mt-8">Loading...</div>;

  const handleShare = (platform) => {
    const url = window.location.href;
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(news.title)} - ${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        
        {/* Back Button (Only for Mobile) */}
        <div className="md:hidden">
          <button 
            onClick={() => navigate('/')} 
            className="text-gray-700 bg-gray-100 px-2 py-0.5 text-xs rounded-full hover:bg-gray-300 transition"
          >
            ← Home
          </button>
        </div>

        {/* News Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
          {news.title}
        </h1>

        {/* News Meta (Date & Share Buttons) */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm md:text-base">
          <div className="font-semibold">{formatDateTime(news.dateTime)}</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <button onClick={() => handleShare('whatsapp')} className="text-green-500 hover:text-green-700">
              <FaWhatsapp size={18} />
            </button>
            <button onClick={() => handleShare('facebook')} className="text-blue-600 hover:text-blue-800">
              <FaFacebookF size={18} />
            </button>
            <button onClick={() => handleShare('copy')} className="text-gray-600 hover:text-gray-800">
              <FaCopy size={18} />
            </button>
          </div>
        </div>

        {/* News Image */}
        <div className="w-full h-[300px] md:h-[500px]">
  <img 
    src={news.image} 
    alt={news.title} 
    className="w-full h-full object-contain rounded-lg shadow-md" 
  />
</div>


        {/* News Description */}
        <div className="text-justify text-gray-800 font-medium md:text-xl leading-relaxed tracking-wide space-y-4">
          {news.description.split('\n').map((paragraph, index) => (
            <p key={index} className="font-serif text-lg md:text-xl leading-8">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
