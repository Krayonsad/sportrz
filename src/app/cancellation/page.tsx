export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Cancellation Policy
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Cancellation Request Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cancellation requests must be submitted in writing to our parent company Krayons Convergence Pvt Ltd:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Email: mail@krayons.co.in</li>
                <li>Include your payment details and reason for cancellation</li>
                <li>Provide supporting documents if applicable</li>
                <li>Cancellation requests are subject to approval</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Cancellation Timeline
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                In accordance with our parent company's policy:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Cancellation requests must be made within 24 hours of payment</li>
                <li>Requests made after services have commenced are not eligible for cancellation</li>
                <li>Approved cancellations may be subject to applicable deductions or administrative charges</li>
                <li>Processing time: 7-10 business days after approval</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Eligible Cancellation Scenarios
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cancellations may be approved in the following cases:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Services have not been delivered</li>
                <li>Verifiable deficiency in service quality</li>
                <li>Technical issues preventing service access</li>
                <li>Duplicate payments or payment errors</li>
                <li>Services cancelled by us due to unforeseen circumstances</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Non-Eligible Cancellation Conditions
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Cancellations are not provided in the following cases:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Change of mind after payment is made</li>
                <li>Delay in service due to incomplete or incorrect information provided by the client</li>
                <li>Services that are already delivered or in progress</li>
                <li>Digital/consultation services once initiated</li>
                <li>Requests made after the 24-hour cancellation window</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Subscription Cancellation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For recurring subscriptions:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Cancellation requests must be made before the next billing cycle</li>
                <li>Current subscription period will continue until expiry</li>
                <li>No refunds for the current billing period</li>
                <li>Future automatic renewals will be stopped</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Refund Processing
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For approved cancellations:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Refunds will be processed within 7-10 business days</li>
                <li>Amount will be credited to the original payment method</li>
                <li>Administrative charges may be deducted from the refund amount</li>
                <li>Payment gateway charges are non-refundable</li>
                <li>Currency conversion fees (if applicable) are non-refundable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. What Happens After Cancellation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Upon approved cancellation:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Service access will be discontinued immediately or at period end</li>
                <li>Account data may be retained as per our privacy policy</li>
                <li>No further charges will be processed</li>
                <li>You'll receive a cancellation confirmation email</li>
                <li>Service-specific data may be deleted as per our data retention policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Payment Gateway Limitations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Please note that:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>We are not liable for payment failures or transaction delays</li>
                <li>Service outages caused by payment gateway providers are beyond our control</li>
                <li>Payment processing fees are handled by third-party providers</li>
                <li>Cancellation processing may be affected by payment gateway policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Required Information for Cancellation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To process your cancellation request, please provide:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                <li>Payment transaction ID or reference number</li>
                <li>Email address used for the transaction</li>
                <li>Date and amount of payment</li>
                <li>Detailed reason for cancellation</li>
                <li>Any supporting documentation (if applicable)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Contact Information for Cancellation
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For all cancellation requests, please contact:
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

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-8">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Important:</strong> This cancellation policy is governed by the terms and conditions of Krayons Convergence Pvt Ltd. Cancellation approval is at the sole discretion of the company and subject to the conditions outlined above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}