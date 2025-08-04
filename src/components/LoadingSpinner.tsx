'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Main Logo Animation */}
          <div className="text-6xl md:text-7xl font-bold tracking-tight">
            <span 
              className="inline-block animate-bounce bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0s' }}
            >
              S
            </span>
            <span 
              className="inline-block animate-pulse bg-gradient-to-r from-yellow-500 via-green-500 to-emerald-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.1s' }}
            >
              p
            </span>
            <span 
              className="inline-block animate-bounce bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.2s' }}
            >
              o
            </span>
            <span 
              className="inline-block animate-pulse bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.3s' }}
            >
              r
            </span>
            <span 
              className="inline-block animate-bounce bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.4s' }}
            >
              t
            </span>
            <span 
              className="inline-block animate-pulse bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.5s' }}
            >
              r
            </span>
            <span 
              className="inline-block animate-bounce bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.6s' }}
            >
              z
            </span>
            <span 
              className="inline-block animate-pulse bg-gradient-to-r from-slate-500 via-gray-500 to-zinc-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.7s' }}
            >
              .
            </span>
            <span 
              className="inline-block animate-bounce bg-gradient-to-r from-zinc-500 via-neutral-500 to-stone-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.8s' }}
            >
              c
            </span>
            <span 
              className="inline-block animate-pulse bg-gradient-to-r from-stone-500 via-amber-600 to-orange-600 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '0.9s' }}
            >
              o
            </span>
            <span 
              className="inline-block animate-bounce bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent animate-color-shift"
              style={{ animationDelay: '1s' }}
            >
              m
            </span>
          </div>
          
          {/* Animated underline */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 via-blue-500 via-green-500 to-yellow-500 rounded-full animate-[expandLine_2s_ease-in-out_infinite] animate-rainbow-flow"></div>
          </div>
          
          {/* Floating dots animation */}
          <div className="absolute -top-4 -right-4">
            <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-ping shadow-lg shadow-pink-500/50"></div>
          </div>
          <div className="absolute -bottom-4 -left-4">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full animate-ping shadow-lg shadow-cyan-500/50" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="absolute top-0 left-0">
            <div className="w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white animate-fade-in">
          Loading Your Sports Experience...
        </h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Get ready for the ultimate sports platform
        </p>
        
        {/* Progress dots */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-bounce shadow-sm"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes expandLine {
          0%, 100% { width: 0; }
          50% { width: 200px; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes color-shift {
          0% { filter: hue-rotate(0deg) brightness(1) saturate(1); }
          25% { filter: hue-rotate(90deg) brightness(1.2) saturate(1.3); }
          50% { filter: hue-rotate(180deg) brightness(1.1) saturate(1.2); }
          75% { filter: hue-rotate(270deg) brightness(1.3) saturate(1.4); }
          100% { filter: hue-rotate(360deg) brightness(1) saturate(1); }
        }
        
        @keyframes rainbow-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-color-shift {
          animation: color-shift 3s ease-in-out infinite;
        }
        
        .animate-rainbow-flow {
          background-size: 200% 200%;
          animation: rainbow-flow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}