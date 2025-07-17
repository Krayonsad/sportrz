'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  totalGames: number;
  setTotalGames: (count: number) => void;
  filteredCount: number;
  setFilteredCount: (count: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [totalGames, setTotalGames] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      totalGames,
      setTotalGames,
      filteredCount,
      setFilteredCount
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}