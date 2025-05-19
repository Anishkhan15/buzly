import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white py-12 px-6 md:px-16 lg:px-32 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">🛡️ Privacy Policy</h1>

      <p className="mb-6">
        At <strong>Buzzlynow</strong>, your privacy matters. We are committed to protecting your personal data and ensuring transparency about how your information is collected, used, and safeguarded.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">1. Information We Collect</h2>
      <p className="mb-4">We may collect the following types of information when you visit or interact with our website:</p>
      <ul className="list-disc ml-6 mb-6">
        <li>Name and email address (if submitted via forms)</li>
        <li>IP address and browser type</li>
        <li>Usage data (pages visited, time on site, etc.)</li>
      </ul>
      <p className="mb-6">This information helps us improve our services and personalize your experience.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>Customize content and recommendations</li>
        <li>Analyze website traffic and performance</li>
        <li>Send updates or newsletters (only if you opt-in)</li>
        <li>Troubleshoot and maintain website functionality</li>
      </ul>
      <p className="mb-6">
        We do <strong>not</strong> sell or share your personal information without your consent, unless required by law.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">3. Cookies and Tracking Technologies</h2>
      <p className="mb-4">Buzzlynow uses cookies and similar technologies to:</p>
      <ul className="list-disc ml-6 mb-6">
        <li>Understand user preferences</li>
        <li>Deliver relevant content and ads</li>
        <li>Improve site performance</li>
      </ul>
      <p className="mb-6">
        You can disable cookies at any time through your browser settings. Note that some features may not function properly without cookies.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">4. Google AdSense and Third-Party Advertising</h2>
      <p className="mb-4">We display ads from Google AdSense and other third-party providers. These services may use cookies or web beacons to:</p>
      <ul className="list-disc ml-6 mb-6">
        <li>Show personalized ads based on your browsing behavior</li>
      </ul>
      <p className="mb-6">
        You can manage your ad preferences or opt out of personalized advertising by visiting{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">
          Google’s Ads Settings
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">We use tools like Google Analytics to understand how users interact with our website. These tools may collect anonymized data such as:</p>
      <ul className="list-disc ml-6 mb-6">
        <li>IP address</li>
        <li>Device type</li>
        <li>Time spent on pages</li>
      </ul>
      <p className="mb-6">This data helps us optimize our content and improve your experience.</p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">6. Your Data Rights</h2>
      <p className="mb-4">Depending on your jurisdiction, you may have rights to:</p>
      <ul className="list-disc ml-6 mb-6">
        <li>Access the personal data we hold about you</li>
        <li>Request corrections or deletion</li>
        <li>Withdraw consent at any time</li>
      </ul>
      <p className="mb-6">
        To make a request, please contact us at{' '}
        <a href="mailto:buzzlynow03@gmail.com" className="text-red-600 underline">
          buzzlynow03@gmail.com
        </a>{' '}
        or call us at{' '}
        <a href="tel:9586069126" className="text-red-600 underline">
          9586069126
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-2">7. GDPR and CCPA Compliance</h2>
      <ul className="list-disc ml-6 mb-6">
        <li>We respect your data rights and provide mechanisms for transparency, access, and deletion.</li>
        <li>We only process your personal data with your explicit consent or under lawful bases.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-2">8. Policy Updates</h2>
      <p className="mb-6">
        This Privacy Policy may be updated occasionally. Any changes will be posted on this page with a revised “last updated” date. By continuing to use the site, you agree to the updated policy.
      </p>
    </div>
  );
}
