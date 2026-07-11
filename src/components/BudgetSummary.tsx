import { Contribution, Expense } from '../types';

interface BudgetSummaryProps {
  contributions: Contribution[];
  expenses: Expense[];
}

export function BudgetSummary({ contributions, expenses }: BudgetSummaryProps) {
  const totalContributions = contributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );
  const totalExpenses = expenses.reduce((sum, e) => sum + e.cost, 0);
  const remainingBudget = totalContributions - totalExpenses;
  const isPositive = remainingBudget >= 0;

  return (
    <section aria-label="Budget Summary" className="bg-white rounded-xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        Budget Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">Total Contributions</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">
            ${totalContributions.toFixed(2)}
          </p>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600">Total Expenses</p>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div
          className={`text-center p-3 rounded-lg ${
            isPositive ? 'bg-green-50' : 'bg-red-50'
          }`}
        >
          <p className="text-xs sm:text-sm text-gray-600">Remaining Budget</p>
          <p
            className={`text-xl sm:text-2xl font-bold ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            ${remainingBudget.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}
