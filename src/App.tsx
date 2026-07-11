import { useState } from 'react';
import { Role } from './types';
import { useFirebaseState } from './hooks/useFirebaseState';
import { useTheme } from './hooks/useTheme';
import { RoleSelection } from './components/RoleSelection';
import { Dashboard } from './components/Dashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorScreen } from './components/ErrorScreen';
import { ErrorBanner } from './components/ErrorBanner';

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
    return <LoadingScreen />;
  }

  // If there is an error but the state has valid cached data, show the app
  // with a non-blocking error banner instead of blocking the entire UI
  const hasData =
    state.contributions.length > 0 || state.expenses.length > 0;

  if (error && !hasData) {
    return <ErrorScreen error={error} />;
  }

  if (!role) {
    return (
      <>
        {error && <ErrorBanner error={error} />}
        <RoleSelection
          onSelectRole={handleSelectRole}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      </>
    );
  }

  return (
    <>
      {error && <ErrorBanner error={error} />}
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
    </>
  );
}

export default App;
