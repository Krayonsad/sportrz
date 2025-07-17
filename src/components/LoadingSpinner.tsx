'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Loading Games...</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Please wait while we fetch your games</p>
      </div>
    </div>
  );
}