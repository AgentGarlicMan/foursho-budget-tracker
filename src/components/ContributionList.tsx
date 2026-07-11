import { Contribution, Role } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

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
      <section aria-label="Contributions List" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
          Contributions
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">No contributions yet.</p>
      </section>
    );
  }

  return (
    <section aria-label="Contributions List" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
        Contributions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Member</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Amount</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Date</th>
              {role === 'leader' && (
                <th className="text-right py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => (
              <tr key={contribution.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-2 text-gray-800 dark:text-gray-200">{contribution.memberName}</td>
                <td className="py-2 px-2 text-gray-800 dark:text-gray-200">{formatCurrency(contribution.amount)}</td>
                <td className="py-2 px-2 text-gray-600 dark:text-gray-400">{contribution.date}</td>
                {role === 'leader' && (
                  <td className="py-2 px-2 text-right">
                    <button
                      onClick={() => onEdit(contribution)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2 font-medium text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contribution.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium text-xs sm:text-sm"
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
