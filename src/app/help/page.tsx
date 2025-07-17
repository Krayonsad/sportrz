// src/app/help/page.tsx
'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      articles: [
        { title: 'How to play games on Game Hub', content: 'Simply click on any game card from the homepage to start playing. All games load directly in your browser without any downloads required.' },
        { title: 'System requirements', content: 'Game Hub works on any modern web browser including Chrome, Firefox, Safari, and Edge. No special software or plugins required.' },
        { title: 'Creating an account', content: 'No account creation is required! You can play all games instantly without registration.' },
        { title: 'Navigating the website', content: 'Use the search bar to find specific games, or browse through our collection using the grid layout on the homepage.' }
      ]
    },
    {
      id: 'gameplay',
      title: 'Gameplay',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      articles: [
        { title: 'Game controls and navigation', content: 'Most games use standard keyboard controls (WASD or arrow keys) and mouse clicks. Specific controls are usually displayed when you start each game.' },
        { title: 'Game not loading or running slowly', content: 'Try refreshing the page, clearing your browser cache, or switching to a different browser. Ensure you have a stable internet connection.' },
        { title: 'Audio issues', content: 'Check your browser\'s audio settings and ensure the game tab is not muted. Some games require you to click on the game area to enable audio.' },
        { title: 'Fullscreen mode', content: 'Many games support fullscreen mode. Look for a fullscreen button within the game or press F11 to enter browser fullscreen.' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      articles: [
        { title: 'Browser compatibility', content: 'Game Hub works best on modern browsers. We recommend Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+ for optimal performance.' },
        { title: 'Clearing browser cache', content: 'If games aren\'t loading properly, try clearing your browser cache. Go to Settings > Privacy > Clear browsing data and select cached images and files.' },
        { title: 'Disabling ad blockers', content: 'Some ad blockers might interfere with game loading. Try disabling your ad blocker for Game Hub or adding us to your whitelist.' },
        { title: 'Mobile device support', content: 'Many games work on mobile devices, but some may require a keyboard or mouse. Touch controls are available for mobile-optimized games.' }
      ]
    },
    {
      id: 'account',
      title: 'Account & Privacy',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      articles: [
        { title: 'Do I need to create an account?', content: 'No account is required to play games on Game Hub. All games are freely accessible without registration.' },
        { title: 'Data privacy and cookies', content: 'We respect your privacy. We only use essential cookies for website functionality and don\'t collect personal data without consent.' },
        { title: 'Safe gaming environment', content: 'All games are reviewed for appropriate content. We maintain a family-friendly environment suitable for all ages.' },
        { title: 'Reporting inappropriate content', content: 'If you encounter any inappropriate content, please contact us immediately through our contact form or support email.' }
      ]
    }
  ];

  const popularArticles = [
    { title: 'How to play games on Game Hub', category: 'Getting Started' },
    { title: 'Game not loading or running slowly', category: 'Gameplay' },
    { title: 'Browser compatibility', category: 'Technical Support' },
    { title: 'Do I need to create an account?', category: 'Account & Privacy' },
    { title: 'System requirements', category: 'Getting Started' },
    { title: 'Game controls and navigation', category: 'Gameplay' }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers to frequently asked questions and get help with Game Hub
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                  placeholder="Search help articles..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find help articles organized by topic
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Category Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <nav className="space-y-2">
                  {filteredCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className={`${selectedCategory === category.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
                        {category.icon}
                      </div>
                      <span>{category.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Articles */}
            <div className="lg:col-span-3">
              {selectedCategory ? (
                // Show articles for selected category
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  {(() => {
                    const category = categories.find(c => c.id === selectedCategory);
                    return category ? (
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="text-indigo-600 dark:text-indigo-400">
                            {category.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {category.title}
                          </h3>
                        </div>
                        <div className="space-y-6">
                          {category.articles.map((article, index) => (
                            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                {article.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {article.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              ) : (
                // Show all categories overview
                <div className="space-y-6">
                  {filteredCategories.map((category) => (
                    <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-indigo-600 dark:text-indigo-400">
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {category.title}
                        </h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        {category.articles.map((article, index) => (
                          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {article.content}
                            </p>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedCategory(category.id)}
                        className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                      >
                        View all articles →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}