'use client';

import { useState, useEffect, useRef } from 'react';
import GameCard from '@/components/GameCard';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import Sidebar from '@/components/Sidebar';
import { GameInfo } from '@/types/game';
import { useSearch } from '@/contexts/SearchContext';
import { db } from '@/lib/firebase';
import Slider from '@/components/Slider';

export default function Home() {
  const { searchTerm, setSearchTerm, setTotalGames, setFilteredCount } = useSearch();
  const [games, setGames] = useState<GameInfo[]>([]);
  const [filteredGames, setFilteredGames] = useState<GameInfo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('');

  // Refs for category sliders
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [showLeftArrow, setShowLeftArrow] = useState<Record<string, boolean>>({});
  const [showRightArrow, setShowRightArrow] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadData();
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    filterGames();
  }, [searchTerm, games]);

  // Check scroll position for arrows
  useEffect(() => {
    const checkArrows = () => {
      categories.forEach((category) => {
        const slider = categoryRefs.current[category];
        if (slider) {
          const { scrollLeft, scrollWidth, clientWidth } = slider;
          setShowLeftArrow(prev => ({
            ...prev,
            [category]: scrollLeft > 0
          }));
          setShowRightArrow(prev => ({
            ...prev,
            [category]: scrollLeft < scrollWidth - clientWidth - 10
          }));
        }
      });
    };

    // Initial check
    setTimeout(checkArrows, 100);

    // Add scroll listeners
    categories.forEach((category) => {
      const slider = categoryRefs.current[category];
      if (slider) {
        slider.addEventListener('scroll', checkArrows);
      }
    });

    return () => {
      categories.forEach((category) => {
        const slider = categoryRefs.current[category];
        if (slider) {
          slider.removeEventListener('scroll', checkArrows);
        }
      });
    };
  }, [categories, games]);

  // Intersection Observer for active category detection
  useEffect(() => {
    if (categories.length === 0 || isSearching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id.replace('category-', '');
            setActiveCategoryId(categoryId);
          }
        });
      },
      {
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0.1
      }
    );

    categories.forEach((category) => {
      const categoryId = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const element = document.getElementById(`category-${categoryId}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [categories, isSearching]);

  const loadData = async () => {
    try {
      // Import Firebase functions
      const { collection, getDocs } = await import('firebase/firestore');
      
      // Fetch games from Firebase
      const gamesSnapshot = await getDocs(collection(db, 'games'));
      const gamesList: GameInfo[] = [];
      gamesSnapshot.forEach((doc) => {
        const data = doc.data();
        gamesList.push({ 
          id: data.id,  // Use the id field from the document data
          name: data.name,
          categories: data.categories,
          path: data.path,
          thumbnail: data.thumbnail
        } as GameInfo);
      });
      
      setGames(gamesList);
      setTotalGames(gamesList.length);
      
      // Fetch categories from Firebase
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categoriesList: string[] = [];
      categoriesSnapshot.forEach((doc) => {
        categoriesList.push(doc.data().name); // Assuming category documents have a 'name' field
      });
      
      setCategories(categoriesList);
      setFilteredGames(gamesList);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterGames = () => {
    if (!searchTerm) {
      setFilteredGames(games);
      setFilteredCount(games.length);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const filtered = games.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.id.toString().includes(searchTerm) ||
      game.categories.some((cat: string) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredGames(filtered);
    setFilteredCount(filtered.length);
  };

  const getGamesByCategory = (category: string) => {
    return games.filter(game => game.categories.includes(category));
  };

  const handleCategoryClick = (category: string) => {
    if (isSearching) {
      setSearchTerm('');
    }
  };

  const scrollSlider = (category: string, direction: 'left' | 'right') => {
    const slider = categoryRefs.current[category];
    if (!slider) return;

    const cardWidth = 200; // Approximate card width
    const gap = 16; // Gap between cards
    const scrollAmount = (cardWidth + gap) * 3; // Scroll 3 cards at a time

    const newScrollLeft = direction === 'left' 
      ? slider.scrollLeft - scrollAmount 
      : slider.scrollLeft + scrollAmount;

    slider.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex">
        {/* Sidebar - Hidden on mobile (lg breakpoint and up) */}
        <div className="hidden lg:block">
          <Sidebar 
            categories={categories} 
            onCategoryClick={handleCategoryClick}
            activeCategoryId={activeCategoryId}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Main Content Container */}
          <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Image Slider */}
            <div className="mb-6 sm:mb-8">
              <Slider />
            </div>
            
            {/* Search Results or Category View */}
            {isSearching ? (
              <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        Search Results
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Found {filteredGames.length} games matching "{searchTerm}"
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="group flex items-center justify-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md w-full sm:w-auto"
                  >
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Clear Search</span>
                  </button>
                </div>
                
                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                    {filteredGames.map((game: GameInfo, index) => (
                      <div
                        key={game.id}
                        className={`transform transition-all duration-500 ${
                          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        <GameCard game={game} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 sm:py-16 px-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">No games found</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-md mx-auto">
                      We couldn't find any games matching your search. Try different keywords or browse our categories.
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      Browse All Games
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Category Sections */
              <div className="space-y-8 sm:space-y-12">
                {categories.map((category, categoryIndex) => {
                  const categoryGames = getGamesByCategory(category);
                  const categoryId = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

                  if (categoryGames.length === 0) return null;

                  return (
                    <div 
                      key={category} 
                      className={`space-y-4 sm:space-y-6 transform transition-all duration-700 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                      style={{ transitionDelay: `${categoryIndex * 100}ms` }}
                      id={`category-${categoryId}`}
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className="w-1 h-8 sm:h-10 lg:h-12 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                          <div>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                              {category}
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                              {categoryGames.length} game{categoryGames.length !== 1 ? 's' : ''} available
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Games Slider Container */}
                      <div className="relative group">
                        {/* Left Arrow */}
                        <button
                          onClick={() => scrollSlider(category, 'left')}
                          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-xl transform hover:scale-105 ${
                            showLeftArrow[category] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
                          } group-hover:opacity-100 group-hover:translate-x-0`}
                        >
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        {/* Right Arrow */}
                        <button
                          onClick={() => scrollSlider(category, 'right')}
                          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-xl transform hover:scale-105 ${
                            showRightArrow[category] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                          } group-hover:opacity-100 group-hover:translate-x-0`}
                        >
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Games Slider */}
                        <div
  ref={(el) => {
    if (el) categoryRefs.current[category] = el;
  }}
  className="flex space-x-3 sm:space-x-4 overflow-x-auto scroll-smooth scrollbar-hide pb-4"
  style={{
    scrollbarWidth: 'none',         // Firefox
    msOverflowStyle: 'none',        // IE/Edge
  }}
>
                          {categoryGames.map((game: GameInfo, index) => (
                            <div
                              key={game.id}
                              className={`flex-shrink-0 w-36 sm:w-40 md:w-44 lg:w-48 transform transition-all duration-500 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                              }`}
                              style={{ transitionDelay: `${(categoryIndex * 100) + (index * 50)}ms` }}
                            >
                              <GameCard game={game} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}