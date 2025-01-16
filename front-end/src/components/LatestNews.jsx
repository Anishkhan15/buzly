import React from 'react';
import { Clock } from 'lucide-react';

export default function LatestNews() {
  const news = [
    {
      category: "Politics",
      title: "New Legislative Reform Passes with Bipartisan Support",
      excerpt: "The landmark bill aims to address key infrastructure challenges facing the nation...",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
      time: "2 hours ago"
    },
    {
      category: "Technology",
      title: "Revolutionary AI Technology Transforms Healthcare Industry",
      excerpt: "Artificial intelligence is making breakthrough advances in medical diagnosis...",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      time: "3 hours ago"
    },
    {
      category: "Environment",
      title: "Global Initiative Launches to Combat Ocean Pollution",
      excerpt: "World leaders unite in unprecedented effort to clean up the world's oceans...",
      image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
      time: "4 hours ago"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <article key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="bg-red-600 text-white px-3 py-1 text-sm rounded-full">
                {item.category}
              </span>
              <h3 className="text-xl font-semibold mt-3 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.excerpt}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>{item.time}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}