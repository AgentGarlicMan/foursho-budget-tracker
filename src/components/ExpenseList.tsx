import { Expense, Role } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface ExpenseListProps {
  expenses: Expense[];
  role: Role;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({
  expenses,
  role,
  onEdit,
  onDelete,
}: ExpenseListProps) {
  const runningTotal = expenses.reduce((sum, e) => sum + e.cost, 0);

  if (expenses.length === 0) {
    return (
      <section aria-label="Expenses List" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
          Expenses
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">No expenses yet.</p>
      </section>
    );
  }

  return (
    <section aria-label="Expenses List" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-4">
        Expenses
        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          (Total: {formatCurrency(runningTotal)})
        </span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Item</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Cost</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Date</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Purchased By</th>
              {role === 'leader' && (
                <th className="text-right py-2 px-2 font-medium text-gray-600 dark:text-gray-300">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 px-2 text-gray-800 dark:text-gray-200">{expense.itemName}</td>
                <td className="py-2 px-2 text-gray-800 dark:text-gray-200">{formatCurrency(expense.cost)}</td>
                <td className="py-2 px-2 text-gray-600 dark:text-gray-400">{expense.date}</td>
                <td className="py-2 px-2 text-gray-600 dark:text-gray-400">
                  {expense.purchasedBy || '-'}
                </td>
                {role === 'leader' && (
                  <td className="py-2 px-2 text-right">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-2 font-medium text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
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
