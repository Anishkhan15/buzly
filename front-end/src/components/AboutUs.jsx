import React from 'react';
import { Award, Users, Globe, Clock } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Buzzlynow</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted source for comprehensive news coverage and in-depth reporting from around the globe.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Globe, stat: '150+', label: 'Countries Covered' },
            { icon: Users, stat: '2M+', label: 'Monthly Readers' },
            { icon: Clock, stat: '24/7', label: 'News Coverage' },
            { icon: Award, stat: '50+', label: 'Awards Won' },
          ].map((item, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
              <item.icon className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.stat}</h3>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At Buzzlynow, we believe in the power of accurate, unbiased journalism to inform and empower our readers. Our mission is to deliver comprehensive news coverage that helps you understand the world better.
            </p>
            <p className="text-gray-600">
              We maintain the highest standards of journalistic integrity, ensuring that every story we publish is thoroughly researched and fact-checked. Our team of experienced journalists works tirelessly to bring you the most important stories from around the globe.
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

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Editorial Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Editor in Chief',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
              },
              {
                name: 'Michael Chen',
                role: 'Head of Digital News',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
              },
              {
                name: 'Emily Williams',
                role: 'Senior Political Editor',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
              },
            ].map((member, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-50 p-12 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Accuracy',
                description: 'We are committed to delivering accurate, fact-based reporting you can trust.',
              },
              {
                title: 'Independence',
                description: 'Our journalism remains independent and free from external influences.',
              },
              {
                title: 'Innovation',
                description: 'We embrace new technologies to deliver news in engaging ways.',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}