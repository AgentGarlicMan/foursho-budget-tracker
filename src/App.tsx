import { useState } from 'react';
import { Role } from './types';
import { useFirebaseState } from './hooks/useFirebaseState';
import { useTheme } from './hooks/useTheme';
import { RoleSelection } from './components/RoleSelection';
import { Dashboard } from './components/Dashboard';

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [memberName, setMemberName] = useState<string>('');
  const { state, setState, resetState, loading, error } = useFirebaseState();
  const { theme, toggleTheme } = useTheme();

  const handleSelectRole = (selectedRole: Role, name: string) => {
    setRole(selectedRole);
    setMemberName(name);
  };

  const handleLogout = () => {
    setRole(null);
    setMemberName('');
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" role="status" aria-label="Loading"></div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading budget data...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <section className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-4">
          <h1 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Connection Error</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </section>
      </main>
    );
  }

  if (!role) {
    return (
      <RoleSelection
        onSelectRole={handleSelectRole}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <Dashboard
      state={state}
      setState={setState}
      resetState={resetState}
      role={role}
      memberName={memberName}
      onLogout={handleLogout}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
}

export default App;
