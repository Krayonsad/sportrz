'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  activeCategoryId?: string;
}

export default function Sidebar({ categories, onCategoryClick, activeCategoryId }: SidebarProps) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    'Top Games': '🏆',
    'Recommended by Sportrz': '❤️',
    'Arcade': '🕹️',
    'Casual': '🎮',
    'Strategy': '🧠',
    'Defence': '🪖',
    'Racing': '🏎️',
    'Sports': '⚽',
    'Puzzle': '🧩',
    'Shooter': '🎯',
    'Horror': '👻',
    'Board & Card': '🎲',
    'Platformer': '🏃',
    'Simulation': '🏗️',
    'Physics': '⚛️',
    'Kids': '🧸',
    'Idle / Clicker': '👆',
    'Music / Rhythm': '🎵',
    'Trivia / Quiz': '❓'
  };

  const handleCategoryClick = (category: string) => {
    onCategoryClick(category);
    setIsMobileOpen(false);
    
    // Convert category name to URL slug
    const slug = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Navigate to category page
    router.push(`/category/${slug}`);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const mobileToggle = document.getElementById('mobile-sidebar-toggle');
      
      if (isMobileOpen && sidebar && mobileToggle && 
          !sidebar.contains(event.target as Node) && 
          !mobileToggle.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        id="mobile-sidebar-toggle"
        onClick={toggleMobileMenu}
        className="fixed top-20 left-4 z-40 md:hidden bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        aria-label="Toggle category menu"
      >
        <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          sticky top-16 left-0 z-25 h-[calc(100vh-4rem)]
          bg-white dark:bg-gray-800 
          border-r border-gray-200 dark:border-gray-700 
          shadow-lg transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >

{/* Home Link */}
<ul className="space-y-1 px-2 mb-2">
  <li>
    <button
      onClick={() => router.push('/')}
      className={`
        w-full flex items-center px-3 py-2 rounded-lg transition-colors text-left
        hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300
        ${isCollapsed ? 'justify-center' : 'justify-start'}
      `}
      title={isCollapsed ? 'Home' : undefined}
    >
      <span className="text-xl flex-shrink-0">
        🏠
      </span>
      {!isCollapsed && (
        <span className="ml-3 text-sm font-medium truncate">
          Home
        </span>
      )}
    </button>
  </li>
</ul>
<div className="border-t border-gray-200 dark:border-gray-700 mb-2"></div>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Categories
              </h2>
            )}
            <button
              onClick={toggleCollapse}
              className="hidden md:flex p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Categories List */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {categories.map((category) => {
                const categoryId = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const isActive = activeCategoryId === categoryId;
                
                return (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`
                        w-full flex items-center px-3 py-2 rounded-lg transition-colors text-left
                        ${isActive 
                          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }
                        ${isCollapsed ? 'justify-center' : 'justify-start'}
                      `}
                      title={isCollapsed ? category : undefined}
                    >
                      <span className="text-xl flex-shrink-0">
                        {categoryIcons[category] || '📁'}
                      </span>
                      {!isCollapsed && (
                        <span className="ml-3 text-sm font-medium truncate">
                          {category}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                <p>{categories.length} Categories</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}