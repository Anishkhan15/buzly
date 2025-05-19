import React from 'react';
import { ShieldCheck, PenTool, Globe, Users, Clock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Buzzlynow</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Buzzlynow is your trusted destination for fast, accurate, and unbiased news. Our team is dedicated to delivering the latest headlines across categories, 24/7.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center mb-16">
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md">
            <Clock className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">Global News Coverage</p>
          </div>
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Buzzlynow, our mission is to make reliable news accessible to everyone. We focus on publishing factual, well-researched stories that matter.
            </p>
            <p className="text-gray-600">
              We value transparency, integrity, and independence. Each article goes through editorial review before publication. We do not publish sensational or misleading content.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1495020689067-958852a7765e"
              alt="Newsroom"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Values */}
        <div className="bg-gray-50 p-12 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Accuracy',
                description: 'We deliver fact-checked news that you can trust.',
                icon: ShieldCheck,
              },
              {
                title: 'Independence',
                description: 'We operate independently without external influence.',
                icon: PenTool,
              },
              {
                title: 'Innovation',
                description: 'We use modern tools to present stories in engaging ways.',
                icon: Globe,
              },
              {
                title: 'Ownership',
                description: 'Buzzlynow is independently owned by Eram Shaikh.',
                icon: Users,
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <value.icon className="w-8 h-8 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
          <p className="text-gray-600 mb-1">
            Email:{' '}
            <a href="mailto:buzzlynow@gmail.com" className="text-red-600 hover:underline">
              buzzlynow@gmail.com
            </a>
          </p>
          <p className="text-gray-600">
            Phone:{' '}
            <a href="tel:9586069126" className="text-red-600 hover:underline">
              9586069126
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
