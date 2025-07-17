export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Refund & Cancellation Policy
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Important:</strong> Sportrz.com is operated by Krayons Convergence Pvt Ltd. All payments and refunds are processed in accordance with Krayons' terms and conditions.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. General Refund Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <strong>Payments once made are non-refundable</strong>, unless explicitly stated or agreed upon under a separate agreement. All transactions are processed securely through third-party payment gateway providers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Service-Based Refunds
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Refunds are processed only in the following cases:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Services have not been delivered</li>
                <li>There is a verifiable deficiency in service delivery</li>
                <li>Technical issues preventing access to paid gaming content</li>
                <li>Duplicate charges or billing errors</li>
                <li>Unauthorized transactions (subject to verification)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Refund Request Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Email us at <strong>mail@krayons.co.in</strong> with your refund request</li>
                <li>Provide your payment details and transaction ID</li>
                <li>Include the reason for your refund request</li>
                <li>Attach supporting documents (if any)</li>
                <li>Allow 7-10 business days for review and processing</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Refund Timeline
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Approved refunds will be processed within 7-10 business days and credited back to the original mode of payment:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Credit/Debit Cards: 7-10 business days</li>
                <li>Net Banking: 7-10 business days</li>
                <li>UPI: 7-10 business days</li>
                <li>Digital Wallets: 7-10 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Cancellation Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cancellation requests must meet the following criteria:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Must be requested via email to <strong>mail@krayons.co.in</strong></li>
                <li>Must be submitted within <strong>24 hours of payment</strong></li>
                <li>Requests made after the service has commenced are not eligible for cancellation</li>
                <li>Approved cancellations may be subject to applicable deductions or administrative charges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. No Refund Conditions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Refunds are <strong>NOT provided</strong> in the following cases:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Change of mind after the payment is made</li>
                <li>Delay in service due to incomplete or incorrect information provided by the client</li>
                <li>Services that are already delivered or in progress</li>
                <li>Digital/gaming content once accessed or downloaded</li>
                <li>Consultation services once initiated</li>
                <li>Promotional or discounted purchases</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Payment Gateway Issues
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We are not liable for any issues arising from:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Payment failures due to payment gateway issues</li>
                <li>Transaction delays caused by third-party providers</li>
                <li>Service outages caused by payment gateway providers</li>
                <li>Banking or network connectivity issues</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Contact Information
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For refund and cancellation queries, please contact:
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

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-8">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Disclaimer:</strong> This refund policy is subject to change without prior notice. All refund decisions are at the sole discretion of Krayons Convergence Pvt Ltd. We recommend reviewing this page periodically for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}