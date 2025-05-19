import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';

function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-6 md:px-20">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <FaShieldAlt className="text-3xl text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        </div>

        <p className="text-gray-600 mb-4">
          At <strong>Buzzlynow</strong>, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Information We Collect</h2>
        <p className="text-gray-600 mt-2">
          We may collect personal information such as your name, email address, IP address, and browser data. This information is used to improve our services and enhance your experience on our website.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">2. How We Use Your Information</h2>
        <p className="text-gray-600 mt-2">
          We use your information to personalize content, analyze traffic, troubleshoot issues, and send updates (if you opt-in). Your information is never sold or shared without your consent, except where required by law.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Cookies and Tracking Technologies</h2>
        <p className="text-gray-600 mt-2">
          We use cookies and similar technologies to collect usage data, track preferences, and deliver relevant content. You can disable cookies through your browser settings if you prefer.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">4. Google AdSense and Third-Party Advertising</h2>
        <p className="text-gray-600 mt-2">
          This website displays ads served by Google AdSense and other third-party vendors. These partners may use cookies or web beacons to serve personalized ads based on your prior visits to this or other websites.
        </p>
        <p className="text-gray-600 mt-2">
          You may opt out of personalized advertising by visiting Google’s <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">Ads Settings</a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">5. Third-Party Services</h2>
        <p className="text-gray-600 mt-2">
          We use third-party services such as Google Analytics to analyze website usage. These services may collect anonymized data such as your IP address, browser type, and time spent on the site to help us understand user behavior.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">6. Your Data Rights</h2>
        <p className="text-gray-600 mt-2">
          Depending on your location, you may have the right to access, modify, or delete your personal information. To exercise these rights, please contact us at <a href="mailto:buzzlynow03@gmail.com" className="text-red-500 hover:underline">buzzlynow03@gmail.com</a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">7. GDPR and CCPA Compliance</h2>
        <p className="text-gray-600 mt-2">
          If you are located in the European Union or California, you have specific rights under the GDPR or CCPA. We comply with these regulations and ensure your data is handled lawfully and transparently.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">8. Policy Updates</h2>
        <p className="text-gray-600 mt-2">
          This Privacy Policy may be updated periodically. We encourage you to review it from time to time. Continued use of the site after changes means you accept the revised terms.
        </p>

        <div className="mt-8">
          <Link to="/" className="text-red-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
