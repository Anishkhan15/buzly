import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF, FaCopy } from 'react-icons/fa';

const NewsDetail = ({ language = 'en' }) => {
  const { slug } = useParams(); // Use slug instead of id
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [error, setError] = useState(null);
  const pageUrl = window.location.href; // Get current URL

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    if (!backendUrl) {
      setError('Backend URL is not configured.');
      return;
    }

    fetch(`${backendUrl}/api/news/${language}/slug/${slug}`) // Fetch by slug
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch news: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
        setError(null);

        document.title = `${data.title} | BuzzlyNow`;

        if (data.category) {
          fetch(`${backendUrl}/api/news/category/${language}/${data.category}`)
            .then((res) => res.json())
            .then((relatedData) => {
              setRelatedNews(relatedData.filter((item) => item.slug !== slug)); // Filter by slug
            })
            .catch((error) => console.error('Error fetching related news:', error));
        }
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news details. Please try again later.');
      });
  }, [slug, language]);

  useEffect(() => {
    if (news) {
      document.title = `${news.title} | BuzzlyNow`;
    }
  }, [news]);

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!news) return <div className="text-center mt-8">Loading...</div>;

  const handleShare = (platform) => {
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(news.title)} - ${encodeURIComponent(pageUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(pageUrl);
        alert('Link copied to clipboard!');
        break;
      default:
        break;
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Function to process description and highlight words enclosed in \b
  const processDescription = (text) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="font-serif text-lg md:text-xl leading-8">
        {paragraph.split(/(\\b.*?\\b)/).map((part, i) => 
          part.match(/\\b(.*?)\\b/) ? (
            <span key={i} className="font-bold bg-red-600 text-white px-1 rounded">{part.replace(/\\b/g, '')}</span>
          ) : (
            part
          )
        )}
      </p>
    ));
  };

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="max-w-4xl w-full space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug text-center">{news.title}</h1>

        <div className="flex justify-between items-center text-gray-500 text-sm md:text-base">
          <div className="font-semibold">{formatDateTime(news.dateTime)}</div>
          <div className="flex space-x-4">
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

        <img src={news.image} alt={news.title} className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-md" />

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="bg-white shadow-md p-6 rounded-lg text-justify text-gray-800 font-medium md:text-xl leading-relaxed tracking-wide space-y-4">
              {processDescription(news.description)}
            </div>
          </div>
          <div className="md:w-1/3 space-y-4">
            {relatedNews.slice(0, 3).map((item) => (
              <div 
                key={item.slug} 
                className="cursor-pointer shadow-md rounded-lg overflow-hidden"
                onClick={() => navigate(`/news/${language}/${item.slug}`)} // Use slug for navigation
              >
                <img src={item.image} alt={item.title} className="w-full h-28 object-cover" />
                <h3 className="p-2 text-sm font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
