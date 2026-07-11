import { Contribution, Role } from '../types';

interface ContributionListProps {
  contributions: Contribution[];
  role: Role;
  onEdit: (contribution: Contribution) => void;
  onDelete: (id: string) => void;
}

export function ContributionList({
  contributions,
  role,
  onEdit,
  onDelete,
}: ContributionListProps) {
  if (contributions.length === 0) {
    return (
      <section aria-label="Contributions List" className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Contributions
        </h2>
        <p className="text-gray-500 text-sm">No contributions yet.</p>
      </section>
    );
  }

  return (
    <section aria-label="Contributions List" className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        Contributions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 font-medium text-gray-600">Member</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600">Amount</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600">Date</th>
              {role === 'leader' && (
                <th className="text-right py-2 px-2 font-medium text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => (
              <tr key={contribution.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2 text-gray-800">{contribution.memberName}</td>
                <td className="py-2 px-2 text-gray-800">${contribution.amount.toFixed(2)}</td>
                <td className="py-2 px-2 text-gray-600">{contribution.date}</td>
                {role === 'leader' && (
                  <td className="py-2 px-2 text-right">
                    <button
                      onClick={() => onEdit(contribution)}
                      className="text-blue-600 hover:text-blue-800 mr-2 font-medium text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contribution.id)}
                      className="text-red-600 hover:text-red-800 font-medium text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
