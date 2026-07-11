import { MEMBERS, LEADER_NAME } from '../constants';
import { Role } from '../types';

interface RoleSelectionProps {
  onSelectRole: (role: Role, memberName: string) => void;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  const handleSelect = (memberName: string) => {
    const role: Role = memberName === LEADER_NAME ? 'leader' : 'viewer';
    onSelectRole(role, memberName);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <article className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Capstone Group Budget Tracker
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Select your name to continue
          </p>
        </header>
        <nav aria-label="Member selection">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MEMBERS.map((member) => (
              <li key={member}>
                <button
                  onClick={() => handleSelect(member)}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {member}
                  {member === LEADER_NAME && (
                    <span className="block text-xs text-blue-200 mt-0.5">
                      (Leader)
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </section>
  );
}
