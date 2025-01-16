import React, { useState, useEffect } from 'react';

export default function FeaturedNews() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(false);

  const newsItems = [
    {
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
      category: "Breaking",
      title: "Global Economic Summit Addresses Climate Change Initiatives",
      description: "World leaders gather to discuss urgent climate action and economic policies"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      category: "Business",
      title: "Tech Giants Announce New AI Partnership",
      description: "Leading tech companies collaborate on groundbreaking AI research"
    },
    {
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
      category: "Science",
      title: "Breakthrough in Quantum Computing Research",
      description: "New advancements in quantum computing could revolutionize technology"
    },
    {
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      category: "Sports",
      title: "Historic Victory in International Championship",
      description: "A historic win for the national team at the international sports championship"
    },
    {
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      category: "Tech",
      title: "Next Generation Smartphones Revealed",
      description: "The latest smartphone models come with revolutionary features"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % newsItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % newsItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? newsItems.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main featured article (auto-slider) */}
        <div
          className="relative h-[500px] group overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={newsItems[currentSlide].image}
            alt={newsItems[currentSlide].title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="absolute bottom-0 p-6">
              <span className="bg-red-600 text-white px-3 py-1 text-sm rounded-full">{newsItems[currentSlide].category}</span>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mt-3">
                {newsItems[currentSlide].title}
              </h2>
              <p className="text-gray-200 mt-2">{newsItems[currentSlide].description}</p>
            </div>
          </div>

          {/* Left and Right arrows */}
          {hovered && (
            <>
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                &lt;
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black p-2 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                &gt;
              </button>
            </>
          )}
        </div>

        {/* Secondary featured articles (4 articles in one row) */}
        <div className="grid grid-cols-2 gap-4">
          {newsItems.slice(1, 5).map((item, index) => (
            <div key={index} className="relative h-[240px] group overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 p-4">
                  <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">{item.category}</span>
                  <h3 className="text-lg font-semibold text-white mt-2">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
