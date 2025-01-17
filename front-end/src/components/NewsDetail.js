import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF, FaCopy } from 'react-icons/fa';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    // Fetch news detail by ID
    fetch(`http://localhost:5000/api/news/${id}`)
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, [id]);

  if (!news) {
    return <div>Loading...</div>;
  }

  const handleShare = (platform) => {
    const url = window.location.href;
    const message = `Check out this news: ${news.title} - ${news.description}`;
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)} ${encodeURIComponent(url)}`, '_blank');
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

  const timeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* News Title */}
        <div className="col-span-1">
          <h2 className="text-4xl font-bold">{news.title}</h2>
        </div>

        {/* News Date and Share Section */}
        <div className="flex justify-between items-center col-span-1 lg:col-span-1 mt-4 lg:mt-0">
          <div className="text-gray-500">{timeAgo(news.date)}</div>
          <div className="flex space-x-4">
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

        {/* News Image */}
        <div className="col-span-1 mt-4 lg:mt-8">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* News Description */}
        <div className="col-span-1 mt-4">
          <p>{news.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
