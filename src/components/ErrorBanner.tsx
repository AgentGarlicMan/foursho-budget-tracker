import { useState } from 'react';

interface ErrorBannerProps {
  error: string;
}

export function ErrorBanner({ error }: ErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      role="alert"
      className="fixed top-0 left-0 right-0 z-50 bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800 px-4 py-3 sm:px-6"
    >
      <div className="flex items-center justify-between max-w-4xl mx-auto gap-3">
        <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 flex-1">
          <span className="font-semibold">Connection issue:</span>{' '}
          {error}. Showing cached data.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.location.reload()}
            className="px-3 py-1 text-xs sm:text-sm bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors cursor-pointer"
          >
            Retry
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="px-2 py-1 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors cursor-pointer"
            aria-label="Dismiss error"
          >
            &times;
          </button>
        </div>
      </div>
    </aside>
  );
}
