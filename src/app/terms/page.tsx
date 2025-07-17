// src/app/terms/page.tsx
'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: July 11, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By accessing and using Game Hub, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Game Hub is a web-based platform that provides access to a collection of HTML games. 
                Our service allows users to discover, browse, and play games directly in their web browser.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify, suspend, or discontinue the service at any time without prior notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. User Responsibilities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                As a user of Game Hub, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to any part of the service</li>
                <li>Not use the service to distribute malware or harmful content</li>
                <li>Not interfere with the proper functioning of the service</li>
                <li>Respect the intellectual property rights of game developers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The games available on Game Hub are the property of their respective developers and publishers. 
                Game Hub does not claim ownership of the games but provides a platform for accessing them.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The Game Hub platform, including its design, layout, and functionality, is protected by copyright 
                and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Privacy and Data Collection
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by 
                our Privacy Policy, which is incorporated into these Terms of Service by reference.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may collect anonymous usage statistics to improve our service, but we do not collect 
                personal information without your consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Game Hub is provided on an "as is" and "as available" basis. We make no warranties, 
                expressed or implied, and hereby disclaim all warranties including, without limitation, 
                implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We do not warrant that the service will be uninterrupted, error-free, or free of viruses 
                or other harmful components.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In no event shall Game Hub be liable for any direct, indirect, incidental, special, 
                consequential, or punitive damages arising out of your use of or inability to use the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Termination
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We may terminate or suspend your access to the service immediately, without prior notice 
                or liability, if you breach these Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to the website. Your continued use of the service after 
                changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us through 
                our <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Contact page
                </Link>.
              </p>
            </section>
          </div>
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