'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="relative mb-8">
          {/* Logo with animations */}
          <div className="relative">
            <img 
              src="/Logo.png" 
              alt="Sportrz Logo" 
              className="w-24 h-24 md:w-32 md:h-32 mx-auto animate-logo-pulse filter drop-shadow-lg"
            />
            
            {/* Rotating ring around logo */}
            <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 mx-auto border-2 border-transparent border-t-blue-500 border-r-purple-500 border-b-green-500 border-l-red-500 rounded-full animate-spin"></div>
            
            {/* Glowing effect */}
            <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 mx-auto bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse blur-sm"></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute -top-2 -right-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-float shadow-lg shadow-blue-500/50"></div>
          </div>
          <div className="absolute -bottom-2 -left-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-float shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="absolute top-4 left-8">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="absolute bottom-4 right-8">
            <div className="w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
      
        
        {/* Progress dots */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-bounce-slow shadow-sm"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce-slow shadow-sm" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce-slow shadow-sm" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes logo-pulse {
          0% { 
            transform: scale(1);
            filter: brightness(1);
          }
          50% { 
            transform: scale(1.05);
            filter: brightness(1.1);
          }
          100% { 
            transform: scale(1);
            filter: brightness(1);
          }
        }
        
        @keyframes float {
          0% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px) rotate(180deg);
            opacity: 0.7;
          }
          100% { 
            transform: translateY(0px) rotate(360deg);
            opacity: 1;
          }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-8px);
          }
        }
        
        .animate-logo-pulse {
          animation: logo-pulse 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}