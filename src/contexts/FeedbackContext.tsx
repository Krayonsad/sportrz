// src/contexts/FeedbackContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FeedbackService, Feedback } from '@/lib/feedbackService';

interface FeedbackContextType {
  reviews: Feedback[];
  loading: boolean;
  error: string | null;
  refreshReviews: () => Promise<void>;
  averageRating: number;
  totalReviews: number;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
  const [reviews, setReviews] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const topReviews = await FeedbackService.getTopReviews();
      setReviews(topReviews);
    } catch (err) {
      console.error('Error loading reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshReviews();
  }, []);

  const averageRating = reviews.length > 0 ? FeedbackService.calculateAverageRating(reviews) : 0;
  const totalReviews = reviews.length;

  const value: FeedbackContextType = {
    reviews,
    loading,
    error,
    refreshReviews,
    averageRating,
    totalReviews
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};