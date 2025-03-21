import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Newspaper } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Newspaper className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold">Buzzlynow</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for the latest news, analysis, and in-depth reporting from around the globe.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, link: "https://www.facebook.com/" },
                { icon: Twitter, link: "https://x.com/buzzlynow03" },
                { icon: Instagram, link: "https://www.instagram.com/buzzly.now/" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-red-500 transition-all duration-300"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Privacy Policy', path: '/privacy-policy' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-red-500 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-400">+91 9586069126</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a 
                  href="mailto:buzzlynow03@gmail.com?cc=buzzlynow03@gmail.com" 
                  className="text-gray-400 hover:text-red-600 transition-all duration-300"
                >
                  buzzlynow03@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Buzzlynow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
