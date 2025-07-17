export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Disclaimer
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. General Disclaimer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                The information on Sportrz.com is provided on an "as is" basis. Sportrz.com is operated by Krayons Convergence Pvt Ltd. To the fullest extent permitted by law, Sportrz.com excludes all representations, warranties, obligations, and liabilities arising out of or in connection with the use of this website and its games.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Gaming Content Disclaimer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All games provided on Sportrz.com are for entertainment purposes only. We make no representations about:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>The accuracy or completeness of game content</li>
                <li>The suitability of games for any particular purpose</li>
                <li>The availability of games at all times</li>
                <li>The compatibility with all devices or browsers</li>
                <li>The absence of bugs or technical issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Third-Party Content
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Some games may contain third-party content or links to external websites. We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Content accuracy or appropriateness</li>
                <li>Third-party website availability or security</li>
                <li>External site privacy policies or practices</li>
                <li>Any damages resulting from third-party interactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Technical Limitations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                While we strive to provide a smooth gaming experience, we cannot guarantee:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Uninterrupted service availability</li>
                <li>Error-free operation of all games</li>
                <li>Compatibility with all devices or operating systems</li>
                <li>Data loss prevention or backup reliability</li>
                <li>Server uptime or response speed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Health and Safety
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Gaming can have health implications. We recommend:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Taking regular breaks during extended gaming sessions</li>
                <li>Consulting healthcare providers for gaming-related health concerns</li>
                <li>Being aware of photosensitive epilepsy triggers</li>
                <li>Maintaining proper posture and eye care</li>
                <li>Setting time limits for gaming activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Age Restrictions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Some games may not be suitable for all ages. We:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Provide age ratings where available</li>
                <li>Encourage parental supervision for minors</li>
                <li>Are not responsible for content appropriateness verification</li>
                <li>Recommend users review game content before playing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Payment and Billing
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Payment processing is handled through our parent company Krayons Convergence Pvt Ltd and third-party payment processors:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Payments are processed securely via third-party payment gateways</li>
                <li>All payments are subject to the payment processor's terms and conditions</li>
                <li>Currency conversion rates may vary</li>
                <li>Payments once made are non-refundable unless explicitly stated</li>
                <li>We are not liable for payment processor issues or service outages</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. User Generated Content
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If users can submit content (reviews, comments, etc.):
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>We do not endorse or verify user-generated content</li>
                <li>Users are responsible for their own submissions</li>
                <li>We may remove content at our discretion</li>
                <li>Content monitoring is not guaranteed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Data Protection
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Data collection and processing are governed by our parent company's privacy policy:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>We collect only essential information for service provision</li>
                <li>Data is processed in accordance with applicable data protection laws</li>
                <li>We may share data with authorized partners under strict agreements</li>
                <li>Users have rights to access, correct, and delete their data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To the maximum extent permitted by law, Sportrz.com and Krayons Convergence Pvt Ltd shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Direct, indirect, incidental, special, or consequential damages</li>
                <li>Loss of data, profits, or business opportunities</li>
                <li>Service interruptions or technical failures</li>
                <li>Actions or omissions of third parties</li>
                <li>Any damages exceeding the amount paid for services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Changes to Disclaimer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting. Continued use of the website constitutes acceptance of updated terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For questions about this disclaimer, contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Krayons Convergence Private Limited</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  Plot A-09, 711, ITL Towers, Netaji Subhash Place, Pitampura, Delhi 110034
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  Email: mail@krayons.co.in
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Landline: +91 11 41103510
                </p>
              </div>
            </section>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-8">
              <p className="text-red-800 dark:text-red-200 text-sm">
                <strong>Important:</strong> This disclaimer is subject to applicable laws and regulations. If any provision is found to be invalid, the remaining provisions shall continue in full force and effect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}