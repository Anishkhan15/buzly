import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LatestNews({ language }) {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const categories = [
    "business",
    "sports",
    "politics",
    "technology",
    "india",
    "international",
    "entertainment",
    "healthcare",
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/news/latest/${language}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setNews(data);
        } else {
          throw new Error("Expected JSON response, but got HTML");
        }
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };
    fetchNews();
  }, [language]);

  const formatDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    } else {
      return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
    }
  };

  const truncateTitle = (title) => {
    return title.length > 70 ? title.substring(0, 70) + "..." : title;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Latest News</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            // Filter news for the category and take exactly 4 articles
            const categoryNews = news
              .filter(
                (item) =>
                  item.category &&
                  item.category.toLowerCase() === category.toLowerCase()
              )
              .slice(0, 4);

            return (
              <div key={category} className="bg-white p-4 rounded-lg shadow-md">
                <h2
                  className="text-lg md:text-xl font-semibold text-black cursor-pointer mb-4 hover:underline italic"
                  onClick={() => navigate(`/category/${category}`)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <div className="space-y-6">
                  {categoryNews.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-100 rounded-lg overflow-hidden shadow-sm transition hover:shadow-lg"
                    >
                      <div className="w-full h-40 md:h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-3">
                        <h3
                          className="text-sm md:text-base lg:text-lg font-medium text-gray-800 cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            navigate(`/news/${category}/${item.slug || item._id}`)
                          }
                        >
                          {truncateTitle(item.title)}
                        </h3>
                        <div className="flex items-center text-gray-500 text-xs md:text-sm mt-2">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{formatDate(item.dateTime)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
