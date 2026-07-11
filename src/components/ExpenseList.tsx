import { Expense, Role } from '../types';

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
      <section aria-label="Expenses List" className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Expenses
        </h2>
        <p className="text-gray-500 text-sm">No expenses yet.</p>
      </section>
    );
  }

  return (
    <section aria-label="Expenses List" className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        Expenses
        <span className="ml-2 text-sm font-normal text-gray-500">
          (Total: ${runningTotal.toFixed(2)})
        </span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 font-medium text-gray-600">Item</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600">Cost</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600">Date</th>
              <th className="text-left py-2 px-2 font-medium text-gray-600">Purchased By</th>
              {role === 'leader' && (
                <th className="text-right py-2 px-2 font-medium text-gray-600">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2 text-gray-800">{expense.itemName}</td>
                <td className="py-2 px-2 text-gray-800">${expense.cost.toFixed(2)}</td>
                <td className="py-2 px-2 text-gray-600">{expense.date}</td>
                <td className="py-2 px-2 text-gray-600">
                  {expense.purchasedBy || '-'}
                </td>
                {role === 'leader' && (
                  <td className="py-2 px-2 text-right">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-blue-600 hover:text-blue-800 mr-2 font-medium text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
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
