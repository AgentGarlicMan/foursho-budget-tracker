export function LoadingScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div
          className="inline-block h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
          role="status"
          aria-label="Loading"
        ></div>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300">
          Loading budget data...
        </p>
      </div>
    </main>
  );
}
