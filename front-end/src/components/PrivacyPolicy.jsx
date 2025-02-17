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
          At <strong>Buzzlynow</strong>, we hold your privacy in the highest regard and are committed to safeguarding your personal information. This Privacy Policy outlines the types of data we collect, how we use it, and the steps we take to ensure its security and confidentiality.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Information We Collect</h2>
        <p className="text-gray-600 mt-2">We may collect various types of personal information, including but not limited to your name, email address, browsing history, and usage data, all of which are gathered to improve your experience on our platform.</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">2. How We Use Your Information</h2>
        <p className="text-gray-600 mt-2">The data we collect is utilized to enhance user experience, tailor our content to better suit your preferences, and ensure the security of our platform by identifying and addressing potential threats.</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Cookies</h2>
        <p className="text-gray-600 mt-2">To provide a more personalized browsing experience, we use cookies to customize content, track website traffic, and perform analytics. You have the option to manage or disable cookies through your browser settings.</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">4. Third-Party Services</h2>
        <p className="text-gray-600 mt-2">In order to enhance the functionality of our website, we may employ third-party services such as Google Analytics to analyze user activity and optimize our content and services. These services may collect anonymized data to improve overall website performance.</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">5. Your Rights</h2>
        <p className="text-gray-600 mt-2">As a user, you have the right to request access to, correction of, or deletion of your personal data. Should you have any questions or concerns regarding your data, please do not hesitate to reach out to us at <a href="mailto:buzzlynow03@gmail.com" className="text-red-500 hover:underline">buzzlynow03@gmail.com</a>.</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">6. Policy Updates</h2>
        <p className="text-gray-600 mt-2">We reserve the right to modify this Privacy Policy at any time. We encourage you to periodically review this page for updates. By continuing to use our services, you agree to any changes made to this policy.</p>

        <div className="mt-8">
          <Link to="/" className="text-red-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
