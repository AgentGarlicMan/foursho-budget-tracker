import { useState } from 'react';

interface ResetDataProps {
  onReset: () => void;
}

export function ResetData({ onReset }: ResetDataProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    onReset();
    setShowConfirm(false);
  };

  return (
    <section aria-label="Reset Data" className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
        Reset Data
      </h2>
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Reset All Data
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <p className="text-sm text-red-600 font-medium">
            Are you sure? This will delete all contributions and expenses.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Confirm Reset
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
