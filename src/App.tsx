import { useState } from 'react';
import { Role } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { RoleSelection } from './components/RoleSelection';
import { Dashboard } from './components/Dashboard';

function App() {
  const [role, setRole] = useState<Role | null>(null);
  const [memberName, setMemberName] = useState<string>('');
  const { state, setState, resetState } = useLocalStorage();

  const handleSelectRole = (selectedRole: Role, name: string) => {
    setRole(selectedRole);
    setMemberName(name);
  };

  const handleLogout = () => {
    setRole(null);
    setMemberName('');
  };

  if (!role) {
    return <RoleSelection onSelectRole={handleSelectRole} />;
  }

  return (
    <Dashboard
      state={state}
      setState={setState}
      resetState={resetState}
      role={role}
      memberName={memberName}
      onLogout={handleLogout}
    />
  );
}

export default App;
