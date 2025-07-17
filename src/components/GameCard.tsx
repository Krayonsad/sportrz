'use client';
import { GameInfo } from '@/types/game';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';

interface GameCardProps {
  game: GameInfo;
}

export default function GameCard({ game }: GameCardProps) {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleGameClick = (e: React.MouseEvent) => {
    // If user is not logged in, prevent navigation and show toast
    if (!currentUser) {
      e.preventDefault();
      showToast('Please log in to access games', 'error', 4000);
      router.push('/login');
      return;
    }
    // If user is logged in, allow normal navigation (Link will handle it)
  };

  return (
    <Link href={`/game/${game.id}`} onClick={handleGameClick}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 group transform hover:scale-105 hover:-translate-y-1">
        {/* Game Preview/Thumbnail - Made shorter for more length than height */}
{/* Game Preview/Thumbnail - Made shorter for more length than height */}
<div className="h-32 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center group-hover:from-indigo-200 group-hover:to-purple-200 dark:group-hover:from-indigo-800 dark:group-hover:to-purple-800 transition-all duration-300 relative overflow-hidden">
  <img 
    src={game.thumbnail} 
    alt={game.name}
    className="w-full h-full object-cover"
  />
  
  {/* Play overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">

  </div>
</div>
        
        {/* Game Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
              {game.name}
            </h3>
            <div className="flex-shrink-0 ml-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                #{game.id}
              </span>
            </div>
          </div>
         
          <div className="flex items-center justify-between">
           
            <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">
                {currentUser ? 'Play' : 'Login to Play'}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}