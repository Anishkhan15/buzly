import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { Helmet } from 'react-helmet-async';

const NewsDetail = ({ language = 'en' }) => {
  const { lang, category, slug } = useParams();  // Capture lang, category, and slug from the URL
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [error, setError] = useState(null);
  const pageUrl = window.location.href;

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    // Log the full URL to verify the API endpoint
    const newsUrl = `${backendUrl}/api/news/${lang}/${category}/${slug}`;
    console.log('Fetching news from:', newsUrl); // Debugging log

    fetch(newsUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error('News not found');
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
        document.title = `${data.title} | BuzzlyNow`;
    if (data.category) {
          fetch(`${backendUrl}/api/news/category/${lang}/${data.category}`)
            .then((res) => res.json())
            .then((relatedData) => {
              setRelatedNews(relatedData.filter((item) => item.slug !== slug));
            });
        }
      })
      .catch((err) => {
        console.error('Error fetching news:', err); // Log the error for debugging
        setError('Failed to fetch news details. Please try again later.');
      });
  }, [lang, category, slug]); // Depend on lang, category, and slug to update data

  const handleShare = (platform) => {
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(news.title)} - ${encodeURIComponent(pageUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
        break;
      case 'share': // Native share functionality
        if (navigator.share) {
          navigator.share({
            title: news.title,
            url: pageUrl,
          })
    .catch(() => alert('Sharing failed. Please try again.'));
        } else {
          alert('Share feature is not supported on this device.');
        }
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
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!news) return <div className="text-center mt-8">Loading...</div>;

  const fullImageUrl = news.image.startsWith('http') ? news.image : `${window.location.origin}${news.image}`;

  return (
    <>
      <Helmet>
        <title>{news.title} | BuzzlyNow</title>
        <meta name="description" content={news.description?.slice(0, 50)} />

        {/* Open Graph Meta Tags for dynamic content */}
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.description} />
        <meta property="og:image" content={news.image} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter Card Meta Tags for dynamic content */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={news.description} />
        <meta name="twitter:image" content={news.image} />
        <meta name="twitter:url" content={pageUrl} />
      </Helmet>
      {/* Main content of your NewsDetail component */}
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
              <button onClick={() => handleShare('share')} className="text-gray-600 hover:text-gray-800">
                <IoShareOutline size={18} />
              </button>
            </div>
          </div>

          <img src={news.image} alt={news.title} className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-md" />

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <div className="bg-white shadow-md p-6 rounded-lg text-justify text-gray-800 font-medium md:text-xl leading-relaxed tracking-wide">
                {processDescription(news.description)}
              </div>
            </div>
            <div className="md:w-1/3 space-y-4">
              {relatedNews.slice(0, 3).map((item) => (
                <div
                  key={item.slug}
                  className="cursor-pointer shadow-md rounded-lg overflow-hidden"
                  onClick={() => navigate(`/news/${lang}/${category}/${item.slug}`)}
                >
                  <img src={item.image} alt={item.title} className="w-full h-28 object-cover" />
                  <h3 className="p-2 text-sm font-semibold">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
   </div>
      </div>
    </>
  );
};

export default NewsDetail;
