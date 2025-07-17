'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Important:</strong> Sportrz.com is operated by Krayons Convergence Pvt Ltd (Krayons Group). This privacy policy is governed by Krayons' data protection standards and commitments.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Our Commitment to Privacy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Krayons Group is committed to protecting your privacy and personal data. We collect only essential information needed to provide better gaming services and inform you about our offerings. This includes data gathered through our digital marketing affiliates and performance marketing campaigns to better understand your interests and improve our outreach efforts.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We ensure our employees receive regular training on data protection and security to maintain the highest standards of privacy protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Data We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Access Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                When you visit Sportrz.com, we automatically collect:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                <li>Your Internet service provider information</li>
                <li>Your country of origin</li>
                <li>Referring website and search terms used to find us</li>
                <li>Pages visited on our gaming platform</li>
                <li>Browser type, version, and operating system details</li>
                <li>Downloaded files and gaming content accessed</li>
                <li>Visit duration, date, and time</li>
                <li>IP address (stored for 30 days for security purposes)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Personal Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We collect personal information only when you voluntarily provide it through:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                <li>User registration and account creation</li>
                <li>Contact forms and support inquiries</li>
                <li>Newsletter subscriptions and gaming updates</li>
                <li>Online purchases and transactions</li>
                <li>Gaming surveys, competitions, and feedback forms</li>
                <li>Social media interactions and gaming community participation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Sensitive Personal Data
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may collect sensitive data including passwords, financial information for gaming transactions, and other sensitive data only with your explicit consent and for lawful purposes connected to our gaming services. This data is handled with the highest level of security and protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. How We Use Your Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Optimize and personalize our gaming platform content</li>
                <li>Process your gaming requests, purchases, and transactions</li>
                <li>Send you relevant information about our gaming services and events</li>
                <li>Provide customer support and technical assistance</li>
                <li>Comply with legal obligations and regulatory requirements</li>
                <li>Enhance security and prevent fraud or abuse</li>
                <li>Analyze gaming patterns and improve user experience</li>
                <li>Develop new gaming features and services</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                Access to your personal data is limited to authorized, trained employees only.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Data Sharing and Disclosure
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We share personal data only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>With select gaming and technology partners under strict data protection agreements</li>
                <li>With government agencies when legally required or mandated</li>
                <li>To countries with equivalent data protection standards</li>
                <li>With your explicit consent for specific purposes</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Cookies & Tracking Technologies
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Essential Cookies
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We use cookies to enhance website functionality and personalize your gaming experience. Our cookies don't contain personal data and can only be read by our servers. These are essential for gaming features like saving your preferences and maintaining your gaming session.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Conversion Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We track advertising effectiveness through third-party cookies, collecting anonymous data about clicks, device information, and user behavior without identifying individual users. This helps us optimize our gaming content and marketing efforts.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Your Cookie Choices
              </h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Disable cookies in your browser settings</li>
                <li>Use "Do Not Track" options in your browser</li>
                <li>Install opt-out browser extensions</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                <strong>Note:</strong> Disabling cookies may limit gaming website functionality and your overall experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Your Rights and Choices
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li><strong>Access:</strong> Request information about what personal data we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain processing of your personal information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                <li><strong>Request Cessation:</strong> Request cessation of data use for specific purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>SSL encryption for all data transmission</li>
                <li>Regular security assessments and system updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure hosting infrastructure with gaming-grade security</li>
                <li>Regular backups and disaster recovery procedures</li>
                <li>Employee training on data protection and security protocols</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our gaming platform may contain links to external gaming sites, social media platforms, and other third-party services. We're not responsible for their content or privacy practices. Each linked site has its own privacy policy, and we encourage you to review them before providing any personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Technical Elements
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                JavaScript and ActiveX can be disabled in your browser for security, though this may limit gaming functionality. Our gaming platform is designed to remain functional even with these limitations, though some interactive features may be reduced.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Policy Updates
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to update this privacy policy in compliance with data protection laws and gaming industry standards. Please review this policy periodically for changes. Material changes will be communicated through our platform or via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For privacy-related questions or to exercise your rights, contact our grievance officer:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
                  Krayons Convergence Private Limited
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <span className="block">Plot A-09, 711, ITL Towers</span>
                  <span className="block">Netaji Subhash Place, Pitampura</span>
                  <span className="block">Delhi 110034, India</span>
                  <span className="block">Email: mail@krayons.co.in</span>
                  <span className="block">Landline: +91 11 41103510</span>
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Quick Summary Box */}
        <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200 mb-4">
            📋 Quick Summary
          </h3>
          <ul className="space-y-2 text-sm text-indigo-800 dark:text-indigo-300">
            <li>• We collect only essential information for gaming services</li>
            <li>• We share data only with select partners under strict agreements</li>
            <li>• We use cookies to enhance your gaming experience</li>
            <li>• You have full control over your data and can request deletion</li>
            <li>• We implement gaming-grade security measures</li>
            <li>• All data handling is governed by Krayons Group standards</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
}