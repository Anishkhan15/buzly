import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, MapPin, Phone, Mail, Newspaper } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Newspaper className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold">Buzzlynow</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted source for the latest news, analysis, and in-depth reporting from around the globe.
            </p>
            <div className="flex space-x-4">
              <a  href="https://www.facebook.com/" 
  target="_blank" 
  rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/buzzlynow03" 
  target="_blank" 
  rel="noopener noreferrer"  className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a> */}
              <a href="https://www.instagram.com/buzzly.now/" 
  target="_blank" 
  rel="noopener noreferrer"  className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Politics', 'Business', 'Technology', 'Entertainment', 'Sports', 'World', 'Health'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Quick Links */}
          <div>
  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
  <ul className="space-y-2">
    {[
      { name: 'About Us', path: '/about' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy-policy.pdf', isExternal: true },
    ].map((link) => (
      <li key={link.name}>
        {link.isExternal ? (
          <a 
            href={link.path} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            {link.name}
          </a>
        ) : (
          <Link 
            to={link.path} 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            {link.name}
          </Link>
        )}
      </li>
    ))}
  </ul>
</div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 News Street, NY, USA</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-400">+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a 
  href="mailto:buzzlynow03@gmail.com?cc=buzzlynow03@gmail.com" 
  className="text-gray-400 hover:text-red-600"
>
  buzzlynow03@gmail.com
</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Buzzlynow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
