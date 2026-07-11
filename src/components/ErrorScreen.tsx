interface ErrorScreenProps {
  error: string;
}

export function ErrorScreen({ error }: ErrorScreenProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <section className="text-center p-6 sm:p-8 lg:p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg mx-4">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
          Connection Error
        </h1>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
          {error}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
          The app will use cached data if available.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Retry
        </button>
      </section>
    </main>
  );
}
