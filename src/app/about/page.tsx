// src/app/about/page.tsx
'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Sportrz.com?",
      answer: "Sportrz.com is a comprehensive sports platform offering a wide range of sports-related content, games, and services. We're owned by Krayons Convergence Pvt Ltd, a leading provider of Digital Marketing and Event Services."
    },
    {
      question: "Are the games free to play?",
      answer: "Yes! All games on Sportrz.com are completely free to play. No registration, no payments, no hidden fees - just pure gaming fun."
    },
    {
      question: "Do I need to install anything?",
      answer: "No installation required! All games are HTML-based and run directly in your web browser. Just click and play!"
    },
    {
      question: "How do you ensure user privacy?",
      answer: "We take privacy seriously. We collect only essential information needed to provide better services and follow strict data protection guidelines. All data is handled in compliance with applicable privacy laws."
    },
    {
      question: "What if I need support or have questions?",
      answer: "You can reach out to us at mail@krayons.co.in or call us at +91 11 41103510. Our office is located at Plot A-09, 711, ITL Towers, Netaji Subhash Place, Pitampura, Delhi 110034."
    },
    {
      question: "Do you offer refunds?",
      answer: "For any paid services, refunds are processed only in cases where services have not been delivered or there is a verifiable deficiency in service. Please contact us at mail@krayons.co.in with your payment details and reason for refund."
    }
  ];

  const stats = [
    { label: "Games Available", value: "500+" },
    { label: "Categories", value: "25+" },
    { label: "Monthly Players", value: "10K+" },
    { label: "Countries Served", value: "50+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Sportrz.com
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your ultimate destination for sports entertainment and gaming. Brought to you by 
              Krayons Convergence Pvt Ltd, we combine our expertise in digital marketing and 
              event services to deliver an exceptional sports gaming experience.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  At Sportrz.com, we believe sports gaming should be accessible to everyone. 
                  Backed by Krayons Convergence Pvt Ltd's expertise in digital marketing and 
                  event services, we provide a platform where sports enthusiasts can discover 
                  and enjoy high-quality games without any barriers.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We carefully curate our collection to ensure every game meets our standards for 
                  fun, quality, and safety. Whether you're looking for a quick sports challenge 
                  or hours of entertainment, we've got something for every sports fan.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Free Sports Gaming</h3>
                      <p className="text-gray-600 dark:text-gray-300">All games are completely free to play</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">No Downloads</h3>
                      <p className="text-gray-600 dark:text-gray-300">Play instantly in your browser</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Privacy Protected</h3>
                      <p className="text-gray-600 dark:text-gray-300">Your data is secure and protected</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Got questions? We've got answers!
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              About Krayons Convergence Pvt Ltd
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Sportrz.com is proudly owned and operated by Krayons Convergence Pvt Ltd, 
              a leading service provider specializing in Digital Marketing and Event Services. 
              We bring our expertise in creating engaging digital experiences to the world of sports gaming.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p><strong>Address:</strong> Plot A-09, 711, ITL Towers, Netaji Subhash Place, Pitampura, Delhi 110034</p>
                <p><strong>Email:</strong> mail@krayons.co.in</p>
                <p><strong>Phone:</strong> +91 11 41103510</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}