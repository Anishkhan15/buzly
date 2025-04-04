import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Mail, Facebook, Twitter, Send, Instagram } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      'service_wnxrk2b',
      'template_jj84r1i',
      formData,
      'mAoNKUlhSVh07S9Xi'
    )
      .then(() => {
        setSuccess('Message sent successfully!');
        setLoading(false);
        setFormData({ name: '', email: '', contact: '', subject: '', message: '' });
      })
      .catch(() => {
        setSuccess('Failed to send message. Please try again.');
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contact' && !/^[0-9]*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
            {success && <p className="text-green-600">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-gray-600 flex-shrink-0" />
                  <a href="mailto:buzzlynow03@gmail.com" className="ml-4 text-gray-600 hover:text-blue-500 transition-colors">
                    buzzlynow03@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://x.com/buzzlynow03" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/buzzly.now/" target="_blank" rel="noopener noreferrer" className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
