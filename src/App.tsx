import { useState } from 'react';
import { Role } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { RoleSelection } from './components/RoleSelection';
import { Dashboard } from './components/Dashboard';

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [memberName, setMemberName] = useState<string>('');
  const { state, setState, resetState } = useLocalStorage();
  const { theme, toggleTheme } = useTheme();

  const handleSelectRole = (selectedRole: Role, name: string) => {
    setRole(selectedRole);
    setMemberName(name);
  };

  const handleLogout = () => {
    setRole(null);
    setMemberName('');
  };

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
