import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF, FaCopy } from 'react-icons/fa';

const NewsDetail = ({ language = 'en' }) => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    if (!backendUrl) {
      setError('Backend URL is not configured.');
      return;
    }

    // API call based on language
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

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!news) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  const handleShare = (platform) => {
    const url = window.location.href;
    const message = `Check out this news: ${news.title} - ${news.description}`;
    switch (platform) {
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)} ${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
  };

  const timeAgo = (date) => {
    const now = new Date();
    const newsDate = new Date(date);
    const diff = Math.floor((now - newsDate) / 1000);

    if (diff < 0) {
      return 'Invalid time';
    }

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center">
          {news.title}
        </h1>

        {/* Time and Share Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm md:text-base">
          <div>{timeAgo(news.dateTime)}</div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <button
              onClick={() => handleShare('whatsapp')}
              className="text-green-500 hover:text-green-700"
            >
              <FaWhatsapp size={24} />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebookF size={24} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaCopy size={24} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full h-[300px] md:h-[500px]">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Description */}
        <div className="text-justify text-gray-700 font-thin md:text-xl leading-relaxed space-y-4">
  {news.description.split('\n').map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ))}
</div>
      </div>
    </div>
  );
};

export default NewsDetail;
