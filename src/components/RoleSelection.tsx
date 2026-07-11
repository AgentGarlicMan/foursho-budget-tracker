import { useState } from 'react';
import { ADMIN_PASSWORD } from '../constants';
import { Role } from '../types';

interface RoleSelectionProps {
  onSelectRole: (role: Role, memberName: string) => void;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <article className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Capstone Group Budget Tracker
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Choose how you want to continue
          </p>
        </header>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleViewerLogin}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue as Viewer
          </button>

          {!showAdminLogin ? (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
            >
              Admin Login
            </button>
          ) : (
            <form onSubmit={handleAdminSubmit} className="flex flex-col gap-3">
              <label htmlFor="admin-password" className="text-sm font-medium text-gray-700">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                autoFocus
              />
              {error && (
                <p className="text-red-600 text-sm" role="alert">
                  {error}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
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
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
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
