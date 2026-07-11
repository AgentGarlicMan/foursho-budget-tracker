import { useState } from 'react';
import { Role } from './types';
import { useFirebaseState } from './hooks/useFirebaseState';
import { useTheme } from './hooks/useTheme';
import { RoleSelection } from './components/RoleSelection';
import { Dashboard } from './components/Dashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorScreen } from './components/ErrorScreen';

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

  if (error) {
    return <ErrorScreen error={error} />;
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
