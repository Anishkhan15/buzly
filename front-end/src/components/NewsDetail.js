import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaFacebookF } from 'react-icons/fa';
import { IoShareOutline } from 'react-icons/io5';
import { Helmet } from 'react-helmet-async';

const NewsDetail = ({ language = 'en' }) => {
  const { lang, category, slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [error, setError] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const pageUrl = window.location.href;

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
    const newsUrl = `${backendUrl}/api/news/${lang}/${category}/${slug}`;

    fetch(newsUrl)
      .then((res) => {
        if (!res.ok) throw new Error('News not found');
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
        console.error('Error fetching news:', err);
        setError('We encountered an issue while fetching the news details. Please try again later.');
      });

  }, [lang, category, slug]);

  const handleShare = async (platform) => {
    const text = `${news.title}\n\n${pageUrl}`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(news.title)}`,
          '_blank'
        );
        break;
      case 'share':
        try {
          setIsSharing(true);
          if (navigator.canShare && navigator.canShare({ files: [] })) {
            const response = await fetch(news.image);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });

            await navigator.share({
              title: news.title,
              text: news.description,
              files: [file],
              url: pageUrl,
            });
          } else if (navigator.share) {
            await navigator.share({
              title: news.title,
              text: `${news.title}\n\n${pageUrl}`,
              url: pageUrl,
            });
          } else {
            alert('Sharing not supported on this device.');
          }
        } catch (error) {
          console.error('Sharing failed:', error);
          alert('Sharing failed. Please try again.');
        } finally {
          setIsSharing(false);
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
    const boldRegex = /\\b(.*?)\\b/g;

    return text.split('\n').map((paragraph, index) => {
      const parts = [];
      let lastIndex = 0;

      for (const match of paragraph.matchAll(boldRegex)) {
        const [fullMatch, boldText] = match;
        const start = match.index;
        const end = start + fullMatch.length;

        if (start > lastIndex) {
          parts.push(paragraph.slice(lastIndex, start));
        }

        parts.push(
          <span key={`bold-${index}-${start}`} className="font-bold text-red-600">
            {boldText}
          </span>
        );

        lastIndex = end;
      }

      if (lastIndex < paragraph.length) {
        parts.push(paragraph.slice(lastIndex));
      }

      return (
        <p key={index} className="text-base md:text-lg text-justify leading-relaxed mb-4 font-normal text-gray-800">
          {parts}
        </p>
      );
    });
  };

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!news) return <div className="text-center mt-8">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{news.title} | BuzzlyNow</title>
        <meta name="description" content={news.description?.slice(0, 50)} />
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.description} />
        <meta property="og:image" content={news.image} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={news.description} />
        <meta name="twitter:image" content={news.image} />
        <meta name="twitter:url" content={pageUrl} />
      </Helmet>

      <div className="flex justify-center px-4 py-8">
        <div className="max-w-4xl w-full space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug text-center">
            {news.title}
          </h1>

          <div className="flex justify-between items-center text-gray-500 text-sm md:text-base">
            <div className="font-semibold">{formatDateTime(news.dateTime)}</div>
            <div className="flex space-x-4">
              <button onClick={() => handleShare('whatsapp')} className="text-green-500 hover:text-green-700">
                <FaWhatsapp size={18} />
              </button>
              <button onClick={() => handleShare('facebook')} className="text-blue-600 hover:text-blue-800">
                <FaFacebookF size={18} />
              </button>
              <button onClick={() => handleShare('share')} className="text-gray-600 hover:text-gray-800 relative">
                {isSharing ? (
                  <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <IoShareOutline size={20} />
                )}
              </button>
            </div>
          </div>

          <img
            src={news.image}
            alt={news.title}
            className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-md"
          />

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <div className="bg-white shadow-md p-6 rounded-lg text-justify text-gray-800">
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
