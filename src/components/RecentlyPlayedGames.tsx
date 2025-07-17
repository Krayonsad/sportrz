// src/components/RecentlyPlayedGames.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { GameTrackingService } from '@/lib/gameTrackingService';
import { RecentlyPlayedGame } from '@/types/user';
import { Clock, Play, X, Trash2 } from 'lucide-react';

interface RecentlyPlayedGamesProps {
  className?: string;
}

export default function RecentlyPlayedGames({ className = '' }: RecentlyPlayedGamesProps) {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [recentGames, setRecentGames] = useState<RecentlyPlayedGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    loadRecentGames();
  }, [currentUser]);

  const loadRecentGames = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const games = await GameTrackingService.getRecentlyPlayedGames(currentUser.uid);
      setRecentGames(games);
    } catch (error) {
      console.error('Error loading recent games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayGame = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  const handleRemoveGame = async (gameId: string) => {
    if (!currentUser) return;

    setRemoving(gameId);
    try {
      await GameTrackingService.removeFromRecentlyPlayed(currentUser.uid, gameId);
      setRecentGames(prev => prev.filter(game => game.gameId !== gameId));
    } catch (error) {
      console.error('Error removing game:', error);
    } finally {
      setRemoving(null);
    }
  };

  const handleClearAll = async () => {
    if (!currentUser) return;

    try {
      await GameTrackingService.clearRecentlyPlayedGames(currentUser.uid);
      setRecentGames([]);
    } catch (error) {
      console.error('Error clearing games:', error);
    }
  };

  const formatPlayTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Played</h2>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recentGames.length === 0) {
    return (
      <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 ${className}`}>
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Played</h2>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">No games played yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Start playing games to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently Played</h2>
        </div>
        {recentGames.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 flex items-center space-x-1 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {recentGames.map((game) => (
          <div
            key={game.gameId}
            className="group flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
              {game.thumbnail ? (
                <img
                  src={game.thumbnail}
                  alt={game.gameName}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Play className="w-6 h-6 text-indigo-600" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 dark:text-white truncate">
                {game.gameName}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{formatPlayTime(new Date(game.playedAt))}</span>
                <span>•</span>
                <span className="truncate">
                  {game.categories.slice(0, 2).join(', ')}
                  {game.categories.length > 2 && '...'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handlePlayGame(game.gameId)}
                className="p-2 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors"
                title="Play game"
              >
                <Play className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleRemoveGame(game.gameId)}
                disabled={removing === game.gameId}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors disabled:opacity-50"
                title="Remove from recent"
              >
                {removing === game.gameId ? (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                ) : (
                  <X className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}