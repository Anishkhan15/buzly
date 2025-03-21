import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AutoAndCryptoNews = ({ language }) => {
    const [newsData, setNewsData] = useState([]);
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();

    const fetchNewsByCategory = async (category) => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
            const response = await fetch(`${backendUrl}/api/news/category/${language}/${category}`);
            
            if (!response.ok) {
                console.warn(`No news found for category ${category} in ${language}`);
                return [];
            }

            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error(`Error fetching ${category} news:`, error);
            return [];
        }
    };

    useEffect(() => {
        Promise.all([fetchNewsByCategory("auto"), fetchNewsByCategory("crypto")])
            .then(([autoNews, cryptoNews]) => {
                setNewsData([...autoNews, ...cryptoNews]);
            })
            .catch((error) => {
                console.error("Error fetching auto/crypto news:", error);
                setNewsData([]);
            });
    }, [language]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    if (newsData.length === 0) {
        return <p className="text-center text-gray-500">No Auto or Crypto news available.</p>;
    }

    return (
        <div className=" bg-black text-white py-6 px-4 pb-10 relative">
            <h2 className="text-xl font-semibold font-serif border-b border-gray-600 pb-2">
                Automobile and Crypto News
            </h2>

            <div className="relative mt-4">
                {/* Left Scroll Button */}
                <button
                    onClick={scrollLeft}
                    className="absolute -left-3 sm:left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-1.5 sm:p-3 rounded-full z-10 text-white text-sm sm:text-lg"
                >
                    ◀
                </button>

                {/* Scrollable News Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {newsData.slice(0, 6).map((news) => (
                        <div
                            key={news._id}
                            onClick={() => navigate(`/news/${news._id}`)}
                            className="w-full sm:w-72 bg-gray-900 p-4 rounded-lg flex-shrink-0 cursor-pointer hover:bg-gray-800 transition snap-center"
                        >
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h3 className="text-lg font-bold mt-2">{news.title}</h3>
                            <p className="text-sm text-gray-400">{news.description.slice(0, 100)}...</p>
                        </div>
                    ))}
                </div>

                {/* Right Scroll Button */}
                <button
                    onClick={scrollRight}
                    className="absolute -right-3 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 p-1.5 sm:p-3 rounded-full z-10 text-white text-sm sm:text-lg"
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default AutoAndCryptoNews;
