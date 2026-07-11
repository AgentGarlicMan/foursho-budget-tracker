import { useState } from 'react';
import { ADMIN_PASSWORD } from '../constants';
import { Role } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface RoleSelectionProps {
  onSelectRole: (role: Role, memberName: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function RoleSelection({ onSelectRole, theme, toggleTheme }: RoleSelectionProps) {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleViewerLogin = () => {
    onSelectRole('viewer', 'Viewer');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError('');
      onSelectRole('leader', 'Admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <article className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
            Capstone Group Budget Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
            Choose how you want to continue
          </p>
        </header>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleViewerLogin}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Continue as Viewer
          </button>

          {!showAdminLogin ? (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="w-full px-4 py-3 bg-gray-800 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-500 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Admin Login
            </button>
          ) : (
            <form onSubmit={handleAdminSubmit} className="flex flex-col gap-3">
              <label htmlFor="admin-password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Enter admin password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                autoFocus
              />
              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm" role="alert">
                  {error}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gray-800 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-500 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Login as Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setPassword('');
                    setError('');
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </article>
    </section>
  );
}
